const fs = require('fs');
let s = fs.readFileSync('src/renderer/pages/print_report.html', 'utf8');

const targetLoop = \                let html = '';
                if(data.results && data.results.length > 0) {
                    data.results.forEach(res => {
                        html += \\\
                        <div class="test-section">
                            <div class="test-title">\\\</div>
                            <table>
                                <thead>
                                    <tr>
                                        <th style="width: 40%;">TEST PARAMETER</th>
                                        <th style="width: 20%;">RESULT</th>
                                        <th style="width: 15%;">UNIT</th>
                                        <th style="width: 25%;">REF. INTERVAL</th>
                                    </tr>
                                </thead>
                                <tbody>\\\;

                        if (res.completed && res.parameter_data) {
                            const resultsData = JSON.parse(res.parameter_data);
                            const paramsDef = JSON.parse(res.parameters || '[]');

                            paramsDef.forEach(p => {
                                const val = parseFloat(resultsData[p.name]);
                                const isAbnormal = p.normalMin !== undefined && p.normalMax !== undefined &&
                                                    !isNaN(val) && (val < p.normalMin || val > p.normalMax);

                                let resultDisplay = \\\<span class="\\\">\\\</span>\\\;
                                if(isAbnormal) resultDisplay += \\\ <span class="abnormal-flag">HIGH/LOW</span>\\\;

                                html += \\\
                                    <tr>
                                        <td><strong>\\\</strong></td>
                                        <td>\\\</td>
                                        <td>\\\</td>
                                        <td>\\\</td>
                                    </tr>\\\;
                            });
                        } else {
                            html += \\\<tr><td colspan="4" style="text-align:center; color: #f59e0b; font-style: italic;">Results Pending...</td></tr>\\\;
                        }

                        html += \\\</tbody></table></div>\\\;
                    });\;

const repLoop = \                // Check filtering from URL
                const hideTests = urlParams.get('hide') ? urlParams.get('hide').split(',') : [];
                let html = '';
                if(data.results && data.results.length > 0) {
                    let smallTests = [];
                    let largeTests = [];
                    data.results.forEach(res => {
                        if (hideTests.includes(res.test_id.toString()) || hideTests.includes(res.test_name)) return;
                        const paramsDef = JSON.parse(res.parameters || '[]');
                        if (paramsDef.length < 3) {
                            smallTests.push({ res, paramsDef });
                        } else {
                            largeTests.push({ res, paramsDef });
                        }
                    });

                    if (smallTests.length > 0) {
                        html += \\\
                        <div class="test-section" style="page-break-inside: avoid; margin-bottom: 20px;">
                            <div class="test-title" style="text-align: center; border-bottom: 2px solid #111827; padding-bottom: 5px;">GROUPED TESTS</div>
                            <table>
                                <thead>
                                    <tr>
                                        <th style="width: 40%;">TEST PARAMETER</th>
                                        <th style="width: 20%;">RESULT</th>
                                        <th style="width: 15%;">UNIT</th>
                                        <th style="width: 25%;">REF. INTERVAL</th>
                                    </tr>
                                </thead>
                                <tbody>\\\;
                        
                        smallTests.forEach(testObj => {
                            const { res, paramsDef } = testObj;
                            html += \\\<tr><td colspan="4" style="background-color:#f1f5f9; font-weight:bold; font-size:12px; padding:4px 12px; text-transform:uppercase;">\\\</td></tr>\\\;
                            
                            if (res.completed && res.parameter_data) {
                                const resultsData = JSON.parse(res.parameter_data);
                                paramsDef.forEach(p => {
                                    const val = parseFloat(resultsData[p.name]);
                                    const isAbnormal = p.normalMin !== undefined && p.normalMax !== undefined && !isNaN(val) && (val < p.normalMin || val > p.normalMax);
                                    let resultDisplay = \\\<span class="\\\">\\\</span>\\\;
                                    if(isAbnormal) resultDisplay += \\\ <span class="abnormal-flag">HIGH/LOW</span>\\\;
                                    
                                    html += \\\
                                        <tr>
                                            <td style="padding-left: 20px;"><strong>\\\</strong></td>
                                            <td>\\\</td>
                                            <td>\\\</td>
                                            <td>\\\</td>
                                        </tr>\\\;
                                });
                            } else {
                                html += \\\<tr><td colspan="4" style="text-align:center; color: #f59e0b; font-style: italic;">Results Pending...</td></tr>\\\;
                            }
                        });
                        html += \\\</tbody></table></div>\\\;
                    }

                    largeTests.forEach((testObj, index) => {
                        const { res, paramsDef } = testObj;
                        const needsPageBreak = (smallTests.length > 0 || index > 0) ? 'page-break-before: always;' : '';
                        
                        html += \\\
                        <div class="test-section" style="\\\">
                            <div class="test-title">\\\</div>
                            <table>
                                <thead>
                                    <tr>
                                        <th style="width: 40%;">TEST PARAMETER</th>
                                        <th style="width: 20%;">RESULT</th>
                                        <th style="width: 15%;">UNIT</th>
                                        <th style="width: 25%;">REF. INTERVAL</th>
                                    </tr>
                                </thead>
                                <tbody>\\\;

                        if (res.completed && res.parameter_data) {
                            const resultsData = JSON.parse(res.parameter_data);
                            paramsDef.forEach(p => {
                                const val = parseFloat(resultsData[p.name]);
                                const isAbnormal = p.normalMin !== undefined && p.normalMax !== undefined && !isNaN(val) && (val < p.normalMin || val > p.normalMax);
                                let resultDisplay = \\\<span class="\\\">\\\</span>\\\;
                                if(isAbnormal) resultDisplay += \\\ <span class="abnormal-flag">HIGH/LOW</span>\\\;

                                html += \\\
                                    <tr>
                                        <td><strong>\\\</strong></td>
                                        <td>\\\</td>
                                        <td>\\\</td>
                                        <td>\\\</td>
                                    </tr>\\\;
                            });
                        } else {
                            html += \\\<tr><td colspan="4" style="text-align:center; color: #f59e0b; font-style: italic;">Results Pending...</td></tr>\\\;
                        }

                        html += \\\</tbody></table></div>\\\;
                    });\;

if (!s.includes('if(data.results && data.results.length > 0) {')) {
    console.log("Could not find exact text!");
} else {
    // try to slice manually
    const parts = s.split('let html = \'\';');
    if (parts.length > 1) {
        const top = parts[0];
        const bottom = parts[1].split('} else {\\n                    html = "<p');
        if (bottom.length > 1) {
            fs.writeFileSync('src/renderer/pages/print_report.html', top + repLoop + '\\n                } else {\\n                    html = "<p' + bottom[1]);
            console.log("Patched print_report.html successfully!");
        } else {
            console.log("Could not find bottom split!");
        }
    }
}
