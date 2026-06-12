// 1. Go to Google Sheets -> Extensions -> Apps Script
// 2. Paste this code
// 3. Click Deploy -> New Deployment -> Type: Web App -> Anyone has access

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Extract data
    const orderId = data.order_id || Utilities.getUuid();
    const date = new Date().toISOString();
    const name = data.name || "";
    const phone = data.phone || "";
    const products = data.products ? JSON.stringify(data.products) : "";
    const upsellAccepted = data.upsell_accepted ? "Yes" : "No";
    const totalValue = data.total_value || 0;
    
    // Append to sheet
    sheet.appendRow([
      orderId,
      date,
      name,
      phone,
      products,
      upsellAccepted,
      totalValue,
      "New" // Default Status
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.message })).setMimeType(ContentService.MimeType.JSON);
  }
}
