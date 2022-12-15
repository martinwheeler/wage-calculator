// What day rate would you like to get in-pocket?
// How many sick days would you like to have available?
// How many vacation days would you like to have available?

// Q: Do we calculate the public holidays?
// Thought: API to get public holidays based on location of the user

// Input: Days pay, sick days, vacation days
// Calculate: Superannuation (9.5%)
// Calculate: Tax (varies based on location & income amount)
// Calculate: Non-working day pay (sick, vacation, public holidays)
// Calculate: Total days working in a year

const DEFAULT_SUPERANNUATION_PERCENTAGE = 0.095; // 9.5%
const DEFAULT_TAX_PERCENTAGE = 0.33; // Safest to assume 33% tax
// NOTE: Let the user define this, as they may want to work more than this
const TOTAL_DAYS_AVAILABLE_TO_WORK = 52 * 5; // 52 weeks in a year, 5 days a week

const tapLog = (title: string, data: any) => {
  console.log(title, data);
  return data;
};

function calculatePay(
  daysPay: number,
  sickDays: number = 10,
  vacationDays: number = 27,
  taxRate: number = DEFAULT_TAX_PERCENTAGE,
  superannuationRate: number = DEFAULT_SUPERANNUATION_PERCENTAGE
): number {
  const withoutSuperannuation = lessSuperannuation(
    superannuationRate > 1 ? superannuationRate / 100 : superannuationRate
  );
  const withoutTax = lessTax(taxRate > 1 ? taxRate / 100 : taxRate);
  //   console.log({ superannuation, tax });
  const totalDaysNotWorking = sickDays + vacationDays;

  return tapLog(
    "lessNonWork",
    lessNonWorkingDayPay(
      tapLog(
        "lessTax",
        withoutTax(
          tapLog("lessSuper", withoutSuperannuation(tapLog("start", daysPay)))
        )
      ),
      totalDaysNotWorking
    )
  );
}

function calculateSuperannuation(
  startAmount: number,
  superPercentageInDecimal: number
): number {
  return tapLog("super", startAmount * superPercentageInDecimal);
}

function lessSuperannuation(superRate: number) {
  return (startAmount: number): number => {
    return startAmount - calculateSuperannuation(startAmount, superRate);
  };
}

function calculateTax(
  startAmount: number,
  taxPercentageInDecimal: number
): number {
  return tapLog("tax", startAmount * taxPercentageInDecimal);
}

function lessTax(taxRate: number) {
  return (startAmount: number): number => {
    return startAmount - calculateTax(startAmount, taxRate);
  };
}

// Calculate how much money you will have to put asside to cover your non-working days
function calculateDaysNotWorkingToSave(
  startAmount: number,
  totalDaysNotWorking: number
): number {
  const totalAmountToSave = tapLog(
    "amount to save",
    startAmount * totalDaysNotWorking
  );
  const totalDaysWorking = tapLog(
    "days working",
    TOTAL_DAYS_AVAILABLE_TO_WORK - totalDaysNotWorking
  );
  return tapLog(
    "save for non-working days",
    totalAmountToSave / totalDaysWorking
  );
}

function lessNonWorkingDayPay(
  startAmount: number,
  totalDaysNotWorking: number
): number {
  return (
    startAmount -
    calculateDaysNotWorkingToSave(startAmount, totalDaysNotWorking)
  );
}

export { calculatePay };

// 100 per day
// Work for 10 days
// Non-work for 5 days

// Total 15 days of pay required
// 100 * 10 = 1000 available from working
// Need to save 500 for non-working days

// totalAmountToSave = dayRate * totalDaysNotWorking
// amountToSavePerDay = totalAmountToSave / totalDaysWorking

// 1000 - 500 = 500

// 500 / 10 = 50 per day
