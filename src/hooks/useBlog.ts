import { useQuery } from '@tanstack/react-query';
import { client, blogQuery } from '@/lib/sanity';

export function useBlog() {
  return useQuery({
    queryKey: ['blog'],
    queryFn: async () => {
      const data = await client.fetch(blogQuery);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const data = await client.fetch(`*[_type == "blog" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        excerpt,
        "featuredImage": featuredImage.asset->url,
        content,
        "author": author-> {
          name,
          "avatar": avatar.asset->url
        },
        publishedAt,
        tags,
        category,
        metaDescription
      }`, { slug });
      return data;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
