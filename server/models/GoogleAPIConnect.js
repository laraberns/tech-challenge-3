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
