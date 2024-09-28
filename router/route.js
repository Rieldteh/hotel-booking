const userMiddleWare = require('../middlewares/user-middleware');
const userController = require('../controllers/user-controller');
const bookController = require('../controllers/book-controller');
const hotelController = require('../controllers/hotel-controller');
const router = require('express').Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userMiddleWare.verifyToken, userController.logout);

router.post('/bookings', userMiddleWare.verifyToken, bookController.createBooking);
router.get('/bookings', userMiddleWare.verifyToken, bookController.getBookings);

router.post('/hotels', userMiddleWare.verifyToken, hotelController.createHotel);
router.post('/rooms', userMiddleWare.verifyToken, hotelController.createRoom);


module.exports = router;