import { Matcher, mapJsonToClinicalModel, mapJsonToStudentModel } from "../build/index.js";
import fs from "node:fs";

function expectStablePlacement(student, clinical, clinicalsList) {
    const clinicalsToCompare = clinicalsList.filter(c => c !== clinical);

    for (const clinicalToCompare of clinicalsToCompare) {
        // confirm that there is no condition where the current student and the student to compare would both be happier if they switched. 
        for (const studentToCompare of clinicalToCompare.students) {
            const currStudentRankSelf = student.rank(clinical.getName());
            const currStudentRankOther = student.rank(clinicalToCompare.getName());
            
            const otherStudentRankSelf = studentToCompare.rank(clinicalToCompare.getName());
            const otherStudentRankOther = studentToCompare.rank(clinical.getName());

            if (currStudentRankSelf > currStudentRankOther && otherStudentRankSelf > otherStudentRankOther) {
                return false;
            }
        }
    }

    return true;
}

describe("sample test", () => {
    let students;
    let clinicals;

    beforeAll(() => {
        const studentsFilePath = "./tests/students.json";
        const clinicalsFilePath = "./tests/clinicals.json";

        students = JSON.parse(fs.readFileSync(studentsFilePath, "utf8"));
        clinicals = JSON.parse(fs.readFileSync(clinicalsFilePath, "utf8"));
    });

    it("should match every student", () => {
        const studentModels = mapJsonToStudentModel(students);
        const clinicalModels = mapJsonToClinicalModel(clinicals);
        const matcher = new Matcher(studentModels, clinicalModels);
        const matches = matcher.match();

        const matchedStudents = matches.map(clinical => clinical.students.map(s => s.getName())).flat();
        const nameMap = new Map();

        for (const name of matchedStudents) {
            if (nameMap.has(name)) {
                nameMap.set(name, nameMap.get(name) + 1);
            } else {
                nameMap.set(name, 1);
            }
        }

        expect(matchedStudents.length).toBe(students.length);

        for (const [name, count] of nameMap) {
            expect(count).toBe(1);
        }
    });

    it("should assign too many students to any clinical", () => {
        const studentModels = mapJsonToStudentModel(students);
        const clinicalModels = mapJsonToClinicalModel(clinicals);
        const matcher = new Matcher(studentModels, clinicalModels);
        const matches = matcher.match();

        for (const match of matches) {
            expect(match.slots).toBeGreaterThanOrEqual(match.students.length);
        }
    });

    it("should stable match all students", () => {
        const studentModels = mapJsonToStudentModel(students);
        const clinicalModels = mapJsonToClinicalModel(clinicals);
        const matcher = new Matcher(studentModels, clinicalModels);
        const matches = matcher.match();

        for (const match of matches) {
            for (const student of match.students) {
                expect(expectStablePlacement(student, match, matches)).toBe(true);
            }
        }
    });

});