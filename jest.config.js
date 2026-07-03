module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["**/tests/**/*.test.js"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  collectCoverageFrom: ["jquery.infiniteScrollWithTemplate.js"],
  coverageDirectory: "coverage",
  verbose: true,
};
