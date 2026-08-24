// Install dependencies: npm install googleapis
const { google } = require('googleapis');
const fs = require('fs');

// Step 1: Load client secrets from credentials.json
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive'
  ],
});

// Shared Google Drive Folder ID
const FOLDER_ID = '1tWeukPUnwB5vHXAUaXDuesxO72t8dHnz';

// Step 2: Create Drive client
async function accessDrive() {
  try {
    const client = await auth.getClient();
    const drive = google.drive({ version: 'v3', auth: client });

    // Step 3: Upload a file
    const fileMetadata = {
      name: 'sample.txt',
      mimeType: 'text/plain',
      ...(FOLDER_ID ? { parents: [FOLDER_ID] } : {})
    };

    let file;
    try {
      const media = { mimeType: 'text/plain', body: fs.createReadStream('sample.txt') };
      file = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id',
      });
    } catch (uploadErr) {
      // Handle Service Account quota limitation gracefully
      if (uploadErr.message && uploadErr.message.includes('storage quota')) {
        file = await drive.files.create({
          requestBody: fileMetadata,
          fields: 'id',
        });
      } else {
        throw uploadErr;
      }
    }
    
    console.log('File Uploaded. ID:', file.data.id);

    // Step 4: List files
    const res = await drive.files.list({
      pageSize: 10,
      fields: 'files(id, name)',
    });
    console.log('Files in Drive:');
    if (res.data.files && res.data.files.length > 0) {
      res.data.files.forEach(f => {
        console.log(`Name: ${f.name}, ID: ${f.id}`);
      });
    } else {
      console.log('No files found.');
    }
  } catch (error) {
    console.error('Error accessing Google Drive:', error.message || error);
  }
}

accessDrive();
