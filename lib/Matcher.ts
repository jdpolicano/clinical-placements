import Student from './Student.js';
import Clinical from './Clinical.js';

export default class Matcher {
    private students: Student[];
    private clinicals: Clinical[];

    constructor(students: Student[], clinicals: Clinical[]) {
        this.students = students;
        this.clinicals = clinicals;
    }

    /**
     * Matches students based on the gayle shapley algorithm, where students are assigned to clinicals based on their preferences
     * and clinicals are assigned students based on their capacity. If a clinical is full, the student with the lowest preference
     * is removed and the new student is added (provided the candidate student has a higher priority for the given location).
     * 
     * This is repeated until all students are assigned to a clinical. The end result is a "stable matching" where 
     * no two students would prefer each other's assignment over their own.
     * @returns The clinicals with the students assigned
     */
    public match(): Clinical[] {
        while (this.students.length) {
            const currentStudent = this.students.pop()!;
            const nextPrefName = currentStudent.nextPreferedClinical();
            const nextPrefClinical = this.clinicals.find(c => c.getName().toLowerCase() === nextPrefName.toLowerCase());

            if (nextPrefClinical === undefined) {
                throw new Error("Student preference is not a valid clinical location...");
            }

            if (nextPrefClinical.canAssignStudent()) {
                nextPrefClinical.addStudent(currentStudent);
            } else {
                const lowestPriorityStudent = nextPrefClinical.getLowestPriorityStudent();

                if (lowestPriorityStudent === undefined) {
                    throw new Error(`unexpected state for clinical ${nextPrefClinical}`);
                }

                if (lowestPriorityStudent.rank(nextPrefName) > currentStudent.rank(nextPrefName)) {
                    // swap the students and continue;
                    nextPrefClinical.addStudent(currentStudent);
                    nextPrefClinical.removeStudent(lowestPriorityStudent);
                    this.students.push(lowestPriorityStudent);
                } else {
                    // reque this and try again.
                    this.students.push(currentStudent);
                }
            }
        }

        return this.clinicals
    }
}
