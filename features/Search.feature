@search

Feature: Search

    Scenario Outline: Verify Search Results Are Displayed
        Given the user navigates to home page
        When the user inputs '<destination>' as the destination
        And sets '<departure>' as the departure date
        And sets '<return>' as the return date
        And selects '<cabinclass>' as the cabin class
        And clicks the search button
        Then the search results should be displayed
    
    Examples:
    | destination | departure    | return       | cabinclass |
    | Boracay     | July 27 2026 | July 31      | Economy    |