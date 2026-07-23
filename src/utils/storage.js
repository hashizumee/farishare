/**
 * Storage utility for local persistence and bill history archives
 */

const STORAGE_KEY_ACTIVE = 'fairshare_active_bill_v2';
const STORAGE_KEY_HISTORY = 'fairshare_bill_history_v2';

export const DEFAULT_BILL_STATE = {
  title: 'Struk Makan Bersama',
  globalSettings: {
    taxPercent: 10,
    servicePercent: 5,
    discountPercent: 0,
    discountNominal: 0,
    tipNominal: 0
  },
  receiptTarget: 0,
  payerId: 'p1',
  paidStatus: {},
  people: [
    {
      id: 'p1',
      name: 'Andi',
      color: '#10b981', // Emerald
      items: [
        { id: 'i1', name: 'Nasi Goreng Special', price: 35000, qty: 1 },
        { id: 'i2', name: 'Es Teh Manis', price: 8000, qty: 1 }
      ]
    },
    {
      id: 'p2',
      name: 'Budi',
      color: '#6366f1', // Indigo
      items: [
        { id: 'i3', name: 'Sate Ayam Madura', price: 45000, qty: 1 },
        { id: 'i4', name: 'Jus Alpukat', price: 18000, qty: 1 }
      ]
    },
    {
      id: 'p3',
      name: 'Siti',
      color: '#f43f5e', // Rose
      items: [
        { id: 'i5', name: 'Sirloin Steak', price: 75000, qty: 1 },
        { id: 'i6', name: 'Lemon Tea', price: 12000, qty: 1 }
      ]
    }
  ],
  sharedItems: [
    {
      id: 's1',
      name: 'Meat Lover Pizza Large',
      price: 120000,
      qty: 1,
      splitWith: []
    }
  ],
  paymentInfo: {
    bankName: 'BCA',
    accountNumber: '123-456-7890',
    accountHolder: 'Andi FairShare',
    notes: 'Mohon sertakan bukti TF ya guys!'
  }
};

export function loadActiveState() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_ACTIVE);
    if (!data) return DEFAULT_BILL_STATE;
    const parsed = JSON.parse(data);
    return {
      ...DEFAULT_BILL_STATE,
      ...parsed,
      globalSettings: { ...DEFAULT_BILL_STATE.globalSettings, ...parsed.globalSettings },
      paymentInfo: { ...DEFAULT_BILL_STATE.paymentInfo, ...parsed.paymentInfo }
    };
  } catch (err) {
    console.error('Error loading active bill:', err);
    return DEFAULT_BILL_STATE;
  }
}

export function saveActiveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY_ACTIVE, JSON.stringify(state));
  } catch (err) {
    console.error('Error saving active bill:', err);
  }
}

export function clearActiveState() {
  try {
    localStorage.removeItem(STORAGE_KEY_ACTIVE);
  } catch (err) {
    console.error('Error clearing active bill:', err);
  }
}

// --- Bill History Management ---

export function loadBillHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading bill history:', err);
    return [];
  }
}

export function saveBillToHistory(billState, customTitle, grandTotal) {
  try {
    const history = loadBillHistory();
    const newEntry = {
      id: 'hist_' + Date.now(),
      title: customTitle || billState.title || 'Struk Makan Bersama',
      createdAt: new Date().toISOString(),
      peopleCount: (billState.people || []).length,
      grandTotal: grandTotal || 0,
      stateData: JSON.parse(JSON.stringify(billState))
    };
    const updated = [newEntry, ...history];
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving to bill history:', err);
    return [];
  }
}

export function deleteBillFromHistory(historyId) {
  try {
    const history = loadBillHistory();
    const updated = history.filter(item => item.id !== historyId);
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting bill history:', err);
    return [];
  }
}
