import React from 'react';
import GlobalSettings from '../components/GlobalSettings';
import PeopleManager from '../components/PeopleManager';
import SharedItems from '../components/SharedItems';
import ReceiptSummary from '../components/ReceiptSummary';

export default function CalculatorPage({
  appState,
  calculations,
  onGlobalSettingsChange,
  onUpdatePeople,
  onUpdateSharedItems
}) {
  return (
    <div className="space-y-6 pb-20">
      
      {/* Global Settings (Tax, Service, Discount, Tip) */}
      <GlobalSettings
        settings={appState.globalSettings}
        onChange={onGlobalSettingsChange}
      />

      {/* People & Items Manager */}
      <PeopleManager
        people={appState.people}
        onUpdatePeople={onUpdatePeople}
        calculations={calculations}
      />

      {/* Shared Dishes Section */}
      <SharedItems
        sharedItems={appState.sharedItems}
        people={appState.people}
        onUpdateSharedItems={onUpdateSharedItems}
      />

      {/* Itemized Breakdown Per Person */}
      <ReceiptSummary
        calculations={calculations}
        globalSettings={appState.globalSettings}
      />

    </div>
  );
}
