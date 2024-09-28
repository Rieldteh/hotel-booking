const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class HotelService {
    async createHotel(name, description, address) {
        try {
            const hotel = await prisma.hotel.create({
                data: { name, description, address },
            });

            return { statusCode: 200, result: hotel, message: `Successful create hotel "${hotel}"` };

        } catch(err) {
            return { statusCode: 500, result: null, message: `Server error: ${err}` };
        }
    }

    async createRoom(number, type, price, hotelId) {
        try {
            const room = await prisma.room.create({
                data: { number, type, price, hotelId },
            });

            return { statusCode: 200, result: room, message: `Successful create room "${room}"` };

        } catch(err) {
            return { statusCode: 500, result: null, message: `Server error: ${err}` };
        }
    } 
}

module.exports = new HotelService();