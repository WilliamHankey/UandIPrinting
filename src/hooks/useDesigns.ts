import { useEffect, useState } from 'react';
import { client, designQuery } from '@/lib/sanity';

interface Design {
  _id: string;
  title: string;
  image: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  contributors: {
    name: string;
    avatar: string;
  }[];
}

export function useDesigns() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const data = await client.fetch(designQuery);
        setDesigns(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch designs'));
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  return { designs, loading, error };
} 