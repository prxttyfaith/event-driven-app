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

    let net_pay = payslipData && payslipData[0] ? (payslipData[0].basic_pay + payslipData[0].total_earnings) - Math.abs(payslipData[0].total_deductions) : 0;

    const printPayslip = () => {
        const originalTitle = document.title;
        document.title = 'Payslip_' + payslipData[0].employee_name + '_' + payslipData[0].pay_period + '_' + payslipData[0].pay_day;
        window.print();
        document.title = originalTitle;
    };

    // useEffect(() => {
    //     // console.log("payslipData in Modal:", payslipData); 
    //     // console.log('employee_name:', payslipData && payslipData[0] && payslipData[0].employee_name);
    // }, [payslipData]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(value);
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
                    <h1 className="modal-title" style={{ textAlign: 'center' }}>PAYSLIP</h1>
                    <span className="modal-subtitle" style={{ textAlign: 'center', display: 'block', fontWeight: 'bold' }}>UNICODE CORPORATION</span>
                    <span className="modal-subtitle" style={{ textAlign: 'center', display: 'block', fontWeight: 'bold' }}>Roxas Avenue, 8016 Davao City, Philippines</span>
                    <br />
                    <br />
                    </div>
                    <div className="modal-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
                            <span style={{ textAlign: 'right', marginRight: '15px' }}>Employee Name</span>
                            <span>: {payslipData[0].employee_name}</span>
                            <span style={{ textAlign: 'right', marginRight: '15px' }}>Designation</span>
                            <span>: {payslipData[0].designation}</span>
                            <span style={{ textAlign: 'right', marginRight: '15px' }}>Department</span>
                            <span>: {payslipData[0].department}</span>
                            <span style={{ textAlign: 'right', marginRight: '15px' }}>Employee Type</span>
                            <span>: {payslipData[0].employee_type}</span>
                            <span style={{ textAlign: 'right', marginRight: '15px' }}>Status</span>
                            <span>: {payslipData[0].status}</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
                            <span style={{ textAlign: 'right', marginRight: '15px' }}>Pay Period</span>
                            <span>: {payslipData[0].pay_period}</span>
                            <span style={{ textAlign: 'right', marginRight: '15px' }}>Start Date</span>
                            <span>: {new Date(payslipData[0].start_date).toISOString().split('T')[0]}</span>
                            <span style={{ textAlign: 'right', marginRight: '15px' }}>End Date</span>
                            <span>: {new Date(payslipData[0].end_date).toISOString().split('T')[0]}</span>
                            <span style={{ textAlign: 'right', marginRight: '15px' }}>Pay Day</span>
                            <span>: {new Date(payslipData[0].pay_day).toISOString().split('T')[0]}</span>
                        </div>
                    </div>
                    <br />
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <tbody>
                            {payslipData && payslipData[0] && (
                                <>
                                    <tr>
                                        <th style={{ border: '1px solid black', textAlign: 'left' }}>Basic Pay</th>
                                        <td style={{ border: '1px solid black', textAlign: 'right' }}>{formatCurrency(payslipData[0].basic_pay)}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ border: '1px solid black', textAlign: 'left' }}>Total Earnings</th>
                                        <td style={{ border: '1px solid black', textAlign: 'right' }}>{formatCurrency(payslipData[0].total_earnings)}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ border: '1px solid black', textAlign: 'left' }}>Total Deductions</th>
                                        <td style={{ border: '1px solid black', textAlign: 'right' }}>{formatCurrency(payslipData[0].total_deductions)}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ border: '1px solid black', textAlign: 'left' }}>SSS</th>
                                        <td style={{ border: '1px solid black', textAlign: 'right' }}>{formatCurrency(payslipData[0].sss)}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ border: '1px solid black', textAlign: 'left' }}>PhilHealth</th>
                                        <td style={{ border: '1px solid black', textAlign: 'right' }}>{formatCurrency(payslipData[0].philhealth)}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ border: '1px solid black', textAlign: 'left' }}>Pag-IBIG</th>
                                        <td style={{ border: '1px solid black', textAlign: 'right' }}>{formatCurrency(payslipData[0].pagibig)}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ border: '1px solid black', textAlign: 'left' }}>Net Pay</th>
                                        <td style={{ border: '1px solid black', textAlign: 'right' }}>{formatCurrency(net_pay)}</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                    <br />
                    </div>
                    <div className="modal-footer">
                        <button onClick={printPayslip} className="modal-button">Print Payslip</button>
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
