export enum TenureType {
  YEARS = 'Years',
  MONTHS = 'Months',
  DAYS = 'Days'
}

export enum CompoundingFrequency {
  MONTHLY = 12,
  QUARTERLY = 4,
  HALF_YEARLY = 2,
  YEARLY = 1
}

export interface UserProfile {
  name: string;
  address: string;
}

export interface FDInput {
  id?: string;
  title?: string; // e.g., "Wedding Fund"
  principal: number;
  rate: number;
  tenureValue: number;
  tenureType: TenureType;
  compoundingFrequency: CompoundingFrequency;
  startDate: string; // ISO Date string YYYY-MM-DD
}

export interface FDResult {
  principal: number;
  maturityAmount: number;
  totalInterest: number;
  maturityDate: string;
  penaltyAmount: number; // 20% of interest
  earlyExitAmount: number; // Principal + (Interest - Penalty)
}

export interface SavedInvestment extends FDInput, FDResult {
  createdAt: number;
}