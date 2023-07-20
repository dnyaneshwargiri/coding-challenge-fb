module.exports = {
  testMatch: ['**/tests/**/*.ts'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
};
