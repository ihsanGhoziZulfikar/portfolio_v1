export default {
  name: 'experience',
  type: 'document',
  title: 'Experience',
  fields: [
    { name: 'company', type: 'string', title: 'Company' },
    { name: 'role', type: 'string', title: 'Role' },
    { name: 'startDate', type: 'date', title: 'Start Date' },
    { name: 'endDate', type: 'date', title: 'End Date' },
    { 
      name: 'description',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Description'
    },
    {
      name: 'images',
      type: 'array',
      of: [{ type: 'image' }],
      title: 'Certificates / Images'
    }
  ]
}
