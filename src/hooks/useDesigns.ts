import { useEffect, useState } from 'react';
import { client, designQuery } from '@/lib/sanity';

export interface Specification {
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

export interface Design {
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

const categoriesQuery = `*[_type == "design"].category`;

// Fetch unique categories from Sanity
const fetchCategories = async (): Promise<string[]> => {
  try {
    const categories = await client.fetch(categoriesQuery);
    return Array.from(new Set(categories)).sort();
  } catch (err) {
    console.error('Failed to fetch categories:', err);
    return [];
  }
};

export function useDesigns() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const [data, cats] = await Promise.all([client.fetch(designQuery), fetchCategories()]);
        setDesigns(data);
        setCategories(cats);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch designs'));
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  return { designs, categories, loading, error };
} 