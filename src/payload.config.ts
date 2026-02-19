import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { CoachAthlete } from './collections/CoachAthlete'
import { seed } from './scripts/seed'
import { Exercises } from './collections/Exercises'
import { Workouts } from './collections/Workouts'
import { getAthleteRecentWorkouts, getAthleteWorkoutStats } from './endpoints/workouts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    csrf: ['http://localhost:3000'],
    cors: ['http://localhost:3000'],
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [Users, CoachAthlete, Media, Exercises, Workouts],
    endpoints: [
        {
            path: '/workouts-athlete-stats',
            method: 'get',
            handler: getAthleteWorkoutStats,
        },
        {
            path: '/workouts-athlete-recent',
            method: 'get',
            handler: getAthleteRecentWorkouts,
        },
    ],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    email: nodemailerAdapter({
        defaultFromAddress: process.env.EMAIL || '',
        defaultFromName: 'Your App',
        transportOptions: {
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.EMAIL || '',
                pass: process.env.EMAIL_APP_PASSWORD || '',
            },
        },
    }),
    onInit: async (payload) => {
        await seed(payload)
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL || '',
        },
    }),
    sharp,
    plugins: [],
})
