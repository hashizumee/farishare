/**
 * Utility to encode bill state to URL hash and decode back.
 */

export function encodeStateToUrl(appState) {
  try {
    const compact = {
      p: (appState.people || []).map(person => ({
        i: person.id,
        n: person.name,
        c: person.color,
        it: (person.items || []).map(item => ({
          n: item.name,
          p: item.price,
          q: item.qty
        }))
      })),
      s: (appState.sharedItems || []).map(item => ({
        n: item.name,
        p: item.price,
        q: item.qty,
        sw: item.splitWith || []
      })),
      g: appState.globalSettings,
      py: appState.payerId,
      cur: appState.currency || 'IDR'
    };

    const jsonStr = JSON.stringify(compact);
    const base64 = btoa(encodeURIComponent(jsonStr));
    return `${window.location.origin}${window.location.pathname}#share=${base64}`;
  } catch (err) {
    console.error('Failed to encode URL state:', err);
    return window.location.href;
  }
}

export function decodeUrlToState() {
  try {
    const hash = window.location.hash;
    if (!hash.includes('#share=')) return null;

    const base64 = hash.replace('#share=', '');
    const jsonStr = decodeURIComponent(atob(base64));
    const compact = JSON.parse(jsonStr);

    return {
      people: (compact.p || []).map(person => ({
        id: person.i || 'p_' + Math.random().toString(36).substr(2, 5),
        name: person.n || 'Teman',
        color: person.c || '#10b981',
        items: (person.it || []).map(item => ({
          id: 'i_' + Math.random().toString(36).substr(2, 5),
          name: item.n || '',
          price: item.p || 0,
          qty: item.q || 1
        }))
      })),
      sharedItems: (compact.s || []).map(item => ({
        id: 'shared_' + Math.random().toString(36).substr(2, 5),
        name: item.n || '',
        price: item.p || 0,
        qty: item.q || 1,
        splitWith: item.sw || []
      })),
      globalSettings: compact.g || { taxPercent: 10, servicePercent: 5 },
      payerId: compact.py || null,
      currency: compact.cur || 'IDR'
    };
  } catch (err) {
    console.error('Failed to decode URL state:', err);
    return null;
  }
}
