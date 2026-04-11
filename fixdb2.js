const fs = require('fs');

let fileContent = fs.readFileSync('src/main/db/sqlite.js', 'utf8');

const goodFunc = \sync function getPendingBookings() {
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

const idx = fileContent.indexOf("SELECT json_group_array(json_object(");

if (idx > -1) {
    const begin = fileContent.lastIndexOf("async function getPendingBookings()", idx);
    const end = fileContent.indexOf("  }", idx) + 3;
    const toReplace = fileContent.substring(begin, end);
    fileContent = fileContent.replace(toReplace, goodFunc);
    
    fs.writeFileSync('src/main/db/sqlite.js', fileContent);
    console.log("Successfully replaced getPendingBookings!");
} else {
    console.log("Could not find the function text");
}
