
// https://www.bir.gov.ph/index.php/tax-information/income-tax/10-tax-information.html

// Withholding Tax = Fixed tax + (Taxable income − Compensation Level) x Rate

function calculateMonthlyWithholdingTax(salary) {
    let tax = 0;

    if (salary <= 20833) {
        tax = 0;
    } else if (salary >= 20833.01 && salary <= 33332.99) {
        const fixedTax = 0.00;
        const compensationLevel = 20833.01;
        const rate = 0.15;
        tax = calculateTax(salary, fixedTax, compensationLevel, rate);
    } else if (salary >= 33333.00 && salary <= 66666.99) {
        const fixedTax = 1875.00;
        const compensationLevel = 33333;
        const rate = 0.20;
        tax = calculateTax(salary, fixedTax, compensationLevel, rate);
    } else if (salary >= 66667.00 && salary <= 166666.99) {
        const fixedTax = 8541.80;
        const compensationLevel = 66667.00;
        const rate = 0.25;
        tax = calculateTax(salary, fixedTax, compensationLevel, rate);
    } else if (salary >= 166667.00 && salary <= 666666.99) {
        const fixedTax = 33541.80;
        const compensationLevel = 166667.00;
        const rate = 0.30;
        tax = calculateTax(salary, fixedTax, compensationLevel, rate);
    } else if (salary >= 666667.00) {
        const fixedTax = 183541.80;
        const compensationLevel = 666667.00;
        const rate = 0.35;
        tax = calculateTax(salary, fixedTax, compensationLevel, rate);
    } else {
        tax = 0;
    }

    return Number(tax.toFixed(2));
}

function calculateTax(salary, fixedTax, compensationLevel, rate) {
    return fixedTax + (salary - compensationLevel) * rate;
}

export default calculateMonthlyWithholdingTax;

// console.log(calculateMonthlyWithholdingTax(300000));