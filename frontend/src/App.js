// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactsTable from "./components/ContactsTable";
import EditContact from "./components/EditContact";
import ContactForm from "./components/ContactForm";
import axios from "axios";

const App = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ContactForm fetchContacts={fetchContacts} />
                <ContactsTable
                  contacts={contacts}
                  fetchContacts={fetchContacts}
                />
              </>
            }
          />
          <Route path="/edit-contact/:id" element={<EditContact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
