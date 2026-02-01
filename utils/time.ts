export const calculateProgress = (startDate: string, maturityDate: string): number => {
    const start = new Date(startDate).getTime();
    const end = new Date(maturityDate).getTime();
    const now = Date.now();
  
    if (now < start) return 0;
    if (now > end) return 100;
  
    const totalDuration = end - start;
    const elapsed = now - start;
    
    return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
  };
  
  export interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }
  
  export const getTimeRemaining = (targetDate: string): TimeRemaining => {
    const total = Date.parse(targetDate) - Date.now();
    
    if (total <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }
  
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
  
    return { days, hours, minutes, seconds, isExpired: false };
  };