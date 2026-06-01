import { test, expect } from "@playwright/test";

const LOCAL = "http://localhost:4321";
const PROD = "https://bikeshedd.ing";

const demos = [
  { path: "/posts/use_state_should_require_a_dependency_array/", name: "BadTodoApp1", text: "Todo list" },
  { path: "/posts/use_state_should_require_a_dependency_array/", name: "BadTodoAppWithKey", text: "Tasks:" },
  { path: "/posts/use_state_should_require_a_dependency_array/", name: "BadTodoAppWithDeps", text: "Tasks:" },
  { path: "/posts/how_much_of_that_cloudflare_outage_was_useeffects_fault/", name: "UseEffectBad", text: "Cloudflare Outage Simulator" },
];

for (const demo of demos) {
  test(`${demo.name} loads locally`, async ({ page }) => {
    await page.goto(`${LOCAL}${demo.path}`);
    await page.waitForTimeout(2000);
    const body = await page.textContent("body");
    expect(body).toContain(demo.text);
  });

  test(`${demo.name} matches production text`, async ({ page }) => {
    await page.goto(`${LOCAL}${demo.path}`);
    await page.waitForTimeout(2000);
    const localBody = await page.textContent("body");

    await page.goto(`${PROD}${demo.path}`);
    await page.waitForTimeout(2000);
    const prodBody = await page.textContent("body");

    expect(localBody).toContain(demo.text);
    expect(prodBody).toContain(demo.text);
  });
}

test("useState post first demo button has grey background locally", async ({ page }) => {
  await page.goto(`${LOCAL}/posts/use_state_should_require_a_dependency_array/`);
  await page.waitForTimeout(2000);
  const btn = page.locator('button:has-text("Edit")').first();
  const bg = await btn.evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(bg).toBe("rgb(221, 221, 221)");
});

test("useState post first demo button matches production background", async ({ page }) => {
  await page.goto(`${PROD}/posts/use_state_should_require_a_dependency_array/`);
  await page.waitForTimeout(2000);
  const prodBtn = page.locator('button:has-text("Edit")').first();
  const prodBg = await prodBtn.evaluate((el) => getComputedStyle(el).backgroundColor);

  await page.goto(`${LOCAL}/posts/use_state_should_require_a_dependency_array/`);
  await page.waitForTimeout(2000);
  const localBtn = page.locator('button:has-text("Edit")').first();
  const localBg = await localBtn.evaluate((el) => getComputedStyle(el).backgroundColor);

  expect(localBg).toBe(prodBg);
});
