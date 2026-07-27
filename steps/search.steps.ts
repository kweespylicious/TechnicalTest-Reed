import { createBdd } from 'playwright-bdd';
import { expect, test } from '../fixtures/fixtures.ts';

const { When, Then } = createBdd(test);

When('selects a random destination', async ({ searchResultsPage }) => {
    await searchResultsPage.clickRandomDestination();
});

When('views flights', async ({ searchResultsPage, page}) => {
    const newPage = await searchResultsPage.clickViewFlightsButton();
    await searchResultsPage.clickViewFlightsButton();
    Object.assign(page, newPage);
});

Then('the search results should be displayed', async ({ searchResultsPage }) => {
    const areResultsVisible = await searchResultsPage.verifySearchResultsAreVisible();
    expect(areResultsVisible).toBe(true);
});

Then('the search results should have {string} flights displayed', async ({ searchResultsPage }, arg: string) => {
    const areFlightsVisible = await searchResultsPage.verifySearchResultExistsByType(arg);
    expect(areFlightsVisible).toBe(true);
});

Then('the flights should be displayed', async ({ page }) => {
    await expect(page.locator('//div[contains(@class, "yuAt")]').first()).toBeVisible({ timeout: 10000} );
    const flightResults = await page.locator('//div[contains(@class, "yuAt")]').all();
    console.log(flightResults.length);
    await flightResults[0].waitFor({ state: 'visible' });
    expect(flightResults.length).toBeGreaterThan(0);
});