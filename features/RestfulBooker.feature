@restful-booker @api

Feature: Restful Booker

    @create
    Scenario: Create Booking
        Given the user is authenticated
        When the user creates a booking
        Then the booking is created successfully

    @create
    Scenario: Create Booking With Missing Information
        Given the user is authenticated
        When the user creates a booking with missing information
        Then the response should return a '500' status code
    
    @update
    Scenario: Update Booking
        Given the user is authenticated
        And the user creates a booking
        When the user updates a booking
        Then the booking is updated successfully

    @update
    Scenario: Update Non-Existing Booking
        Given the user is authenticated
        When the user updates a booking that does not exist
        Then the response should return a '405' status code 

    @get
    Scenario: Get Booking
        Given the user is authenticated
        When the user retrieves a booking
        Then the booking details are retrieved successfully

    @get
    Scenario: Get Invalid Booking
        Given the user is authenticated
        When the user retrieves an invalid booking
        Then the response should return a '404' status code 

    @delete
    Scenario: Delete Booking
        Given the user is authenticated
        And the user creates a booking
        When the user deletes a booking
        Then the booking is deleted successfully

    @delete
    Scenario: Delete Non-Existing Booking
        Given the user is authenticated
        When the user deletes a booking that does not exist
        Then the response should return a '405' status code