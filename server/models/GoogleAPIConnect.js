// GoogleAPIConnect.js
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import fs from 'fs';

const credentials = JSON.parse(fs.readFileSync('tech-challenge-402603-667ae314a7a0.JSON', 'utf8'));

const serviceAccountAuth = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});

export const connectToGoogleAPI = async () => {
  try {
    const doc = new GoogleSpreadsheet('1smmvhp18reaoDIn9QqJxjKpXJX32ublV3LQbeOylutk', serviceAccountAuth);

    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
    console.log(sheet.title);
    console.log(sheet.rowCount);

    return { success: true, message: 'Connected to Google Sheets.' };
  } catch (error) {
    console.error('Error connecting to Google Sheets:', error.message);
    return { success: false, error: 'Error connecting to Google Sheets. Check the console for details.' };
  }
};

export const addRowToGoogleSheet = async (rowData) => {
  try {
    const doc = new GoogleSpreadsheet('1smmvhp18reaoDIn9QqJxjKpXJX32ublV3LQbeOylutk', serviceAccountAuth);

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    // Add a new row with the provided data
    await sheet.addRow(rowData);

    return { success: true, message: 'Row added successfully.' };
  } catch (error) {
    console.error('Error adding row to Google Sheets:', error.message);
    return { success: false, error: 'Error adding row to Google Sheets. Check the console for details.' };
  }
};
