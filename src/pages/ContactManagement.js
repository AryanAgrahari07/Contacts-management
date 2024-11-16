import React, { useState, useEffect } from "react";
import ContactForm from "../components/ContactForm";
import ContactTable from "../components/ContactTable";
import { Container, Box } from "@mui/material";
import axios from "axios";

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  // fetching initial contacts 
  const fetchContacts = async () => {
    try {
      const response = await axios.get("https://contacts-server-izso.onrender.com/api/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);



  // Handling add or update
  const handleAddOrUpdate = async (contactData) => {
    try {
      const { firstName, lastName, email, phoneNumber, company, jobTitle } = contactData;
      const payload = { firstName, lastName, phoneNumber, email, company, jobTitle };

      const check = await validateEmail(email);  // check user exists or not

      let response;
      if (!check) {
        // POST request if email not exist
        response = await axios.post("https://contacts-server-izso.onrender.com/api/contacts", payload);
      } else {
        // PUT request if email exists
        response = await axios.put(`https://contacts-server-izso.onrender.com/api/contacts/${email}`, payload);
      }

      const updatedContact = response.data;


      if (!check) {
        setContacts((prevContacts) => [...prevContacts, updatedContact]); // Add new contact
      } else {
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact._id === updatedContact._id ? updatedContact : contact
          )
        ); // Update existing contact
      }
    } catch (error) {
      console.error("Error in handleAddOrUpdate:", error.message);
    }
  };

  // Validating email
  const validateEmail = async (email) => {
    try {
      const response = await axios.get(`https://contacts-server-izso.onrender.com/api/contacts/validate-email/${email}`);
      return response.data.exists;
    } catch (error) {
      console.error("Error validating email:", error.message);
      return false;
    }
  };



  // Handle editing a contact
  const handleEdit = (contact) => {
    setEditingContact(contact);
    fetchContacts();
  };



  return (
    <Container>
      <h1>Contact Form</h1>
      <Box sx={{ marginBottom: 2 }}>
        <ContactForm
          onSubmit={handleAddOrUpdate}
          initialData={editingContact}
          buttonLabel={editingContact ? "Update Contact" : "Add Contact"}
        />
      </Box>

      <br/>
      <h1>Contacts List</h1>
      <ContactTable
        contacts={contacts}
        onEdit={handleEdit}
        onDelete={fetchContacts} // Re-fetching contacts after deletion
      />
    </Container>
  );
};

export default ContactManagement;
