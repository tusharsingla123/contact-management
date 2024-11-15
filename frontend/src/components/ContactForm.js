import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

const ContactForm = ({ fetchContacts }) => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    jobTitle: "",
  });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/contacts", contact);
      fetchContacts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="firstName" label="First Name" onChange={handleChange} />
      <TextField name="lastName" label="Last Name" onChange={handleChange} />
      <TextField name="email" label="Email" onChange={handleChange} />
      <TextField
        name="phoneNumber"
        label="Phone Number"
        onChange={handleChange}
      />
      <TextField name="company" label="Company" onChange={handleChange} />
      <TextField name="jobTitle" label="Job Title" onChange={handleChange} />
      <Button type="submit" variant="contained">
        Add Contact
      </Button>
    </form>
  );
};

export default ContactForm;
