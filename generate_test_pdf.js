const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

app.setPath('userData', path.join(require('os').homedir(), 'AppData', 'Roaming', 'hcl-lab-management'));
const db = require('./src/main/db/sqlite');

app.whenReady().then(async () => {
    await db.init();

    // Get any completed booking
    const bookings = await db.getPatientHistory("");
    let bookingId = null;
    if (bookings && bookings.length > 0) {
        bookingId = bookings[0].id;
    }

    if (!bookingId) {
        // If none exists, grab any booking
        const sq = require('sqlite3').verbose();
        const sqdb = new sq.Database(path.join(require('os').homedir(), 'AppData', 'Roaming', 'hcl-lab-management', 'hcl_local.sqlite'));
        const rows = await new Promise(r => sqdb.all('SELECT id FROM bookings LIMIT 1', (e, rows) => r(rows)));
        if (rows && rows.length > 0) bookingId = rows[0].id;
    }

    if (!bookingId) {
        console.log("Cannot generate PDF: No bookings found in local SQLite database.");
        app.quit();
        return;
    }

    console.log("Generating report for booking ID:", bookingId);

    ipcMain.handle('getBookingReport', async (event, id) => {
        return await db.getBookingReport(id);
    });

    const win = new BrowserWindow({
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'src/main/preload.js'),
            contextIsolation: true
        }
    });

    win.loadFile(path.join(__dirname, 'src/renderer/pages/print_report.html'), { search: 'db_id=' + bookingId });

    win.webContents.on('did-finish-load', () => {
        // wait for data to render
        setTimeout(async () => {
            try {
                const data = await win.webContents.printToPDF({
                    printBackground: true
                });
                const filepath = path.join(__dirname, 'test_report.pdf');
                fs.writeFileSync(filepath, data);
                console.log('Success! Test PDF saved at:', filepath);
            } catch (err) {
                console.error('Failed to generate PDF:', err);
            }
            app.quit();
        }, 1500);
    });
});
