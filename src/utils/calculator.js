/**
 * Advanced Calculator utility for FairShare
 * Handles proportional tax & service, discount vouchers, tips, and settlement matrix.
 */

export function calculateBill({
  people = [],
  sharedItems = [],
  globalSettings = {
    taxPercent: 10,
    servicePercent: 5,
    discountPercent: 0,
    discountNominal: 0,
    tipNominal: 0
  },
  payerId = null,
  paidStatus = {} // Map of personId -> boolean
}) {
  const taxPct = Math.max(0, Number(globalSettings.taxPercent) || 0);
  const servicePct = Math.max(0, Number(globalSettings.servicePercent) || 0);
  const discountPct = Math.max(0, Number(globalSettings.discountPercent) || 0);
  const discountNominal = Math.max(0, Number(globalSettings.discountNominal) || 0);
  const tipNominal = Math.max(0, Number(globalSettings.tipNominal) || 0);

  // 1. Calculate personal items subtotal per person
  const peopleData = people.map(p => {
    const items = p.items || [];
    const personalSubtotal = items.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.qty) || 1;
      return sum + (price * qty);
    }, 0);

    return {
      id: p.id,
      name: p.name || 'Teman',
      color: p.color || '#10b981',
      items: items,
      personalSubtotal: personalSubtotal,
      sharedSubtotal: 0,
      sharedItemsShare: []
    };
  });

  const peopleMap = new Map(peopleData.map(p => [p.id, p]));

  // 2. Distribute Shared Items
  sharedItems.forEach(item => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    const totalItemPrice = price * qty;
    if (totalItemPrice <= 0) return;

    let participants = item.splitWith || [];
    if (participants.length === 0) {
      participants = peopleData.map(p => p.id);
    }
    if (participants.length === 0) return;

    const sharePerPerson = totalItemPrice / participants.length;

    participants.forEach(pId => {
      const person = peopleMap.get(pId);
      if (person) {
        person.sharedSubtotal += sharePerPerson;
        person.sharedItemsShare.push({
          itemId: item.id,
          name: item.name || 'Menu Patungan',
          shareAmount: sharePerPerson,
          splitWithCount: participants.length
        });
      }
    });
  });

  // 3. Compute Gross Subtotal across all participants
  let subtotalAll = 0;
  peopleData.forEach(p => {
    subtotalAll += (p.personalSubtotal + p.sharedSubtotal);
  });

  // 4. Calculate Total Discounts (Percent + Nominal)
  const percentDiscountAmount = subtotalAll * (discountPct / 100);
  const totalDiscountAll = percentDiscountAmount + discountNominal;
  const netSubtotalAll = Math.max(0, subtotalAll - totalDiscountAll);

  // 5. Calculate Service Charge & Tax on Net Subtotal
  const serviceTotalAll = netSubtotalAll * (servicePct / 100);
  const taxTotalAll = (netSubtotalAll + serviceTotalAll) * (taxPct / 100);
  const grandTotalRaw = netSubtotalAll + serviceTotalAll + taxTotalAll + tipNominal;
  const grandTotal = Math.round(grandTotalRaw);

  // 6. Proportional allocation per person
  const totalPeopleCount = peopleData.length;
  const tipPerPerson = totalPeopleCount > 0 ? tipNominal / totalPeopleCount : 0;

  const peopleBreakdown = peopleData.map(p => {
    const rawSub = p.personalSubtotal + p.sharedSubtotal;
    const proportion = subtotalAll > 0 ? rawSub / subtotalAll : (1 / (totalPeopleCount || 1));
    
    const personDiscountShare = totalDiscountAll * proportion;
    const personNetSubtotal = Math.max(0, rawSub - personDiscountShare);
    
    const serviceShare = personNetSubtotal * (servicePct / 100);
    const taxShare = (personNetSubtotal + serviceShare) * (taxPct / 100);
    const personTotal = Math.round(personNetSubtotal + serviceShare + taxShare + tipPerPerson);

    const isPaid = !!paidStatus[p.id];

    return {
      ...p,
      subtotal: Math.round(rawSub),
      discountShare: Math.round(personDiscountShare),
      netSubtotal: Math.round(personNetSubtotal),
      serviceShare: Math.round(serviceShare),
      taxShare: Math.round(taxShare),
      tipShare: Math.round(tipPerPerson),
      total: personTotal,
      isPaid: isPaid
    };
  });

  // 7. Settlement Matrix ("Siapa Bayar ke Siapa")
  const activePayerId = payerId || (peopleBreakdown.length > 0 ? peopleBreakdown[0].id : null);
  const payerPerson = peopleBreakdown.find(p => p.id === activePayerId) || peopleBreakdown[0];

  const settlements = [];
  let collectedAmount = 0;
  let pendingAmount = 0;

  peopleBreakdown.forEach(p => {
    if (p.isPaid) {
      collectedAmount += p.total;
    } else {
      pendingAmount += p.total;
    }

    if (payerPerson && p.id !== payerPerson.id && p.total > 0) {
      settlements.push({
        fromId: p.id,
        fromName: p.name,
        fromColor: p.color,
        toId: payerPerson.id,
        toName: payerPerson.name,
        toColor: payerPerson.color,
        amount: p.total,
        isPaid: p.isPaid
      });
    }
  });

  return {
    peopleBreakdown,
    subtotalAll: Math.round(subtotalAll),
    totalDiscountAll: Math.round(totalDiscountAll),
    netSubtotalAll: Math.round(netSubtotalAll),
    serviceTotalAll: Math.round(serviceTotalAll),
    taxTotalAll: Math.round(taxTotalAll),
    tipNominal: Math.round(tipNominal),
    grandTotal,
    taxPct,
    servicePct,
    discountPct,
    discountNominal,
    payerId: activePayerId,
    payerPerson,
    settlements,
    collectedAmount: Math.round(collectedAmount),
    pendingAmount: Math.round(pendingAmount)
  };
}
