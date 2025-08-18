import { useQuery } from '@tanstack/react-query';
import { client, contactQuery } from '@/lib/sanity';

export function useContact() {
  return useQuery({
    queryKey: ['contact'],
    queryFn: async () => {
      const data = await client.fetch(contactQuery);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
