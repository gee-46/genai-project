// src/lib/sentiment.ts
// Simple sentiment detection mock for ChatInterface

export function detectMood(text: string): 'sad' | 'anxious' | 'neutral' | 'happy' | 'crisis' {
  const lower = text.toLowerCase();
  if (lower.includes('suicide') || lower.includes('kill myself') || lower.includes('end my life') || lower.includes("i can't go on") || lower.includes('want to die')) {
    return 'crisis';
  }
  if (lower.includes('sad') || lower.includes('unhappy') || lower.includes('depressed')) {
    return 'sad';
  }
  if (lower.includes('anxious') || lower.includes('worried') || lower.includes('nervous')) {
    return 'anxious';
  }
  if (lower.includes('happy') || lower.includes('good') || lower.includes('great')) {
    return 'happy';
  }
  return 'neutral';
}
