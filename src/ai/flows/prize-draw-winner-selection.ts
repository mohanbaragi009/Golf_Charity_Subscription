'use server';
/**
 * @fileOverview A Genkit flow for selecting prize winners based on user participation and golf scores.
 *
 * - prizeDrawWinnerSelection - A function that handles the prize winner selection process.
 * - PrizeDrawWinnerSelectionInput - The input type for the prizeDrawWinnerSelection function.
 * - PrizeDrawWinnerSelectionOutput - The return type for the prizeDrawWinnerSelection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrizeDrawWinnerSelectionInputSchema = z.object({
  prizeDescription: z.string().describe('A description of the prize to be awarded.'),
  eligibleUsers: z.array(z.object({
    userId: z.string().describe('The unique identifier for the user.'),
    participationScore: z.number().describe('A numerical score representing the user\'s overall platform participation. Higher scores indicate more engagement.'),
    golfScores: z.array(z.number()).describe('An array of the user\'s recent Stableford golf scores. Higher Stableford points are better.'),
  })).describe('An array of eligible users, including their participation score and recent golf scores.'),
  numberOfWinners: z.number().int().positive().describe('The exact number of winners to select.'),
});
export type PrizeDrawWinnerSelectionInput = z.infer<typeof PrizeDrawWinnerSelectionInputSchema>;

const PrizeDrawWinnerSelectionOutputSchema = z.object({
  winners: z.array(z.object({
    userId: z.string().describe('The unique identifier of the selected winner.'),
    justification: z.string().describe('A brief explanation of why this user was selected as a winner, considering their participation and golf scores.'),
  })).describe('An array of selected prize winners.'),
  explanation: z.string().describe('A general explanation of the criteria and approach used to select the winners.'),
});
export type PrizeDrawWinnerSelectionOutput = z.infer<typeof PrizeDrawWinnerSelectionOutputSchema>;

export async function prizeDrawWinnerSelection(input: PrizeDrawWinnerSelectionInput): Promise<PrizeDrawWinnerSelectionOutput> {
  return prizeDrawWinnerSelectionFlow(input);
}

const prizeDrawWinnerSelectionPrompt = ai.definePrompt({
  name: 'prizeDrawWinnerSelectionPrompt',
  input: {schema: PrizeDrawWinnerSelectionInputSchema},
  output: {schema: PrizeDrawWinnerSelectionOutputSchema},
  prompt: `You are an intelligent algorithm designed to fairly and engagingly select prize winners for a golf charity platform.
You need to select exactly {{{numberOfWinners}}} winners for the prize described as: "{{{prizeDescription}}}".

Consider the following eligible users and their data.
- **Participation Score**: A higher score indicates more engagement.
- **Golf Scores**: These are Stableford points. A higher Stableford score indicates better golf performance.

Your selection should balance these two factors: reward active participation and acknowledge good golf performance. Strive for a selection that feels fair and encourages continued engagement with the platform and charity contributions.

Eligible Users Data:
{{#each eligibleUsers}}
- User ID: {{{this.userId}}}
  Participation Score: {{{this.participationScore}}}
  Golf Scores (Stableford Points): {{#each this.golfScores}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/each}}

Based on the above, select exactly {{{numberOfWinners}}} winners. Provide a justification for each winner's selection and a general explanation of your overall selection strategy.
`,
});

const prizeDrawWinnerSelectionFlow = ai.defineFlow(
  {
    name: 'prizeDrawWinnerSelectionFlow',
    inputSchema: PrizeDrawWinnerSelectionInputSchema,
    outputSchema: PrizeDrawWinnerSelectionOutputSchema,
  },
  async (input) => {
    const {output} = await prizeDrawWinnerSelectionPrompt(input);
    if (!output) {
        throw new Error('No output received from the prompt.');
    }
    return output;
  }
);
