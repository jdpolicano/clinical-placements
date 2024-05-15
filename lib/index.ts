// import fs from 'node:fs';
// import Matcher from './Matcher.js';
// import baseline from "./baseline.js";
// import { mapJsonToClinicalModel, mapJsonToStudentModel } from './validation.js';
// // Example input
// const students = mapJsonToStudentModel(JSON.parse(fs.readFileSync('./tests/students.json', 'utf-8')));
// const clinicals = mapJsonToClinicalModel(JSON.parse(fs.readFileSync('./tests/clinicals.json', 'utf-8')));
// const matcher = new Matcher(students, clinicals);

// const result = matcher.match();
// console.log(result.map(c => ({
//     name: c.getName(),
//     students: c.getStudents().map(s => s.getName())
// })));

// console.log(baseline());

import Matcher from "./Matcher.js";
import { mapJsonToClinicalModel, mapJsonToStudentModel } from "./validation.js";

export {
    Matcher,
    mapJsonToClinicalModel,
    mapJsonToStudentModel
};