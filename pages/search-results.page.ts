import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
    readonly page: Page
    readonly searchResultsContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchResultsContainer = page.locator('//div[contains(@class, "yuAt")]');
    }

    async verifySearchResultsAreVisible(): Promise<boolean> {
        await this.searchResultsContainer.waitFor({ state: 'visible' });
        return true;
    }

    async getSearchResultsCount(): Promise<number> {
        const searchResults = await this.searchResultsContainer.all;
        return searchResults.length;
    }

    /*
    Verifies if a specific search result type exists on the search results page. (eg. "Best" , "Cheapest")
    */
    async verifySearchResultExistsByType(searchResultType: string): Promise<boolean> {
        const searchResultLocator = this.page.locator(`//div[@class="btf6-labels"]/div[text()="${searchResultType}"]`);
        await searchResultLocator.waitFor({ state: 'visible' });
        return true;
    }

}