

// https://mpm.ph/wp-content/uploads/2024/01/HDMF-Circular-No.-460-Pag-ibig-HDMF-Table-2024.pdf

function calculateMonthlyPagibigContribution(salary) {
    let amount = 0;

    if (salary <= 1500) {
        amount  = (salary * 0.01);
    } else if (salary > 1500 && salary < 5000) {
        amount  = (salary * 0.02);
    } else if (salary >= 5000) {
        amount  = 100;
    }

    return Number(amount.toFixed(2));
}

export default calculateMonthlyPagibigContribution;
// console.log(calculateMonthlyPagibigContribution(4000));