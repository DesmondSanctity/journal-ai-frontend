type Segment = {
 sentiment: string;
 text: string;
 confidence: number;
 timestamp: string;
};

export function calculateDominantMood(segments: Segment[] = []): string {
 console.log('Received segments:', segments);

 if (!segments || !Array.isArray(segments) || segments.length === 0) {
  return 'neutral';
 }

 const moodCounts = segments.reduce((acc, segment) => {
  const mood = segment.sentiment;
  acc[mood] = (acc[mood] || 0) + 1;
  return acc;
 }, {} as Record<string, number>);

 console.log('Mood counts:', moodCounts);

 const sortedMoods = Object.entries(moodCounts).sort(([, a], [, b]) => b - a);

 console.log('Sorted moods:', sortedMoods);

 return sortedMoods[0][0].toLowerCase();
}
