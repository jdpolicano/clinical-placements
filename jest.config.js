export default {
    verbose: true,
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.js'],
    // setup to build random test data
    setupFiles: ['<rootDir>/tests/setup.js'],
}