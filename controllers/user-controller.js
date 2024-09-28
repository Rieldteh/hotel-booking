const userService = require('../services/user-service');

class UserController {
    async register(req, res, next) {
        const data = req.body;
        
        if (data === undefined) {
            return res.status(400).json({ result: null, message: "Error get data" });
        }

        if (data.email === undefined || typeof data.email !== 'string') {
            return res.status(400).json({ result: null, message: "Email is required and must be a string" });
        }

        if (data.password === undefined || typeof data.password !== 'string') {
            return res.status(400).json({ result: null, message: "Password is required and must be a string" });
        }

        if (data.name === undefined || typeof data.name !== 'string') {
            return res.status(400).json({ result: null, message: "Name is required and must be a string" });
        }

        const { statusCode, result, message } = await userService.register(data.email, data.password, data.name);
        return res.status(statusCode).json({ result, message });
    }

    async login(req, res, next) {
        const data = req.body;
        
        if (data === undefined) {
            return res.status(400).json({ result: null, message: "Error get data" });
        }

        if (data.email === undefined || typeof data.email !== 'string') {
            return res.status(400).json({ result: null, message: "Email is required and must be a string" });
        }

        if (data.password === undefined || typeof data.password !== 'string') {
            return res.status(400).json({ result: null, message: "Password is required and must be a string" });
        }

        const { statusCode, result, message } = await userService.login(data.email, data.password);

        if (statusCode === 200) {
            res.cookie('token', result, {
                httpOnly: true,
                secure: process.env.COOKIE_SECURE === 'production',
                sameSite: 'strict',
                maxAge: 3600000 * 24 * 30
            });
        }

        return res.status(statusCode).json({ result, message });
    }

    async logout(req, res, next) {
        res.clearCookie('token');
        res.status(200).json({ message: "User successfully logged out"});
    }

}

module.exports = new UserController();