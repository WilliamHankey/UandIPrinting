export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Hero Badge Text',
          type: 'string',
          description: 'The small badge text above the main heading'
        },
        {
          name: 'heading',
          title: 'Main Heading',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'primaryButtonText',
          title: 'Primary Button Text',
          type: 'string',
        },
        {
          name: 'primaryButtonLink',
          title: 'Primary Button Link',
          type: 'string',
        },
        {
          name: 'secondaryButtonText',
          title: 'Secondary Button Text',
          type: 'string',
        },
        {
          name: 'secondaryButtonLink',
          title: 'Secondary Button Link',
          type: 'string',
        }
      ]
    },
    {
      name: 'servicesSection',
      title: 'Services Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'text',
        },
        {
          name: 'services',
          title: 'Services',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Service Title',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Service Description',
                  type: 'text',
                },
                {
                  name: 'icon',
                  title: 'Icon Name',
                  type: 'string',
                  description: 'Lucide icon name (e.g., Printer, Palette, TrendingUp)'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'featuresSection',
      title: 'Features Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'text',
        },
        {
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Feature Title',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Feature Description',
                  type: 'text',
                },
                {
                  name: 'icon',
                  title: 'Icon Name',
                  type: 'string',
                  description: 'Lucide icon name'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'text',
        },
        {
          name: 'testimonials',
          title: 'Testimonials',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Customer Name',
                  type: 'string',
                },
                {
                  name: 'role',
                  title: 'Customer Role/Company',
                  type: 'string',
                },
                {
                  name: 'content',
                  title: 'Testimonial Content',
                  type: 'text',
                },
                {
                  name: 'rating',
                  title: 'Rating',
                  type: 'number',
                  validation: (Rule: any) => Rule.min(1).max(5),
                },
                {
                  name: 'avatar',
                  title: 'Customer Avatar',
                  type: 'image',
                  options: {
                    hotspot: true,
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
};
