const bookController = require('../services/book-service');

class BookController {
    async createBooking(req, res, next) {
        const data = req.body;
        
        if (data === undefined) {
            return res.status(400).json({ result: null, message: "Error get data" });
        }

        if (data.roomId === undefined || !Number.isInteger(data.roomId)) {
            return res.status(400).json({ result: null, message: "RoomId is required and must be a integer" });
        }

        if (data.startDate === undefined || isNaN(Date.parse(data.startDate))) {
            return res.status(400).json({ result: null, message: "StartDate is required and must be a Date" });
        }

        if (data.endDate === undefined || isNaN(Date.parse(data.endDate))) {
            return res.status(400).json({ result: null, message: "EndDate is required and must be a Date" });
        }

        const { statusCode, result, message } = await bookController.createBooking(req.userId, data.roomId, data.startDate, data.endDate);
        return res.status(statusCode).json({ result, message });
    }

    async getBookings(req, res, next) {
        const { statusCode, result, message } = await bookController.getBookings(req.userId);
        return res.status(statusCode).json({ result, message });
    }

}

module.exports = new BookController();