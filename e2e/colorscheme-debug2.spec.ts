import { test } from "@playwright/test";

test("color scheme button debug", async ({ page }) => {
  await page.goto("http://localhost:4321/posts/use_state_should_require_a_dependency_array/");
  await page.waitForTimeout(2000);

  const btn = page.locator('button:has-text("colours:")');
  const before = await btn.textContent();
  console.log("Before click:", before);

  // Check if window._hooks exists
  const hooksExist = await page.evaluate(() => typeof window._hooks !== "undefined");
  console.log("window._hooks exists:", hooksExist);

  // Try calling rotate directly
  await page.evaluate(() => {
    const hooks = window._hooks;
    console.log("Current scheme:", hooks.getColorScheme());
    hooks.setColorSchemeOverride("dark");
    console.log("After set dark:", hooks.getColorScheme());
  });

  await page.waitForTimeout(500);
  const after = await btn.textContent();
  console.log("After direct call:", after);
});
