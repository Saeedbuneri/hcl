const fs = require('fs');
let code = fs.readFileSync('src/main/db/sqlite.js', 'utf8');

const oldStr = \sync function getPendingBookings() {
    return await all(\\\
      SELECT b.id, b.date, b.patient_id, p.name as patient_name,
      (
        SELECT json_group_array(json_object(
          'test_id', r.test_id,
          'test_name', t.name,
          'parameters', t.parameters,
            'parameter_data', r.parameter_data,
      WHERE b.status='Pending'
    \\\);
  }\;

const newStr = \sync function getPendingBookings() {
    return await all(\\\
      SELECT b.id, b.date, b.patient_id, p.name as patient_name,
      (
        SELECT json_group_array(json_object(
          'test_id', r.test_id,
          'test_name', t.name,
          'parameters', t.parameters,
          'parameter_data', r.parameter_data
        ))
        FROM results r
        LEFT JOIN tests_catalog t ON r.test_id = t.id
        WHERE r.booking_id = b.id
      ) as tests
      FROM bookings b
      LEFT JOIN patients p ON b.patient_id = p.id
      WHERE b.status='Pending'
    \\\);
  }\;

const regex = new RegExp("async function getPendingBookings\\\\(\\\\) \\\\{[\\\\s\\\\S]*?WHERE b\\\\.status='Pending'\\\\n    \\\\\\\\);\\\\n  \\\\}");
code = code.replace(regex, newStr);

fs.writeFileSync('src/main/db/sqlite.js', code);
console.log('Patch complete.');
