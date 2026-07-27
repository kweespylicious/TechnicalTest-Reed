import { Page, Locator } from '@playwright/test';

export class Homepage {
    readonly page: Page;
    readonly logo: Locator;
    readonly profileIcon: Locator;
    readonly continueWithEmailButton: Locator;
    readonly googleLoginButton: Locator;
    readonly searchInput: Locator;
    readonly departureCalendar: Locator;
    readonly travellersModal: Locator;
    readonly searchButton: Locator;
    readonly directFlightsCheckbox: Locator;
    readonly loadingSpinner: Locator;
    readonly exploreButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('//span[@class="gPDR-logo-image"]');
        this.profileIcon = page.locator('//div[@aria-label="Sign in"]');
        this.searchInput = page.locator('//input[@placeholder="To?"]');
        this.departureCalendar = page.getByRole('button', { name: 'Departure date' });
        this.travellersModal = page.locator('//div[@class="cvdH-title" and text()="Travellers"]');
        this.searchButton = page.getByRole('search', { name: 'flight' }).getByLabel('Search', { exact: true });
        this.directFlightsCheckbox = page.locator('//span[text()="Direct flights only"]');
        this.loadingSpinner = page.getByRole('progressbar');
        this.exploreButton = page.getByRole('button', { name: 'Explore' });
        this.continueWithEmailButton = page.getByRole('button', { name: 'Continue with email' });
        this.googleLoginButton = page.getByRole('button', { name: 'Google' });
    }

    async navigateToHomepage(): Promise<void> {
        await this.page.goto('https://www.cheapflights.com.au/');
    }

    async verifyLogoIsVisible(): Promise<boolean> {
        const logoFound = this.logo.isVisible();
        return logoFound;
    }

    async clickProfileIcon(): Promise<void> {
        await this.profileIcon.click();
    }

    async verifyNoFlightsFoundMessageIsVisible(): Promise<boolean> {
        const noFlightsFoundMessage = this.page.locator('div').filter({ hasText: /^No flights found$/ });
        const isFound = await noFlightsFoundMessage.isVisible({ timeout: 10000 });
        return isFound;
    }

    async verifyProfileIconIsVisible(): Promise<boolean> {
        const isFound = this.profileIcon.isVisible();
        return isFound;
    }

    async verifySearchInputIsVisible(): Promise<boolean> {
        await this.searchInput.waitFor({ state: 'visible' });
        return true;
    }

    async verifyDepartureCalendarIsVisible(): Promise<boolean> {
        await this.departureCalendar.waitFor({ state: 'visible' });
        return true;
    }

    async inputSearchDestination(destination: string): Promise<void> {
        await this.searchInput.fill(destination);
        await this.loadingSpinner.waitFor({ state: 'hidden' });
        await this.page.locator(`//span[@class="vPgG-name"][contains(text(),"${destination}")]`).click();
    }

    async selectDepartureDate(date: string): Promise<void> {
        await this.departureCalendar.click();
        const dateLocator = this.page.locator(`//div[contains(@aria-label,"${date}")]`);
        await dateLocator.click();
    }

    async selectReturnDate(date: string): Promise<void> {
        const dateLocator = this.page.getByRole('button', { name: date });
        await dateLocator.click();
    }

    async verifyTravellersModalIsVisible(): Promise<boolean> {
        const isFound = this.travellersModal.isVisible();
        return isFound;
    }

    async selectCabinClass(className: string): Promise<void> {
        const cabinClassLocator = this.page.locator(`//label[@data-text="${className}"]`);
        await cabinClassLocator.click();
    }

    async clickSearchButton(): Promise<void> {
        await this.searchButton.click();
    }

    async clickExploreButton(): Promise<void> {
        await this.exploreButton.click();
    }

    async verifyErrorModalIsVisible(): Promise<boolean> {
        const errorModalLocator = this.page.getByText('An error occurred while');
        const isVisible = await errorModalLocator.isVisible();
        return isVisible;
    }

    async verifyNoAirportSelectedModalIsVisible(): Promise<boolean> {
        const noAirportSelectedModal = this.page.getByText('You didn\'t select an airport');
        const isVisible = await noAirportSelectedModal.isVisible();
        return isVisible;
    }
}
