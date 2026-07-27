import { createBdd } from 'playwright-bdd';
import { expect, test } from '../fixtures/fixtures.ts';

const { Given, When, Then } = createBdd(test);

Given('the user navigates to home page', async ({ homePage }) => {
    await homePage.navigateToHomepage();
});

When('the page is loaded', async ({ homePage }) => {
    await expect(homePage.logo).toBeVisible();
});

When(`the user inputs {string} as the destination`, async ({ homePage }, destination: string ) => {
    await homePage.inputSearchDestination(destination);
});

When('sets {string} as the departure date', async ({ homePage }, date: string ) => {
    await homePage.selectDepartureDate(date);
});

When('the user sets {string} as the departure date', async ({ homePage }, arg: string) => {
    await homePage.selectDepartureDate(arg);
});

When('sets {string} as the return date', async ({ homePage }, date: string ) => {
    await homePage.selectReturnDate(date);
});

When('selects {string} as the cabin class', async ({ homePage }, className: string ) => {
    await homePage.selectCabinClass(className);
});

When('clicks the search button', async ({ homePage }) => {
    await homePage.clickSearchButton();
});

When('the user clicks the search button', async ({ homePage }) => {
    await homePage.clickSearchButton();
});

When('the user clicks the Explore button', async ({ homePage }) => {
    await homePage.clickExploreButton();
});

Then('the logo should be displayed', async ({ homePage }) => {
    const isLogoVisible = await homePage.verifyLogoIsVisible();
    expect(isLogoVisible).toBe(true);
    expect(await homePage.verifyLogoPosition()).toBe(true);
});

Then('the login button should be displayed', async ({ homePage }) => {
    const isProfileIconVisible = await homePage.verifyProfileIconIsVisible();
    expect(isProfileIconVisible).toBe(true);
    expect(await homePage.verifyProfileIconPosition()).toBe(true);
    await homePage.clickProfileIcon();
    expect(homePage.continueWithEmailButton).toBeVisible();
    expect(homePage.googleLoginButton).toBeVisible();
});

Then('the error modal should be displayed', async ({ homePage }) => {
    const isErrorModalVisible = await homePage.verifyErrorModalIsVisible();
    expect(isErrorModalVisible).toBe(true);
});

Then('the no airport selected modal should be displayed', async ({ homePage }) => {
    const isNoAirportSelectedModalVisible = await homePage.verifyNoAirportSelectedModalIsVisible();
    expect(isNoAirportSelectedModalVisible).toBe(true);
});