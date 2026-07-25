import { Page, Locator } from '@playwright/test';

export class Homepage {
    readonly page: Page;
    readonly logo: Locator;
    readonly profileIcon: Locator;
    readonly searchInput: Locator;
    readonly departureCalendar: Locator;
    readonly travellersModal: Locator;
    readonly searchButton: Locator;
    readonly directFlightsCheckbox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('//span[@class="gPDR-logo-image"]');
        this.profileIcon = page.locator('//div[@aria-label="Sign in"]');
        this.searchInput = page.locator('//input[@placeholder="To?"]');
        this.departureCalendar = page.locator('//div[@aria-label="Departure date"]');
        this.travellersModal = page.locator('//div[@class="cvdH-title" and text()="Travellers"]');
        this.searchButton = page.locator('//button[@aria-label="Search"]');
        this.directFlightsCheckbox = page.locator('//span[text()="Direct flights only"]');
    }

    async navigateToHomepage(): Promise<void> {
        await this.page.goto('https://www.cheapflights.com.au/');
    }

    async verifyLogoIsVisible(): Promise<boolean> {
        await this.logo.waitFor({ state: 'visible' });
        return true;
    }

    async verifyProfileIconIsVisible(): Promise<boolean> {
        await this.profileIcon.waitFor({ state: 'visible' });
        return true;
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
        await this.page.keyboard.press('Enter');
    }

    /*
    Selects a departure date from the calendar. Month-Day-Year format is expected for the date parameter (e.g., "July 25, 2026").
    */
    async selectDepartureDate(date: string): Promise<void> {
        await this.departureCalendar.click();
        const dateLocator = this.page.locator(`//div[@aria-label="${date}"]`);
        await dateLocator.click();
    }

    async verifyTravellersModalIsVisible(): Promise<boolean> {
        await this.travellersModal.waitFor({ state: 'visible' });
        return true;
    }

    /*
    Selects a cabin class based on the provided className (e.g., "Economy", "Premium Economy", "Business", "First").
    */
    async selectCabinClass(className: string): Promise<void> {
        const cabinClassLocator = this.page.locator(`//label[@data-text="${className}"]`);
        await cabinClassLocator.click();
    }

    async clickSearchButton(): Promise<void> {
        await this.searchButton.click();
    }
}
