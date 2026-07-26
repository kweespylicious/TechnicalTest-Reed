import { createBdd } from 'playwright-bdd';
import { expect, test } from '../fixtures/fixtures.ts';

const { Given, When, Then } = createBdd(test);

When(`the user inputs {string} as the destination`, async ({ homePage }, destination: string ) => {
    await homePage.inputSearchDestination(destination);
});

When('sets {string} as the departure date', async ({ homePage }, date: string ) => {
    await homePage.selectDepartureDate(date);
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

Then('the search results should be displayed', async ({ searchResultsPage }) => {
    const areResultsVisible = await searchResultsPage.verifySearchResultsAreVisible();
    expect(areResultsVisible).toBe(true);
});