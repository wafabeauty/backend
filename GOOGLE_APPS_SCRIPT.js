/**
 * Wafa Beauty — Google Apps Script
 *
 * HOW TO SET UP:
 * 1. Open your Google Sheet: "ORDERS WAFA STORE"
 * 2. Click Extensions → Apps Script
 * 3. Delete everything in the editor and paste this entire file
 * 4. Click Save (disk icon)
 * 5. Click Deploy → New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Click Deploy → copy the Web app URL
 * 7. Paste that URL into your backend .env as: WEBHOOK_SHEET_URL=<your url>
 * 8. (Optional) Set SHEETS_WEBHOOK_SECRET in .env and uncomment the secret check below
 */

// Optional: set this to the same value as SHEETS_WEBHOOK_SECRET in your backend .env
var WEBHOOK_SECRET = ""; // e.g. "my-secret-key"

// Column order — must match your sheet header row exactly
var COLUMNS = ["DATE", "ORDER ID", "ADRESS", "NAME", "PHONE", "PRODUCT", "SKU", "QUANTITY", "TOTAL PRICE", "CURRENCY", "STATUS"];

function doPost(e) {
  try {
    // Optional secret verification
    if (WEBHOOK_SECRET) {
      var secret = e.parameter.secret || (e.postData && JSON.parse(e.postData.contents || "{}").secret);
      // Note: Apps Script doesn't expose request headers, so the secret is checked
      // via a query param. Add ?secret=YOUR_SECRET to your WEBHOOK_SHEET_URL in .env
      if (secret !== WEBHOOK_SECRET) {
        return ContentService.createTextOutput(JSON.stringify({ error: "Unauthorized" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Build the row in the exact column order of the sheet
    var row = [
      data.date        || new Date().toLocaleString("en-SA", { timeZone: "Asia/Riyadh" }),
      data.orderId     || "",
      data.address     || "—",
      data.name        || "",
      data.phone       || "",
      data.product     || "—",
      data.sku         || "—",
      data.quantity    || 0,
      data.totalPrice  || 0,
      data.currency    || "SAR",
      data.status      || "جديد",
    ];

    sheet.appendRow(row);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, COLUMNS.length);

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log("Error: " + err.toString());
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test this manually from the editor: Run → doGet to verify the script works
function doGet(e) {
  return ContentService.createTextOutput("Wafa Beauty webhook is live.")
    .setMimeType(ContentService.MimeType.TEXT);
}
