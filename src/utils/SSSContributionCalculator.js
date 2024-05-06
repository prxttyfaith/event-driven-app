
// Using data from: https://www.sss.gov.ph/sss/DownloadContent?fileName=2023-Schedule-of-Contributions.pdf

function calculateMonthlySSSContribution (salary) {
    const data = [
        { lowerBound: 0, upperBound: 4249.99, amount: 180 },
        { lowerBound: 4250, upperBound: 4749.99, amount: 202.5 },
        { lowerBound: 4750, upperBound: 5249.99, amount: 225 },
        { lowerBound: 5250, upperBound: 5749.99, amount: 247.5 },
        { lowerBound: 5750, upperBound: 6249.99, amount: 270 },
        { lowerBound: 6250, upperBound: 6749.99, amount: 292.5 },
        { lowerBound: 6750, upperBound: 7249.99, amount: 315 },
        { lowerBound: 7250, upperBound: 7749.99, amount: 337.5 },
        { lowerBound: 7750, upperBound: 8249.99, amount: 360 },
        { lowerBound: 8250, upperBound: 8749.99, amount: 382.5 },
        { lowerBound: 8750, upperBound: 9249.99, amount: 405 },
        { lowerBound: 9250, upperBound: 9749.99, amount: 427.5 },
        { lowerBound: 9750, upperBound: 10249.99, amount: 450 },
        { lowerBound: 10250, upperBound: 10749.99, amount: 472.5 },
        { lowerBound: 10750, upperBound: 11249.99, amount: 495 },
        { lowerBound: 11250, upperBound: 11749.99, amount: 517.5 },
        { lowerBound: 11750, upperBound: 12249.99, amount: 540 },
        { lowerBound: 12250, upperBound: 12749.99, amount: 562.5 },
        { lowerBound: 12750, upperBound: 13249.99, amount: 585 },
        { lowerBound: 13250, upperBound: 13749.99, amount: 607.5 },
        { lowerBound: 13750, upperBound: 14249.99, amount: 630 },
        { lowerBound: 14250, upperBound: 14749.99, amount: 652.5 },
        { lowerBound: 14750, upperBound: 15249.99, amount: 675 },
        { lowerBound: 15250, upperBound: 15749.99, amount: 697.5 },
        { lowerBound: 15750, upperBound: 16249.99, amount: 720 },
        { lowerBound: 16250, upperBound: 16749.99, amount: 742.5 },
        { lowerBound: 16750, upperBound: 17249.99, amount: 765 },
        { lowerBound: 17250, upperBound: 17749.99, amount: 787.5 },
        { lowerBound: 17750, upperBound: 18249.99, amount: 810 },
        { lowerBound: 18250, upperBound: 18749.99, amount: 832.5 },
        { lowerBound: 18750, upperBound: 19249.99, amount: 855 },
        { lowerBound: 19250, upperBound: 19749.99, amount: 877.5 },
        { lowerBound: 19750, upperBound: 20249.99, amount: 900 },
        { lowerBound: 20250, upperBound: 20749.99, amount: 922.5 },
        { lowerBound: 20750, upperBound: 21249.99, amount: 945 },
        { lowerBound: 21250, upperBound: 21749.99, amount: 967.5 },
        { lowerBound: 21750, upperBound: 22249.99, amount: 990 },
        { lowerBound: 22250, upperBound: 22749.99, amount: 1012.5 },
        { lowerBound: 22750, upperBound: 23249.99, amount: 1035 },
        { lowerBound: 23250, upperBound: 23749.99, amount: 1057.5 },
        { lowerBound: 23750, upperBound: 24249.99, amount: 1080 },
        { lowerBound: 24250, upperBound: 24749.99, amount: 1102.5 },
        { lowerBound: 24750, upperBound: 25249.99, amount: 1125 },
        { lowerBound: 25250, upperBound: 25749.99, amount: 1147.5 },
        { lowerBound: 25750, upperBound: 26249.99, amount: 1170 },
        { lowerBound: 26250, upperBound: 26749.99, amount: 1192.5 },
        { lowerBound: 26750, upperBound: 27249.99, amount: 1215 },
        { lowerBound: 27250, upperBound: 27749.99, amount: 1237.5 },
        { lowerBound: 27750, upperBound: 28249.99, amount: 1260 },
        { lowerBound: 28250, upperBound: 28749.99, amount: 1282.5 },
        { lowerBound: 28750, upperBound: 29249.99, amount: 1305 },
        { lowerBound: 29250, upperBound: 29749.99, amount: 1327.5 },
        { lowerBound: 29750, upperBound: 1000000.00, amount: 1350 }
    ];

    for (const item of data) {
        if (salary >= item.lowerBound && salary <= item.upperBound) {
            return Number(item.amount.toFixed(2));
        } else if (salary > 1000000) {
            return Number(data[data.length - 1].amount.toFixed(2));
        }
    }
}

export default calculateMonthlySSSContribution ;

// Test the function   
// console.log(calculateMonthlySSSContribution (50000));
// console.log(calculateMonthlySSSContribution (28750));