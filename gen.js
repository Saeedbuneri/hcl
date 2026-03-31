const fs = require('fs');
const path = require('path');

const template = fs.readFileSync('tests/blood.html', 'utf-8');

const tests = [
    {
        filename: 'sugar.html',
        headTitle: 'Blood Sugar Test',
        pageTitle: 'Blood Sugar',
        subtitle: 'Fasting, Random, & HbA1c',
        turnaround: 'Same day',
        fasting: 'Only for Fasting Sugar (8-10 hrs)',
        sample: 'Blood',
        intro: 'At <strong>HealthCare Clinical Laboratory</strong>, we provide accurate Blood Sugar testing crucial for diabetes management and diagnosis.',
        q1: 'What is a Blood Sugar Test?',
        a1: 'A blood sugar test measures the amount of glucose in your blood. It helps in diagnosing and managing diabetes. We offer Fasting Blood Sugar (FBS), Random Blood Sugar (RBS), and HbA1c which shows the 3-month average.',
        param: 'Blood Sugar'
    },
    {
        filename: 'lft.html',
        headTitle: 'Liver Function Test (LFT)',
        pageTitle: 'Liver Function Test',
        subtitle: 'Comprehensive Liver Health Screening',
        turnaround: 'Same day',
        fasting: 'Not required',
        sample: 'Blood',
        intro: 'At <strong>HealthCare Clinical Laboratory</strong>, our Liver Function Tests help determine the health of your liver by measuring the levels of proteins, liver enzymes, and bilirubin in your blood.',
        q1: 'What is an LFT?',
        a1: 'An LFT evaluates how well your liver is working. It checks for liver infections, monitors the progression of disease like viral hepatitis or alcohol-related issues, and measures the severity of a disease. It also monitors possible side effects of medications.',
        param: 'Liver Function Test'
    },
    {
        filename: 'urine.html',
        headTitle: 'Urine Routine Test',
        pageTitle: 'Urine Routine',
        subtitle: 'Complete Urine Analysis',
        turnaround: '1-2 Hours',
        fasting: 'Not required',
        sample: 'Urine',
        intro: 'At <strong>HealthCare Clinical Laboratory</strong>, our Urine Routine analysis provides a fast and reliable snapshot of your urinary tract health and kidney function.',
        q1: 'What is a Urine Routine Test?',
        a1: 'A urine test checks for various components like sugar, protein, blood, and white blood cells. It helps diagnose conditions such as urinary tract infections (UTIs), kidney diseases, and diabetes.',
        param: 'Urine Routine'
    },
    {
        filename: 'lipid.html',
        headTitle: 'Lipid Profile',
        pageTitle: 'Lipid Profile',
        subtitle: 'Cholesterol & Heart Health Screening',
        turnaround: 'Same day',
        fasting: '10-12 hours required',
        sample: 'Blood',
        intro: 'At <strong>HealthCare Clinical Laboratory</strong>, our Lipid Profile helps you understand your cardiovascular risk by measuring different types of fats in your blood.',
        q1: 'What is a Lipid Profile?',
        a1: 'It measures your total cholesterol, LDL (bad cholesterol), HDL (good cholesterol), and triglycerides. Maintaining healthy lipid levels is critical in preventing heart disease, heart attacks, and strokes.',
        param: 'Lipid Profile'
    },
    {
        filename: 'renal.html',
        headTitle: 'Renal Function Test (RFT)',
        pageTitle: 'Renal Function Test',
        subtitle: 'Kidney Health Assessment',
        turnaround: 'Same day',
        fasting: 'Not required',
        sample: 'Blood',
        intro: 'At <strong>HealthCare Clinical Laboratory</strong>, our Renal Function Tests accurately measure how efficiently your kidneys are clearing waste from your body.',
        q1: 'What is an RFT?',
        a1: 'A Renal Function Test evaluates the health of your kidneys by measuring levels of Blood Urea Nitrogen (BUN), Creatinine, and essential electrolytes. It helps detect kidney disease early.',
        param: 'Renal Function Test'
    },
    {
        filename: 'thyroid.html',
        headTitle: 'Thyroid Profile',
        pageTitle: 'Thyroid Profile',
        subtitle: 'Hormonal Balance Screening',
        turnaround: 'Same day',
        fasting: 'Not required',
        sample: 'Blood',
        intro: 'At <strong>HealthCare Clinical Laboratory</strong>, our Thyroid Profile accurately assesses your thyroid gland function to help diagnose metabolism and energy-related disorders.',
        q1: 'What is a Thyroid Profile?',
        a1: 'This vital test measures the levels of thyroid hormones (T3, T4) and Thyroid-Stimulating Hormone (TSH). It helps in diagnosing hyperthyroidism (overactive thyroid) and hypothyroidism (underactive thyroid).',
        param: 'Thyroid Profile'
    },
    {
        filename: 'viral.html',
        headTitle: 'Viral Markers test',
        pageTitle: 'Viral Markers',
        subtitle: 'Infectious Disease Screening',
        turnaround: 'Same day',
        fasting: 'Not required',
        sample: 'Blood',
        intro: 'At <strong>HealthCare Clinical Laboratory</strong>, we provide highly sensitive and confidential Viral Marker testing to rapidly detect infectious diseases.',
        q1: 'What are Viral Markers?',
        a1: 'Viral marker testing checks for the presence of specific antigens or antibodies in your blood to diagnose infections such as Hepatitis B (HBsAg), Hepatitis C (Anti-HCV), and HIV. Early detection is crucial for effective treatment.',
        param: 'Viral Markers'
    },
    {
        filename: 'widal.html',
        headTitle: 'Widal Test',
        pageTitle: 'Widal Test',
        subtitle: 'Typhoid Fever Diagnosis',
        turnaround: '1-2 Hours',
        fasting: 'Not required',
        sample: 'Blood',
        intro: 'At <strong>HealthCare Clinical Laboratory</strong>, our Widal Test provides a quick and accurate diagnosis for enteric fevers like Typhoid.',
        q1: 'What is a Widal Test?',
        a1: 'The Widal test detects specific antibodies in your blood produced in response to Salmonella bacteria. It is heavily utilized to diagnose Typhoid and Paratyphoid fevers, especially in endemic areas.',
        param: 'Widal Test'
    }
];

tests.forEach(test => {
    let newContent = template
        .replace(/<title>.*?<\/title>/, `<title>${test.headTitle} - Healthcare Clinical Laboratory</title>`)
        .replace(/<div class="logo">Blood Tests \(CBC\)<\/div>/, `<div class="logo">${test.pageTitle}</div>`)
        .replace(/<div class="subtitle">Complete Blood Count & Essential Checks<\/div>/, `<div class="subtitle">${test.subtitle}</div>`)
        .replace(/Turnaround Time: 2 Hours/, `Turnaround Time: ${test.turnaround}`)
        .replace(/Fasting: Not Required for general CBC/, `Fasting: ${test.fasting}`)
        .replace(/Sample: Blood/g, `Sample: ${test.sample}`)
        .replace(/At <strong>HealthCare Clinical Laboratory<\/strong>, we offer highly accurate and rapid blood testing services.*?<\/p>/, test.intro + '</p>')
        .replace(/<h2>What is a CBC\?<\/h2>/, `<h2>${test.q1}</h2>`)
        .replace(/<p>A Complete Blood Count \(CBC\).*?<\/ul>/s, `<p>${test.a1}</p>`)
        .replace(/href="\.\.\/booking\.html\?test=[^"]+"/, `href="../booking.html?test=${encodeURIComponent(test.param)}"`);
        
    fs.writeFileSync(path.join('tests', test.filename), newContent);
    console.log('Generated ' + test.filename);
});
