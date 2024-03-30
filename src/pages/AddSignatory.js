import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CreateForm.css';
import Sidebar from '../components/Sidebar';
import config from '../config';

function AddSignatory() {
    const [formData, setFormData] = useState({
        employee_name: '',
        // signatory_name: '',
        signatory_status: ''
    });
    // const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [employees, setEmployees] = useState([]);
    const [signatories, setSignatories] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [formErrors, setFormErrors] = useState({
        employee_name: '',
        signatory_name: '',
        signatory_status: ''
    });

    useEffect(() => {
        fetchEmployeeSignatory();
    }, []);

    const fetchEmployeeSignatory = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/employee-signatories/signatory`);
            // console.log('Employee Signatory:', response.data);
            setEmployees(response.data.data);
            setSignatories(response.data.data);
        } catch (error) {
            console.error('Error fetching signatory:', error);
            setEmployees([]);
            setSignatories([]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'employee_name') {
            const selectedEmployee = employees.find((employee) => employee.employee_name === value);
            setFormData({
                ...formData,
                employee_id: selectedEmployee ? selectedEmployee.id : '',
                [name]: value
            });
        } else if (name === 'signatory_name') {
            const selectedSignatory = signatories.find((signatory) => signatory.signatory_name === value);
            setFormData({
                ...formData,
                signatory: selectedSignatory ? selectedSignatory.id : '',
                [name]: value
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const validateForm = () => {
        let errors = {};
        if (!formData.employee_name) {
            errors.employee_name = 'Please select an employee.';
        }
        if (!formData.signatory_name) {
            errors.signatory_name = 'Please assign signatory.';
        }
        if (!formData.signatory_status) {
            errors.signatory_status = 'Please set signatory status.';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const onSubmit = async (e) => {
        e.preventDefault();

        // setLoading(true);
        if (validateForm()) {
            try {
                const { employee_name, signatory_name, ...formDataWithouthNames } = formData;
                const selectedSignatory = signatories.find((signatory) => signatory.employee_name === signatory_name);
                const payload = {
                    employee_id: formData.employee_id,
                    signatory: selectedSignatory ? selectedSignatory.id : '',
                    signatory_status: formData.signatory_status
                }
                const response = await axios.post(`${config.apiUrl}/employee-signatories`, payload);
                // console.log('Response:', response.data);
                setSuccessMessage(response.data.message);
                setShowModal(true);
                setFormData({
                    employee_name: '',
                    signatory_name: '',
                    signatory_status: ''
                });
            } catch (error) {
                console.error('Error creating signatory:', error);
                setErrorMessage(error.message);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            employee_name: '',
            signatory_name: '',
            signatory_status: ''
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
            <div className="create-form-container">
                <h2>Signatory Form</h2>
                {/* {loading && <div>Loading...</div>} */}
                {errorMessage && <div className="error">{errorMessage}</div>}
                <br />
                <div>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Employee Name</label>
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
    
                        <div className="form-group">
                            <label>Higher Superior</label>
                            <div className="input-container">
                                <select
                                    name="signatory_name"
                                    value={formData.signatory_name}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Assign Signatory</option>
                                    {signatories.length > 0 && (
                                        signatories.map((signatory) => (
                                            <option key={signatory.id} value={signatory.employee_name}>
                                                {signatory.employee_name}
                                            </option>
                                        ))
                                    )}
                                </select>
                                {formErrors.signatory_name && <div className="error">{formErrors.signatory_name}</div>}
                            </div>
                        </div>
    
                        <div className="form-group">
                            <label>Signatory Status</label>
                            <div className="input-container">
                                <select
                                    name="signatory_status"
                                    value={formData.signatory_status}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Set Signatory Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Resigned">Resigned</option>
                                    <option value="AWOL">AWOL</option>
                                </select>
                                {formErrors.signatory_status && <div className="error">{formErrors.signatory_status}</div>}
                            </div>
                        </div>
    
                        {/* <div className="form-end-buttons"> */}
                            <button type="submit">Submit</button>
                            <button type="button" className="cancel-button" onClick={resetForm}>Cancel</button>
                         {/* </div> */}
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
    );      
    
}


export default AddSignatory;