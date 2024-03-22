import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CreateForm.css';
import Sidebar from '../components/Sidebar';
import config from '../config';

function LeaveRequest() {
    const [formData, setFormData] = useState({
        employee_name: '',
        type: '',
        start_date: '',
        end_date: '',
        status: ''
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployeeSignatory();
    }, []);

    const fetchEmployeeSignatory = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/employee-signatories/signatory`);
            console.log('Employee Signatory:', response.data);
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
                employee_id: selectedEmployee ? selectedEmployee.id : '',
                [name]: value
            });
        // } else if (name === 'signatory_name') {
        //     const selectedSignatory = signatories.find((signatory) => signatory.signatory_name === value);
        //     setFormData({
        //         ...formData,
        //         signatory: selectedSignatory ? selectedSignatory.id : '',
        //         [name]: value
        //     });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const { employee_name, ...formDataWithouthNames } = formData;
            // const selectedSignatory = signatories.find((signatory) => signatory.employee_name === signatory_name);
            const payload = {
                employee_id: formData.employee_id,
                type: formData.type,
                start_date: formData.start_date,
                end_date: formData.end_date,
                status: formData.status
                // signatory: selectedSignatory ? selectedSignatory.id : '',
                // signatory_status: formData.signatory_status
            }
            const response = await axios.post(`${config.apiUrl}/employee-leave-requests`, payload);
            console.log('Response:', response.data);
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



    return (
        <div>
            <Sidebar />
            <div className="create-form-container">
                <h2>Leave Request Form</h2>
                {/* {loading && <div>Loading...</div>}
                {errorMessage && <div className="error">{errorMessage}</div>}
            <br /> */}

                <div>
                    <form onSubmit={onSubmit}>

                        <div className="form-group">
                            <label>Employee Name</label>
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
                        </div>

                        <div className="form-group">
                            <label>Type</label>
                            <select
                                name="type"
                                value={formData.signatory_status}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Leave Type</option>
                                <option value="Vacation">Vacation</option>
                                <option value="Sick">Sick</option>
                                <option value="Maternity">Maternity</option>
                                <option value="Paternity">Paternity</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Start Date</label>
                            <input
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleInputChange}

                            />
                        </div>

                        <div className="form-group">
                            <label>End Date</label>
                            <input
                                type="date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Denied">Denied</option>
                            </select>
                        </div>

                        <button type="submit">Submit</button>
                    </form>
                </div>

            </div>
        </div>
    )
}


export default LeaveRequest;