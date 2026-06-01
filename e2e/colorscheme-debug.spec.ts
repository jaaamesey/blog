import { test, expect } from "@playwright/test";

test("color scheme button appears and no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.goto("http://localhost:4321/posts/use_state_should_require_a_dependency_array/");
  await page.waitForTimeout(3000);

  const html = await page.content();
  expect(html).toContain("colours:");

  const btn = page.locator('button:has-text("colours:")');
  await expect(btn).toBeVisible();

  console.log("Console errors:", errors);
  expect(errors).toHaveLength(0);
});
