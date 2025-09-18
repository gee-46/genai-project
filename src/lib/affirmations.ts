const affirmations = {
  happy: [
    "I am grateful for the joy in my life.",
    "I radiate positivity and attract good things.",
    "My happiness is a choice, and I choose it now.",
    "I am surrounded by love and positivity.",
    "Every day brings new opportunities for joy."
  ],
  stressed: [
    "I am calm and in control of my thoughts.",
    "I release tension and embrace peace.",
    "I breathe in calm and breathe out stress.",
    "I am capable of handling any challenge.",
    "Peace begins with me."
  ],
  relaxed: [
    "I am at peace with myself and my surroundings.",
    "I flow with life effortlessly.",
    "I trust the process of life.",
    "I am grounded and centered.",
    "I allow myself to relax and recharge."
  ],
  low: [
    "I am worthy of love and happiness.",
    "I choose to see the good in every situation.",
    "I am strong and resilient.",
    "I forgive myself and move forward.",
    "I am enough just as I am."
  ]
};

export function getRandomAffirmation(mood: string): string {
  const moodAffirmations = affirmations[mood as keyof typeof affirmations] || affirmations.happy;
  const index = Math.floor(Math.random() * moodAffirmations.length);
  return moodAffirmations[index];
}
