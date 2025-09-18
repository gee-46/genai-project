const quotes: string[] = [
  "Believe you can and you're halfway there.",
  "Keep your face always toward the sunshine—and shadows will fall behind you.",
  "The only way to do great work is to love what you do.",
  "You are never too old to set another goal or to dream a new dream.",
  "Positive anything is better than negative nothing.",
  "Start each day with a positive thought and a grateful heart.",
  "Happiness is not by chance, but by choice.",
  "The best time for new beginnings is now.",
  "Every day may not be good, but there is something good in every day.",
  "Your limitation—it's only your imagination."
];

export function getRandomQuote(): string {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}
