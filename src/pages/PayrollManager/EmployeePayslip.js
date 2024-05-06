import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../../styles/Main.css';
import Sidebar from '../../components/Sidebar';
import { useTable } from 'react-table';
import config from '../../config';
import PayslipModal from '../../components/PayslipModal';
import { fetchPayslip } from '../../components/PayslipModal';

// Default values
const setDateTenthOfMonth = () => {
    const date = new Date();
    date.setDate(10);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

function EmployeePayslip() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [ViewableFields, setViewableFields] = useState([]);
    const [rowDataForView, setRowDataForView] = useState(null);
    const [dateOptions, setDateOptions] = useState([]);
    const [payslipData, setPayslipData] = useState(null);
    const [earningsData, setEarningsData] = useState(null);
    const [deductionsData, setDeductionsData] = useState(null);
    const [isTableVisible, setIsTableVisible] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [viewClicked, setViewClicked] = useState(false);
    const [formErrors, setFormErrors] = useState({
        pay_day: '',
        pay_period: ''
    });
    const [formData, setFormData] = useState({
        pay_day: setDateTenthOfMonth(),
        pay_period: 'Semi-Monthly'
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


    const handleView = (row, pay_day) => {
        setIsSidebarVisible(false);
    
        // Check if row is not null before accessing its properties
        if (row) {
            const employee_id = row.original.employee_id;
            const pay_period = formData.pay_period;
    
            if (employee_id && pay_period && pay_day) {
                setSelectedRow(row);
                setRowDataForView(row.original);
                setIsViewModalOpen(true);
                setIsTableVisible(false);
            } else {
                setErrorMessage('Missing required parameters');
                setSelectedRow(null);
            }
        } else {
            setErrorMessage('Row is null');
            setSelectedRow(null);
        }
    };

    useEffect(() => {
        const fetchData = async () => {        
            if (selectedRow && formData && viewClicked) {
                const employee_id = selectedRow.original ? selectedRow.original.employee_id : null;
                const pay_period = formData.pay_period;
                const pay_day = formData.pay_day;
                
                try {
                    const data = await fetchPayslip(employee_id, pay_period, pay_day);
                    if (data && data.payslipData && data.earningsData && data.deductionsData) {
                        setPayslipData(data.payslipData);
                        setEarningsData(data.earningsData);
                        setDeductionsData(data.deductionsData);
                    } else {
                        setErrorMessage(`No payslip data available..`);
                    }
                } catch (error) {
                    setErrorMessage(`Error fetching data: ${error}`);
                }
                setViewClicked(false); // Reset viewClicked to false after fetching data
            }
        };
    
        fetchData();
    }, [selectedRow, formData, viewClicked]);


    const handleInputChange = async (e) => {
        const { name, value } = e.target;

        if (name === 'pay_day' && !value) {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                pay_day: 'Pay day is required.'
            }));
        } else if (name === 'pay_period' && !value) {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                pay_period: 'Pay period is required.'
            }));
        } else {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                [name]: ''
            }));
        }

        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    // Update the dependency array to include formData.pay_period
    useEffect(() => {
        const fetchPayrollEmployeeNames = async () => {
            try {
                const response = await axios.get(`${config.apiUrl}/employee-payrolls`, {
                    params: {
                        pay_period: formData.pay_period,
                        pay_day: formData.pay_day
                    }
                });
                setTableData(response.data.data);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchPayrollEmployeeNames();
    }, [formData.pay_day, formData.pay_period]);

    
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
            Cell: ({ value }) => <div className="right-align">{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}</div>
        },
        {
            Header: 'Payslip',
            accessor: 'view', // add a fake accessor for view column
            Cell: ({ row }) => (
                <>
                    <button
                        className="view-button"
                        onClick={(e) => {
                            e.stopPropagation(); // Stop event propagation
                            handleView(row, formData.pay_day);
                            setViewClicked(true);
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
                {isSidebarVisible && <Sidebar />}
                {isTableVisible && (
                    <div className="table-container">
                        <h2>EMPLOYEE PAYSLIP</h2>
                        {errorMessage && <div className="error">{errorMessage}</div>}
                        <br />
                        <form>
                            <div className="form-group">
                                <label htmlFor="right-align">Payroll Period</label>
                                <div className="input-container">
                                    <select
                                        id="pay_period"
                                        name="pay_period"
                                        value={formData.pay_period}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Weekly" disabled>Weekly</option>
                                        <option value="Bi-Weekly" disabled>Bi-Weekly</option>
                                        <option value="Semi-Monthly">Semi-Monthly</option>
                                        <option value="Monthly" disabled>Monthly</option>
                                    </select>
                                    {formErrors.pay_period && <div className="error">{formErrors.pay_period}</div>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="right-align">Select Payday</label>
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
                        </form>
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
                                <div className="error-dialog">
                                    <p>There is no payslip data available for the selected payroll period and payday.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {payslipData !== null && (
                <PayslipModal
                    isOpen={isViewModalOpen}
                    onClose={() => {
                        setIsViewModalOpen(false);
                        setIsTableVisible(true); // Show the table when the modal is closed
                        setIsSidebarVisible(true); // Show the Sidebar when the modal is closed
                    }}
                    rowData={rowDataForView}
                    ViewableFields={ViewableFields}
                    payslipData={payslipData}
                    earningsData={earningsData}
                    deductionsData={deductionsData}
                />
            )}
        </>
    );
}

export default EmployeePayslip;
