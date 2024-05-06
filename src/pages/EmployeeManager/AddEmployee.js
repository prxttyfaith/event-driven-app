// ./src/pages/AddEmployee.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Main.css';
import Sidebar from '../../components/Sidebar';
import config from '../../config';
import calculateMonthlyPagibigContribution from '../../utils/PagibigContributionCalculator';
import calculateMonthlyPhilHealthContribution from '../../utils/PhilhealthContributionCalculator';
import calculateMonthlySSSContribution from '../../utils/SssContributionCalculator';
import calculateMonthlyWithholdingTax from '../../utils/WithholdingTaxCalculator';

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
    status: '',
    salary: '',
    pagibig: '',
    philhealth: '',
    sss: '',
    wh_tax: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [designations, setDesignations] = useState('');

  useEffect(() => {
    fetchDesignations();
  }, []);

  const setPagibigContribution = (salary) => {
    const pagibigContribution = calculateMonthlyPagibigContribution(salary);
    return pagibigContribution;
  };

  const setPhilhealthContribution = (salary) => {
    const philhealthContribution = calculateMonthlyPhilHealthContribution(salary);
    return philhealthContribution;
  };

  const setSSSContribution = (salary) => {
    const sssContribution = calculateMonthlySSSContribution(salary);
    return sssContribution;
  };

  const setWithholdingTax = (salary) => {
    const withHoldingTax = calculateMonthlyWithholdingTax(salary);
    return withHoldingTax;
  };

  const fetchDesignations = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/employee-designations`);
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
      const payload = {
        ...formData, designation_id: designationId,
        pagibig: setPagibigContribution((formData.salary)),
        philhealth: setPhilhealthContribution((formData.salary)),
        sss: setSSSContribution((formData.salary)),
        wh_tax: setWithholdingTax((formData.salary))
      };
      // console.log('Employee data:', payload);
      const response = await axios.post(`${config.apiUrl}/employees`, payload);
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
        status: '',
        salary: '',
        pagibig: '',
        philhealth: '',
        sss: '',
        wh_tax: ''     
      }); // Reset form fields upon successful submission
      setErrorMessage('');
      alert('New Employee has been added successfully');
    } catch (error) {
      console.error('Error submitting employee:', error);
      setErrorMessage('Error submitting employee. Please try again.');
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  const resetForm = () => {
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
      status: '',
      salary: '',
      pagibig: '',
      philhealth: '',
      sss: '',
      wh_tax: ''
    });
  };


  return (
    <div >
      <Sidebar />
      <div className="table-container">
        <h2>EMPLOYEE FORM</h2>
        {loading && <div>Loading...</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}
        <br />
        <div>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="right-align">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                placeholder="First Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="right-align">Middle Name</label>
              <input
                type="text"
                name="middle_name"
                value={formData.middle_name}
                onChange={handleInputChange}
                placeholder="Middle Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="right-align">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="right-align">Birthdate</label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleInputChange}
                placeholder="Birthdate"
              />
            </div>

            <div className="form-group">
              <label htmlFor="right-align">Address Line</label>
              <input
                type="text"
                name="address_line"
                value={formData.address_line}
                onChange={handleInputChange}
                placeholder="Address Line"
              />
            </div>

            <div className="form-group">
              <label htmlFor="right-align">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
              />
            </div>

            <div className="form-group">
              <label htmlFor="right-align">Province</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Province"
              />
            </div>

            <div className="form-group">
              <label htmlFor="right-align">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Country"
              />
            </div>

            <div className="form-group">
              <label htmlFor="right-align">Zip Code</label>
              <input
                type="text"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleInputChange}
                placeholder="Zip Code"
              />
            </div>

            <div className="form-group">
              <label htmlFor="right-align">Designation</label>
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
            </div>

              {formData.department_name && (
                <div className="form-group">
                  <label htmlFor="right-align">Department</label>
                  <input
                    // type="text" 
                    name="department_name"
                    value={formData.department_name}
                    onChange={e => handleInputChange('department_name', e.target.value)}
                    disabled
                  />
                </div>
              )}

            <div className="form-group">
              <label htmlFor="right-align">Employee Type</label>
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
              <label htmlFor="right-align">Status</label>
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
            
            <div className="form-group">
              <label htmlFor="right-align">Monthly Salary</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="Monthly Salary"
              />
            </div>

            <div className="form-group">
                <button type="submit">Submit</button>
            </div>
            <div className="form-group">
              <button type="button" className="cancel-button" onClick={resetForm}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEmployee;
