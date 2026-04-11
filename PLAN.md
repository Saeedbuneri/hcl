# Healthcare Clinical Laboratory (HCL) - Local Manager Plan

## Core Architecture
This app operates on an **Offline-First Storage Model**. 
- **Electron.js**: Wraps the web tech into a .exe.
- **SQLite (Local):** Master local database. Operates 24/7 without internet. Stores all patients, tests, prices, and past results.
- **Firebase (Cloud):** Sync backup and Patient Portal backend.

### Project Structure (Modular)
```text
hcl-app/
├── package.json         (Dependencies, script configs)
├── src/
│   ├── main/            (Electron Backend - Hidden from user)
│   │   ├── main.js      (Starts the app window)
│   │   ├── db/
│   │   │   ├── sqlite.js(Local Database setup & queries)
│   │   ├── services/
│   │   │   ├── sync.js  (Listens for internet, pushes to Firebase)
│   │   │   ├── print.js (Directly sends PDFs to thermal/A4 printer)
│   ├── renderer/        (UI Frontend - What the user sees)
│   │   ├── pages/
│   │   │   ├── login.html
│   │   │   ├── dashboard.html
│   │   │   ├── new_booking.html
│   │   │   ├── pending_results.html
│   │   │   ├── test_manager.html
│   │   ├── assets/      (CSS, JS, Images, Logos)
│   ├── shared/
│   │   ├── config.js    (Firebase credentials, constants)
```

## Security & Sync Features
1. **Patient ID Generator:** `HCL` + `AutoIncrement` (e.g., `HCL1052`).
2. **Patient Pin:** `Math.floor(1000 + Math.random() * 9000)` sets a permanent 4-digit PIN for each test.
3. **Firebase Cloud Sync:** 
   Only tests marked `synced: false` and `status: completed` will automatically upload to Firebase. This secures patient privacy so incomplete drafts aren't exposed.

## The Modules Breakdown
- **Login Module**: Admin or Staff authentication checks.
- **Booking Module**: Enter patient -> Select Tests -> Auto-generate receipt -> Save ID & PIN -> Print immediately.
- **Data Entry Module**: Displays 'Pending' queue. Click -> Expand parameters -> Enter values -> Highlight red if out of Normal Range -> Complete.
- **Test Manager Module**: Admin screen. Modifies the SQLite `tests_catalog` table (name, cost, parameters, units, normal ranges).
- **Sync/Print Module**: Generates pixel-perfect DOM, triggers `win.webContents.print()`, then flags `sync.js` to upload that exact test JSON to Firebase.

## Firebase Config Injection
*Pulled from the live reports site*
Project ID: `healthcare-33ed4`
Messaging ID: `1010321513051`