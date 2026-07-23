/**
 * Formats a numeric value into Indonesian Rupiah format (e.g. 50000 -> "Rp 50.000")
 * @param {number} amount 
 * @param {boolean} withSymbol 
 * @returns {string}
 */
export function formatRupiah(amount, withSymbol = true) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return withSymbol ? 'Rp 0' : '0';
  }
  
  const rounded = Math.round(amount);
  const formatted = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0
  }).format(rounded);

  return withSymbol ? `Rp ${formatted}` : formatted;
}

/**
 * Parses a string input into a clean numeric integer value.
 * @param {string|number} input 
 * @returns {number}
 */
export function parseRupiah(input) {
  if (typeof input === 'number') return isNaN(input) ? 0 : input;
  if (!input) return 0;
  
  const cleanStr = String(input).replace(/[^\d]/g, '');
  const val = parseInt(cleanStr, 10);
  return isNaN(val) ? 0 : val;
}

/**
 * Generates a WhatsApp breakdown text with settlement matrix & discounts.
 */
export function generateWhatsAppSummary({
  people = [],
  sharedItems = [],
  calculations = {},
  globalSettings = { taxPercent: 10, servicePercent: 5, discountPercent: 0, discountNominal: 0 },
  paymentInfo = { bankName: '', accountNumber: '', accountHolder: '', notes: '', qrisImage: '' },
  receiptTarget = 0
}) {
  const dateStr = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  let text = `🧾 *RINCIAN TAGIHAN FAIRSHARE* 🧾\n`;
  text += `📅 ${dateStr}\n`;
  text += `⚙️ Pajak (Tax): ${globalSettings.taxPercent}% | Service: ${globalSettings.servicePercent}%\n`;
  if (globalSettings.discountPercent > 0 || globalSettings.discountNominal > 0) {
    text += `🏷️ Diskon Resto: ${globalSettings.discountPercent ? globalSettings.discountPercent + '%' : ''} ${globalSettings.discountNominal ? formatRupiah(globalSettings.discountNominal) : ''}\n`;
  }
  text += `-----------------------------------\n\n`;

  if (calculations.peopleBreakdown && calculations.peopleBreakdown.length > 0) {
    calculations.peopleBreakdown.forEach((person) => {
      const statusBadge = person.isPaid ? '✅ [LUNAS]' : '⏳ [BELUM BAYAR]';
      text += `👤 *${person.name.toUpperCase()}* ${statusBadge}\n`;

      // Personal Items
      if (person.items && person.items.length > 0) {
        person.items.forEach(item => {
          if (item.name || item.price > 0) {
            const itemSub = (item.price || 0) * (item.qty || 1);
            text += `  • ${item.name || 'Pesanan'} (${item.qty || 1}x) : ${formatRupiah(itemSub)}\n`;
          }
        });
      }

      // Shared Items share
      if (person.sharedItemsShare && person.sharedItemsShare.length > 0) {
        person.sharedItemsShare.forEach(sh => {
          text += `  • 🤝 ${sh.name} (${sh.splitWithCount} org) : ${formatRupiah(sh.shareAmount)}\n`;
        });
      }

      if ((!person.items || person.items.length === 0) && (!person.sharedItemsShare || person.sharedItemsShare.length === 0)) {
        text += `  • (Tidak ada pesanan)\n`;
      }

      text += `  ▫️ Subtotal: ${formatRupiah(person.subtotal)}\n`;
      if (person.discountShare > 0) text += `  ▫️ Diskon Resto: -${formatRupiah(person.discountShare)}\n`;
      if (person.serviceShare > 0) text += `  ▫️ Service (${globalSettings.servicePercent}%): ${formatRupiah(person.serviceShare)}\n`;
      if (person.taxShare > 0) text += `  ▫️ Pajak PB1 (${globalSettings.taxPercent}%): ${formatRupiah(person.taxShare)}\n`;
      if (person.tipShare > 0) text += `  ▫️ Tip Sukarela: ${formatRupiah(person.tipShare)}\n`;
      text += `  👉 *TOTAL BAYAR: ${formatRupiah(person.total)}*\n\n`;
    });
  }

  // Settlement Matrix ("Siapa Bayar ke Siapa")
  if (calculations.payerPerson && calculations.settlements && calculations.settlements.length > 0) {
    text += `-----------------------------------\n`;
    text += `💳 *PETUNJUK TRANSFER / PELUNASAN*\n`;
    text += `Struk ditalangi oleh: *${calculations.payerPerson.name}*\n\n`;
    
    calculations.settlements.forEach(st => {
      const mark = st.isPaid ? '✅ Lunas' : '💸 Wajib TF';
      text += `• ${st.fromName} ➔ TF *${formatRupiah(st.amount)}* ke *${st.toName}* (${mark})\n`;
    });
    text += `\n`;
  }

  text += `-----------------------------------\n`;
  text += `💵 *RINGKASAN KASIR*\n`;
  text += `• Subtotal Menu  : ${formatRupiah(calculations.subtotalAll || 0)}\n`;
  if (calculations.totalDiscountAll > 0) text += `• Total Diskon   : -${formatRupiah(calculations.totalDiscountAll)}\n`;
  text += `• Service Charge : ${formatRupiah(calculations.serviceTotalAll || 0)}\n`;
  text += `• Pajak PB1      : ${formatRupiah(calculations.taxTotalAll || 0)}\n`;
  if (calculations.tipNominal > 0) text += `• Total Tip      : ${formatRupiah(calculations.tipNominal)}\n`;
  text += `🎯 *GRAND TOTAL*   : *${formatRupiah(calculations.grandTotal || 0)}*\n`;

  if (paymentInfo.bankName || paymentInfo.accountNumber || paymentInfo.accountHolder || paymentInfo.qrisImage) {
    text += `\n💳 *INFO REKENING PENAMPUNG*\n`;
    if (paymentInfo.bankName) text += `Bank/E-Wallet: *${paymentInfo.bankName}*\n`;
    if (paymentInfo.accountNumber) text += `No. Rekening/HP: *${paymentInfo.accountNumber}*\n`;
    if (paymentInfo.accountHolder) text += `Atas Nama: *${paymentInfo.accountHolder}*\n`;
    if (paymentInfo.qrisImage) text += `📲 *QRIS Tersedia* (Minta gambar QRIS ke pengirim tagihan!)\n`;
    if (paymentInfo.notes) text += `Catatan: ${paymentInfo.notes}\n`;
  }

  text += `\n_Dihitung presisi tanpa drama oleh FairShare_ ⚡`;

  return text;
}
