import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import config from '../config';

const fetchPayslip = async (employee_id, pay_period, pay_day) => {
    try {
        const response = await axios.get(`${config.apiUrl}/employee-payrolls/payslip`, {
            params: { employee_id, pay_period, pay_day }
        });
        return response.data.data; // Make sure this is the correct path to the data
    } catch (error) {
        console.error('Error fetching payslip data:', error);
        return null; // Return null or appropriate default value on error
    }
};

const PayslipModal = ({ isOpen, onClose, rowData, payslipData }) => {
    // useEffect(() => {
    //     // console.log("payslipData in Modal:", payslipData); 
    //     // console.log('employee_name:', payslipData && payslipData[0] && payslipData[0].employee_name);
    // }, [payslipData]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Payslip Modal"
            className="modal"
        >
            {payslipData && payslipData[0] ? (
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title" style={{ textAlign: 'center' }}>Payslip</h1>
                    </div>
                    <div className="modal-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto' }}>
                            <p style={{ textAlign: 'right', marginRight: '15px' }}>Employee Name</p>
                            <p>: {payslipData[0].employee_name}</p>
                            <p style={{ textAlign: 'right', marginRight: '15px' }}>Designation</p>
                            <p>: {payslipData[0].designation}</p>
                            <p style={{ textAlign: 'right', marginRight: '15px' }}>Department</p>
                            <p>: {payslipData[0].department}</p>
                            <p style={{ textAlign: 'right', marginRight: '15px' }}>Employee Type</p>
                            <p>: {payslipData[0].employee_type}</p>
                            <p style={{ textAlign: 'right', marginRight: '15px' }}>Status</p>
                            <p>: {payslipData[0].status}</p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto' }}>
                        <p style={{ textAlign: 'right', marginRight: '15px' }}>Pay Period</p>
                            <p>: {payslipData[0].pay_period}</p>
                            <p  style={{ textAlign: 'right', marginRight: '15px' }}>Start Date</p>
                            <p>: {new Date(payslipData[0].start_date).toISOString().split('T')[0]}</p>
                            <p  style={{ textAlign: 'right', marginRight: '15px' }}>End Date</p>
                            <p>: {new Date(payslipData[0].end_date).toISOString().split('T')[0]}</p>
                            <p style={{ textAlign: 'right', marginRight: '15px' }}>Pay Day</p>
                            <p>: {new Date(payslipData[0].pay_day).toISOString().split('T')[0]}</p>
                        </div>
                    </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Basic Pay</th>
                                    <th>Total Earnings</th>
                                    <th>Total Deductions</th>
                                    <th>SSS</th>
                                    <th>PhilHealth</th>
                                    <th>Pag-IBIG</th>
                                    <th>Net Pay</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payslipData && payslipData[0] && (
                                    <tr>
                                        <td>{formatCurrency(payslipData[0].basic_pay)}</td>
                                        <td>{formatCurrency(payslipData[0].total_earnings)}</td>
                                        <td>{formatCurrency(payslipData[0].total_deductions)}</td>
                                        <td>{formatCurrency(payslipData[0].sss)}</td>
                                        <td>{formatCurrency(payslipData[0].philhealth)}</td>
                                        <td>{formatCurrency(payslipData[0].pagibig)}</td>
                                        <td>{formatCurrency(payslipData[0].net_pay)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => window.print()} className="modal-button">Print Payslip</button>
                        <button onClick={onClose} className="modal-button">Close</button>
                    </div>
                </div>
            ) : (
                <div>No payslip data available.</div>
            )}
        </Modal>
    );
};

export default PayslipModal;
export { fetchPayslip };
