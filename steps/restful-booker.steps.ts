import { createBdd } from 'playwright-bdd';
import { expect, test } from '../fixtures/fixtures.ts';
import { booking } from '../templates/restful-booking/CreateBooking.ts';
import { getInvalidBookingId } from '../helpers/booking-helper.ts';

const { Given, When, Then } = createBdd(test);

Given('the user is authenticated', async ({ request, testData }) => {
    const response = await request.post('/auth', {
        data: {
            username: process.env.bookerUser || '',
            password: process.env.bookerPassword || ''
        }
    });

    expect(response).toBeOK();
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
    expect(responseBody).toMatchObject({
        token: expect.any(String)
    });

    testData.token = responseBody.token;
});

When('the user creates a booking', async ({ request, testData }) => {
    const response = await request.post('/booking', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: booking
    });

    expect(response).toBeOK();
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody).toHaveProperty('booking');
    expect(responseBody.booking).toMatchObject(booking);
    testData.bookingId = responseBody.bookingid;
});

When('the user creates a booking with missing information', async ({request, testData}) => {
    const {firstname, lastname, ...incompleteBookingData} = booking;
    testData.response = await request.post('/booking', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: incompleteBookingData
    })
});

When('the user updates a booking', async ({ request, testData }) => {
    const updatedBookingData = {
        ...booking,
        firstname: 'UpdatedFirstName',
        lastname: 'UpdatedLastName'
    };
    const response = await request.put(`/booking/${testData.bookingId}`, {
        headers: {
            'Accept': 'application/json',
            'Cookie': `token=${testData.token}`
        },
        data: updatedBookingData
    });

    expect(response).toBeOK();
    const responseBody = await response.json();
    testData.updatedBooking = responseBody;
});

When('the user updates a booking that does not exist', async ({ request, testData }) => {
  const invalidBookingId = await getInvalidBookingId(request);
  const updatedBookingData = {
        ...booking,
        firstname: 'UpdatedFirstName',
        lastname: 'UpdatedLastName'
    };
  testData.response = await request.put(`/booking/${invalidBookingId}`, {
    headers: {
      'Accept': 'application/json',
      'Cookie': `token=${testData.token}`
    },
    data: updatedBookingData
  });

  expect(testData.response.status()).toBe(405);
});

When('the user retrieves a booking', async ({ request, testData }) => {
  const bookingIdsResponse = await request.get('/booking');
  expect(bookingIdsResponse).toBeOK();
  const bookingIdsResponseBody = await bookingIdsResponse.json();
  expect(Array.isArray(bookingIdsResponseBody)).toBeTruthy();
  expect(bookingIdsResponseBody.length).toBeGreaterThan(0);
  for (const bookingItem of bookingIdsResponseBody) {
    expect(bookingItem).toEqual(expect.objectContaining({ bookingid: expect.any(Number) }));
  }
  testData.randomBookingId = bookingIdsResponseBody[Math.floor(Math.random() * bookingIdsResponseBody.length)].bookingid;

  const response = await request.get(`/booking/${testData.randomBookingId}`);
  expect(response).toBeOK();
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('firstname');
  expect(responseBody).toHaveProperty('lastname');
  expect(responseBody).toHaveProperty('totalprice');
  expect(responseBody).toHaveProperty('depositpaid');
  expect(responseBody).toHaveProperty('bookingdates');
  expect(responseBody).toHaveProperty('additionalneeds');
  testData.bookingDetails = responseBody;
});

When('the user retrieves an invalid booking', async ({ request, testData }) => {
  const invalidBookingId = await getInvalidBookingId(request);
  testData.response = await request.get(`/booking/${invalidBookingId}`);
  expect(testData.response.status()).toBe(404);
});

When('the user deletes a booking', async ({ request, testData }) => {
  const response = await request.delete(`/booking/${testData.bookingId}`, {
    headers: {
      'Cookie': `token=${testData.token}`
    }
  });
  expect(response).toBeOK();
});

When('the user deletes a booking that does not exist', async ({ request, testData }) => {
  const invalidBookingId = await getInvalidBookingId(request);
  testData.response = await request.delete(`/booking/${invalidBookingId}`, {
    headers: {
      'Cookie': `token=${testData.token}`
    }
  });
  expect(testData.response.status()).toBe(405);
});

Then('the booking is created successfully', async ({ testData }) => {
  expect(testData.bookingId).not.toBeNull();
});

Then('the booking is updated successfully', async ({ testData }) => {
  expect(testData.updatedBooking).not.toMatchObject(booking);
});

Then('the booking details are retrieved successfully', async ({ testData }) => {
  expect(testData.bookingDetails).not.toBeNull();
});

Then('the booking is deleted successfully', async ({ request, testData }) => {
  const response = await request.delete(`/booking/${testData.bookingId}`, {
    headers: {
      'Cookie': `token=${testData.token}`
    }
  });
  expect(response.status()).toBe(405);
});

Then('the response should return a {string} status code', async ({ testData }, statusCode: string) => {
  expect(testData.response.status()).toBe(parseInt(statusCode));
});