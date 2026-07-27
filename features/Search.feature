@search

Feature: Search

    Scenario: Verify Search Results Are Displayed
        Given the user navigates to home page
        When the user inputs 'Boracay' as the destination
        And sets 'August 2 2026' as the departure date
        And sets 'August 8' as the return date
        And selects 'Economy' as the cabin class
        And clicks the search button
        Then the search results should be displayed

    Scenario Outline: Verify Flight Types Are Displayed
        Given the user navigates to home page
        When the user inputs 'Boracay' as the destination
        And sets 'August 2 2026' as the departure date
        And sets 'August 8' as the return date
        And selects 'Economy' as the cabin class
        And clicks the search button
        Then the search results should have '<type>' flights displayed

        Examples:
        |type    |
        |Best    |
        |Cheapest|

    Scenario: Search Flights By Explore
        Given the user navigates to home page
        And sets 'August 2 2026' as the departure date
        And sets 'August 8' as the return date
        And selects 'Economy' as the cabin class
        And clicks the search button
        When the user clicks the Explore button
        And selects a random destination
        And views flights
        Then the flights should be displayed
    
    Scenario: Search Flights Without Dates
        Given the user navigates to home page
        When the user clicks the search button
        Then the error modal should be displayed

    Scenario: Search Flights Without Airport
        Given the user navigates to home page
        When the user sets 'August 2 2026' as the departure date
        And sets 'August 8' as the return date
        And selects 'Economy' as the cabin class
        And clicks the search button
        Then the no airport selected modal should be displayed