import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Main.css';
import Sidebar from '../../components/Sidebar';
import config from '../../config';

function LeaveRequest() {
    const [formData, setFormData] = useState({
        employee_id: '',
        type: '',
        start_date: '',
        end_date: '',
        status: ''
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
            const response = await axios.get(`${config.apiUrl}/employee-signatories`);
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
                signatory_name: selectedEmployee ? selectedEmployee.signatory_name : '',
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
        if (!formData.type) {
            errors.type = 'Please select leave reason.';
        }
        if (!formData.start_date) {
            errors.start_date = 'Please set start date of leave.';
        }
        if (!formData.end_date) {
            errors.end_date = 'Please set end date of leave.';
        }
        // console.log('Errors:', errors);
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const onSubmit = async (e) => {
        // console.log('Submitting form...');
        e.preventDefault();

        // setLoading(true);
        if (validateForm()) {
            try {
                const { employee_name, signatory_name, ...formDataWithouthNames } = formData;
                const payload = {
                    employee_id: formData.employee_id,
                    type: formData.type,
                    start_date: formData.start_date,
                    end_date: formData.end_date,
                    status: formData.status || 'Pending'
                }
                const response = await axios.post(`${config.apiUrl}/employee-leave-requests`, payload);
                // console.log('Response:', response.data);
                setSuccessMessage(response.data.message);
                setShowModal(true);
                setFormData({
                    employee_name: '',
                    type: '',
                    start_date: '',
                    end_date: '',
                    status: ''
                });
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
                <h2>LEAVE REQUEST FORM</h2>
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
                                    {employees.length > 0 && (
                                        employees.map((employee) => (
                                            <option key={employee.id} value={employee.employee_name}>
                                                {employee.employee_name}
                                            </option>
                                        ))
                                    )}
                                </select>
                                {formErrors.employee_name && <div className="error">{formErrors.employee_name}</div>}
                            </div>
                        </div>

                        {formData.signatory_name && (
                            <div className="form-group">
                                <label htmlFor="right-align">Signatory</label>
                                <div className="input-container">
                                    <input
                                        // type="text" 
                                        name="signatory_name"
                                        value={formData.signatory_name}
                                        onChange={e => handleInputChange('signatory_name', e.target.value)}
                                        disabled
                                    />
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="right-align">Leave Type</label>
                            <div className="input-container">
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Leave Type</option>
                                    <option value="Vacation">Vacation</option>
                                    <option value="Sick">Sick</option>
                                    <option value="Maternity">Maternity</option>
                                    <option value="Paternity">Paternity</option>
                                </select>
                                {formErrors.type && <div className="error">{formErrors.type}</div>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="right-align">Start Date</label>
                            <div className="input-container">
                                <input
                                    id="start_date"
                                    type="date"
                                    name="start_date"
                                    value={formData.start_date}
                                    onChange={handleInputChange}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            {formErrors.start_date && <div className="error">{formErrors.start_date}</div>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="right-align">End Date</label>
                            <div className="input-container">
                                <input
                                    id="end_date"
                                    type="date"
                                    name="end_date"
                                    value={formData.end_date}
                                    onChange={handleInputChange}
                                    // min={new Date().toISOString().split('T')[0]}
                                    min={formData.start_date || new Date().toISOString().split('T')[0]}
                                />
                            {formErrors.end_date && <div className="error">{formErrors.end_date}</div>}
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


export default LeaveRequest;