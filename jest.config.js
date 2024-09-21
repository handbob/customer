export const moduleFileExtensions = ['js', 'json', 'ts'];
export const rootDir = '.';
export const testRegex = 'tests/.*\\.spec\\.ts$';
export const collectCoverageFrom = ['**/*.(t|j)s'];
export const coverageDirectory = 'coverage';
export const testEnvironment = 'node';
export const transform = { '^.+\\.ts$': 'ts-jest' };