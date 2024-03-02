// ./src/pages/EmployeeManager.js
import React, { useState } from 'react';
import axios from 'axios';
// import '../styles/EmployeeManager.css';
import Sidebar from '../components/Sidebar';

function EmployeeManager() {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    birthdate: '',
    address_line: '',
    city: '',
    state: '',
    country: '',
    zip_code: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/employee', formData);
      console.log('Response:', response.data); // Optionally, handle response data
      setFormData({
        first_name: '',
        middle_name: '',
        last_name: '',
        birthdate: '',
        address_line: '',
        city: '',
        state: '',
        country: '',
        zip_code: ''
      }); // Reset form fields upon successful submission
      setErrorMessage('');
    } catch (error) {
      console.error('Error submitting employee:', error);
      setErrorMessage('Error submitting employee. Please try again.');
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };
  
  return (
    <div>
      <Sidebar />
      <center>
        <h1>EDP</h1>
        <h2><center>Employee Manager</center></h2>
      </center>
      {loading && <div>Loading...</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={onSubmit}>
        <div>
          <label>First Name</label>
          <input 
            type="text" 
            name="first_name" 
            value={formData.first_name} 
            onChange={handleInputChange} 
            placeholder="First Name" 
          />
        </div>
        
        <div>
          <label>Middle Name</label>
          <input 
            type="text" 
            name="middle_name" 
            value={formData.middle_name} 
            onChange={handleInputChange} 
            placeholder="Middle Name" 
          />
        </div>
        
        <div>
          <label>Last Name</label>
          <input 
            type="text" 
            name="last_name" 
            value={formData.last_name} 
            onChange={handleInputChange} 
            placeholder="Last Name" 
          />
        </div>
        
        <div>
          <label>Birthdate</label>
          <input 
            type="date" 
            name="birthdate" 
            value={formData.birthdate} 
            onChange={handleInputChange} 
            placeholder="Birthdate" 
          />
        </div>
        
        <div>
          <label>Address Line</label>
          <input 
            type="text" 
            name="address_line" 
            value={formData.address_line} 
            onChange={handleInputChange} 
            placeholder="Address Line" 
          />
        </div>
        
        <div>
          <label>City</label>
          <input 
            type="text" 
            name="city" 
            value={formData.city} 
            onChange={handleInputChange} 
            placeholder="City" 
          />
        </div>
        
        <div>
          <label>State</label>
          <input 
            type="text" 
            name="state" 
            value={formData.state} 
            onChange={handleInputChange} 
            placeholder="State" 
          />
        </div>
        
        <div>
          <label>Country</label>
          <input 
            type="text" 
            name="country" 
            value={formData.country} 
            onChange={handleInputChange} 
            placeholder="Country" 
          />
        </div>
        
        <div>
          <label>Zip Code</label>
          <input 
            type="text" 
            name="zip_code" 
            value={formData.zip_code} 
            onChange={handleInputChange} 
            placeholder="Zip Code" 
          />
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EmployeeManager;
