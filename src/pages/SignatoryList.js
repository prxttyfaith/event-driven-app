import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../styles/TableList.css';
import Sidebar from '../components/Sidebar';
import { useTable } from 'react-table';
// import EmployeeModal from '../components/EmployeeModal';
import config from '../config';

const SignatoryList = () => {
    const [signatories, setSignatories] = useState([]);
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
                </div>
            </div>
        </div>
    );

}
export default SignatoryList;