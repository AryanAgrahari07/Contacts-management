import axios from "axios";

const API_URL = "https://contacts-server-izso.onrender.com/api/contacts";

// Fetch all contacts
const getContacts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Add a new contact
const addContact = async (contact) => {
  console.log("Request payload:", contact);
  try {
    const response = await axios.post(`${API_URL}`, contact, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding contact:", error.response?.data || error.message);
    throw error;
  }
};


// Update an existing contact
const updateContact = async (id, contact) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, contact);
    return response.data;
  } catch (error) {
    console.error('Error updating contact:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Delete a contact
const deleteContact = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting contact:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default { getContacts, addContact, updateContact, deleteContact };
