import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../styles/EmployeeManager.css';
import Sidebar from '../components/Sidebar';
import { useTable } from "react-table";

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const GetEmployeeList = async () => {
      try {
        const response = await axios.get('http://localhost:3000/employee');
        setEmployees(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    GetEmployeeList();
  }, []);

  // const GetEmployeeList = () => {
  //   axios.get('http://localhost:3000/employee')
  //     .then(response => {
  //       console.log('API Response:', response);
  //       setEmployees(response.data.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // };

  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "first_name"
      },
      {
        Header: "Middle Name",
        accessor: "middle_name"
      },
      {
        Header: "Last Name",
        accessor: "last_name"
      },
      {
        Header: "Birthdate",
        accessor: "birthdate"
      },
      {
        Header: "Address",
        accessor: "address_line"
      },
      {
        Header: "City",
        accessor: "city"
      },
      {
        Header: "State",
        accessor: "state"
      },
      {
        Header: "Country",
        accessor: "country"
      },
      {
        Header: "Zip Code",
        accessor: "zip_code"
      },
      {
        Header: "Type",
        accessor: "employee_type"
      },
      {
        Header: "Status",
        accessor: "status"
      },
      {
        Header: "Designation",
        accessor: "designation_name"
      },
      {
        Header: "Department",
        accessor: "department_name"
      },
    ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data: employees })

  return (
    <div className="employee-list-container">
      <Sidebar />
      <div className="employee-list">

        <center>
          {/* <h1>EDP</h1> */}
          <h2>Employee List</h2>
        </center>
        <table {...getTableProps()}>

          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )

  // return (
  // //   <div>
  //     <Sidebar />
  //     <center>
  //       {/* <h1>EDP</h1> */}
  //       <h2>Employee List</h2>
  //     </center>

  //     <div className="todo-container">
  //       <ul id="list">
  //         {employees.map(employee => (
  //           <li key={employee.id}>
  //             {employee.first_name}
  //             {employee.middle_name}
  //             {employee.last_name}
  //             {employee.birthdate}
  //             {employee.address_line}
  //             {employee.city}
  //             {employee.state}
  //             {employee.country}
  //             {employee.zip_code}
  //             {employee.employee_type}
  //             {employee.status}
  //             {employee.designation_id}
  //             {employee.designation_name}
  //             {employee.department_name}

  //             <div className="tasks-lists-container">
  //               {/* <button className="edit-button" onClick={() => handleEditTask(task.id)}>Edit</button>
  //                   <button className="delete-button" onClick={() => handleDeleteTask(task.id)}>Delete</button> */}
  //             </div>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   </div>

  // );
};

export default EmployeeList; 