'use server';
/**
 * @fileOverview A Genkit flow for providing personalized golf performance analysis and actionable tips.
 *
 * - analyzeGolfPerformance - A function that handles the golf performance analysis process.
 * - AnalyzeGolfPerformanceInput - The input type for the analyzeGolfPerformance function.
 * - AnalyzeGolfPerformanceOutput - The return type for the analyzeGolfPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeGolfPerformanceInputSchema = z.object({
  stablefordScores: z
    .array(z.number())
    .describe('A list of recent Stableford scores for the user.'),
  handicap: z.number().describe("The user's current golf handicap."),
  recentCourseConditions: z
    .string()
    .optional()
    .describe('Optional: Description of recent course conditions (e.g., windy, wet, dry).'),
});
export type AnalyzeGolfPerformanceInput = z.infer<
  typeof AnalyzeGolfPerformanceInputSchema
>;

const AnalyzeGolfPerformanceOutputSchema = z.object({
  summary: z.string().describe("An overall summary of the user's golf performance."),
  strengths: z
    .array(z.string())
    .describe('Identified strengths in the user\u0027s golf game.'),
  weaknesses: z
    .array(z.string())
    .describe('Identified weaknesses in the user\u0027s golf game.'),
  actionableTips: z
    .array(z.string())
    .describe('Specific, actionable tips for improving the user\u0027s golf game.'),
  overallRecommendation: z
    .string()
    .describe('An overall recommendation or focus area for the user.'),
});
export type AnalyzeGolfPerformanceOutput = z.infer<
  typeof AnalyzeGolfPerformanceOutputSchema
>;

export async function analyzeGolfPerformance(
  input: AnalyzeGolfPerformanceInput
): Promise<AnalyzeGolfPerformanceOutput> {
  return analyzeGolfPerformanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'golfPerformanceAnalysisPrompt',
  input: {schema: AnalyzeGolfPerformanceInputSchema},
  output: {schema: AnalyzeGolfPerformanceOutputSchema},
  prompt: `You are an experienced golf coach and analyst. Your task is to analyze a user's recent Stableford scores and handicap to provide personalized insights, identify strengths and weaknesses, and offer actionable tips for improvement. Adopt a supportive and encouraging tone.

Here are the user's details:
- Recent Stableford Scores: {{{stablefordScores}}}
- Current Handicap: {{{handicap}}}
{{#if recentCourseConditions}}
- Recent Course Conditions: {{{recentCourseConditions}}}
{{/if}}

Based on this information, provide a comprehensive analysis structured as follows:

Summary: Provide an overall summary of the user's performance trend and current standing.
Strengths: List 2-3 key strengths in their game, backed by the scores if possible.
Weaknesses: List 2-3 key areas for improvement, explaining why they are weaknesses based on the data.
ActionableTips: Provide 3-5 specific, practical tips or drills the user can implement to address weaknesses and build on strengths. Make these tips concise and clear.
OverallRecommendation: Give one overarching recommendation or focus area for their next practice sessions or rounds.`,
});

const analyzeGolfPerformanceFlow = ai.defineFlow(
  {
    name: 'analyzeGolfPerformanceFlow',
    inputSchema: AnalyzeGolfPerformanceInputSchema,
    outputSchema: AnalyzeGolfPerformanceOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
