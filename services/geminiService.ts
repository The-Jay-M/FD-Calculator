import { GoogleGenAI } from "@google/genai";
import { FDInput, FDResult, TenureType } from '../types';

export const getFinancialAdvice = async (input: FDInput, result: FDResult): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    I am planning a Fixed Deposit investment with the following details:
    - Principal: ${input.principal}
    - Interest Rate: ${input.rate}%
    - Tenure: ${input.tenureValue} ${input.tenureType}
    
    The calculated result is:
    - Maturity Amount: ${result.maturityAmount}
    - Total Interest Earned: ${result.totalInterest}

    Please provide a concise financial assessment (max 150 words). 
    1. Is this a competitive return based on general historical averages (no real-time data needed)?
    2. What is the impact of inflation on this return?
    3. Suggest one alternative low-risk investment if applicable.
    
    Keep the tone professional yet easy to understand for a general investor.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Could not generate advice at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I am currently unable to provide financial advice. Please try again later.";
  }
};
