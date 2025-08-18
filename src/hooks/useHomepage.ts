import { useQuery } from '@tanstack/react-query';
import { client, homepageQuery } from '@/lib/sanity';

export function useHomepage() {
  return useQuery({
    queryKey: ['homepage'],
    queryFn: async () => {
      const data = await client.fetch(homepageQuery);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
