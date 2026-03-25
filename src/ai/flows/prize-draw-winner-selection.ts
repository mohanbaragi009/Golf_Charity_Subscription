'use server';
/**
 * @fileOverview A Genkit flow for selecting prize winners based on user participation, golf scores, and specific draw strategies.
 *
 * - prizeDrawWinnerSelection - A function that handles the prize winner selection process.
 * - PrizeDrawWinnerSelectionInput - The input type for the prizeDrawWinnerSelection function.
 * - PrizeDrawWinnerSelectionOutput - The return type for the prizeDrawWinnerSelection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrizeDrawWinnerSelectionInputSchema = z.object({
  prizeDescription: z.string().describe('A description of the prize to be awarded.'),
  drawType: z.enum(['3-Number Match', '4-Number Match', '5-Number Match']).default('5-Number Match').describe('The type of draw being conducted.'),
  drawStrategy: z.enum(['random', 'algorithmic']).default('algorithmic').describe('The selection logic: random (lottery style) or algorithmic (weighted by scores).'),
  isSimulation: z.boolean().default(false).describe('Whether this is a simulation or an official draw.'),
  eligibleUsers: z.array(z.object({
    userId: z.string().describe('The unique identifier for the user.'),
    participationScore: z.number().describe('A numerical score representing the user\'s overall platform participation.'),
    golfScores: z.array(z.number()).describe('An array of the user\'s last 5 Stableford golf scores (range 1-45).'),
  })).describe('An array of eligible users with their data.'),
  numberOfWinners: z.number().int().positive().describe('The exact number of winners to select.'),
});
export type PrizeDrawWinnerSelectionInput = z.infer<typeof PrizeDrawWinnerSelectionInputSchema>;

const PrizeDrawWinnerSelectionOutputSchema = z.object({
  winners: z.array(z.object({
    userId: z.string().describe('The unique identifier of the selected winner.'),
    justification: z.string().describe('A brief explanation of why this user was selected based on the chosen strategy.'),
    matchType: z.string().optional().describe('The specific match achieved (e.g., "5/5 match").'),
  })).describe('An array of selected prize winners.'),
  explanation: z.string().describe('A general explanation of the criteria and strategy used.'),
  simulationNote: z.string().optional().describe('A note if this was a simulation mode run.'),
});
export type PrizeDrawWinnerSelectionOutput = z.infer<typeof PrizeDrawWinnerSelectionOutputSchema>;

export async function prizeDrawWinnerSelection(input: PrizeDrawWinnerSelectionInput): Promise<PrizeDrawWinnerSelectionOutput> {
  return prizeDrawWinnerSelectionFlow(input);
}

const prizeDrawWinnerSelectionPrompt = ai.definePrompt({
  name: 'prizeDrawWinnerSelectionPrompt',
  input: {schema: PrizeDrawWinnerSelectionInputSchema},
  output: {schema: PrizeDrawWinnerSelectionOutputSchema},
  prompt: `You are an intelligent algorithm for a golf charity platform. 
Your goal is to select exactly {{{numberOfWinners}}} winners for the prize: "{{{prizeDescription}}}".

Current Configuration:
- **Draw Type**: {{{drawType}}}
- **Strategy**: {{{drawStrategy}}} ({{#if (eq drawStrategy "random")}}Standard lottery-style random generation{{else}}Algorithmic weighting based on participation and golf score consistency{{/if}})
- **Simulation Mode**: {{#if isSimulation}}ON (This is a test run){{else}}OFF (Official Draw){{/if}}

User Data:
{{#each eligibleUsers}}
- User: {{{this.userId}}}
  Participation: {{{this.participationScore}}}
  Last 5 Scores: {{#each this.golfScores}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/each}}

Selection Criteria:
1. If strategy is 'random', prioritize fairness through equal probability, slightly nudged by participation.
2. If strategy is 'algorithmic', weight users who have consistent golf scores near the "par" of Stableford (36) or high participation.
3. For "{{{drawType}}}", simulate a matching process where users with more consistent or "lucky" scores within the specified number range are favored.

Provide a detailed justification for each winner and a summary of the strategy applied.`,
});

const prizeDrawWinnerSelectionFlow = ai.defineFlow(
  {
    name: 'prizeDrawWinnerSelectionFlow',
    inputSchema: PrizeDrawWinnerSelectionInputSchema,
    outputSchema: PrizeDrawWinnerSelectionOutputSchema,
  },
  async (input) => {
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        const {output} = await prizeDrawWinnerSelectionPrompt(input);
        if (!output) throw new Error('No output received from the prompt.');
        
        const finalOutput = { ...output };
        if (input.isSimulation) {
          finalOutput.simulationNote = "This draw was performed in SIMULATION MODE. Results are not official and have not been published.";
        }
        return finalOutput;
      } catch (error: any) {
        attempts++;
        const isTransient = error?.message?.includes('503') || error?.message?.includes('high demand');

        if (attempts >= maxAttempts || !isTransient) {
          throw error;
        }

        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts)));
      }
    }
    throw new Error('AI service unavailable after retries');
  }
);
