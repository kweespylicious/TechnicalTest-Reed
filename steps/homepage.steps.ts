import { createBdd } from 'playwright-bdd';
import { expect, test } from '../fixtures/fixtures.ts';

const { Given, When, Then } = createBdd(test);

Given('the user navigates to home page', async ({ homePage }) => {
    await homePage.navigateToHomepage();
});

When('the page is loaded', async ({ homePage }) => {
    await expect(homePage.logo).toBeVisible();
});

Then('the logo should be displayed', async ({ homePage }) => {
    const isLogoVisible = await homePage.verifyLogoIsVisible();
    expect(isLogoVisible).toBe(true);
});

Then('the login button should be displayed', async ({ homePage }) => {
    const isProfileIconVisible = await homePage.verifyProfileIconIsVisible();
    expect(isProfileIconVisible).toBe(true);
});