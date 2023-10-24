const getTitle = require("../modules/title_module");
const sum = require("../modules/title_module");

test("Should get title", () => {
  expect(getTitle()).toBe("Express-App");
});
