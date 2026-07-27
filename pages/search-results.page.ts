import { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class SearchResultsPage {
    readonly page: Page
    readonly searchResultsContainer: Locator;
    readonly whereToInput: Locator;
    readonly viewFlightsButton: Locator;
    readonly loadingSpinner: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchResultsContainer = page.locator('//div[contains(@class, "yuAt")]');
        this.whereToInput = page.locator('//input[@placeholder="Where to?"]');
        this.loadingSpinner = page.getByRole('progressbar');
        this.viewFlightsButton = page.locator('section').getByRole('link', { name: 'View flights' });
    }

    async verifySearchResultsAreVisible(): Promise<boolean> {
        await expect(this.searchResultsContainer.first()).toBeVisible({ timeout: 10000 });
        const searchResults = await this.searchResultsContainer.all();
        await searchResults[0].waitFor({ state: 'visible' });
        if (searchResults.length === 0) {
            return false;
        }
        return true;
    }

    async getSearchResultsCount(): Promise<number> {
        const searchResults = await this.searchResultsContainer.all();
        return searchResults.length;
    }

    async verifySearchResultExistsByType(searchResultType: string): Promise<boolean> {
        const searchResultLocator = this.page.locator(`//div[@class="btf6-labels"]/div[text()="${searchResultType}"]`);
        await searchResultLocator.waitFor({ state: 'visible' });
        return true;
    }

    async clickViewFlightsButton(): Promise<Page> {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.viewFlightsButton.click()
        ]);
        return newPage;
}

    async clickRandomDestination(): Promise<void> {
        await this.page.waitForTimeout(15000);
        const randomDestinationLocator = this.page.locator('//ul[@id="explore-results-section-quick-link"]');
        const destinations = await randomDestinationLocator.locator('li').all();
        const randomIndex = Math.floor(Math.random() * destinations.length);
        await destinations[randomIndex].click();
    }
}