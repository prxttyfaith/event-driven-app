
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../styles/EmployeeList.css';
import Sidebar from '../components/Sidebar';
import { useTable } from 'react-table';
import EmployeeModal from '../components/EmployeeModal';
import config from '../config';

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control edit modal visibility
  const [selectedRow, setSelectedRow] = useState(null); // State to store selected row for editing
  const [editableFields, setEditableFields] = useState([]); // State to store editable fields
  const [rowDataForEdit, setRowDataForEdit] = useState(null); // State to store data for editing

  useEffect(() => {
    const getEmployeeList = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/employees`);
        setEmployees(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    getEmployeeList();
  }, []);

  useEffect(() => {
    // Extract the column headers to get the editable fields
    const fields = columns.map(column => column.accessor);
    setEditableFields(fields.filter(field => field !== 'actions'));
  }, [columns]);

  const handleEdit = (row) => {
    setSelectedRow(row);
    setRowDataForEdit(row.original);
    setIsEditModalOpen(true);
  };

  const handleSave = async (editedData) => {
    try {
      // Make a PUT request to update employee data
      await axios.put(`${config.apiUrl}/employees/${editedData.id}`, editedData);

      // Update the local state with the edited data
      const updatedEmployees = employees.map(emp =>
        emp.id === editedData.id ? { ...emp, ...editedData } : emp
      );
      setEmployees(updatedEmployees);

      setIsEditModalOpen(false);
      setSelectedRow(null);
      setRowDataForEdit(null);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      try {
        // Make a DELETE request to delete employee data
        await axios.delete(`${config.apiUrl}/employees/${id}`);

        // Update the local state by filtering out the deleted employee
        setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id));
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const columns = useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id',
    },
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
      Header: 'Address Line',
      accessor: 'address_line',
      // Cell: ({ value }) => <span>{value || '-'}</span>, // Handle empty address
    },
    {
      Header: 'City',
      accessor: 'city',
    },
    {
      Header: 'Province',
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
      Header: 'Designation',
      accessor: 'designation_name',
    },
    {
      Header: 'Department',
      accessor: 'department_name',
    },
    {
      Header: 'Type',
      accessor: 'employee_type',
    },
    {
      Header: 'Status',
      accessor: 'status',
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
    prepareRow,
  } = useTable({
    columns,
    data: employees,
  });

  return (
    <div >
      <Sidebar />
      <div className="employee-list-container">
        <h2> Employee List</h2>
        <div className="employee-list">
          {/* <h2> Employee List</h2> */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <table className="employee-list" {...getTableProps()}>
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
                        {row.cells.map(cell => (
                          <td {...cell.getCellProps()}>
                            {cell.column.id !== 'actions' ? (
                              <span>{row.values[cell.column.id]}</span>
                            ) : (
                              <>{cell.render('Cell')}</>
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <EmployeeModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSave}
                rowData={rowDataForEdit}
                editableFields={editableFields}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
