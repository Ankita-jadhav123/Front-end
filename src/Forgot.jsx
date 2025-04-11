import React, { useState } from "react";
import "./Forgot.css";

const Forgot = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="Forgot-container">
      <form className="Forgot-form" onSubmit={onFormSubmit}>
        <h2>Forgot Password</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
         <button type="Submit">Forgot Password</button>
        
      </form>
    </div>
  );
};

export default Forgot;
