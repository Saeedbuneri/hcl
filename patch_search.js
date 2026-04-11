const fs = require('fs');

let sqlite = fs.readFileSync('src/main/db/sqlite.js', 'utf8');
let queryStartIndex = sqlite.indexOf('SELECT json_group_array(json_object(');
let queryEndIndex = sqlite.indexOf(\WHERE b.status='Pending'\) + 24;

if (queryStartIndex !== -1 && queryEndIndex !== -1) {
    let replacedText = \SELECT json_group_array(json_object(
          'test_id', r.test_id,
          'test_name', t.name,
          'completed', r.completed,
          'parameters', t.parameters,
          'parameter_data', r.parameter_data
        ))
        FROM results r JOIN tests t ON r.test_id = t.id WHERE r.booking_id = b.id
      ) as tests_json
      FROM bookings b JOIN patients p ON b.patient_id = p.id
      WHERE b.status='Pending'\;
    let patchedSqlite = sqlite.substring(0, queryStartIndex) + replacedText + sqlite.substring(queryEndIndex);
    fs.writeFileSync('src/main/db/sqlite.js', patchedSqlite);
    console.log('Fixed sqlite.js');
}

let newBooking = fs.readFileSync('src/renderer/pages/new_booking.html', 'utf8');
if (!newBooking.includes('function searchPatientList')) {
    let scriptInject = \
    let searchTimeout;
    async function searchPatientList(term) {
        let sug = document.getElementById('patientSuggestions');
        if (!term || term.length < 2) { sug.style.display = 'none'; return; }
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(async () => {
            const data = await window.api.getPatientHistory(term);
            const u = {};
            data.forEach(d => { if(!u[d.patient_id]) u[d.patient_id] = d; });
            const pts = Object.values(u);
            sug.innerHTML = '';
            if (pts.length === 0) sug.innerHTML = '<div style="padding:10px; color:gray;">No match</div>';
            else {
                pts.forEach(p => {
                    let d = document.createElement('div');
                    d.style.padding = '10px';
                    d.style.borderBottom = '1px solid #ddd';
                    d.style.cursor = 'pointer';
                    d.innerHTML = '<b>' + p.patient_name + '</b> - ' + (p.contact || '');
                    d.onclick = () => {
                        document.getElementById('patientSearchInput').value = p.patient_name;
                        fetchPatientData(p.contact);
                        sug.style.display = 'none';
                    };
                    sug.appendChild(d);
                });
            }
            sug.style.display = 'block';
        }, 400);
    }
</script>\;
    fs.writeFileSync('src/renderer/pages/new_booking.html', newBooking.replace('</script>', scriptInject));
    console.log('Fixed new_booking.html');
}

let historyHtml = fs.readFileSync('src/renderer/pages/patient_history.html', 'utf8');
if (!historyHtml.includes('function searchPatientList')) {
    let scriptInject = \
    let searchTimeout;
    async function searchPatientList(term) {
      if(!term) { performSearch(); return; }
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        let activeTab = document.querySelector('.active-tab').id;
        if(activeTab === 'tabTests') {
          // If searching tests...
          let trs = document.querySelectorAll('#historyTableBody tr');
          trs.forEach(tr => {
            if(tr.innerText.toLowerCase().includes(term.toLowerCase())) tr.style.display='';
            else tr.style.display='none';
          });
        } else {
          // If searching patients
          let trs = document.querySelectorAll('#patientsTableBody tr');
          trs.forEach(tr => {
            if(tr.innerText.toLowerCase().includes(term.toLowerCase())) tr.style.display='';
            else tr.style.display='none';
          });
        }
      }, 300);
    }
</script>\;
    fs.writeFileSync('src/renderer/pages/patient_history.html', historyHtml.replace('</script>', scriptInject));
    console.log('Fixed patient_history.html');
}
