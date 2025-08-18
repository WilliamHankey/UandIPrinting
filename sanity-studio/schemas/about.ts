export default {
  name: 'about',
  title: 'About Page',
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
          name: 'heading',
          title: 'Main Heading',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'description',
          title: 'Hero Description',
          type: 'text',
          validation: (Rule: any) => Rule.required(),
        }
      ]
    },
    {
      name: 'storySection',
      title: 'Story Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
        },
        {
          name: 'heading',
          title: 'Main Heading',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Story Description',
          type: 'array',
          of: [{ type: 'block' }],
        },
        {
          name: 'images',
          title: 'Story Images',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true,
              }
            }
          ],
          description: 'Images for the story carousel'
        }
      ]
    },
    {
      name: 'valuesSection',
      title: 'Values Section',
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
          name: 'values',
          title: 'Company Values',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Value Title',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Value Description',
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
      name: 'statsSection',
      title: 'Statistics Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
        },
        {
          name: 'stats',
          title: 'Statistics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'number',
                  title: 'Statistic Number',
                  type: 'number',
                },
                {
                  name: 'label',
                  title: 'Statistic Label',
                  type: 'string',
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
      name: 'teamSection',
      title: 'Team Section',
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
          name: 'teamMembers',
          title: 'Team Members',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                },
                {
                  name: 'role',
                  title: 'Role',
                  type: 'string',
                },
                {
                  name: 'bio',
                  title: 'Bio',
                  type: 'text',
                },
                {
                  name: 'image',
                  title: 'Profile Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  }
                },
                {
                  name: 'email',
                  title: 'Email',
                  type: 'string',
                },
                {
                  name: 'linkedin',
                  title: 'LinkedIn URL',
                  type: 'url',
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
