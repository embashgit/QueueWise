const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  coverageThreshold: {
    global: { },
  },
  moduleDirectories: ["node_modules", "<rootDir/>"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy",
  },
  coveragePathIgnorePatterns: [
    "/.next/",
    "/assets/",
    "/src/app/layout.tsx",
    "/src/components/Icon/Icon.tsx",
    "/dist/",
    "/pages/",
    "/server/",
    "/test-utils/",
    "index\\.ts$",
    "/node_modules/",
    "/coverage/",
    "/jest.config.js",
    "/next.config.js",
    "/postcss.config.js",
    "/tailwind.config.ts",
    "/config.js",
    "/config",
    "/next-i18next.config.js",
  ],
  collectCoverage: true,
  collectCoverageFrom: ["**/*.{js,jsx,ts,tsx}", "!**/*.d.ts"],
  modulePaths: ["<rootDir>"],
  testEnvironment: "jest-environment-jsdom",
};
module.exports = createJestConfig(customJestConfig);
