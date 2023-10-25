const Train = require('../models/train');

exports.createTrain = async (req, res) => {
    try {
        const train = new Train(req.body);
        await train.save();
        res.status(201).send(train);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getTrains = async (req, res) => {
    try {
        const trains = await Train.find();
        res.send(trains);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getTrain = async (req, res) => {
    try {
        const train = await Train.findById(req.params.id);
        if (!train) {
            return res.status(404).send();
        }
        res.send(train);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateTrain = async (req, res) => {
    try {
        const train = await Train.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!train) {
            return res.status(404).send();
        }
        res.send(train);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteTrain = async (req, res) => {
    try {
        const train = await Train.findByIdAndDelete(req.params.id);
        if (!train) {
            return res.status(404).send();
        }
        res.send(train);
    } catch (error) {
        res.status(500).send(error);
    }
};
