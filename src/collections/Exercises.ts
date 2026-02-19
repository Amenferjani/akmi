import { isAdmin } from '@/access/isAdmin'
import { CollectionConfig } from 'payload'

export const Exercises: CollectionConfig = {
    slug: 'exercises',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'muscleGroup', 'equipment'],
    },
    access: {
        read: () => true,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'muscleGroup',
            type: 'select',
            options: ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body'],
            required: true,
        },
        {
            name: 'equipment',
            type: 'select',
            options: ['Barbell', 'Dumbbell', 'Machine', 'Cable', 'Bodyweight', 'Other'],
            required: true,
        },
        {
            name: 'instructions',
            type: 'richText',
        },
        {
            name: 'demoVideoUrl',
            type: 'text',
            admin: {
                description: 'YouTube or Vimeo link to exercise demonstration',
            },
        },
    ],
}
