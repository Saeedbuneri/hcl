const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'api', {
      login: (credentials) => ipcRenderer.invoke('login', credentials),
      getTests: () => ipcRenderer.invoke('getTests'),
      addTest: (name, price, parameters, category) => ipcRenderer.invoke('addTest', name, price, parameters, category),
      updateTest: (id, name, price, parameters, category) => ipcRenderer.invoke('updateTest', id, name, price, parameters, category),
      saveBooking: (patient, tests, total, discount) => ipcRenderer.invoke('saveBooking', patient, tests, total, discount),
      getPatientByPhone: (phone) => ipcRenderer.invoke('getPatientByPhone', phone),
      getPatientHistory: (searchTerm) => ipcRenderer.invoke('getPatientHistory', searchTerm),
      getPendingBookings: () => ipcRenderer.invoke('getPendingBookings'),
      getBookingReport: (id) => ipcRenderer.invoke('getBookingReport', id),
      getAnalyticsData: (filterType) => ipcRenderer.invoke('getAnalyticsData', filterType),
      completeResult: (booking_id, test_id, data) => ipcRenderer.invoke('completeResult', booking_id, test_id, data),
      savePdf: (filename, folderName) => ipcRenderer.invoke('savePdf', filename, folderName),
      openPrintWindow: (params) => ipcRenderer.send('open-print-window', params),
      openReceiptWindow: (params) => ipcRenderer.send('open-receipt-window', params),
      getManualSyncDetails: (patientId) => ipcRenderer.invoke('getManualSyncDetails', patientId),
      updateManualSyncDetails: (patientId, updates) => ipcRenderer.invoke('updateManualSyncDetails', patientId, updates),
      deleteBooking: (id) => ipcRenderer.invoke('deleteBooking', id),
      revertBooking: (id) => ipcRenderer.invoke('revertBooking', id),
      forceFullSync: () => ipcRenderer.invoke('forceFullSync')
  }
);
