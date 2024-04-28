// create me a full script component called PayslipModal
// that will be used to display the payslip details
// of an employee. This component will be used in the
// EmployeePayslip page.
// The PayslipModal component should have the following:
// - A modal dialog that displays the payslip details
// - A close button to close the modal
// - A print button to print the payslip
// - A payslip header that displays the employee name, position, and pay period
// - A table that displays the following payslip details:
//     - Start Date
//     - End Date
//     - Basic Pay
//     - Total Earnings
//     - Total Deductions
//     - SSS
//     - PhilHealth
//     - Pag-IBIG
//     - Net Pay
// - The payslip details should be fetched from the API
// - The payslip details should be displayed in the modal
// - The payslip details should be formatted properly
// - The modal should be responsive
// - The modal should be styled properly
// - The print button should print the payslip
// - The close button should close the modal
// - The modal should be displayed when the user clicks the View button
// - The modal should be closed when the user clicks the close button
// - The modal should be closed when the user clicks outside the modal
// - The modal should be closed when the user presses the Esc key
//
// You can use the following data for testing:
// const payslipData = {
//     employee_name: 'John Doe',
//     position: 'Software Developer',
//     pay_period: '2022-01-01 to 2022-01-15',
//     start_date: '2022-01-01',
//     end_date: '2022-01-15',
//     basic_pay: 50000,
//     total_earnings: 60000,
//     total_deductions: 10000,
//     sss: 1000,
//     philhealth: 500,
//     pagibig: 200,
//     wh_tax: 5000,
//     net_pay: 50000
// };
//
// You can use the following code snippet to fetch the payslip details:
// const fetchPayslip = async () => {
//     try {
//         const response = await fetch(`/employee-payrolls/payslip?pay_day=${pay_day}`);
//         const data = await response.json();
//         setPayslipData(data);
//     } catch (error) {
//         console.error('Error fetching payslip data:', error);
//     }
// };
//
// You can use the following code snippet to format the payslip details:
// const formatCurrency = (value) => {
//     return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
// };
//
// You can use the following code snippet to display the payslip details:
// <div>
//     <h2>Payslip Details</h2>
//     <p>Employee Name: {payslipData.employee_name}</p>
//     <p>Position: {payslipData.position}</p>
//     <p>Pay Period: {payslipData.pay_period}</p>
//     <table>
//         <thead>
//             <tr>
//                 <th>Start Date</th>
//                 <th>End Date</th>
//                 <th>Basic Pay</th>
//                 <th>Total Earnings</th>
//                 <th>Total Deductions</th>
//                 <th>SSS</th>
//                 <th>PhilHealth</th>
//                 <th>Pag-IBIG</th>
//                 <th>Net Pay</th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <td>{payslipData.start_date}</td>
//                 <td>{payslipData.end_date}</td>
//                 <td>{formatCurrency(payslipData.basic_pay)}</td>
//                 <td>{formatCurrency(payslipData.total_earnings)}</td>
//                 <td>{formatCurrency(payslipData.total_deductions)}</td>
//                 <td>{formatCurrency(payslipData.sss)}</td>
//                 <td>{formatCurrency(payslipData.philhealth)}</td>
//                 <td>{formatCurrency(payslipData.pagibig)}</td>
//                 <td>{formatCurrency(payslipData.net_pay)}</td>
//             </tr>
//         </tbody>
//     </table>
// </div>
//
// You can use the following code snippet to display the modal:
// <Modal
//     isOpen={isModalOpen}
//     onRequestClose={closeModal}
//     contentLabel="Payslip Modal"
// >
//     {payslipData && (
//         <div>
//             <button onClick={printPayslip}>Print Payslip</button>
//             <button onClick={closeModal}>Close</button>
//             <h1>Payslip for {payslipData.employee_name}</h1>
//             {payslipData && (
//                 <div>
//                     <h2>Payslip Details</h2>
//                     <p>Employee Name: {payslipData.employee_name}</p>
//                     <p>Position: {payslipData.position}</p>
//                     <p>Pay Period: {payslipData.pay_period}</p>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Start Date</th>
//                                 <th>End Date</th>
//                                 <th>Basic Pay</th>
//                                 <th>Total Earnings</th>
//                                 <th>Total Deductions</th>
//                                 <th>SSS</th>
//                                 <th>PhilHealth</th>
//                                 <th>Pag-IBIG</th>
//                                 <th>Net Pay</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>{payslipData.start_date}</td>
//                                 <td>{payslipData.end_date}</td>
//                                 <td>{formatCurrency(payslipData.basic_pay)}</td>
//                                 <td>{formatCurrency(payslipData.total_earnings)}</td>
//                                 <td>{formatCurrency(payslipData.total_deductions)}</td>
//                                 <td>{formatCurrency(payslipData.sss)}</td>
//                                 <td>{formatCurrency(payslipData.philhealth)}</td>
//                                 <td>{formatCurrency(payslipData.pagibig)}</td>
//                                 <td>{formatCurrency(payslipData.net_pay)}</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     )}
// </Modal>
//
// You can use the following code snippet to close the modal:
// const closeModal = () => {
//     setIsModalOpen(false);
// };
//
// You can use the following code snippet to print the payslip:
// const printPayslip = () => {
//     window.print();
// };
//
// You can use the following code snippet to open the modal:
// const openModal = () => {
//     setIsModalOpen(true);
// };
//
// You can use the following code snippet to fetch the payslip details and open the modal:
// useEffect(() => {
//     fetchPayslip();
// }, []);
//
// useEffect(() => {
//     if (payslipData) {
//         openModal();
//     }
// }, [payslipData]);
//
// You can use the following code snippet to display the View button:
// <button onClick={openModal}>View</button>
//
// You can use the following code snippet to display the close button:
// <button onClick={closeModal}>Close</button>
//
// You can use the following code snippet to display the print button:
// <button onClick={printPayslip}>Print Payslip</button>
//
// You can use the following code snippet to display the payslip header:
// <h1>Payslip for {payslipData.employee_name}</h1>
//   <p>Position: {payslipData.position}</p>
//   <p>Pay Period: {payslipData.pay_period}</p>
//  
// You can use the following code snippet to display the payslip details:
// <table>
//     <thead>
//         <tr>
//             <th>Start Date</th>
//             <th>End Date</th>
//             <th>Basic Pay</th>
//             <th>Total Earnings</th>
//             <th>Total Deductions</th>
//             <th>SSS</th>
//             <th>PhilHealth</th>
//             <th>Pag-IBIG</th>
//             <th>Net Pay</th>
//         </tr>
//     </thead>
//     <tbody>
//         <tr>
//             <td>{payslipData.start_date}</td>
//             <td>{payslipData.end_date}</td>
//             <td>{formatCurrency(payslipData.basic_pay)}</td>
//             <td>{formatCurrency(payslipData.total_earnings)}</td>
//             <td>{formatCurrency(payslipData.total_deductions)}</td>
//             <td>{formatCurrency(payslipData.sss)}</td>
//             <td>{formatCurrency(payslipData.philhealth)}</td>
//             <td>{formatCurrency(payslipData.pagibig)}</td>
//             <td>{formatCurrency(payslipData.net_pay)}</td>
//         </tr>
//     </tbody>
// </table>
//
// You can use the following code snippet to format the currency:
// const formatCurrency = (value) => {
//     return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
// };
//
// You can use the following code snippet to fetch the payslip details:
// const fetchPayslip = async () => {
//     try {
//         const response = await fetch(`/employee-payrolls/payslip?pay_day=${pay_day}`);
//         const data = await response.json();
//         setPayslipData(data);
//     } catch (error) {
//         console.error('Error fetching payslip data:', error);
//     }
// };

