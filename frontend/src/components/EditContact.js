// frontend/src/components/EditContact.js
import React, { useState, useEffect } from "react";
import { TextField, Button, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    jobTitle: "",
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/contacts/${id}`
        );
        setContact(response.data);
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };
    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/contacts/${id}`, contact);
      navigate("/");
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  return (
    <Container>
      <h2>Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          name="firstName"
          label="First Name"
          value={contact.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={contact.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="email"
          label="Email"
          value={contact.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          value={contact.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="company"
          label="Company"
          value={contact.company}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="jobTitle"
          label="Job Title"
          value={contact.jobTitle}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
    </Container>
  );
};

export default EditContact;
