@restful-booker @api

Feature: Restful Booker

    @create
    Scenario: Create Booking
        Given the user is authenticated
        When the user creates a booking
        Then the booking is created successfully
    
    @update
    Scenario: Update Booking
        Given the user is authenticated
        And the user creates a booking
        When the user updates a booking
        Then the booking is updated successfully

    @get
    Scenario: Get Booking
        Given the user is authenticated
        When the user retrieves a booking
        Then the booking details are retrieved successfully

    @delete
    Scenario: Delete Booking
        Given the user is authenticated
        And the user creates a booking
        When the user deletes a booking
        Then the booking is deleted successfully