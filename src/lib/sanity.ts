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
  description,
  basePrice,
  price,
  specifications[] {
    name,
    type,
    options[] {
      label,
      value,
      price
    },
    required,
    placeholder
  },
  rating,
  reviewCount,
  "contributors": contributors[]-> {
    name,
    "avatar": avatar.asset->url
  }
}`;

export const homepageQuery = `*[_type == "homepage"][0] {
  title,
  heroSection {
    badge,
    heading,
    subheading,
    "heroImage": heroImage.asset->url,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink
  },
  servicesSection {
    title,
    subtitle,
    services[] {
      title,
      description,
      icon
    }
  },
  featuresSection {
    title,
    subtitle,
    features[] {
      title,
      description,
      icon
    }
  },
  testimonialsSection {
    title,
    subtitle,
    testimonials[] {
      name,
      role,
      content,
      rating,
      "avatar": avatar.asset->url
    }
  }
}`;

export const aboutQuery = `*[_type == "about"][0] {
  title,
  heroSection {
    heading,
    description
  },
  storySection {
    title,
    heading,
    description,
    "images": images[].asset->url
  },
  valuesSection {
    title,
    subtitle,
    values[] {
      title,
      description,
      icon
    }
  },
  statsSection {
    title,
    stats[] {
      number,
      label,
      icon
    }
  },
  teamSection {
    title,
    subtitle,
    teamMembers[] {
      name,
      role,
      bio,
      "image": image.asset->url,
      email,
      linkedin
    }
  }
}`;

export const contactQuery = `*[_type == "contact"][0] {
  title,
  heroSection {
    heading,
    description
  },
  contactInfo {
    email,
    phone,
    address,
    whatsapp
  },
  officeHours[] {
    day,
    hours,
    isOpen
  },
  contactForm {
    title,
    description,
    successMessage,
    formSubmitUrl
  },
  mapLocation {
    latitude,
    longitude,
    zoom
  }
}`;

export const blogQuery = `*[_type == "blog" && isPublished == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  "featuredImage": featuredImage.asset->url,
  "author": author-> {
    name,
    "avatar": avatar.asset->url
  },
  publishedAt,
  tags,
  category,
  metaDescription
}`;

export const blogPostQuery = `*[_type == "blog" && slug.current == $slug][0] {
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
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  title,
  description,
  "logo": logo.asset->url,
  "favicon": favicon.asset->url,
  contactInfo {
    email,
    phone,
    address,
    whatsapp
  },
  socialLinks {
    facebook,
    instagram,
    twitter,
    linkedin,
    youtube
  },
  footer {
    description,
    copyright,
    links[] {
      text,
      url
    }
  },
  seo {
    defaultMetaTitle,
    defaultMetaDescription,
    "ogImage": ogImage.asset->url
  },
  analytics {
    googleAnalyticsId,
    facebookPixelId
  }
}`; 