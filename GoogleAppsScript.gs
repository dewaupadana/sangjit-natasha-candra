function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const name = cleanCell(data.name);
    const attendance = data.attendance;
    const guests = Number(data.guests);
    const message = cleanCell(data.message || "");

    if (!name || name.length > 100) throw new Error("Nama tidak valid.");
    if (attendance !== "Hadir" && attendance !== "Tidak hadir") {
      throw new Error("Pilihan kehadiran tidak valid.");
    }
    if (!Number.isInteger(guests) || guests < 1 || guests > 4) {
      throw new Error("Jumlah tamu yang hadir harus antara 1 sampai 4 orang.");
    }
    if (message.length > 500) throw new Error("Pesan terlalu panjang.");

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Waktu konfirmasi", "Nama", "Kehadiran", "Jumlah tamu", "Pesan"]);
      } else {
        const headers = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 4)).getValues()[0];
        if (headers[0] === "Waktu konfirmasi" && headers[1] === "Nama" &&
          headers[2] === "Kehadiran" && headers[3] === "Pesan") {
          sheet.insertColumnBefore(4);
          sheet.getRange(1, 4).setValue("Jumlah tamu");
        }
      }
      sheet.appendRow([new Date(), name, attendance, guests, message]);
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
