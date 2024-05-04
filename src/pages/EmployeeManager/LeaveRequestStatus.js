import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../../styles/Main.css';
import Sidebar from '../../components/Sidebar';
import { useTable } from 'react-table';
import config from '../../config';

const LeaveRequestStatus = () => {
    const [requests, setRequests] = useState([]);
    const [editedStatus, setEditedStatus] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const getLeaveRequestStatus = async () => {
            try {
                const response = await axios.get(`${config.apiUrl}/employee-leave-requests`);
                setRequests(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getLeaveRequestStatus();
    }, []);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleStatusChange = async (id, value) => {
        try {
            // Update the local state immediately for a better user experience
            setEditedStatus(prevStatus => ({
                ...prevStatus,
                [id]: value
            }));
    
            // Retrieve the ID from the original row data
            const row = requests.find(req => req.id === id);
            if (!row) {
                console.error('Error updating status: Row not found');
                return;
            }
    
            const { employee_id } = row;
    
            // Make PUT request to update the status on the server
            const writeResponse = await axios.put(`${config.apiUrl}/employee-leave-requests/${id}`, {
                id: id,
                employee_id: employee_id,
                status: value
            });
    
            // Refresh the leave request list after successful update
            const readResponse = await axios.get(`${config.apiUrl}/employee-leave-requests`);
            setRequests(readResponse.data.data);
            setSuccessMessage(writeResponse.data.message);
            setShowModal(true);
        } catch (error) {
            console.error('Error updating status:', error);
            setErrorMessage(error.message);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'orange';
            case 'Approved':
                return 'green';
            case 'Rejected':
                return 'red';
            default:
                return 'black';
        }
    };

    const columns = useMemo(() => [
        {
            Header: 'Employee',
            accessor: 'employee_name'
        },
        {
            Header: 'Leave Type',
            accessor: 'type'
        },
        {
            Header: 'Start Date',
            accessor: 'start_date'
        },
        {
            Header: 'End Date',
            accessor: 'end_date'
        },
        {
            Header: 'Signatory',
            accessor: 'signatory_name'
        },
        {
            Header: 'Status',
            accessor: 'status',
            Cell: ({ row }) => (
                <select
                    value={editedStatus[row.original.id] || row.original.status}
                    onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
                    style={{ color: getStatusColor(editedStatus[row.original.id] || row.original.status) }}
                >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            )
        }
    ], [editedStatus, requests]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data: requests,
    });

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
                <h2>LEAVE REQUEST STATUS</h2>
                <div className="table-list">
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
                                    <tr key={row.original.id} {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return <td key={cell.column.id} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {successMessage && showModal && (
                    <div className={`edit-modal ${showModal ? 'show' : ''}`} onClick={handleModalClick}>
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>&times;</span>
                            <p>{successMessage}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeaveRequestStatus;
