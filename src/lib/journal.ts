type Segment = {
 sentiment: string;
 text: string;
 confidence: number;
 timestamp: string;
};

export function calculateDominantMood(segments: Segment[] = []): string {
 if (!segments || !Array.isArray(segments) || segments.length === 0) {
  return 'neutral';
 }

 const moodCounts = segments.reduce((acc, segment) => {
  const mood = segment.sentiment;
  acc[mood] = (acc[mood] || 0) + 1;
  return acc;
 }, {} as Record<string, number>);

 const sortedMoods = Object.entries(moodCounts).sort(([, a], [, b]) => b - a);

 return sortedMoods[0][0].toLowerCase();
}

export function getPublicIdFromUrl(url: string): string {
 const parts = url.split('/upload/');
 const publicId = parts[1].split('.')[0].replace('v1732416713/', '');
 return publicId;
}
