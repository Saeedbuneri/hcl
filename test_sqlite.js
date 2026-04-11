const sqlite3 = require('better-sqlite3');
const db = sqlite3('C:/Users/Dell Pc/AppData/Roaming/hcl-lab-management/hcl_local.sqlite');
const stmt = db.prepare(\
    SELECT b.id, b.date, b.patient_id, p.name as patient_name,
    (
      SELECT json_group_array(json_object(
        'test_id', r.test_id,
        'test_name', t.name,
        'completed', r.completed,
        'parameters', t.parameters,
        'parameter_data', r.parameter_data
      )) FROM results r JOIN tests_catalog t ON r.test_id = t.id WHERE r.booking_id = b.id
    ) as tests_json
    FROM bookings b JOIN patients p ON b.patient_id = p.id
    WHERE b.status='Pending'
\);
console.log('Results: ', stmt.all().length);
