import { FDInput, FDResult, TenureType } from '../types';

export const MINIMUM_INVESTMENT = 100000;

export const calculateMaturityDate = (startDate: string, tenureValue: number, tenureType: TenureType): string => {
  const date = new Date(startDate);
  
  switch (tenureType) {
    case TenureType.YEARS:
      date.setFullYear(date.getFullYear() + tenureValue);
      break;
    case TenureType.MONTHS:
      date.setMonth(date.getMonth() + tenureValue);
      break;
    case TenureType.DAYS:
      date.setDate(date.getDate() + tenureValue);
      break;
  }
  
  return date.toISOString().split('T')[0];
};

export const calculateFD = (input: FDInput): FDResult => {
  const { principal, rate, tenureValue, tenureType, compoundingFrequency, startDate } = input;

  if (principal < MINIMUM_INVESTMENT) {
    return {
      principal: principal || 0,
      maturityAmount: 0,
      totalInterest: 0,
      maturityDate: startDate,
      penaltyAmount: 0,
      earlyExitAmount: 0
    };
  }

  // Convert tenure to years
  let timeInYears = 0;
  switch (tenureType) {
    case TenureType.YEARS:
      timeInYears = tenureValue;
      break;
    case TenureType.MONTHS:
      timeInYears = tenureValue / 12;
      break;
    case TenureType.DAYS:
      timeInYears = tenureValue / 365;
      break;
  }

  const r = rate / 100;
  const n = compoundingFrequency;
  const t = timeInYears;

  // Formula: A = P(1 + r/n)^(nt)
  const amount = principal * Math.pow(1 + r / n, n * t);
  const interest = amount - principal;

  // Penalty Calculation: 20% of Total Interest
  const penalty = interest * 0.20;
  const earlyExitAmt = principal + (interest - penalty);

  return {
    principal,
    maturityAmount: parseFloat(amount.toFixed(2)),
    totalInterest: parseFloat(interest.toFixed(2)),
    maturityDate: calculateMaturityDate(startDate, tenureValue, tenureType),
    penaltyAmount: parseFloat(penalty.toFixed(2)),
    earlyExitAmount: parseFloat(earlyExitAmt.toFixed(2)),
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
