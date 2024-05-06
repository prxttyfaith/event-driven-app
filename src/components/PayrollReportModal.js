import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
// import axios from 'axios';
// import config from '../config';
import '../styles/Main.css';

const payrollReportModal = ({ isOpen, onClose, payrollPeriod, payDay, payrollReportData}) => {
    // Calcualte Net pay
    // let net_pay = payrollReportData ? (payrollReportData[0].basic_pay + payrollReportData[0].total_earnings) - Math.abs(payrollReportData[0].total_deductions) - payrollReportData[0].sss - payrollReportData[0].philhealth - payrollReportData[0].pagibig : 0;

    const printPayroll = () => {
        const originalTitle = document.title;
        document.title = 'Payroll_Report_Unicode_Corporation_' + payrollPeriod + '_Pay_Date_' + payDay;
        window.print();
        document.title = originalTitle;
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(value);
    };

    // Calculate totals
    const totalBasicPay = payrollReportData.reduce((total, data) => total + data.basic_pay, 0);
    const totalAddtEarnings = payrollReportData.reduce((total, data) => total + data.addt_earnings, 0);
    const totalDeductions = payrollReportData.reduce((total, data) => total + data.deductions, 0);
    const totalPagibig = payrollReportData.reduce((total, data) => total + data.pagibig, 0);
    const totalPhilhealth = payrollReportData.reduce((total, data) => total + data.philhealth, 0);
    const totalSss = payrollReportData.reduce((total, data) => total + data.sss, 0);
    const totalWhTax = payrollReportData.reduce((total, data) => total + data.wh_tax, 0);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal-content-wide"
            // className="modal-content-wide"
            contentLabel="Payroll Modal"
            overlayClassName="modal-wide"
            shouldCloseOnOverlayClick={true}            
        >
            {payrollReportData && payrollReportData[0] ? (
                <div className="modal-content-wide">
                    <div className="modal-header">
                      <h1 className="modal-title">PAYROLL REPORT</h1>
                      <br />
                    </div>
                    <div className="modal-body">
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <th style={{ border: '1px solid black', textAlign: 'right', paddingRight: '5px', width: '25%' }}>Company Name:</th>
                                <td style={{ border: '1px solid black', textAlign: 'left', paddingRight: '5px', width: '75%', fontWeight: 'bold', color: '#355738' }}>UNICODE CORPORATION</td>
                            </tr>
                            <tr>
                                <th style={{ border: '1px solid black', textAlign: 'right', paddingRight: '5px', width: '25%' }}>Company Address:</th>
                                <td style={{ border: '1px solid black', textAlign: 'left', paddingRight: '5px', width: '75%' }}>Roxas Avenue, 8016 Davao City, Philippines</td>
                            </tr>
                            <tr>
                                <th style={{ border: '1px solid black', textAlign: 'right', paddingRight: '5px', width: '25%' }}>Pay Period:</th>
                                <td style={{ border: '1px solid black', textAlign: 'left', paddingRight: '5px', width: '75%' }}>{payrollPeriod}</td>
                            </tr>
                            <tr>
                                <th style={{ border: '1px solid black', textAlign: 'right', paddingRight: '5px', width: '25%' }}>Pay Date:</th>
                                <td style={{ border: '1px solid black', textAlign: 'left', paddingRight: '5px', width: '75%' }}>{payDay}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <br />
                    <h3 style={{ textAlign: 'left' }}>Payroll Summary Report</h3>
                    {payrollReportData && payrollReportData.length > 0 ? (
                        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                            <thead>
                            <tr>
                              <th style={{ border: '1px solid black', textAlign: 'left', backgroundColor: '#4a7b5a', color: '#f5f5dc' }}>EMPLOYEE</th>
                              <th style={{ border: '1px solid black', textAlign: 'right', backgroundColor: '#4a7b5a', color: '#f5f5dc' }}>BASIC PAY</th>
                              <th style={{ border: '1px solid black', textAlign: 'right', backgroundColor: '#4a7b5a', color: '#f5f5dc' }}> + EARNINGS</th>
                              <th style={{ border: '1px solid black', textAlign: 'right', backgroundColor: '#4a7b5a', color: '#f5f5dc' }}>DEDUCTIONS</th>
                              <th style={{ border: '1px solid black', textAlign: 'right', backgroundColor: '#4a7b5a', color: '#f5f5dc' }}>PAG-IBIG</th>
                              <th style={{ border: '1px solid black', textAlign: 'right', backgroundColor: '#4a7b5a', color: '#f5f5dc' }}>PHILHEALTH</th>
                              <th style={{ border: '1px solid black', textAlign: 'right', backgroundColor: '#4a7b5a', color: '#f5f5dc' }}>SSS</th>
                              <th style={{ border: '1px solid black', textAlign: 'right', backgroundColor: '#4a7b5a', color: '#f5f5dc' }}>TAX WITHHELD</th> 
                            </tr>
                            </thead>
                            <tbody>
                                {payrollReportData.map((data, index) => (
                                    <tr key={index}>
                                        <th style={{ border: '1px solid black', textAlign: 'left', fontWeight: 'normal' }}>{data.employee_name}</th>
                                        <td style={{ border: '1px solid black', textAlign: 'right' }}>{formatCurrency(data.basic_pay)}</td>
                                        <td style={{ border: '1px solid black', textAlign: 'right' }}>{formatCurrency(data.addt_earnings)}</td>
                                        <td style={{ border: '1px solid black', textAlign: 'right' }}>{formatCurrency(data.deductions)}</td>
                                        <td style={{ border: '1px solid black', textAlign: 'right' }}>{formatCurrency(data.pagibig)}</td>
                                        <td style={{ border: '1px solid black', textAlign: 'right' }}>{formatCurrency(data.philhealth)}</td>
                                        <td style={{ border: '1px solid black', textAlign: 'right' }}>{formatCurrency(data.sss)}</td>
                                        <td style={{ border: '1px solid black', textAlign: 'right' }}>{formatCurrency(data.wh_tax)}</td>
                                    </tr>
                                ))}
                                 <tr>
                                    <th style={{ border: '1px solid black', textAlign: 'left', backgroundColor: '#4a7b5a', color: '#f5f5dc'}}>TOTALS</th>
                                    <td style={{ border: '1px solid black', textAlign: 'right', backgroundColor: '#7aba78', color: '#fff' }}>{formatCurrency(totalBasicPay)}</td>
                                    <td style={{ border: '1px solid black', textAlign: 'right', backgroundColor: '#7aba78', color: '#fff' }}>{formatCurrency(totalAddtEarnings)}</td>
                                    <td style={{ border: '1px solid black', textAlign: 'right', backgroundColor: '#7aba78', color: '#fff' }}>{formatCurrency(totalDeductions)}</td>
                                    <td style={{ border: '1px solid black', textAlign: 'right', backgroundColor: '#7aba78', color: '#fff' }}>{formatCurrency(totalPagibig)}</td>
                                    <td style={{ border: '1px solid black', textAlign: 'right', backgroundColor: '#7aba78', color: '#fff' }}>{formatCurrency(totalPhilhealth)}</td>
                                    <td style={{ border: '1px solid black', textAlign: 'right', backgroundColor: '#7aba78', color: '#fff' }}>{formatCurrency(totalSss)}</td>
                                    <td style={{ border: '1px solid black', textAlign: 'right', backgroundColor: '#7aba78', color: '#fff' }}>{formatCurrency(totalWhTax)}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <p>No payroll data available.</p>
                    )}

                    <br />
                    </div>
                    <div className="modal-footer">
                        <button onClick={onClose} className="close-button">Close</button>
                        <button onClick={printPayroll} className="print-button">Download</button>
                    </div>
                </div>
            ) : (
                <div>No Payroll data available.</div>
            )}
        </Modal>
    );
};

export default payrollReportModal;
// export { fetchPayslip };
