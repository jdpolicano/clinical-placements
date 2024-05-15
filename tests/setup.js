import * as fs from 'fs';
import * as path from 'path';

// Generate random data
function generateRandomData(studentCount, clinicalCount, minSlots, maxSlots) {
    const students = [];
    const clinicals = [];
    const clinicalNames = Array.from({ length: clinicalCount }, (_, i) => `Clinical${i}`);

    // Generate clinicals with random slots
    clinicalNames.forEach(name => {
        const slots = Math.floor(Math.random() * (maxSlots - minSlots + 1)) + minSlots;
        clinicals.push({ name, slots });
    });

    // Generate students with random preferences
    for (let i = 0; i < studentCount; i++) {
        const name = `Student${i}`;
        const preferences = clinicalNames.slice().sort(() => Math.random() - 0.5);
        students.push({ name, preferences });
    }

    return { students, clinicals };
}

// Ensure there are enough slots
function ensureSufficientSlots(students, clinicals) {
    let totalSlots = clinicals.reduce((sum, clinical) => sum + clinical.slots, 0);
    const requiredSlots = students.length;

    if (totalSlots < requiredSlots) {
        let extraSlotsNeeded = requiredSlots - totalSlots;

        while (extraSlotsNeeded > 0) {
            for (let i = 0; i < clinicals.length && extraSlotsNeeded > 0; i++) {
                clinicals[i].slots += 1;
                extraSlotsNeeded -= 1;
            }
        }
    }

    return clinicals;
}

// Write data to JSON files
function writeDataToJson(students, clinicals) {
    const studentsFilePath = path.join(__dirname, 'students.json');
    const clinicalsFilePath = path.join(__dirname, 'clinicals.json');

    fs.writeFileSync(studentsFilePath, JSON.stringify(students, null, 2));
    fs.writeFileSync(clinicalsFilePath, JSON.stringify(clinicals, null, 2));
}

// Generate, ensure sufficient slots, and write data
const studentCount = 250; // Change as needed
const clinicalCount = 20; // Change as needed
const minSlots = 5;
const maxSlots = 15;

let { students, clinicals } = generateRandomData(studentCount, clinicalCount, minSlots, maxSlots);
clinicals = ensureSufficientSlots(students, clinicals);
writeDataToJson(students, clinicals);
