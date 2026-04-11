const { initializeApp } = require('firebase/app');
const { getFirestore, setDoc, doc } = require('firebase/firestore');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyCNG8PPXxuV_BEXo9ydXpcnuFu8J3o897k",
    authDomain: "healthcare-33ed4.firebaseapp.com",
    projectId: "healthcare-33ed4",
    storageBucket: "healthcare-33ed4.firebasestorage.app",
    messagingSenderId: "1010321513051",
    appId: "1:1010321513051:web:1170990b0e440a895dbd7e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function inject() {
    try {
        const email = 'TEST001@lab.local';
        const pass = '123456';
        try {
            await createUserWithEmailAndPassword(auth, email, pass);
        } catch(e) {
            if(e.code === 'auth/email-already-in-use') {
                await signInWithEmailAndPassword(auth, email, pass);
            }
        }
        
        const mockData = {
           // remain
    patient_id: "TEST001",
    patient_name: "John Doe",
    password: "123456",
    age: "35",
    gender: "Male",
    contact: "03001234567",
    visits: {
        "9001": {
            receipt_id: 9001,
            date: "01 Mar 2026",
            timestamp: 1772668800000,
            test_names: ["Complete Blood Count (CBC)"],
            units_and_ranges: {
                "Complete Blood Count (CBC)": [
                    { name: "Hemoglobin", unit: "g/dL", normal_range: "13.0 - 17.0" },
                    { name: "WBC", unit: "/cumm", normal_range: "4000 - 11000" }
                ]
            },
            test_results: {
                "Hemoglobin": "14.2",
                "WBC": "6500"
            },
            comments: "First visit: Normal CBC."
        },
        "9002": {
            receipt_id: 9002,
            date: "10 Apr 2026",
            timestamp: 1775822400000,
            test_names: ["Lipid Profile"],
            units_and_ranges: {
                "Lipid Profile": [
                    { name: "Cholesterol Total", unit: "mg/dL", normal_range: "< 200" },
                    { name: "Triglycerides", unit: "mg/dL", normal_range: "< 150" }
                ]
            },
            test_results: {
                "Cholesterol Total": "185",
                "Triglycerides": "140"
            },
            comments: "Second visit: Lipids are within normal limits."
        }
    }
};

        await setDoc(doc(db, "reports", "TEST001"), mockData);
        console.log("Mock data successfully injected into Firebase!");
        process.exit(0);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}
inject();
