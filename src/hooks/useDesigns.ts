import { useEffect, useState } from 'react';
import { client, designQuery } from '@/lib/sanity';

interface Specification {
  name: string;
  type: 'select' | 'text' | 'number' | 'checkbox';
  options?: Array<{
    label: string;
    value: string;
    price: number;
  }>;
  required: boolean;
  placeholder?: string;
}

interface Design {
  _id: string;
  title: string;
  image: string;
  category: string;
  description?: string;
  basePrice?: number;
  price: number; // Keep for backward compatibility
  specifications?: Specification[];
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