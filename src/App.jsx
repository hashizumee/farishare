import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import StickyReceiptBar from './components/StickyReceiptBar';
import PaymentModal from './components/PaymentModal';
import ExportModal from './components/ExportModal';
import SpinWheelModal from './components/SpinWheelModal';

import LandingPage from './pages/LandingPage';
import CalculatorPage from './pages/CalculatorPage';
import SettlementPage from './pages/SettlementPage';
import HistoryPage from './pages/HistoryPage';
import PaymentProfilePage from './pages/PaymentProfilePage';

import {
  loadActiveState,
  saveActiveState,
  clearActiveState,
  loadBillHistory,
  saveBillToHistory,
  deleteBillFromHistory,
  DEFAULT_BILL_STATE
} from './utils/storage';
import { calculateBill } from './utils/calculator';
import { decodeUrlToState } from './utils/urlSharer';

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    const fromUrl = decodeUrlToState();
    return fromUrl ? 'calculator' : 'landing';
  });

  const [appState, setAppState] = useState(() => {
    const fromUrl = decodeUrlToState();
    if (fromUrl) return fromUrl;
    return {
      ...DEFAULT_BILL_STATE,
      people: [
        {
          id: 'p1',
          name: 'Teman 1',
          color: '#10b981',
          items: [{ id: 'i1', name: '', price: 0, qty: 1 }]
        }
      ],
      sharedItems: [],
      receiptTarget: 0,
      paidStatus: {}
    };
  });

  const [historyList, setHistoryList] = useState(() => loadBillHistory());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isWheelModalOpen, setIsWheelModalOpen] = useState(false);
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  // Auto-save active state to localStorage on state changes
  useEffect(() => {
    saveActiveState(appState);
    setIsSavedNotice(true);
    const timer = setTimeout(() => setIsSavedNotice(false), 2000);
    return () => clearTimeout(timer);
  }, [appState]);

  // Recalculate bill in real-time
  const calculations = useMemo(() => {
    return calculateBill({
      people: appState.people,
      sharedItems: appState.sharedItems,
      globalSettings: appState.globalSettings,
      payerId: appState.payerId,
      paidStatus: appState.paidStatus || {}
    });
  }, [appState.people, appState.sharedItems, appState.globalSettings, appState.payerId, appState.paidStatus]);

  // State handlers
  const handleGlobalSettingsChange = (newSettings) => {
    setAppState(prev => ({ ...prev, globalSettings: newSettings }));
  };

  const handleUpdatePeople = (newPeople) => {
    setAppState(prev => ({ ...prev, people: newPeople }));
  };

  const handleUpdateSharedItems = (newShared) => {
    setAppState(prev => ({ ...prev, sharedItems: newShared }));
  };

  const handleReceiptTargetChange = (targetVal) => {
    setAppState(prev => ({ ...prev, receiptTarget: targetVal }));
  };

  const handlePayerChange = (newPayerId) => {
    setAppState(prev => ({ ...prev, payerId: newPayerId }));
  };

  const handleTogglePaidStatus = (personId) => {
    setAppState(prev => {
      const current = { ...(prev.paidStatus || {}) };
      current[personId] = !current[personId];
      return { ...prev, paidStatus: current };
    });
  };

  const handleSavePaymentInfo = (newInfo) => {
    setAppState(prev => ({ ...prev, paymentInfo: newInfo }));
  };

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin me-reset seluruh data struk ini?')) {
      clearActiveState();
      setAppState({
        ...DEFAULT_BILL_STATE,
        people: [],
        sharedItems: [],
        receiptTarget: 0,
        paidStatus: {}
      });
    }
  };

  // History handlers
  const handleSaveCurrentBill = (customTitle) => {
    const updated = saveBillToHistory(appState, customTitle, calculations.grandTotal);
    setHistoryList(updated);
  };

  const handleLoadBill = (historyItem) => {
    if (historyItem && historyItem.stateData) {
      setAppState(historyItem.stateData);
      setActiveTab('calculator');
    }
  };

  const handleDeleteBill = (historyId) => {
    const updated = deleteBillFromHistory(historyId);
    setHistoryList(updated);
  };

  const pendingPeopleCount = (calculations.settlements || []).filter(s => !s.isPaid).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Header with 3-Dots Menu Trigger */}
      <Header
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onReset={handleReset}
        isSaved={isSavedNotice}
        onOpenWheel={() => setIsWheelModalOpen(true)}
        onGoHome={() => setActiveTab('landing')}
      />

      {/* Slide-over Drawer Sidebar (Opened via 3-dots button) */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        pendingCount={pendingPeopleCount}
        historyCount={historyList.length}
        onOpenWheel={() => setIsWheelModalOpen(true)}
        onReset={handleReset}
        isSaved={isSavedNotice}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area (Full width) */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 sm:px-6">
        
        {activeTab === 'landing' && (
          <LandingPage
            onGoToCalculator={() => setActiveTab('calculator')}
            onOpenWheel={() => setIsWheelModalOpen(true)}
          />
        )}

        {activeTab === 'calculator' && (
          <CalculatorPage
            appState={appState}
            calculations={calculations}
            onGlobalSettingsChange={handleGlobalSettingsChange}
            onUpdatePeople={handleUpdatePeople}
            onUpdateSharedItems={handleUpdateSharedItems}
          />
        )}

        {activeTab === 'settlement' && (
          <SettlementPage
            appState={appState}
            calculations={calculations}
            onPayerChange={handlePayerChange}
            onTogglePaidStatus={handleTogglePaidStatus}
            onOpenExportModal={() => setIsExportModalOpen(true)}
          />
        )}

        {activeTab === 'history' && (
          <HistoryPage
            historyList={historyList}
            onSaveCurrentBill={handleSaveCurrentBill}
            onLoadBill={handleLoadBill}
            onDeleteBill={handleDeleteBill}
            currentGrandTotal={calculations.grandTotal}
          />
        )}

        {activeTab === 'payment' && (
          <PaymentProfilePage
            paymentInfo={appState.paymentInfo}
            onSavePaymentInfo={handleSavePaymentInfo}
          />
        )}

      </main>

      {/* Bottom Sticky Receipt Bar */}
      <StickyReceiptBar
        calculatedTotal={calculations.grandTotal}
        receiptTarget={appState.receiptTarget}
        onReceiptTargetChange={handleReceiptTargetChange}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
      />

      {/* Payment Info Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        paymentInfo={appState.paymentInfo}
        onSave={handleSavePaymentInfo}
      />

      {/* Export WhatsApp Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        people={appState.people}
        sharedItems={appState.sharedItems}
        calculations={calculations}
        globalSettings={appState.globalSettings}
        paymentInfo={appState.paymentInfo}
        receiptTarget={appState.receiptTarget}
      />

      {/* Spin Wheel Traktiran Modal */}
      <SpinWheelModal
        isOpen={isWheelModalOpen}
        onClose={() => setIsWheelModalOpen(false)}
        people={appState.people}
      />

    </div>
  );
}
