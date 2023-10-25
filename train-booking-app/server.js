const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const trainRoutes = require('./routes/trainRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/train-booking', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middlewares
app.use(express.json());
app.use('/users', userRoutes);
app.use('/trains', trainRoutes);
app.use('/bookings', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
