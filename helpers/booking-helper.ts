export async function getInvalidBookingId( request: any): Promise<number> {
    const response = await request.get('/booking');
    const bookingIdsResponseBody = await response.json();
    const bookingIds = bookingIdsResponseBody.map((booking: any) => booking.bookingid);

    let invalidBookingId = 1;
    for (let i = 1; i <= bookingIds.length; i++) {
        if (!bookingIds.includes(i)) {
            invalidBookingId = i;
            break;
        }
    }

    return invalidBookingId;
}