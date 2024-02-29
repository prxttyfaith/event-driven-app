import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../styles/EmployeeManager.css';
import Sidebar from '../components/Sidebar';
import { useTable } from 'react-table';

const EmployeeList = () => {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [editedData, setEditedData] = useState({});

    useEffect(() => {
        const getEmployeeList = async () => {
            try {
                const response = await axios.get('http://localhost:3000/employee');
                setEmployees(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        getEmployeeList();
    }, []);

    // For improvement: Add sorting to sort employees by name, city, or country
    const columns = useMemo(() => [
        {
            Header: 'First Name',
            accessor: 'first_name',
        },
        {
            Header: 'Middle Name',
            accessor: 'middle_name',
        },
        {
            Header: 'Last Name',
            accessor: 'last_name',
        },
        {
            Header: 'Birthdate',
            accessor: 'birthdate',
        },
        {
            Header: 'Address',
            accessor: 'address_line',
            Cell: ({ value }) => <span>{value || '-'}</span>, // Handle empty address
        },
        {
            Header: 'City',
            accessor: 'city',
        },
        {
            Header: 'State',
            accessor: 'state',
        },
        {
            Header: 'Country',
            accessor: 'country',
        },
        {
            Header: 'Zip Code',
            accessor: 'zip_code',
        },
        {
            Header: 'Status',
            accessor: 'status',
        },
        {
            Header: 'Designation',
            accessor: 'designation_name',
        },
        {
            Header: 'Department',
            accessor: 'department_name',
        },
        {
            Header: 'Actions',
            accessor: 'actions', // add a fake accessor for Actions column para dili ma apil ug edit
            Cell: ({ row }) => {
                const isEditing = editRowId === row.original.id;
                return (
                    <div>
                        {isEditing ? (
                            <>
                                <button onClick={() => handleSave(row)}>Save</button>
                                <button onClick={() => setEditRowId(null)}>Cancel</button>
                            </>
                        ) : (
                            <button onClick={() => setEditRowId(row.original.id)}>Edit</button>
                        )}
                        <button onClick={() => handleDelete(row.original.id)}>Delete</button>
                    </div>
                );
            },
        },
    ], [editRowId, handleSave, handleDelete]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: employees,
    });

    const handleSave = async (row) => {
        try {
            // Update editedData state with the latest changes
            const updatedData = { ...editedData };
            row.cells.forEach(cell => {
                updatedData[cell.column.id] = cell.column.id !== 'actions' ? cell.value : ''; // Only update non-action cells
            });
            setEditedData(updatedData);

            // Make a PUT request to update employee data
            await axios.put(`http://localhost:3000/employee/${row.original.id}`, updatedData);

            // Update the local state with the edited data
            const newData = employees.map(emp => {
                if (emp.id === row.original.id) {
                    return {
                        ...emp,
                        ...updatedData,
                    };
                }
                return emp;
            });
            setEmployees(newData);
            setEditRowId(null); // Reset editRowId after saving
            setEditedData({});
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const handleEdit = (columnId, value) => {
        setEditedData(prevState => ({
            ...prevState,
            [columnId]: value,
        }));
    };


    // For improvements:
    // - Fix the reload of setEmployees after deleting an employee
    // - Add a confirmation dialog before deleting an employee
    // - Add a loading state while deleting an employee
    // - Add a success message after deleting an employee
    // - Add an error message if deleting an employee fails
    // - Add a search bar to filter employees by name, city, or country
    // - Add pagination to limit the number of employees displayed per page

    const handleDelete = async (id) => {
        // try {
        //     await axios.delete(`http://localhost:3000/employee/${id}`);
        //     const newEmployees = employees.filter(emp => emp.id !== id);
        //     setEmployees(newEmployees);
        // } catch (error) {
        //     console.error('Error deleting employee:', error);
        // }
        try {
          await axios.delete(`http://localhost:3000/employee/${id}`);
          setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== id));
      } catch (error) {
          console.error('Error deleting employee:', error);
      }
    };

    return (
        <div className="employee-list-container">
            <Sidebar />
            <div className="employee-list">
                <h2>Employee List</h2>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <table {...getTableProps()}>
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
                                                return (
                                                    <td {...cell.getCellProps()}>
                                                        {cell.column.id !== 'actions' ? (
                                                            editRowId === row.original.id ? (
                                                                <input
                                                                    type="text"
                                                                    value={editedData[cell.column.id] || row.values[cell.column.id]}
                                                                    onChange={(e) => handleEdit(cell.column.id, e.target.value)}
                                                                />
                                                            ) : (
                                                                row.values[cell.column.id]
                                                            )
                                                        ) : cell.render('Cell')}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
};

export default EmployeeList;
