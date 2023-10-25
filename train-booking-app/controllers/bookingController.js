const Booking = require('../models/booking');
const Train = require('../models/train');

exports.createBooking = async (req, res) => {
    try {
        const train = await Train.findById(req.body.trainId);
        if (!train) {
            return res.status(404).send({ error: 'Train not found' });
        }

        if (train.seats < 1) {
            return res.status(400).send({ error: 'No seats available' });
        }

        const booking = new Booking({
            user: req.user.id,
            train: req.body.trainId,
            date: req.body.date
        });
        
        await booking.save();

        train.seats -= 1;
        await train.save();

        res.status(201).send(booking);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('train');
        res.send(bookings);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).send({ error: 'Booking not found' });
        }

        if (String(booking.user) !== req.user.id) {
            return res.status(403).send({ error: 'Access denied' });
        }

        await booking.remove();

        const train = await Train.findById(booking.train);
        train.seats += 1;
        await train.save();

        res.send({ message: 'Booking canceled' });
    } catch (error) {
        res.status(500).send(error);
    }
};
