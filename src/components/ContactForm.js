import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";

const ContactForm = ({ onSubmit, initialData, buttonLabel }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.firstName);
      setLastName(initialData.lastName);
      setEmail(initialData.email);
      setPhoneNumber(initialData.phoneNumber);
      setCompany(initialData.company);
      setJobTitle(initialData.jobTitle);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const contactData = { firstName, lastName, email, phoneNumber, company, jobTitle };
    onSubmit(contactData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          label="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <TextField
          label="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <Button type="submit" variant="contained">
          {buttonLabel}
        </Button>
      </Box>
    </form>
  );
};

export default ContactForm;
