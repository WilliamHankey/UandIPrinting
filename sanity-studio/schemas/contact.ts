export default {
  name: 'contact',
  title: 'Contact Page',
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
      name: 'officeHours',
      title: 'Office Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  'Monday',
                  'Tuesday', 
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday'
                ]
              }
            },
            {
              name: 'hours',
              title: 'Hours',
              type: 'string',
              description: 'e.g., "9:00 AM - 6:00 PM" or "Closed"'
            },
            {
              name: 'isOpen',
              title: 'Is Open',
              type: 'boolean',
              initialValue: true
            }
          ]
        }
      ]
    },
    {
      name: 'contactForm',
      title: 'Contact Form Settings',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Form Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Form Description',
          type: 'text',
        },
        {
          name: 'successMessage',
          title: 'Success Message',
          type: 'text',
        },
        {
          name: 'formSubmitUrl',
          title: 'Form Submit URL',
          type: 'url',
          description: 'URL where the form will be submitted (e.g., FormSubmit endpoint)'
        }
      ]
    },
    {
      name: 'mapLocation',
      title: 'Map Location',
      type: 'object',
      fields: [
        {
          name: 'latitude',
          title: 'Latitude',
          type: 'number',
        },
        {
          name: 'longitude',
          title: 'Longitude',
          type: 'number',
        },
        {
          name: 'zoom',
          title: 'Map Zoom Level',
          type: 'number',
          initialValue: 15
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
