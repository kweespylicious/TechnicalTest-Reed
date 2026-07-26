import { test as base } from 'playwright-bdd';
import { Homepage } from '../pages/home.page.ts';
import { SearchResultsPage } from '../pages/search-results.page.ts';

export type POMFixtures = {
    homePage: Homepage;
    searchResultsPage: SearchResultsPage;
};

type TestData = {
    bookingId?: number;
    randomBookingId?: number;
    token?: string;
    updatedBooking?: any;
    bookingDetails?: any;
    response?: any;
};

export const test = base.extend<POMFixtures & {testData: TestData}>({
    homePage: async ({ page }, use) => {
        await use(new Homepage(page));
    },
    searchResultsPage: async ({ page }, use) => {
        await use(new SearchResultsPage(page));
    },
    testData: async ({}, use) => {
        await use({});
    }
});

export { expect } from '@playwright/test';