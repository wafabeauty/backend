/**
 * Wafa Beauty – Google Apps Script Webhook
 * وفاء للجمال – ويب هوك جوجل شيتس
 *
 * Instructions / التعليمات:
 * 1. Open Google Sheets → Extensions → Apps Script
 * 2. Paste this entire file
 * 3. Deploy → New Deployment → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL into backend/.env → WEBHOOK_SHEET_URL
 */

const SHEET_NAME = "Orders";
const HEADERS = [
  "رقم الطلب",        // Order ID
  "التاريخ",           // Date
  "الاسم الكامل",      // Full Name
  "رقم الجوال",        // Phone
  "المنتجات",          // Items
  "الإجمالي (ريال)",   // Total SAR
  "عرض إضافي",        // Accepted Upsell
  "IP العميل",         // Client IP
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Get or create the sheet
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      // Style header row
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setBackground("#1B3A6B");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      headerRange.setHorizontalAlignment("center");
    }

    // Format date in KSA timezone (UTC+3)
    const now = new Date();
    const ksaTime = new Date(now.getTime() + (3 * 60 * 60 * 1000));
    const dateStr = Utilities.formatDate(ksaTime, "UTC", "yyyy-MM-dd HH:mm:ss");

    const row = [
      data.orderId || "",
      dateStr,
      data.fullName || "",
      data.phone || "",
      data.items || "",
      data.totalAmount || 0,
      data.acceptedUpsell ? "نعم ✓" : "لا",
      data.clientIp || "",
    ];

    sheet.appendRow(row);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, HEADERS.length);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, orderId: data.orderId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error("Webhook error:", err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// For testing via GET
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "Wafa Beauty Webhook Active ✓" }))
    .setMimeType(ContentService.MimeType.JSON);
}
