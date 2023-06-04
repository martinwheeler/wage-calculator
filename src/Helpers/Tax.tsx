
const Tax = class {

    private tax: number;
    private aus_resident_tax: number[][];
    private foreign_resident_tax: number[][];
    private working_holiday_tax: number[][];

    private net_income: number;
    private circumstance: string;
    private medicare_levy: number;
    private higher_education_loan: number;
    private tax_offsets: number;
    private tax_credits: number;

    public constructor
        (
            net_income: number,
            circumstance: string,
            medicare_levy: number,
            higher_education_loan: number,
            tax_offsets: number,
            tax_credits: number
        ) {
        this.tax = 0;
        this.aus_resident_tax = [
            [0, 18200.99, 0, 0],
            [18201, 45000.99, 0.19, 0.19],
            [45001, 120000.99, 5092.325, 0.325],
            [120001, 180000.99, 29467.37, 0.37],
            [180001, 99999999999999, 51667.45, 0.45]
        ]
        this.foreign_resident_tax = [
            [0, 120000.99, 0, 0.325],
            [120001, 180000.99, 39000.37, 0.37],
            [180001, 99999999999999, 61200.45, 0.45]
        ]
        this.working_holiday_tax = [
            [0, 45000.99, 0, 0.15],
            [45001, 120000.99, 6750.325, 0.325],
            [120001, 180000.99, 31125.37, 0.37],
            [180001, 99999999999999, 53325.45, 0.45]
        ]

        this.net_income = net_income;
        this.circumstance = circumstance;
        this.medicare_levy = medicare_levy;
        this.higher_education_loan = higher_education_loan;
        this.tax_offsets = tax_offsets;
        this.tax_credits = tax_credits;

        return;
    }

    public get getTax() {
        switch (this.circumstance) {
            case ("australian-resident"):
                (this.net_income > 23365) ? this.tax += this.medicare_levy * this.net_income : null // This depends on whether one is a senior or not (SAPTO), and whether you have a spouse and kids
                this.aus_resident_tax.map((bracket) => {
                    bracket[0] <= this.net_income && bracket[1] >= this.net_income ? this.tax += (bracket[2] + (this.net_income - bracket[2]) * bracket[3]) : null
                }
                )
                break;
            case ("foreign-resident"):
                (this.net_income > 23365) ? this.tax += this.medicare_levy * this.net_income : null // This depends on whether one is a senior or not (SAPTO), and whether you have a spouse and kids
                this.foreign_resident_tax.map((bracket) => {
                    bracket[0] <= this.net_income && bracket[1] >= this.net_income ? this.tax += (bracket[2] + (this.net_income - bracket[2]) * bracket[3]) : null
                }
                )
                this.tax += this.medicare_levy * this.tax
                break;
            case ("working-holiday-maker"):
                this.working_holiday_tax.map((bracket) => {
                    bracket[0] <= this.net_income && bracket[1] >= this.net_income ? this.tax = (bracket[2] + (this.net_income - bracket[2]) * bracket[3]) : null
                }
                )
                break;
            default:
                return 0;
        }

        return this.tax;
    }

}

export default Tax;