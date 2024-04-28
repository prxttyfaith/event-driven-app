import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CreateForm.css';
import Sidebar from '../components/Sidebar';
import config from '../config';

// Default values
const currentDateTwentyFifthOfMonth = () => {
    const date = new Date();
    date.setDate(25);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const currentDateFifteenthOfMonth = () => {
    const date = new Date();
    date.setDate(15);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const currentDateFirstOfMonth = () => {
    const date = new Date();
    date.setDate(1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

function GeneratePayrolls() {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [dateOptions, setDateOptions] = useState([]);
    const [formErrors, setFormErrors] = useState({
        pay_period: '',
        payroll_start_date: '',
        payroll_end_date: '',
        pay_day: ''
    });
    const [formData, setFormData] = useState({
        pay_period: 'Semi-Monthly',
        payroll_start_date: currentDateFirstOfMonth(),
        payroll_end_date: currentDateFifteenthOfMonth(),
        pay_day: currentDateTwentyFifthOfMonth()
    });

    useEffect(() => {
        const dates = [];
        const startYear = new Date().getFullYear() - 1;
        const endYear = new Date().getFullYear() + 1;
        for (let year = startYear; year <= endYear; year++) {
            for (let month = 1; month <= 12; month++) {
                dates.push(`${year}-${('0' + month).slice(-2)}-01`);
                dates.push(`${year}-${('0' + month).slice(-2)}-16`);
            }
        }
        setDateOptions(dates);
    }, []);

    useEffect(() => {
        window.onbeforeunload = () => {
            localStorage.removeItem('payroll_start_date');
            localStorage.removeItem('pay_period');
        }
    
        const savedStartDate = localStorage.getItem('payroll_start_date');
        const savedPayPeriod = localStorage.getItem('pay_period');
        if (savedStartDate) {
            setFormData(prevState => ({
                ...prevState,
                payroll_start_date: savedStartDate
            }));
        }
        if (savedPayPeriod) {
            setFormData(prevState => ({
                ...prevState,
                pay_period: savedPayPeriod
            }));
        }
    
        // Cleanup
        return () => {
            window.onbeforeunload = null;
        }
    }, []);

    // useEffect(() => {
    //     if (formData.payroll_start_date) {
    //         const { endDate, payDay } = calculateDates(formData.payroll_start_date);
    //         setFormData(prevState => ({
    //             ...prevState,
    //             payroll_end_date: endDate,
    //             pay_day: payDay
    //         }));
    //     }
    // }, [formData.payroll_start_date]);

    const calculateDates = (startDate) => {
        let endDate, payDay;
        const start = new Date(startDate);
        const day = start.getDate();

        if (day === 1) {
            endDate = new Date(Date.UTC(start.getFullYear(), start.getMonth(), 15));
            payDay = new Date(Date.UTC(start.getFullYear(), start.getMonth(), 25));
        } else if (day === 16) {
            endDate = new Date(Date.UTC(start.getFullYear(), start.getMonth() + 1, 0));
            payDay = new Date(Date.UTC(start.getFullYear(), start.getMonth() + 1, 10));
        } else {
            return { endDate: '', payDay: '' };
        }

        endDate = new Date(endDate.toLocaleString("en-US", { timeZone: "Asia/Singapore" }));
        payDay = new Date(payDay.toLocaleString("en-US", { timeZone: "Asia/Singapore" }));
        return { endDate: endDate.toISOString().split('T')[0], payDay: payDay.toISOString().split('T')[0] };
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => {
            const updatedState = { ...prevState, [name]: value };
            if (name === 'payroll_start_date') {
                const { endDate, payDay } = calculateDates(value);
                updatedState.payroll_end_date = endDate;
                updatedState.pay_day = payDay;
            }
            return updatedState;
        });
    }

    const validateForm = () => {
        let errors = {};

        // if (!formData.pay_period) {
        //     errors.pay_period = 'Please select payroll period.';
        // }
        // if (!formData.payroll_start_date) {
        //     errors.payroll_start_date = 'Please select start date to ensure that the payroll is generated for the correct period.';
        // }

        console.log('Errors:', errors);
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // const onSubmit = async (e) => {
    //     e.preventDefault();
    //     if (validateForm()) {
    //         try {
    //             const payload = {
    //                 pay_period: formData.pay_period,
    //                 payroll_start_date: formData.payroll_start_date,
    //                 payroll_end_date: formData.payroll_end_date,
    //                 pay_day: formData.pay_day
    //             };
    //             const response = await axios.post(`${config.apiUrl}/employee-payrolls`, payload);
    //             setSuccessMessage(response.data.message);
    //             setShowModal(true);
    //             setFormData({
    //                 pay_period: '',
    //                 payroll_start_date: currentDateFirstOfMonth(),
    //                 payroll_end_date: currentDateFifteenthOfMonth(),
    //                 pay_day: currentDateTwentyFifthOfMonth()
    //             });
    //         } catch (error) {
    //             console.error('Error on form submission:', error);
    //             setErrorMessage(error.message);
    //         }
    //     }
    // };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const payload = {
                    pay_period: formData.pay_period,
                    payroll_start_date: formData.payroll_start_date,
                    payroll_end_date: formData.payroll_end_date,
                    pay_day: formData.pay_day
                };
                const response = await axios.post(`${config.apiUrl}/employee-payrolls`, payload);
                setSuccessMessage(response.data.message);
                setShowModal(true);
                localStorage.setItem('pay_period', formData.pay_period);
                localStorage.setItem('payroll_start_date', formData.payroll_start_date);
            } catch (error) {
                console.error('Error on form submission:', error);
                setErrorMessage(error.message);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            pay_period: '',
            payroll_start_date: '',
            payroll_end_date: '',
            pay_day: ''
        });
    };

    const closeModal = () => {
        setShowModal(false);
        setSuccessMessage('');
    };

    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="create-form-container">
                <h2>Generate Payroll</h2>
                {errorMessage && <div className="error">{errorMessage}</div>}
                <br />
                <div>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="type">Payroll Period</label>
                            <div className="input-container">
                                <select
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

                        <div className="form-group">
                            <label htmlFor="date">Payroll Start Date</label>
                            <div className="input-container">
                                <select
                                    id="payroll_start_date"
                                    name="payroll_start_date"
                                    value={formData.payroll_start_date}
                                    onChange={handleInputChange}
                                >
                                    {dateOptions.map(date => (
                                        <option key={date} value={date}>{date}</option>
                                    ))}
                                </select>
                                {formErrors.payroll_start_date && <div className="error">{formErrors.payroll_start_date}</div>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="date">Payroll End Date</label>
                            <div className="input-container">
                                <input
                                    id="payroll_end_date"
                                    type="text"
                                    name="payroll_end_date"
                                    value={formData.payroll_end_date}
                                    disabled                
                                />
                                {formErrors.payroll_end_date && <div className="error">{formErrors.payroll_end_date}</div>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="date">Payroll Payday</label>
                            <div className="input-container">
                                <input
                                    id="pay_day"
                                    type="text"
                                    name="pay_day"
                                    value={formData.pay_day}
                                    disabled               
                                />
                                {formErrors.pay_day && <div className="error">{formErrors.pay_day}</div>}
                            </div>
                        </div>

                        <button type="submit">Generate Payroll</button>
                        <button type="button" className="cancel-button" onClick={resetForm}>Reset</button>
                    </form>
                </div>
                {showModal && (
                    <div className="modal" onClick={handleModalClick}>
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>&times;</span>
                            <p>{successMessage}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GeneratePayrolls;
