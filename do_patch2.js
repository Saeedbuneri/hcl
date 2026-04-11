const fs = require('fs');
let s = fs.readFileSync('src/renderer/pages/pending_results.html', 'utf8');
s = s.replace(/<button style="padding: 6px 12px; background: #[0-9a-fA-F]+; color: white; border: none; border-radius: 4px; cursor: pointer;" onclick="openTestsModal\\('\\\\\'\\)">View \/ Enter<\\/button>/, '<button style="padding: 6px 12px; background: #0ea5e9; color: white; border: none; border-radius: 4px; cursor: pointer;" onclick="openTestsModal(\\'\\\\\')">View / Enter</button> <button style="padding: 6px 12px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 5px;" onclick="window.api.openPrintWindow({ db_id: \\'\\\\\' })">Print</button>');
fs.writeFileSync('src/renderer/pages/pending_results.html', s);
console.log('patched');
