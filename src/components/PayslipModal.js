import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import config from '../config';

const PayslipModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [payslipData, setPayslipData] = useState(null);

    const fetchPayslip = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/employee-payrolls/payslip?pay_day=${pay_day}`);
            setPayslipData(response.data.data);
        } catch (error) {
            console.error('Error fetching payslip data:', error);
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const printPayslip = () => {
        window.print();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        fetchPayslip();
    }, []);

    useEffect(() => {
        if (payslipData) {
            openModal();
        }
    }, [payslipData]);

    return (
        <div>
            <button onClick={openModal}>View</button>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Payslip Modal"
            >
                {payslipData && (
                    <div>
                        <button onClick={printPayslip}>Print Payslip</button>
                        <button onClick={closeModal}>Close</button>
                        <h1>Payslip for {payslipData.employee_name}</h1>
                        <p>Position: {payslipData.position}</p>
                        <p>Pay Period: {payslipData.pay_period}</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Start Date</th>
                                    <th>End Date</th>
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
                                <tr>
                                    <td>{payslipData.start_date}</td>
                                    <td>{payslipData.end_date}</td>
                                    <td>{formatCurrency(payslipData.basic_pay)}</td>
                                    <td>{formatCurrency(payslipData.total_earnings)}</td>
                                    <td>{formatCurrency(payslipData.total_deductions)}</td>
                                    <td>{formatCurrency(payslipData.sss)}</td>
                                    <td>{formatCurrency(payslipData.philhealth)}</td>
                                    <td>{formatCurrency(payslipData.pagibig)}</td>
                                    <td>{formatCurrency(payslipData.net_pay)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default PayslipModal;