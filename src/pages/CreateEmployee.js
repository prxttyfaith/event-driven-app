// ./src/pages/EmployeeManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CreateEmployee.css';
import Sidebar from '../components/Sidebar';

function CreateEmployee() {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    birthdate: '',
    address_line: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    designation_id: '',
    employee_type: '',
    status: ''
    // department_name: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [designations, setDesignations] = useState('');

  useEffect(() => {
    fetchDesignations();
  }, []);

  const fetchDesignations = async () => {
    try {
      const response = await axios.get('http://localhost:3000/employee-designations');
      console.log('Designations:', response.data);
      setDesignations(response.data.data);
    } catch (error) {
      console.error('Error fetching designations:', error);
      setDesignations([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'designation_name') {
      const selectedDesignation = designations.find((designation) => designation.designation_name === value);
      setFormData({
        ...formData,
        [name]: value,
        department_name: selectedDesignation ? selectedDesignation.department_name : ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setLoading(true);
    try {
      const selectedDesignation = designations.find((designation) => designation.designation_name === formData.designation_name);
      const designationId = selectedDesignation ? selectedDesignation.id : null;
      const employeeData = { ...formData, designation_id: designationId };

      const response = await axios.post('http://localhost:3000/employees', employeeData);
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
        zip_code: '',
        designation_name: '',
        employee_type: '',
        status: ''
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
      <div className="create-employee-container">
        <div className="heading">
          <h2>Employee Form</h2>
        </div>
        {loading && <div>Loading...</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}
        <br />
        <div>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                placeholder="First Name"
              />
            </div>

            <div className="form-group">
              <label>Middle Name</label>
              <input
                type="text"
                name="middle_name"
                value={formData.middle_name}
                onChange={handleInputChange}
                placeholder="Middle Name"
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
            </div>

            <div className="form-group">
              <label>Birthdate</label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleInputChange}
                placeholder="Birthdate"
              />
            </div>

            <div className="form-group">
              <label>Address Line</label>
              <input
                type="text"
                name="address_line"
                value={formData.address_line}
                onChange={handleInputChange}
                placeholder="Address Line"
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
              />
            </div>

            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Country"
              />
            </div>

            <div className="form-group">
              <label>Zip Code</label>
              <input
                type="text"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleInputChange}
                placeholder="Zip Code"
              />
            </div>


              <div className="des-dep">
                <label>Designation</label>
                <select
                  name="designation_name"
                  value={formData.designation_name}
                  onChange={handleInputChange}
                >
                  <option value="">Select Designation</option>
                  {designations.length > 0 && (
                    designations.map((designation) => (
                      <option key={designation.id} value={designation.designation_name}>
                        {designation.designation_name}
                      </option>
                    ))
                  )}
                </select>

                {formData.department_name && (
                  <div className="form-group">
                    <label htmlFor="department_name">Department:</label>
                    <input
                      // type="text" 
                      name="department_name"
                      value={formData.department_name}
                      onChange={e => handleInputChange('department_name', e.target.value)}
                      disabled
                    />
                  </div>
                )}
              </div>

            <div className="form-group">
              <label>Employee Type</label>
              <select
                name="employee_type"
                value={formData.employee_type}
                onChange={handleInputChange}
              >
                <option value="">Select Employee Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Resigned">Resigned</option>
                <option value="AWOL">AWOL</option>
              </select>
            </div>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEmployee;
