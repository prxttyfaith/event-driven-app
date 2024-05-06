
// Using data from: https://www.philhealth.gov.ph/partners/employers/ContributionTable_v2.pdf

// Consider Employee A, who earns a monthly salary of ₱25,000.
//To determine their monthly premium with the new 5% rate, apply the following formula:
// Basic Salary x 5% (0.05) = Premium Rate
// Calculating Employee A's monthly PhilHealth contribution gives us:
// ₱25,000 x 0.05 = ₱1,250
// To find out the contribution split, divide the monthly premium in half:
// ₱1,250 (Monthly premium) ÷ 2 = ₱625 (Employee’s share)
// As a result, both Employee A and their employer will contribute ₱625 each to PhilHealth every month.


function calculateMonthlyPhilHealthContribution (salary) {
    let amount = 0;

    if (salary <= 10000) {
        amount = 250; // half of 500 - employee's share and employer's share
    } else if (salary >= 10000.01 && salary <= 99999.99) {
        amount = ((salary * 0.05) / 2);
    } else if (salary >= 100000) {
        amount = 5000;
    } else {
        amount = 250;
    }

    return Number((amount).toFixed(2));
}

export default calculateMonthlyPhilHealthContribution ;


// Test the function    
// console.log(calculateMonthlyPhilHealthContribution (50000));

