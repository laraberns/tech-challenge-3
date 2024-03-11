// Route file
import express from 'express';
import {addRowToGoogleSheet } from '../models/GoogleAPIConnect.js';

const router = express.Router();

router.post('/addRow', async (req, res) => {
  try {
    const rowData = req.body; // Assuming the request body contains the data for the new row
    const result = await addRowToGoogleSheet(rowData);

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }
    return res.status(201).json({ message: result.message });
  } catch (error) {
    console.error('Error in /addRow route:', error.message);
    return res.status(500).json({ error: 'Internal server error. Check the console for details.' });
  }
});

export { router as GoogleRouter };
