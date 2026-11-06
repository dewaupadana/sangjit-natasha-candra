function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const name = cleanCell(data.name);
    const attendance = data.attendance;
    const message = cleanCell(data.message || "");

    if (!name || name.length > 100) throw new Error("Nama tidak valid.");
    if (attendance !== "Hadir" && attendance !== "Tidak hadir") {
      throw new Error("Pilihan kehadiran tidak valid.");
    }
    if (message.length > 500) throw new Error("Pesan terlalu panjang.");

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Waktu konfirmasi", "Nama", "Kehadiran", "Pesan"]);
      }
      sheet.appendRow([new Date(), name, attendance, message]);
    } finally {
      lock.releaseLock();
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function cleanCell(value) {
  const text = String(value).trim();
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}
