Feature: Homepage

    Scenario: Verify logo is displayed
        Given the user navigates to home page
        When the page is loaded
        Then the logo should be displayed
    
    Scenario: Verify login button is displayed
        Given the user navigates to home page
        When the page is loaded
        Then the login button should be displayed