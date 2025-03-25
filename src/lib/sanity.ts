import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '5etux9ci',
  dataset: 'production',
  apiVersion: '2024-02-13',
  useCdn: false,
  token: import.meta.env.VITE_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
  perspective: 'published'
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export const designQuery = `*[_type == "design"] {
  _id,
  title,
  "image": image.asset->url,
  category,
  price,
  rating,
  reviewCount,
  "contributors": contributors[]-> {
    name,
    "avatar": avatar.asset->url
  }
}`; 