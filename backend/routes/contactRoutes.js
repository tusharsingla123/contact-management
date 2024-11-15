// backend/routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST /contacts - Add a new contact
router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /contacts - Get all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /contacts/:id - Update a contact
router.put("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /contacts/:id - Delete a contact
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
