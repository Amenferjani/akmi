import type { CollectionConfig } from 'payload'

export const CoachAthlete: CollectionConfig = {
    slug: 'coach-athlete',
    fields: [
        { name: 'coach', type: 'relationship', relationTo: 'users', required: true },
        { name: 'athlete', type: 'relationship', relationTo: 'users', required: true },
        { name: 'status', type: 'select', options: ['pending', 'active', 'ended'] },
        { name: 'startDate', type: 'date' },
        { name: 'notes', type: 'textarea' }, 
    ],
}
