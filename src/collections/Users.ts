import { canReadData } from '@/access/canReadData'
import { isAdmin } from '@/access/isAdmin'
import { isAdminOrSelf } from '@/access/isAdminOrSelf'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
    slug: 'users',
    admin: {
        useAsTitle: 'email',
    },
    auth: {
        tokenExpiration: 28800, 
        // cookies: {
            // sameSite: "Lax",
            // domain: 'localhost',
            // secure: process.env.NODE_ENV === 'production'
            // secure: false, 
            // domain: process.env.COOKIE_DOMAIN || undefined,
        // },
        
        verify: {
            generateEmailHTML: ({ token, user }) => {
                const url = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`
                return `
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
                    <h2 style="color: #06B6D4;">Welcome to AKMI, ${user.email}!</h2>
                    <p>Please verify your email address by clicking the button below:</p>
                    <a href="${url}" style="display: inline-block; background-color: #06B6D4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0;">Verify Email</a>
                    <p>Or copy this link: <a href="${url}">${url}</a></p>
                    <p>This link will expire in 24 hours.</p>
                    </div>
                `
            },
        },
    },
    fields: [
        //  ROLE FIELD (for everyone)
        {
            name: 'role',
            type: 'select',
            saveToJWT: true,
            options: [
                { label: 'Athlete', value: 'athlete' },
                { label: 'Coach', value: 'coach' },
                { label: 'Admin', value: 'admin' },
            ],
            required: true,
            defaultValue: 'athlete',
        },
        //  PROFILE FIELD (for everyone)
        {
            name: 'profile',
            type: 'group',
            fields: [
                { name: 'firstName', type: 'text', required: true, access: { read: () => true } },
                {
                    name: 'lastName',
                    type: 'text',
                    required: true,
                    access: { read: () => true },
                },
                {
                    name: 'age',
                    type: 'select',
                    options: ['Under 18', '18-24', '25-34', '35-44', '45-54', '55+'],
                    required: true,
                },
                { name: 'bio', type: 'textarea', required: false, access: { read: () => true } },
                {
                    name: 'profilePhoto',
                    type: 'relationship',
                    relationTo: 'media',
                    access: { read: () => true },
                },
            ],
        },
        //  PREFERENCES FIELD (for everyone)
        {
            name: 'preferences',
            type: 'group',
            fields: [
                {
                    name: 'unitSystem',
                    type: 'select',
                    options: [
                        { label: 'kg', value: 'metric' },
                        { label: 'lbs', value: 'imperial' },
                    ],
                    defaultValue: 'metric',
                    required: true,
                },
            ],
        },
        //  ATHLETE-SPECIFIC FIELDS (grouped)
        {
            name: 'athleteData',
            type: 'group',
            fields: [
                {
                    name: 'weightClass',
                    type: 'text',
                    required: false,
                },
                {
                    name: 'experienceLevel',
                    type: 'select',
                    options: [
                        { label: 'Beginner', value: 'beginner' },
                        { label: 'Intermediate', value: 'intermediate' },
                        { label: 'Advanced', value: 'advanced' },
                    ],
                    required: false,
                },
                {
                    name: 'currentPRs',
                    type: 'group',
                    fields: [
                        { name: 'squat', type: 'number' },
                        { name: 'bench', type: 'number' },
                        { name: 'deadlift', type: 'number' },
                    ],
                },
                {
                    name: 'goals',
                    type: 'textarea',
                },
            ],
        },

        //  COACH-SPECIFIC FIELDS (grouped)

        {
            name: 'coachData',
            type: 'group',
            admin: {
                condition: (data) => data?.role === 'coach',
            },
            fields: [
                {
                    name: 'specialization',
                    type: 'select',
                    options: [
                        { label: 'Powerlifting', value: 'powerlifting' },
                        { label: 'Strength Training', value: 'strength' },
                        { label: 'General Fitness', value: 'general' },
                        { label: 'Bodybuilding', value: 'bodybuilding' },
                    ],
                    required: false,
                    access: { read: () => true },
                },
                {
                    name: 'certifications',
                    access: {
                        read: ({ req: { user }, data }) =>
                            user?.role === 'admin' || user?.id === data?.id,
                    },
                    type: 'array',
                    fields: [
                        {
                            name: 'name',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'issuingOrganization',
                            type: 'text',
                        },
                        {
                            name: 'yearObtained',
                            type: 'number',
                        },
                        {
                            name: 'certificateFile',
                            type: 'relationship',
                            relationTo: 'media',
                        },
                    ],
                },
                {
                    name: 'yearsOfExperience',
                    type: 'number',
                    required: false,
                    access: { read: () => true },
                },
                {
                    name: 'price',
                    type: 'number',
                    required: false,
                    validate: (value: number | null | undefined): string | true => {
                        if (value === null || value === undefined) {
                            return 'Price is required'
                        }
                        if (value < 0) {
                            return 'Price cannot be negative'
                        }
                        return true
                    },
                    access: { read: () => true },
                },
                {
                    name: 'bio',
                    type: 'textarea',
                    admin: {
                        description: 'Extended bio for coach profile',
                    },
                    access: { read: () => true },
                },
            ],
        },
        //  SUBSCRIPTION FIELDS (for everyone)

        {
            name: 'subscription',
            type: 'group',
            fields: [
                {
                    name: 'tier',
                    type: 'select',
                    options: [
                        { label: 'Free', value: 'free' },
                        { label: 'Pro', value: 'pro' },
                        { label: 'Elite', value: 'elite' },
                    ],
                    defaultValue: 'free',
                    required: true,
                },
                {
                    name: 'stripeCustomerId',
                    type: 'text',
                    admin: {
                        description: 'Stripe customer ID for subscription management',
                    },
                },
                {
                    name: 'subscriptionEndDate',
                    type: 'date',
                    admin: {
                        date: {
                            pickerAppearance: 'dayOnly',
                        },
                    },
                },
                {
                    name: 'autoRenew',
                    type: 'checkbox',
                    defaultValue: true,
                },
            ],
        },
    ],
    hooks: {
        beforeValidate: [
            ({ data, operation }) => {
                if (operation === 'create' || operation === 'update') {
                    if (data?.role === 'coach') {
                        if (!data?.coachData?.specialization) {
                            throw new Error('Specialization is required for coaches')
                        }
                        if (!data.coachData?.price) {
                            throw new Error('Price is required for coaches')
                        }
                        if (!data?.coachData?.yearsOfExperience) {
                            throw new Error('Years of experience is required ')
                        }
                        if (!data?.coachData?.certifications?.length) {
                            throw new Error('At least one certification is required ')
                        }
                    }

                    if (data?.role === 'athlete') {
                        if (!data?.athleteData?.weightClass) {
                            throw new Error('Weight class is required ')
                        }
                        if (!data?.athleteData?.experienceLevel) {
                            throw new Error('Experience level is required ')
                        }
                        if (!data?.athleteData?.goals) {
                            throw new Error('Goals are required ')
                        }
                    }
                }
                return data
            },
        ],
    },
    access: {
        read: canReadData,
        update: isAdminOrSelf,
        delete: isAdmin,
        admin: isAdmin,
    },
}
