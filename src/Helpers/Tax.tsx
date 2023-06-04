
interface Props {
    net_income: number,
    circumstance: string,
    medicare_levy: number,
    higher_education_loan: number,
    tax_offsets: number,
    tax_credits: number
}

export default function Tax(props: Props) {

    var tax: number;
    var aus_resident_tax: number[][];
    var foreign_resident_tax: number[][];
    var working_holiday_tax: number[][];

    tax = 0;
    aus_resident_tax = [
        [0, 18200.99, 0, 0],
        [18201, 45000.99, 0.19, 0.19],
        [45001, 120000.99, 5092.325, 0.325],
        [120001, 180000.99, 29467.37, 0.37],
        [180001, 99999999999999, 51667.45, 0.45]
    ]
    foreign_resident_tax = [
        [0, 120000.99, 0, 0.325],
        [120001, 180000.99, 39000.37, 0.37],
        [180001, 99999999999999, 61200.45, 0.45]
    ]
    working_holiday_tax = [
        [0, 45000.99, 0, 0.15],
        [45001, 120000.99, 6750.325, 0.325],
        [120001, 180000.99, 31125.37, 0.37],
        [180001, 99999999999999, 53325.45, 0.45]
    ]

    switch (props.circumstance) {
        case ("australian-resident"):
            (props.net_income > 23365) ? tax += props.medicare_levy * props.net_income : null // This depends on whether one is a senior or not (SAPTO), and whether you have a spouse and kids
            aus_resident_tax.map((bracket) => {
                bracket[0] <= props.net_income && bracket[1] >= props.net_income ? tax += (bracket[2] + (props.net_income - bracket[2]) * bracket[3]) : null
            }
            )
            break;
        case ("foreign-resident"):
            (props.net_income > 23365) ? tax += props.medicare_levy * props.net_income : null // This depends on whether one is a senior or not (SAPTO), and whether you have a spouse and kids
            foreign_resident_tax.map((bracket) => {
                bracket[0] <= props.net_income && bracket[1] >= props.net_income ? tax += (bracket[2] + (props.net_income - bracket[2]) * bracket[3]) : null
            }
            )
            tax += props.medicare_levy * tax
            break;
        case ("working-holiday-maker"):
            working_holiday_tax.map((bracket) => {
                bracket[0] <= props.net_income && bracket[1] >= props.net_income ? tax = (bracket[2] + (props.net_income - bracket[2]) * bracket[3]) : null
            }
            )
            break;
        default:
            return 0;
    }
    return tax;
}

