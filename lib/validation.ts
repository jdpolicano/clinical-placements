import { z } from 'zod';
import Student from './Student.js';
import Clinical from './Clinical.js';

const studentSchema = z.array(
    z.object({
        name: z.string(),
        preferences: z.array(z.string()),
    })
);

const clinicalSchema = z.array(
    z.object({
        name: z.string(),
        slots: z.number(),
    })
);

export function mapJsonToStudentModel(studentJson: Record<string, any>): Student[] {
    try {
        const students = studentSchema.parse(studentJson);
        return students.map(student => new Student(student.name, student.preferences))
    } catch (e) {
        console.log("ERR: failed to parse student json");
        throw e;
    }
}

export function mapJsonToClinicalModel(clinicalJson: Record<string, any>): Clinical[] {
    try {
        const clinicals = clinicalSchema.parse(clinicalJson);
        return clinicals.map(clinical => new Clinical(clinical.name, clinical.slots))
    } catch (e) {
        console.log("ERR: failed to parse clinical json");
        throw e;
    }
}