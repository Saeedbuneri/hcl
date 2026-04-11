const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./db/sqlite');
const firebaseSync = require('./services/firebase_sync');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, '../renderer/pages/login.html'));
    
}

app.whenReady().then(() => {
  try {
    db.init(); 
    firebaseSync.startSyncInterval();
  } catch (e) {
    console.log("Database or sync init error:", e.message); // Handle before install
  }
  
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('login', async (event, credentials) => {
    if(credentials.username === 'admin' && credentials.password === 'admin123') {
        return { success: true, role: 'admin' };
    }
    return { success: false, message: 'Invalid credentials.' };
});

ipcMain.handle('getTests', async () => { return db.getTests(); });
ipcMain.handle('addTest', async (event, name, price, parameters, category) => { return db.addTest(name, price, parameters, category); });
ipcMain.handle('updateTest', async (event, id, name, price, parameters, category) => { return db.updateTest(id, name, price, parameters, category); });
ipcMain.handle('saveBooking', async (event, patient, tests, total, discount) => { return db.saveBooking(patient, tests, total, discount); });
ipcMain.handle('getPatientByPhone', async (ev, phone) => { return db.getPatientByPhone(phone); });
  ipcMain.handle('getPatientHistory', async (event, term) => { return db.getPatientHistory(term); });
ipcMain.handle('getPendingBookings', async () => { return db.getPendingBookings(); });
ipcMain.handle('getBookingReport', async (event, id) => { return db.getBookingReport(id); });
ipcMain.handle('getAnalyticsData', async (event, filter) => { return db.getAnalyticsData(filter); });
ipcMain.handle('completeResult', async (event, id, test_id, data) => { return db.completeResult(id, test_id, data); });
ipcMain.handle('savePdf', async (event, filename, folderName = 'HCL_Reports') => {
    try {
        const win = BrowserWindow.fromWebContents(event.sender);
        const data = await win.webContents.printToPDF({});
        const fs = require('fs');
        const path = require('path');
        const dir = path.join(require('os').homedir(), 'Desktop', folderName);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        const filepath = path.join(dir, filename + '.pdf');
        fs.writeFileSync(filepath, data);
        return { success: true, filepath };
    } catch(e) {
        console.error(e);
        return { success: false };
    }
});






ipcMain.on('open-print-window', (event, params) => {
  const printWin = new BrowserWindow({
    width: 800,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  printWin.setMenu(null);
  printWin.loadFile(path.join(__dirname, '../renderer/pages/print_report.html'), { search: params });
});


ipcMain.on('open-receipt-window', (event, params) => {
  const receiptWin = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  receiptWin.setMenu(null);
  receiptWin.loadFile(path.join(__dirname, '../renderer/pages/print_receipt.html'), { search: params });
});

ipcMain.handle('getManualSyncDetails', async (event, patientId) => {
  return await firebaseSync.fetchManualSyncDetails(patientId);
});

ipcMain.handle('updateManualSyncDetails', async (event, patientId, updates) => {
  return await firebaseSync.updateManualSyncDetails(patientId, updates);
});

ipcMain.handle('deleteBooking', async (event, id) => {
  return await db.deleteBooking(id);
});

ipcMain.handle('revertBooking', async (event, id) => {
  return await db.revertBooking(id);
});

ipcMain.handle('forceFullSync', async () => {
  return await firebaseSync.forceFullSync();
});
