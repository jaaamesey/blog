import { test, expect } from "@playwright/test";

test("color scheme button cycles on click", async ({ page }) => {
  await page.goto("http://localhost:4321/posts/use_state_should_require_a_dependency_array/");
  await page.waitForTimeout(2000);

  const btn = page.locator("header button").filter({ hasText: /colours:/ });
  const text = await btn.textContent();
  expect(text).toMatch(/colours:\s*(auto|dark|light)/);

  const before = await btn.textContent();
  await btn.click();
  await page.waitForTimeout(500);
  const after = await btn.textContent();
  expect(after).not.toBe(before);
});
