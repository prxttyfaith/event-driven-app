
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const EditModal = ({ isOpen, onClose, onSave, rowData }) => {
    const [editedData, setEditedData] = useState({});
    const [originalData, setOriginalData] = useState({});
    const [designations, setDesignations] = useState([]);

    useEffect(() => {
        // Populate editedData with rowData when the modal is opened
        // console.log("rowData:", rowData); // Log rowData here
        setEditedData(rowData || {});
        setOriginalData(rowData || {});
    }, [rowData]);

    useEffect(() => {
        fetchDesignations();
    }, []);

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

    const handleFieldChange = (field, value) => {
        // setEditedData(prevData => ({
        //     ...prevData,
        //     [field]: value
        // }));
        let updatedData = {
            ...editedData,
            [field]: value
        };
    
        if (field === 'designation_name') {
            const selectedDesignation = designations.find(d => d.designation_name === value);
            if (selectedDesignation) {
                updatedData.department_name = selectedDesignation.department_name;
            } else {
                updatedData.department_name = '';               
            }
        }  
        setEditedData(updatedData);
    };

    const handleSave = (e) => {       
        e.preventDefault();
        // Find the selected designation from the designations array
        const selectedDesignation = designations.find(d => d.designation_name === editedData.designation_name);
        if (selectedDesignation) {
        // If a matching designation is found, update the designation_id in the editedData
        editedData.designation_id = selectedDesignation.id;
    }
        onSave(editedData);
        onClose();
    };

    const handleCancel = () => {
        setEditedData(originalData);
        onClose();
    };

    return (
        <div className={`edit-modal ${isOpen ? 'show' : 'hide'}`}>
            <div className="modal-content">
                <h2>Edit Employee</h2>
                <form onSubmit={handleSave}>
                    <label>
                        First Name:
                        <input
                            type="text"
                            value={editedData?.first_name || ''}
                            onChange={(e) => handleFieldChange('first_name', e.target.value)}
                        />
                    </label>
                    <label>
                        Middle Name:
                        <input
                            type="text"
                            value={editedData?.middle_name || ''}
                            onChange={(e) => handleFieldChange('middle_name', e.target.value)}
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            value={editedData?.last_name || ''}
                            onChange={(e) => handleFieldChange('last_name', e.target.value)}
                        />
                    </label>
                    <label>
                        Birthdate:
                        <input
                            type="date"
                            value={editedData?.birthdate || ''}
                            onChange={(e) => handleFieldChange('birthdate', e.target.value)}
                        />
                    </label>
                    <label>
                        Address Line:
                        <input
                            type="text"
                            value={editedData?.address_line || ''}
                            onChange={(e) => handleFieldChange('address_line', e.target.value)}
                        />
                    </label>
                    <label>
                        City:
                        <input
                            type="text"
                            value={editedData?.city || ''}
                            onChange={(e) => handleFieldChange('city', e.target.value)}
                        />
                    </label>
                    <label>
                        Province:
                        <input
                            type="text"
                            value={editedData?.state || ''}
                            onChange={(e) => handleFieldChange('state', e.target.value)}
                        />
                    </label>
                    <label>
                        Country:
                        <input
                            type="text"
                            value={editedData?.country || ''}
                            onChange={(e) => handleFieldChange('country', e.target.value)}
                        />
                    </label>
                    <label>
                        Zip Code:
                        <input
                            type="text"
                            value={editedData?.zip_code || ''}
                            onChange={(e) => handleFieldChange('zip_code', e.target.value)}
                        />
                    </label>
                    <label>
                        Designation:
                        <select
                        name="designation_name"
                        value={editedData.designation_name}
                        onChange={(e) => handleFieldChange('designation_name', e.target.value)}
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
                    </label>
                    <label>
                        Department:
                        <input
                            type="text"
                            value={editedData?.department_name || ''}
                            onChange={(e) => handleFieldChange('department_name', e.target.value)}
                            disabled
                        />
                    </label>
                    <label>
                        Monthly Salary:
                        <input
                            type="number"
                            value={editedData?.salary || ''}
                            onChange={(e) => handleFieldChange('salary', e.target.value)}
                        />
                    </label>
                    <label>
                        Type:
                        <select
                            name="employee_type"
                            value={editedData.employee_type}
                            onChange={(e) => handleFieldChange('employee_type', e.target.value)}
                        >
                            <option value="">Select Employee Type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                        </select>
                    </label>
                    <label>
                        Status:
                        <select
                            name="status"
                            value={editedData.status}
                            onChange={(e) => handleFieldChange('status', e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Resigned">Resigned</option>
                            <option value="AWOL">AWOL</option>
                        </select>
                    </label>

                    <button type="submit">Save</button>
                    <button id="cancel-button" onClick={handleCancel}>Cancel</button>              
                </form>
            </div>
        </div>
    );
};

export default EditModal;
