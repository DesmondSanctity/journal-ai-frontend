'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
 Search,
 Clock,
 AudioWaveformIcon,
 XIcon,
 ChevronLeft,
 ChevronRight,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type JournalEntry = {
 id: string;
 title: string;
 content: string;
 tags: string[];
 createdAt: string;
};

type TranscriptionEntry = {
 id: string;
 title: string;
 duration: number;
 tags: string[];
 createdAt: string;
 status: 'completed' | 'processing';
};

type EntryHistoryProps = {
 type: 'journal' | 'transcription';
 entries: (JournalEntry | TranscriptionEntry)[];
};

type FilterState = {
 search: string;
 tags: string[];
 sortBy: 'recent' | 'oldest' | 'title' | 'duration';
 status?: 'all' | 'completed' | 'processing';
};

function JournalCard({ entry }: { entry: JournalEntry }) {
 return (
  <Card className='hover:shadow-md transition-all cursor-pointer h-full'>
   <CardHeader>
    <div className='flex justify-between items-start'>
     <div>
      <CardTitle className='line-clamp-1'>{entry.title}</CardTitle>
      <p className='text-sm text-muted-foreground'>
       {formatDistanceToNow(new Date(entry.createdAt))} ago
      </p>
     </div>
     <div className='flex gap-2'>
      {entry.tags.map((tag) => (
       <Badge key={tag} variant='secondary'>
        {tag}
       </Badge>
      ))}
     </div>
    </div>
   </CardHeader>
   <CardContent>
    <p className='text-sm text-muted-foreground line-clamp-2'>
     {entry.content}
    </p>
   </CardContent>
  </Card>
 );
}

function TranscriptionCard({ entry }: { entry: TranscriptionEntry }) {
 return (
  <Card className='hover:shadow-md transition-all cursor-pointer h-full'>
   <CardHeader>
    <div className='flex justify-between items-start'>
     <div>
      <CardTitle className='line-clamp-1'>{entry.title}</CardTitle>
      <div className='flex items-center gap-2 mt-1'>
       <Clock className='h-4 w-4 text-muted-foreground' />
       <span className='text-sm text-muted-foreground'>
        {Math.floor(entry.duration / 60)}m {entry.duration % 60}s
       </span>
      </div>
     </div>
     <Badge variant={entry.status === 'completed' ? 'secondary' : 'outline'}>
      {entry.status}
     </Badge>
    </div>
   </CardHeader>
   <CardContent>
    <div className='flex items-center justify-between'>
     <div className='flex gap-2'>
      {entry.tags.map((tag) => (
       <Badge key={tag} variant='secondary'>
        {tag}
       </Badge>
      ))}
     </div>
     <AudioWaveformIcon className='h-4 w-4 text-muted-foreground' />
    </div>
   </CardContent>
  </Card>
 );
}

export function EntryHistory({ type, entries }: EntryHistoryProps) {
 const [filters, setFilters] = useState<FilterState>({
  search: '',
  tags: [],
  sortBy: 'recent',
  status: 'all',
 });

 // Get unique tags from all entries
 const availableTags = useMemo(() => {
  const tags = new Set<string>();
  entries.forEach((entry) => entry.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags);
 }, [entries]);

 // Filter and sort entries
 const filteredEntries = useMemo(() => {
  return entries
   .filter((entry) => {
    // Search filter
    const searchMatch =
     filters.search === '' ||
     entry.title.toLowerCase().includes(filters.search.toLowerCase()) ||
     ('content' in entry &&
      entry.content.toLowerCase().includes(filters.search.toLowerCase()));

    // Tag filter
    const tagMatch =
     filters.tags.length === 0 ||
     filters.tags.some((tag) => entry.tags.includes(tag));

    // Status filter (for transcriptions)
    const statusMatch =
     !filters.status ||
     filters.status === 'all' ||
     ('status' in entry && entry.status === filters.status);

    return searchMatch && tagMatch && statusMatch;
   })
   .sort((a, b) => {
    switch (filters.sortBy) {
     case 'recent':
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
     case 'oldest':
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
     case 'title':
      return a.title.localeCompare(b.title);
     case 'duration':
      if ('duration' in a && 'duration' in b) {
       return b.duration - a.duration;
      }
      return 0;
     default:
      return 0;
    }
   });
 }, [entries, filters]);

 const gridCols =
  type === 'journal'
   ? 'grid-cols-1 md:grid-cols-2'
   : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

 // Add pagination state
 const [currentPage, setCurrentPage] = useState(1);
 const itemsPerPage = 6;

 // Modify the filtered entries to include pagination
 const paginatedEntries = useMemo(() => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return filteredEntries.slice(startIndex, startIndex + itemsPerPage);
 }, [filteredEntries, currentPage]);

 const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);

 // Add this before the final closing div
 const PaginationControls = () => (
  <div className='flex items-center justify-between mt-6'>
   <p className='text-sm text-muted-foreground'>
    Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
    {Math.min(currentPage * itemsPerPage, filteredEntries.length)} of{' '}
    {filteredEntries.length}
   </p>
   <div className='flex items-center gap-2'>
    <Button
     variant='outline'
     size='sm'
     onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
     disabled={currentPage === 1}
    >
     <ChevronLeft className='h-4 w-4' />
    </Button>
    <div className='flex items-center gap-2'>
     {Array.from({ length: totalPages }, (_, i) => (
      <Button
       key={i + 1}
       variant={currentPage === i + 1 ? 'default' : 'outline'}
       size='sm'
       onClick={() => setCurrentPage(i + 1)}
      >
       {i + 1}
      </Button>
     ))}
    </div>
    <Button
     variant='outline'
     size='sm'
     onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
     disabled={currentPage === totalPages}
    >
     <ChevronRight className='h-4 w-4' />
    </Button>
   </div>
  </div>
 );

 return (
  <div className='space-y-4'>
   <div className='flex flex-col gap-4'>
    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
     <h2 className='text-xl font-semibold'>
      {type === 'journal' ? 'Previous Entries' : 'Transcription History'}
     </h2>
     <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4'>
      <div className='relative flex-1 sm:flex-none'>
       <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
       <Input
        className='pl-9 w-full sm:w-[300px]'
        placeholder='Search entries...'
        value={filters.search}
        onChange={(e) =>
         setFilters((prev) => ({ ...prev, search: e.target.value }))
        }
       />
      </div>
      <Select
       value={filters.sortBy}
       onValueChange={(value: FilterState['sortBy']) =>
        setFilters((prev) => ({ ...prev, sortBy: value }))
       }
      >
       <SelectTrigger className='w-full sm:w-[180px]'>
        <SelectValue placeholder='Sort by' />
       </SelectTrigger>
       <SelectContent className='bg-white border shadow-md'>
        <SelectItem value='recent'>Most Recent</SelectItem>
        <SelectItem value='oldest'>Oldest First</SelectItem>
        <SelectItem value='title'>Title A-Z</SelectItem>
        {type === 'transcription' && (
         <SelectItem value='duration'>Duration</SelectItem>
        )}
       </SelectContent>
      </Select>
     </div>
    </div>

    {/* Active Filters - now scrollable on mobile */}
    <div className='flex flex-nowrap items-center gap-2 overflow-x-auto pb-2'>
     {filters.tags.map((tag) => (
      <Badge
       key={tag}
       variant='secondary'
       className='flex items-center gap-1 flex-shrink-0'
      >
       {tag}
       <XIcon
        className='h-3 w-3 cursor-pointer'
        onClick={() =>
         setFilters((prev) => ({
          ...prev,
          tags: prev.tags.filter((t) => t !== tag),
         }))
        }
       />
      </Badge>
     ))}
    </div>

    {/* Available Tags - now scrollable on mobile */}
    <div className='flex flex-nowrap gap-2 overflow-x-auto pb-2'>
     {availableTags.map((tag) => (
      <Badge
       key={tag}
       variant={filters.tags.includes(tag) ? 'secondary' : 'outline'}
       className='cursor-pointer flex-shrink-0'
       onClick={() =>
        setFilters((prev) => ({
         ...prev,
         tags: prev.tags.includes(tag)
          ? prev.tags.filter((t) => t !== tag)
          : [...prev.tags, tag],
        }))
       }
      >
       {tag}
      </Badge>
     ))}
    </div>
   </div>

   <div className={`grid ${gridCols} gap-4`}>
    {paginatedEntries.map((entry) => (
     <Link href={`/dashboard/transcribe/${entry.id}`} key={entry.id}>
      {type === 'journal' ? (
       <JournalCard entry={entry as JournalEntry} />
      ) : (
       <TranscriptionCard entry={entry as TranscriptionEntry} />
      )}
     </Link>
    ))}
   </div>

   <PaginationControls />
  </div>
 );
}
