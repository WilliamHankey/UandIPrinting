import { useQuery } from '@tanstack/react-query';
import { client, siteSettingsQuery } from '@/lib/sanity';

export function useSiteSettings() {
  return useQuery({
    queryKey: ['siteSettings'],
    queryFn: async () => {
      const data = await client.fetch(siteSettingsQuery);
      return data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes - site settings don't change often
  });
}
