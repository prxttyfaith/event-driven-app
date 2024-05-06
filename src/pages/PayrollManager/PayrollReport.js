import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Main.css';
import Sidebar from '../../components/Sidebar';
import PayrollReportModal from '../../components/PayrollReportModal';
import { Rings as Loader } from 'react-loader-spinner';
import config from '../../config';

// Helper function to set the default pay day
const setDateTenthOfMonth = () => {
    const date = new Date();
    date.setDate(10);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

function PayrollReport() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [dateOptions, setDateOptions] = useState([]);
    const [payrollReportData, setPayrollReportData] = useState(null);
    const [isTableVisible, setIsTableVisible] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        pay_period: 'Semi-Monthly',
        pay_day: setDateTenthOfMonth()
        
    });
    const [formErrors, setFormErrors] = useState({
        pay_period: '',
        pay_day: ''
    });

    useEffect(() => {
        const generateDateOptions = () => {
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
        };

        generateDateOptions();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsSidebarVisible(false);
        setTimeout(async () => {
            const params = {
                pay_period: formData.pay_period,
                pay_day: formData.pay_day
            };
            try {
                const response = await axios.get(`${config.apiUrl}/employee-payrolls`, { params });
                setPayrollReportData(response.data.data);
                setIsViewModalOpen(true);
                setIsTableVisible(false);
            } catch (error) {
                setErrorMessage(`Error on form submission: ${error.response ? error.response.data.message : error.message}`);
            } finally {
                setIsLoading(false);
            }
        }, 5000);
    };

    const resetForm = () => {
        setFormData({
            pay_period: 'Semi-Monthly',
            pay_day: setDateTenthOfMonth()
        });
    };

    return (
        <>
            {isSidebarVisible && <Sidebar />}
            <div className="table-container">
                <h2>PAYROLL REPORT</h2>
                {errorMessage && <div className="error">{errorMessage}</div>}
                <br />
                <div>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="right-align">Payroll Period</label>
                            <div className="input-container">
                                <select
                                    name="pay_period"
                                    value={formData.pay_period}
                                    onChange={handleInputChange}
                                >
                                    {/* <option value="">Select Payroll Period</option> */}
                                    <option value="Weekly" disabled>Weekly</option>
                                    <option value="Bi-Weekly" disabled>Bi-Weekly</option>
                                    <option value="Semi-Monthly">Semi-Monthly</option>
                                    <option value="Monthly" disabled>Monthly</option>
                                </select>
                                {formErrors.pay_period && <div className="error">{formErrors.pay_period}</div>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="right-align">Pay Day</label>
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

                        <div className="form-group">
                            <button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <div className="loading-container" style={{ flexDirection: 'row' }}>
                                        <span>Extracting company payroll report...</span>
                                        <Loader color="#00BFFF" height={30} width={30} />
                                    </div>
                                ) : 'Extract Company Payroll Report'}
                            </button>
                        </div>
                        <div className="form-group">
                            <button className="cancel-button" onClick={resetForm}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
            {payrollReportData !== null && (
                <PayrollReportModal
                    isOpen={isViewModalOpen}
                    onClose={() => {
                        setIsViewModalOpen(false);
                        setIsTableVisible(true);
                        setIsSidebarVisible(true);
                    }}
                    payrollPeriod={formData.pay_period}
                    payDay={formData.pay_day}
                    payrollReportData={payrollReportData}
                />
            )}
        </>
    );
}

export default PayrollReport;
