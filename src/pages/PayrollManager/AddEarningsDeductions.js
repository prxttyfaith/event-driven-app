//../src/pages/AddEarningsDeductions.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Main.css';
import Sidebar from '../../components/Sidebar';
import config from '../../config';

function AddEarningsDeductions() {
    // let currentDate = new Date();
    // currentDate.setHours(currentDate.getHours() + 8);

    const currentDate = () => {
        let currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 8);
        return currentDate;
    }

    const [formData, setFormData] = useState({
        employee_id: '',
        type: '',
        start_date: '',
        end_date: '',
        status: '',
        earningsType: '',
        deductionsType: '',
        amount: '',
        date: '',
        earningsDeductions: '',
        employee_name: ''
    });

    // const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [employees, setEmployees] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [formErrors, setFormErrors] = useState({
        employee_name: '',
        type: '',
        start_date: '',
        end_date: ''
    });

    useEffect(() => {
        fetchEmployeeSignatory();
    }, []);

    const fetchEmployeeSignatory = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/employees/employee-pays`);
            // console.log('Employee Signatory:', response.data);
            setEmployees(response.data.data);
        } catch (error) {
            console.error('Error fetching signatory:', error);
            setEmployees([]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'employee_name') {
            const selectedEmployee = employees.find((employee) => employee.employee_name === value);
            setFormData({
                ...formData,
                employee_id: selectedEmployee ? selectedEmployee.employee_id : '',
                [name]: value
            });
            setFormErrors({
                ...formErrors,
                employee_name: ''
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
            setFormErrors({
                ...formErrors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        console.log('Validating form...');
        let errors = {};
        if (!formData.employee_name) {
            errors.employee_name = 'Please select an employee.';
        }
        if (!formData.earningsDeductions) {
            errors.earningsDeductions = 'Please select earnings or deductions.';
        } else {
            if (formData.earningsDeductions === 'add-earnings') {
                if (!formData.earningsType) {
                    errors.earningsType = 'Please select earnings type.';
                }
                else if (formData.earningsDeductions === 'add-deductions') {
                    if (!formData.deductionsType) {
                        errors.deductionsType = 'Please select deductions type.';
                    }
                }
            }
        }
        if (!formData.amount) {
            errors.amount = 'Please enter amount.';
        }
        // if (!formData.date) {
        //     errors.date = 'Please set date.';
        // }
        console.log('Errors:', errors);
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const onSubmit = async (e) => {
        // console.log('Submitting form...');
        e.preventDefault();

        // setLoading(true);
        if (validateForm()) {
            try {
                const { employee_name, ...formDataWithouthNames } = formData;
                if (formData.earningsDeductions === 'add-deductions') {
                    const payload = {
                        employee_id: formData.employee_id,
                        type: formData.deductionsType,
                        amount: -Math.abs(formData.amount),
                        date: formData.date || currentDate().toISOString().split('T')[0]
                    }
                    const response = await axios.post(`${config.apiUrl}/employee-payrolls/deductions`, payload);
                    // console.log('Response:', response.data);
                    setSuccessMessage(response.data.message);
                    setShowModal(true);
                    setFormData({
                        employee_name: '',
                        type: '',
                        amount: '',
                        date: ''
                    });
                }
                else {
                    const payload = {
                        employee_id: formData.employee_id,
                        type: formData.earningsType,
                        amount: formData.amount,
                        date: formData.date || currentDate().toISOString().split('T')[0]
                    }
                    const response = await axios.post(`${config.apiUrl}/employee-payrolls/earnings`, payload);
                    // console.log('Response:', response.data);
                    setSuccessMessage(response.data.message);
                    setShowModal(true);
                    setFormData({
                        employee_name: '',
                        type: '',
                        amount: '',
                        date: ''
                    });
                }
            } catch (error) {
                console.error('Error on form submission:', error);
                setErrorMessage(error.message);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            employee_name: '',
            type: '',
            start_date: '',
            end_date: '',
            status: ''
        });
    };

    const closeModal = () => {
        setShowModal(false);
        setSuccessMessage('');
    };

    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="table-container">
                <h2>ADD EARNINGS | DEDUCTIONS</h2>
                {/* {loading && <div>Loading...</div>} */}
                {errorMessage && <div className="error">{errorMessage}</div>}
                <br />
                <div>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="right-align">Employee Name</label>
                            <div className="input-container">
                                <select
                                    name="employee_name"
                                    value={formData.employee_name}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Employee</option>
                                    {/* {employees.length > 0 && (
                                        employees.map((employee) => (
                                            <option key={employee.id} value={employee.employee_name}>
                                                {employee.employee_name}
                                            </option>
                                        ))
                                    )} */}
                                    {employees.length > 0 && (
                                        employees.map((employee) => (
                                            <option key={employee.employee_id} value={employee.employee_name}>
                                                {employee.employee_name}
                                            </option>
                                        ))
                                    )}
                                                                    </select>
                                {formErrors.employee_name && <div className="error">{formErrors.employee_name}</div>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="right-align">Earnings/Deductions</label>
                            <div className="input-container">
                                <select
                                    name="earningsDeductions"
                                    value={formData.earningsDeductions}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select</option>
                                    <option value="add-earnings">Add Earnings</option>
                                    <option value="add-deductions">Add Deductions</option>
                                </select>
                                {formErrors.earningsDeductions && <div className="error">{formErrors.earningsDeductions}</div>}
                            </div>
                        </div>

                        {/* if add earnings is selected */}
                        {formData.earningsDeductions === 'add-earnings' && (

                            <div className="form-group">
                                <label htmlFor="right-align">Earning Type</label>
                                <div className="input-container">
                                    <select
                                        name="earningsType"
                                        value={formData.earningsType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Earning Type</option>
                                        <option value="Overtime">Overtime</option>
                                        <option value="Bonus">Bonus</option>
                                        <option value="Refund">Refund</option>
                                    </select>
                                    {formErrors.earningsType && <div className="error">{formErrors.earningsType}</div>}
                                </div>
                            </div>

                        )}

                        {formData.earningsDeductions === 'add-deductions' && (

                            <div className="form-group">
                                <label htmlFor="right-align">Deduction Type</label>
                                <div className="input-container">
                                    <select
                                        name="deductionsType"
                                        value={formData.deductionsType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Deduction Type</option>
                                        <option value="Absent">Absent</option>
                                        <option value="Cash Advance">Cash Advance</option>
                                    </select>
                                    {formErrors.deductionsType && <div className="error">{formErrors.deductionsType}</div>}
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="right-align">Amount</label>
                            <div className="input-container">
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    placeholder='000.00'
                                />                         
                                {formErrors.amount && <div className="error">{formErrors.amount}</div>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="right-align">Date</label>
                            <div className="input-container">
                                <input
                                    id="date"
                                    type="date"
                                    name="date"
                                    value={formData.date || currentDate().toISOString().split('T')[0]}
                                    onChange={handleInputChange}                  
                                />
                            {formErrors.date && <div className="error">{formErrors.date}</div>}
                            </div>
                        </div>

                        <div className="form-group">
                            <button type="submit">Submit</button>
                        </div>
                        <div className="form-group">
                            <button type="button" className="cancel-button" onClick={resetForm}>Cancel</button>
                        </div>
                    </form>
                </div>
                {showModal && (
                    <div className="modal" onClick={handleModalClick}>
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>&times;</span>
                            <p>{successMessage}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

}

export default AddEarningsDeductions;