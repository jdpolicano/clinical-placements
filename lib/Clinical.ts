import Student from './Student.js';

export default class Clinical {
    private name: string;
    private slots: number;
    private students: Student[];

    constructor(name: string, slots: number) {
        this.name = name;
        this.slots = slots;
        this.students = [];
    }

    /**
     * @returns The name of the clinical
     */
    public getName(): string {
        return this.name;
    }

    /**
     * @returns The number of slots available in the clinical
     */
    public getSlots(): number {
        return this.slots;
    }

    /**
     * @returns The number of students assigned to the clinical
     */
    public getNumberOfStudents(): number {
        return this.students.length;
    }

    /**
     * @returns whether this clinical can fit a new student.
     */
    public canAssignStudent(): boolean {
        return this.getNumberOfStudents() < this.getSlots()
    }

    /**
     * @returns The students assigned to the clinical
     */
    public getStudents(): Student[] {
        return this.students;
    }

    /**
     * Add a student to the clinical
     * @param student The student to add
     */
    public addStudent(student: Student): void {
        this.students.push(student);
    }

    /**
     * Check if the clinical is full
     * @param student The student to remove
     */
    public isFull(): boolean {
        return this.students.length >= this.slots;
    }

    /**
     * Check if a student is assigned to the clinical
     * @param student The student to check
     * @returns True if the student is assigned to the clinical, false otherwise
     */
    public isStudentAssigned(student: Student): boolean {
        return this.students.includes(student);
    }

    /**
     * Returns the studen that is least happy to be here.
     * @param student The student to remove
     */
    public getLowestPriorityStudent(): Student | undefined {
        return this.students.reduce((worst, current) => worst.rank(this.name) > current.rank(this.name) ? worst : current);
    }

    /**
     * Remove a student from the clinical
     * @param student The student to remove
     */
    public removeStudent(student: Student): void {
        const index = this.students.indexOf(student);
        if (index > -1) {
            // swap this student with last and pop;
            const tmp = this.students.at(index)!;
            const last = this.students.at(-1)!;

            if (tmp === last) {
                this.students.pop();
                return;
            }

            this.students[index] = last;
            this.students[this.students.length - 1] = tmp;
            this.students.pop();
        }
    }
}