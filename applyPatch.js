const fs = require('fs');
let content = fs.readFileSync('src/renderer/pages/patient_history.html', 'utf-8');

content = content.replace(
    /\<div style="font-weight:bold; color:\s*#0f172a;">\\\$\\{booking\.patient_name \|\| 'N\/A'\\}<\/div>\s*<div style="font-size:12px; color: #64748b;">ID:\s*\\\$\\{booking\.patient_id\\} \| PIN: \\\$\\{booking\.pin \?\s*String\\(booking\.pin\\)\.padStart\\(6,'0'\\) : '123456'\\}<\/div>\/s,
    \<div style="font-weight:bold; color: #0f172a;">\</div><div style="font-size:12px; color: #64748b;">ID: \</div><div style="font-size:12px; color: #2563eb; font-weight: bold; margin-top:2px;">Online Password: \</div>\
);

content = content.replace(
    /<td>\s*<button onclick="viewReport\('\\\$\\{booking\.id\\}'\)"\s*style="background:#10b981; color:white; border:none; padding:5px 10px;\s*border-radius:3px; cursor:pointer;" \\\$\\{\!isCompleted \? 'disabled opacity="0\.5"' : ''\\}>Print<\/button>\s*<\/td>/s,
    \<td style="display: flex; gap: 5px; align-items: center; border-bottom: none;">
                          <button onclick="window.location.href='sync_manager.html?id=\'" style="background:#6366f1; color:white; border:none; padding:5px 10px; border-radius:3px; cursor:pointer;">Manage Sync</button>
                          <button onclick="viewReport('\')" style="background:#10b981; color:white; border:none; padding:5px 10px; border-radius:3px; cursor:pointer;" \>Print</button>
                      </td>\
);

fs.writeFileSync('src/renderer/pages/patient_history.html', content);
console.log('done fixing history layout');
