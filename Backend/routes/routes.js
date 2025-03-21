const express = require("express");
const router = express.Router();
const { Destination } = require("../models/schema");

// Fetch all destinations (READ)
router.get("/destinations", async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Fetch a single destination by ID (READ)
router.get("/destinations/:id", async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).json({ message: "Destination not found" });
        }
        res.json(destination);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Add a new destination (CREATE)
router.post("/destinations", async (req, res) => {
    try {
        const { destinationID, name, location, description, rating } = req.body;
        const newDestination = new Destination({ destinationID, name, location, description, rating });
        await newDestination.save();
        res.status(201).json({ message: "Destination added successfully", newDestination });
    } catch (error) {
        res.status(400).json({ message: "Error adding destination", error });
    }
});

// Update a destination by ID (UPDATE)
router.put("/destinations/:id", async (req, res) => {
    try {
        const updatedDestination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDestination) {
            return res.status(404).json({ message: "Destination not found" });
        }
        res.json({ message: "Destination updated successfully", updatedDestination });
    } catch (error) {
        res.status(400).json({ message: "Error updating destination", error });
    }
});

// Delete a destination by ID (DELETE)
router.delete("/destinations/:id", async (req, res) => {
    try {
        const deletedDestination = await Destination.findByIdAndDelete(req.params.id);
        if (!deletedDestination) {
            return res.status(404).json({ message: "Destination not found" });
        }
        res.json({ message: "Destination deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting destination", error });
    }
});

module.exports = router;
