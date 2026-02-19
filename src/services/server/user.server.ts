'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function createUser(userData: any) {
    try {
        const payload = await getPayload({ config })

        const user = await payload.create({
            collection: 'users',
            data: userData,
        })

        return { success: true, user }
    } catch (error: any) {
        if (error.data?.errors?.[0]?.message?.includes('already registered')) {
            return {
                success: false,
                error: 'Email already in use. Please use a different email or log in.',
            }
        }

        return {
            success: false,
            error: error.message || 'Failed to create user',
        }
    }
}


