import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../styles/TableList.css';
import Sidebar from '../components/Sidebar';
import { useTable } from 'react-table';
import config from '../config';
import SignatoryModal from '../components/SignatoryModal';

const SignatoryList = () => {
    const [signatories, setSignatories] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control edit modal visibility
    const [selectedRow, setSelectedRow] = useState(null); // State to store selected row for editing
    const [editableFields, setEditableFields] = useState([]); // State to store editable fields
    const [rowDataForEdit, setRowDataForEdit] = useState(null); // State to store data for editing
    // const [loading, setLoading] = useState(true);
    // const [editableFields, setEditableFields] = useState([]);

    useEffect(() => {
        const getSignatoryList = async () => {
            try {
                const response = await axios.get(`${config.apiUrl}/employee-signatories`);
                setSignatories(response.data.data);
                // setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                // setLoading(false);
            }
        };

        getSignatoryList();
    }, []);


    const handleEdit = (row) => {
        setSelectedRow(row);
        setRowDataForEdit(row.original);
        setIsEditModalOpen(true);
    };

    const handleSave = async (editedData) => {
        try {
            const { employee_name, signatory_name, ...formDataWithouthNames } = editedData;
            // const selectedSignatory = signatories.find((signatory) => signatory.employee_name === employee_name);
            const payload = {
                employee_id: editedData.employee_id,
                signatory: editedData.id,
                signatory_status: editedData.signatory_status
            };
            // Make a PUT request to update employee data
            console.log(payload)
            await axios.put(`${config.apiUrl}/employee-signatories/${editedData.employee_id}`, payload);

            // Update the local state with the edited data
            const updatedSignatories = signatories.map(sig =>
                sig.employee_id === editedData.employee_id ? { ...sig, signatory_name: editedData.signatory_name, signatory_status: editedData.signatory_status } : sig
            );
            setSignatories(updatedSignatories);

            setIsEditModalOpen(false);
            setSelectedRow(null);
            setRowDataForEdit(null);
        } catch (error) {
            console.error('Error updating signatory:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
        if (confirmDelete) {
            try {
                // Make a DELETE request to delete employee data
                await axios.delete(`${config.apiUrl}/employee-signatories/${id}`);

                // Update the local state by removing the deleted employee
                const updatedSignatories = signatories.filter(sig => sig.id !== id);
                setSignatories(updatedSignatories);
            } catch (error) {
                console.error('Error deleting signatory:', error);
            }
        }
    };


    const columns = useMemo(() => [
        {
            Header: 'Employee Name',
            accessor: 'employee_name'
        },
        {
            Header: 'Signatory Name',
            accessor: 'signatory_name'
        },
        {
            Header: 'Signatory Status',
            accessor: 'signatory_status'
        },
        {
            Header: 'Actions',
            accessor: 'actions', // add a fake accessor for Actions column
            Cell: ({ row }) => (
                <>
                    <button className="edit-button" onClick={() => handleEdit(row)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(row.original.id)}>Delete</button>
                </>
            ),
        },

    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data: signatories,
    });
    return (
        <div>
            <Sidebar />
            <div className="table-container">
                <h2>Signatories</h2>
                <div className="table-list">
                    {/* Table goes here */}
                    <table className="table-list" {...getTableProps()}>
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <SignatoryModal
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        onSave={handleSave}
                        rowData={rowDataForEdit}
                        editableFields={editableFields}
                    />
                </div>
            </div>
        </div>
    );

}
export default SignatoryList;