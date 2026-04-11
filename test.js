const fs = require('fs'); let f = fs.readFileSync('src/renderer/pages/new_booking.html', 'utf8'); f = f.replace('<input type="text" id="pPhone" placeholder="0313 ...">', '<input type="text" id="pPhone" placeholder="0313 ..." onchange="fetchPatientData(this.value)" oninput="if(this.value.length >= 10) fetchPatientData(this.value)">'); let scriptInjection = 
async function fetchPatientData(phone) {
  if (!phone || phone.length < 10) return;
  const patient = await window.api.getPatientByPhone(phone);
  if (patient) {
      document.getElementById('pName').value = patient.name || '';
      document.getElementById('pAge').value = patient.age || '';
      document.getElementById('pGender').value = patient.gender || 'Male';
  }
}
; f = f.replace('</script>', scriptInjection + '\n</script>'); fs.writeFileSync('src/renderer/pages/new_booking.html', f);
