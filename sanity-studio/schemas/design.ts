export default {
  name: 'design',
  title: 'Design',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Business Cards',
          'Business Branding', 
          'Brochures',
          'Posters',
          'Personalised & Gifting Printing',
          'Marketing Materials',
          'Hoodies',
          'Caps',
          'Formal/Corporate Attire',
          'Client Gifting'
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'basePrice',
      title: 'Base Price',
      type: 'number',
      description: 'Starting price for this design',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'price',
      title: 'Price (Legacy)',
      type: 'number',
      description: 'Legacy price field for backward compatibility',
      validation: (Rule: any) => Rule.positive(),
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'specification',
          fields: [
            {
              name: 'name',
              title: 'Specification Name',
              type: 'string',
              description: 'e.g., Size, Color, Material'
            },
            {
              name: 'type',
              title: 'Input Type',
              type: 'string',
              options: {
                list: ['select', 'text', 'number', 'checkbox']
              }
            },
            {
              name: 'options',
              title: 'Options (for select type)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string'
                    },
                    {
                      name: 'value',
                      title: 'Value',
                      type: 'string'
                    },
                    {
                      name: 'price',
                      title: 'Additional Price',
                      type: 'number',
                      description: 'Additional cost for this option'
                    }
                  ]
                }
              ]
            },
            {
              name: 'required',
              title: 'Required',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'placeholder',
              title: 'Placeholder Text',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(5),
    },
    {
      name: 'reviewCount',
      title: 'Review Count',
      type: 'number',
      validation: (Rule: any) => Rule.required().integer().positive(),
    },
    {
      name: 'contributors',
      title: 'Contributors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'contributor' }],
        },
      ],
    },
  ],
};