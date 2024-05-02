import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import config from '../config';
import '../styles/Modal.css';

const fetchPayslip = async (employee_id, pay_period, pay_day) => {
    try {
        const response = await axios.get(`${config.apiUrl}/employee-payrolls/payslip`, {
            params: { employee_id, pay_period, pay_day }
        });
        if (response.data.data) {
            return {
                payslipData: response.data.data,
                earningsData: response.data.earningsData,
                deductionsData: response.data.deductionsData
            };
        } else {
            console.error('No payslip data available.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching payslip data:', error);
        return null; // Return null or appropriate default value on error
    }
};

const PayslipModal = ({ isOpen, onClose, rowData, payslipData, earningsData, deductionsData }) => {

    // console.log('payslipData:', payslipData);
    // console.log('earningsData:', earningsData);
    // console.log('deductionsData:', deductionsData);

    let net_pay = payslipData && payslipData[0] ? (payslipData[0].basic_pay + payslipData[0].total_earnings) - Math.abs(payslipData[0].total_deductions) - payslipData[0].sss - payslipData[0].philhealth - payslipData[0].pagibig : 0;

    const printPayslip = () => {
        const originalTitle = document.title;
        document.title = 'Payslip_' + payslipData[0].employee_name + '_' + payslipData[0].pay_period + '_' + payslipData[0].pay_day;
        window.print();
        document.title = originalTitle;
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(value);
    };

    return (
        <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Payslip Modal"
    className="modal printModal"
>
            {payslipData && payslipData[0] ? (
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title">PAYSLIP</h1>
                    <br />
                    <span className="modal-subtitle">UNICODE CORPORATION</span>
                    <span className="modal-subtitle">Roxas Avenue, 8016 Davao City, Philippines</span>
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
                    <h3 style={{ textAlign: 'left' }}>Earnings</h3>
                    {earningsData && earningsData.length > 0 ? (
                        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                            <thead>
                                <tr>
                                    <th style={{ border: '1px solid black', textAlign: 'left' }}>Earning Type</th>
                                    <th style={{ border: '1px solid black', textAlign: 'left' }}>Date</th>
                                    <th style={{ border: '1px solid black', textAlign: 'right' }}>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {earningsData.map((earning, index) => (
                                    <tr key={index}>
                                        <td style={{ border: '1px solid black', textAlign: 'left' }}>{earning.earning_type}</td>
                                        <td style={{ border: '1px solid black', textAlign: 'left' }}>{new Date(earning.earning_date).toISOString().split('T')[0]}</td>
                                        <td style={{ border: '1px solid black', textAlign: 'right' }}>{formatCurrency(earning.earning_amount)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No earnings data available.</p>
                    )}

                    <br />
                    <h3 style={{ textAlign: 'left' }}>Deductions</h3>
                    {deductionsData && deductionsData.length > 0 ? (
                        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                            <thead>
                                <tr>
                                    <th style={{ border: '1px solid black', textAlign: 'left' }}>Deduction Type</th>
                                    <th style={{ border: '1px solid black', textAlign: 'left' }}>Date</th>
                                    <th style={{ border: '1px solid black', textAlign: 'right' }}>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deductionsData.map((deduction, index) => (
                                    <tr key={index}>
                                        <td style={{ border: '1px solid black', textAlign: 'left' }}>{deduction.deduction_type}</td>
                                        <td style={{ border: '1px solid black', textAlign: 'left' }}>{new Date(deduction.deduction_date).toISOString().split('T')[0]}</td>
                                        <td style={{ border: '1px solid black', textAlign: 'right' }}>{formatCurrency(deduction.deduction_amount)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No deductions data available.</p>
                    )}

                    <br />
                    </div>
                    <div className="modal-footer">
                        <button onClick={onClose} className="modal-button">Close</button>
                        <button onClick={printPayslip} className="modal-button">Print Payslip</button>
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
