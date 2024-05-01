import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../styles/TableList.css';
import Sidebar from '../components/Sidebar';
import { useTable } from 'react-table';
import config from '../config';
import PayslipModal from '../components/PayslipModal';
import { fetchPayslip } from '../components/PayslipModal';

// Default values
const setDateTenthOfMonth = () => {
    const date = new Date();
    date.setDate(10);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

function EmployeePayslip() {
    const [tableData, setTableData] = useState([]);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false); // State to control View modal visibility
    const [selectedRow, setSelectedRow] = useState(null); // State to store selected row for Viewing
    const [ViewableFields, setViewableFields] = useState([]); // State to store Viewable fields
    const [rowDataForView, setRowDataForView] = useState(null); // State to store data for Viewing
    const [dateOptions, setDateOptions] = useState([]);
    const [payslipData, setPayslipData] = useState(null);
    const [isTableVisible, setIsTableVisible] = useState(true);
    const [formErrors, setFormErrors] = useState({
        pay_day: ''
    });
    const [formData, setFormData] = useState({
        pay_day: setDateTenthOfMonth()
    });

    useEffect(() => {
        const dates = [];
        const startYear = new Date().getFullYear() - 1;
        const endYear = new Date().getFullYear() + 1;
        for (let year = startYear; year <= endYear; year++) {
            for (let month = 1; month <= 12; month++) {
                dates.push(`${year}-${('0' + month).slice(-2)}-10`);
                dates.push(`${year}-${('0' + month).slice(-2)}-25`);
            }
        }
        setDateOptions(dates);
    }, []);
    
    useEffect(() => {
        // Extract the column headers to get the Viewable fields
        const fields = columns.map(column => column.accessor);
        setViewableFields(fields.filter(field => field !== 'view'));
      }, [columns]);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleView = (row) => {
        const employee_id = row.original.employee_id;
        const pay_period = 'semi-monthly';
        const pay_day = formData.pay_day;
        if (employee_id && pay_period && pay_day) {
            fetchPayslip(employee_id, pay_period, pay_day)
                .then(data => {
                    setPayslipData(data); // Update payslipData with the fetched data
                    setSelectedRow(row);
                    setRowDataForView(row.original);
                    setIsViewModalOpen(true); // Open the modal after the data is fetched
                    setIsTableVisible(false); // Hide the table
                })
                .catch(error => console.error('Error:', error));
        } else {
            console.error('Missing required parameters');
        }
    };

    useEffect(() => {
        const fetchPayrollEmployeeNames = async () => {
            try {
                const response = await axios.get(`${config.apiUrl}/employee-payrolls/employees`, {
                    params: {
                        pay_period: 'semi-monthly',
                        pay_day: formData.pay_day
                        
                    }
                });
                setTableData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchPayrollEmployeeNames();
    }, [formData.pay_period, formData.pay_day]);

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    
        try {
            const response = await axios.get(`${config.apiUrl}/employee-payrolls/employees`, {
                params: {
                    pay_period: 'semi-monthly',
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

    const columns = useMemo(() => [
        {
            Header: 'Employee Name',
            accessor: 'employee_name'
        },
        {
            Header: 'Designation',
            accessor: 'designation'
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
                    <button 
                        className="view-button" 
                        onClick={(e) => {
                            e.stopPropagation(); // Stop event propagation
                            handleView(row);
                        }}
                    >
                        View
                    </button>
                </>
            ),
        }
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
        <>
            <div>
                <Sidebar />
                {isTableVisible && (
                <div className="table-container">
                    <h2>Employee Payslip</h2>
    
                    <div className="custom-form">
                        <label htmlFor="pay_period">Payroll Period</label>
                        <div className="input-container">
                            <select
                                id="pay_period"
                                name="pay_period"
                                value={formData.pay_period}
                                onChange={handleInputChange}
                            >
                                {/* <option value="">Select Payroll Period</option> */}
                                <option value="weekly" disabled>Weekly</option>
                                <option value="bi-weekly" disabled>Bi-Weekly</option>
                                <option value="semi-monthly">Semi-Monthly</option>
                                <option value="monthly" disabled>Monthly</option>
                            </select>
                            {formErrors.pay_period && <div className="error">{formErrors.pay_period}</div>}
                        </div>
                    </div>
    
                    <div className="custom-form">
                        <label htmlFor="pay_day">Select Payday</label>
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
                    </div>
                </div>
                 )}
            </div>
            <PayslipModal
            isOpen={isViewModalOpen}
            onClose={() => {
                setIsViewModalOpen(false);
                setIsTableVisible(true); // Show the table when the modal is closed
            }}
            rowData={rowDataForView}
            ViewableFields={ViewableFields}
            payslipData={payslipData} // Make sure to pass this prop
        />
        </>
    );

}

export default EmployeePayslip;