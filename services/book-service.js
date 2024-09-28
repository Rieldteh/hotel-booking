const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class BookService {
    async createBooking(userId, roomId, startDate, endDate) {
        try {
            const booking = await prisma.booking.create({
                data: {
                  userId,
                  roomId,
                  startDate: new Date(startDate),
                  endDate: new Date(endDate)
                }
            });

            return { statusCode: 200, result: booking, message: `Successful create booking "${booking}"` };

        } catch(err) {
            return { statusCode: 500, result: null, message: `Server error: ${err}` };
        }
    }

    async getBookings(userId) {
        try {
            const bookings = await prisma.booking.findMany({
                where: { userId: userId },
                include: { room: true },
            });

            return { statusCode: 200, result: bookings, message: `Found ${bookings.length} room(s)` };

        } catch(err) {
            return { statusCode: 500, result: null, message: `Server error: ${err}` };
        }
    } 
}

module.exports = new BookService();