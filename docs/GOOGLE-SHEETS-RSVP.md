# Panduan RSVP → Google Spreadsheet (Apps Script)

Spreadsheet tujuan:
https://docs.google.com/spreadsheets/d/16Cxr44HciXQrTOOQ3hqk9IIHvEiW1JZho3rGz332eZU/edit

## 1. Siapkan sheet

Buka spreadsheet, rename tab pertama menjadi **RSVP**. Baris header dibuat otomatis oleh script.

## 2. Buat Apps Script

Menu **Extensions → Apps Script**, hapus isi `Code.gs`, tempel kode berikut:

```javascript
const SHEET_ID = '16Cxr44HciXQrTOOQ3hqk9IIHvEiW1JZho3rGz332eZU';
const SHEET_NAME = 'RSVP';

function getSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['id', 'createdAt', 'name', 'attendance', 'guests', 'message']);
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues().slice(1);
  const entries = rows
    .filter(function (r) { return r[0]; })
    .map(function (r) {
      return {
        id: String(r[0]),
        createdAt: r[1] instanceof Date ? r[1].toISOString() : String(r[1]),
        name: String(r[2]),
        attendance: String(r[3]),
        guests: Number(r[4]) || 0,
        message: String(r[5]),
      };
    })
    .reverse();
  return json({ entries: entries });
}

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    getSheet().appendRow([
      d.id || Utilities.getUuid(),
      d.createdAt || new Date().toISOString(),
      d.name || '',
      d.attendance || '',
      Number(d.guests) || 0,
      d.message || '',
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}
```

## 3. Deploy

1. **Deploy → New deployment → Type: Web app**
2. Description: `RSVP API`
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Deploy → izinkan akses (Advanced → Go to project → Allow)
6. Salin **Web app URL** (berakhiran `/exec`)

## 4. Pasang di website

Buka `src/data/weddingConfig.ts` dan isi:

```ts
integrations: {
  sheetsWebAppUrl: "https://script.google.com/macros/s/XXXXXXXX/exec",
},
```

Selesai — semua RSVP & ucapan langsung masuk ke spreadsheet, dan daftar ucapan
di website dibaca dari spreadsheet yang sama. Jika field ini dikosongkan,
website otomatis kembali memakai penyimpanan lokal browser.

> Setiap kali kode Apps Script diubah, lakukan **Deploy → Manage deployments →
> Edit → New version** agar perubahan aktif di URL yang sama.
