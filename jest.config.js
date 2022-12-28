module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.ts'
  ],
  moduleNameMapper: {
    '\\.(css|sass)$': 'identity-obj-proxy',
  },
};
