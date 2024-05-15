### Clinical Placements Matcher
This project provides a system for matching students to clinical placements based on their preferences and the availability of slots at each clinical site. The project includes functionality for generating random data, ensuring sufficient slots, and verifying the stability of the matches.

### Installation
Installation
To set up the project, follow these steps:

Clone the repository:
```sh
git clone https://github.com/jdpolicano/clinical-placements.git
```

Navigate to the project directory:
```sh
cd clinical-placements-matcher
```

Install dependencies:
```sh
npm install
```

Make sure you have typescript installed globally, if you haven't already.
```sh
npm install -g typescript
```

To test the project simply run:
```sh
npm test
```

The test suite will generate random data on clinicals and students. You can configure this behavior by changing the variables at the top of `tests/setup.js`.

The tests confirm that every student in the mock data is assigned, that every clinical has the correct number of students, and that the matches are stable.