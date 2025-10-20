function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
  if (!sheet) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: "Data sheet not found" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  const [headers, ...rows] = sheet.getDataRange().getValues();
  const normalizedHeaders = headers.map(h => h.toLowerCase().trim());

  const memories = rows.map(row => {
    const memory = {};
    normalizedHeaders.forEach((header, index) => {
      if (header === "images") {
        // Convert comma-separated string to array
        memory[header] = typeof row[index] === "string" 
          ? row[index].split(",").map(url => url.trim()).filter(Boolean)
          : [];
      } else {
        memory[header] = row[index] || "";
      }
    });
    return memory;
  }).filter(memory => memory.title); // Remove empty rows

  return ContentService.createTextOutput(JSON.stringify(memories))
    .setMimeType(ContentService.MimeType.JSON);
}