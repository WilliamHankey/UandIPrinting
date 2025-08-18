export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Small icon that appears in browser tabs',
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email Address',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'whatsapp',
          title: 'WhatsApp Number',
          type: 'string',
        }
      ]
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
        }
      ]
    },
    {
      name: 'footer',
      title: 'Footer Content',
      type: 'object',
      fields: [
        {
          name: 'description',
          title: 'Footer Description',
          type: 'text',
        },
        {
          name: 'copyright',
          title: 'Copyright Text',
          type: 'string',
        },
        {
          name: 'links',
          title: 'Footer Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Link Text',
                  type: 'string',
                },
                {
                  name: 'url',
                  title: 'Link URL',
                  type: 'string',
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'defaultMetaTitle',
          title: 'Default Meta Title',
          type: 'string',
        },
        {
          name: 'defaultMetaDescription',
          title: 'Default Meta Description',
          type: 'text',
        },
        {
          name: 'ogImage',
          title: 'Default Open Graph Image',
          type: 'image',
          description: 'Default image for social media sharing',
        }
      ]
    },
    {
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
          description: 'GA4 Measurement ID (e.g., G-XXXXXXXXXX)',
        },
        {
          name: 'facebookPixelId',
          title: 'Facebook Pixel ID',
          type: 'string',
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo',
    },
  },
};
