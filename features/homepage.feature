@homepage @ui
Feature: Homepage

    @logo
    Scenario: Verify Logo Is Displayed
        Given the user navigates to home page
        When the page is loaded
        Then the logo should be displayed
    
    @login
    Scenario: Verify Login Button Is Displayed
        Given the user navigates to home page
        When the page is loaded
        Then the login button should be displayed