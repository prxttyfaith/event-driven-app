import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../styles/TableList.css';
import Sidebar from '../components/Sidebar';
import { useTable } from 'react-table';
import config from '../config';
import PayslipModal from '../components/PayslipModal';


// Default values
const currentDateTwentyFifthOfMonth = () => {
    const date = new Date();
    date.setDate(25);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

function EmployeePaylip() {
    const [tableData, setTableData] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control edit modal visibility
    const [selectedRow, setSelectedRow] = useState(null); // State to store selected row for editing
    const [editableFields, setEditableFields] = useState([]); // State to store editable fields
    const [rowDataForEdit, setRowDataForEdit] = useState(null); // State to store data for editing
    const [dateOptions, setDateOptions] = useState([]);
    const [formErrors, setFormErrors] = useState({
        pay_day: ''
    });
    const [formData, setFormData] = useState({
        pay_day: currentDateTwentyFifthOfMonth()
    });

    useEffect(() => {
        const dates = [];
        const startYear = new Date().getFullYear() - 1;
        const endYear = new Date().getFullYear() + 1;
        for (let year = startYear; year <= endYear; year++) {
            for (let month = 1; month <= 12; month++) {
                dates.push(`${year}-${('0' + month).slice(-2)}-25`);
            }
        }
        setDateOptions(dates);
    }, []);
    
    useEffect(() => {
        // Extract the column headers to get the editable fields
        const fields = columns.map(column => column.accessor);
        setEditableFields(fields.filter(field => field !== 'view'));
      }, [columns]);

    const handleEdit = (row) => {
        setSelectedRow(row);
        setRowDataForEdit(row.original);
        setIsEditModalOpen(true);
    };

    useEffect(() => {
        const fetchPayrollEmployeeNames = async () => {
            try {
                const response = await axios.get(`${config.apiUrl}/employee-payrolls/employees`, {
                    params: {
                        pay_day: formData.pay_day
                    }
                });
                setTableData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchPayrollEmployeeNames();
    }, []);

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    
        try {
            const response = await axios.get(`${config.apiUrl}/employee-payrolls/employees`, {
                params: {
                    pay_day: value
                }
            });
            if (response.data.data && response.data.data.length > 0) {
                setTableData(response.data.data);
            } else {
                setTableData([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSave = async (updatedData) => {
        try {
            const { employee_name, signatory_name, ...formDataWithouthNames } = updatedData;
            const payload = {
                employee_id: updatedData.employee_id,
                signatory: updatedData.signatory_id,
                signatory_status: updatedData.signatory_status
            };
            // Make a PUT request to update employee data
            console.log('Submitted Data: ', payload)
            await axios.put(`${config.apiUrl}/employee-signatories/${updatedData.employee_id}`, payload);

            // Update the local state with the edited data
            const updatedSignatory = signatories.map(sig =>
                sig.employee_id === updatedData.employee_id ? { ...sig, ...updatedData } : sig
            );
            console.log('Current signatories: ', updatedSignatory)
            setSignatories(updatedSignatory);

            setIsEditModalOpen(false);
            setSelectedRow(null);
            setRowDataForEdit(null);
        } catch (error) {
            console.error('Error updating signatory:', error);
        }
    };

    const columns = useMemo(() => [
        {
            Header: 'Employee Name',
            accessor: 'employee_name'
        },
        {
            Header: 'Employee Position',
            accessor: 'position'
        },
        {
            Header: 'Monthly Salary',
            accessor: 'monthly_salary',
            Cell: ({ value }) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
        },
        {
            Header: 'View Payslip',
            accessor: 'view', // add a fake accessor for view column
            Cell: ({ row }) => (
                <>
                    <button className="edit-button" onClick={() => handleEdit(row)}>View</button>
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
        data: tableData,
    });

    
    return (
        <div>
            <Sidebar />
            <div className="table-container">
                <h2>Employee Payslip</h2>
    
                <div className="table-list">
                    <label htmlFor="date">Select Payday</label>
                    <div className="input-container">
                        <select
                            id="pay_day"
                            name="pay_day"
                            value={formData.pay_day}
                            onChange={handleInputChange}
                        >
                            {dateOptions.map(date => (
                                <option key={date} value={date}>{date}</option>
                            ))}
                        </select>
                        {formErrors.pay_day && <div className="error">{formErrors.pay_day}</div>}
                    </div>
                </div>
    
                <div className="table-list">
                    {rows.length > 0 ? (
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
                    ) : (
                        <p>There is no data available for the selected payday.</p>
                    )}
                    <PayslipModal
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
export default EmployeePaylip;