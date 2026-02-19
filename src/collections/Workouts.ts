import { isAthlete } from '@/access/isAthlete'
import { isMyWorkout } from '@/access/isMyWorkout'
import { isSelfOrAdminOrYourCoach } from '@/access/isSelfOrAdminOrCoach'
import { CollectionConfig } from 'payload'

export const Workouts: CollectionConfig = {
    slug: 'workouts',
    admin: {
        useAsTitle: 'date',
        defaultColumns: ['user', 'date', 'totalVolume'],
    },
    access: {
        read: isSelfOrAdminOrYourCoach,
        create: isAthlete ,
        update: isMyWorkout,
        delete: isMyWorkout,
    },
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
        },
        {
            name: 'date',
            type: 'date',
            required: true,
            defaultValue: () => new Date(),
        },
        {
            name: 'exercises',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'exercise',
                    type: 'relationship',
                    relationTo: 'exercises',
                    required: true,
                },
                {
                    name: 'sets',
                    type: 'array',
                    fields: [
                        {
                            name: 'weight',
                            type: 'number',
                            required: true,
                        },
                        {
                            name: 'reps',
                            type: 'number',
                            required: true,
                        },
                        {
                            name: 'rpe',
                            type: 'number',
                            min: 1,
                            max: 10,
                        },
                    ],
                },
                {
                    name: 'notes',
                    type: 'textarea',
                },
            ],
        },
        {
            name: 'totalVolume',
            type: 'number',
            admin: {
                readOnly: true,
                description: 'Auto-calculated from sets',
            },
        },
        {
            name: 'notes',
            type: 'textarea',
        },
    ],
    hooks: {
        beforeChange: [
            ({ data }) => {
                // Calculate total volume
                let total = 0
                data.exercises?.forEach((exercise: any) => {
                    exercise.sets?.forEach((set: any) => {
                        total += (set.weight || 0) * (set.reps || 0)
                    })
                })
                data.totalVolume = total
                return data
            },
        ],
    },
}