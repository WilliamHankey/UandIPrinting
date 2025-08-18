import { useQuery } from '@tanstack/react-query';
import { client, aboutQuery } from '@/lib/sanity';

export function useAbout() {
  return useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      const data = await client.fetch(aboutQuery);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
