import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { Homepage } from '../pages/home.page.ts';

const { Given, When, Then } = createBdd();

Given('the user navigates to home page', async ({ page }) => {
    const homepage = new Homepage(page);
    await homepage.navigateToHomepage();
});

When('the page is loaded', async ({ page }) => {
    const homepage = new Homepage(page);
    await expect(homepage.logo).toBeVisible();
});

Then('the logo should be displayed', async ({ page }) => {
    const homepage = new Homepage(page);
    const isLogoVisible = await homepage.verifyLogoIsVisible();
    expect(isLogoVisible).toBe(true);
});

Then('the login button should be displayed', async ({ page }) => {
    const homepage = new Homepage(page);
    const isProfileIconVisible = await homepage.verifyProfileIconIsVisible();
    expect(isProfileIconVisible).toBe(true);
});