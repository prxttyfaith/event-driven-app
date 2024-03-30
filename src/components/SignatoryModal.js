
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditModal = ({ isOpen, onClose, onSave, rowData }) => {
    const [editedData, setEditedData] = useState({});
    const [signatories, setSignatories] = useState([]);

    useEffect(() => {
        // Populate editedData with rowData when the modal is opened
        console.log("rowData:", rowData); // Log rowData here
        setEditedData(rowData || {});
    }, [rowData]);

    useEffect(() => {
        fetchSignatories();
    }, []);

    const fetchSignatories = async () => {
        try {
            const response = await axios.get('http://localhost:3000/employee-signatories/signatory');
            console.log('Signatories:', response.data);
            setSignatories(response.data.data);
        } catch (error) {
            console.error('Error fetching Signatories:', error);
            setSignatories([]);
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

        setEditedData(updatedData);
    };

    const handleSave = (e) => {       
        e.preventDefault();
        const selectedSignatory = signatories.find(s => s.employee_name === editedData.employee_name);
        if (selectedSignatory) {
        // editedData.id = selectedSignatory.employee_id;
        // editedData.employee_id = selectedSignatory.employee_id;
        editedData.id = selectedSignatory.id;
    }
        onSave(editedData);
        onClose();
    };

    return (
        <div className={`edit-modal ${isOpen ? 'show' : 'hide'}`}>
            <div className="modal-content">
                <h2>Edit Signatory</h2>
                <form onSubmit={handleSave}>
                    <label>
                        Employee Name:
                        <input
                            type="text"
                            value={rowData?.employee_name || ''}
                            // onChange={(e) => handleFieldChange('employee_name', e.target.value)}
                        />
                        disabled
                    </label>
                    <label>
                        Signatory Name:
                        <select
                        name="employee_name"
                        // value={''}
                        onChange={(e) => handleFieldChange('employee_name', e.target.value)}
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
                    </label>
                    <label>
                        Status:
                        <select
                            name="signatory_status"
                            value={editedData.signatory_status}
                            onChange={(e) => handleFieldChange('signatory_status', e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Resigned">Resigned</option>
                        </select>
                    </label>

                    <button type="submit">Save</button>
                    <button id="cancel-button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
