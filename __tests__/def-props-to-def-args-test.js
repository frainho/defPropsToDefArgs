jest.autoMockOff();
const defineTest = require("jscodeshift/dist/testUtils").defineTest;

describe("Def props to def args", () => {
  defineTest(__dirname, "def-props-to-def-args")
});
