const hotelController = require('../services/hotel-service');

class HotelController {
    async createHotel(req, res, next) {
        const data = req.body;
        
        if (data === undefined) {
            return res.status(400).json({ result: null, message: "Error get data" });
        }

        if (data.name === undefined || typeof data.name !== 'string') {
            return res.status(400).json({ result: null, message: "Name is required and must be a string" });
        }

        if (data.description === undefined || typeof data.description !== 'string') {
            return res.status(400).json({ result: null, message: "Description is required and must be a string" });
        }

        if (data.address === undefined || typeof data.address !== 'string') {
            return res.status(400).json({ result: null, message: "Address is required and must be a string" });
        }

        const { statusCode, result, message } = await hotelController.createHotel(data.name, data.description, data.address);
        return res.status(statusCode).json({ result, message });
    }

    async createRoom(req, res, next) {
        const data = req.body;
        
        if (data === undefined) {
            return res.status(400).json({ result: null, message: "Error get data" });
        }

        if (data.number === undefined || typeof data.number !== 'string') {
            return res.status(400).json({ result: null, message: "Number is required and must be a string" });
        }

        if (data.type === undefined || typeof data.type !== 'string') {
            return res.status(400).json({ result: null, message: "Type is required and must be a string" });
        }

        if (data.price === undefined || !Number.isInteger(data.price)) {
            return res.status(400).json({ result: null, message: "Price is required and must be a integer" });
        }

        if (data.hotelId === undefined || !Number.isInteger(data.hotelId)) {
            return res.status(400).json({ result: null, message: "HotelId is required and must be a integer" });
        }

        const { statusCode, result, message } = await hotelController.createRoom(data.number, data.type, data.price, data.hotelId);
        return res.status(statusCode).json({ result, message });
    }

}

module.exports = new HotelController();