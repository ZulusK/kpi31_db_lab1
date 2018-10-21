module.exports = {
    collectCoverageFrom: [
        'src/**/*.{ts,tsx,js,jsx}',
        '!src/**/*.d.ts',
    ],
    coverageDirectory: 'coverage',
    "forceExit":true,
    "globalSetup": "./src/test/setup.js",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    testEnvironment: 'node',
    "testRegex": ".+\\.test.tsx?$",
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    }
};
