import { getPayload, Payload } from 'payload'
import config from '@payload-config'

export const seed = async (payload : Payload) => {
    // Initialize payload
    payload.logger.info('🔄 Starting seed script...')
    // Check if admin exists
    const { docs: existingAdmins } = await payload.find({
        collection: 'users',
        where: {
            role: { equals: 'admin' },
        },
    })

    if (existingAdmins.length > 0) {
        payload.logger.info('✅ Admin already exists - skipping')
        return
    }

    // Create admin
    await payload.create({
        collection: 'users',
        data: {
            email: process.env.ADMIN_EMAIL || 'admin@akmi.com',
            password: process.env.ADMIN_PASSWORD || 'Admin123!',
            role: 'admin',
            profile: {
                firstName: 'Admin',
                lastName: 'User',
                age: '25-34',
                bio: 'System administrator',
            },
            preferences: {
                unitSystem: 'metric',
            },
            subscription: {
                tier: 'elite',
                autoRenew: true,
            },
        },
    })

    payload.logger.info('🎉 Admin user created successfully')
}

// seed()
