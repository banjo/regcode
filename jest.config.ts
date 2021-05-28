module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    reporters: [
        "default",
        [
            "jest-junit",
            {
                outputName: "junit-TEST.xml",
            },
        ],
    ],
    modulePathIgnorePatterns: ["<rootDir>/dist/"],
};
