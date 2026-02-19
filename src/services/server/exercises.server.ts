'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import type { Exercise } from '@/payload-types'

export const searchExercises = async (query: string): Promise<{ success: boolean, data: Exercise[] , error?: string }> => {
    try {

        const payload = await getPayload({ config })

        const exercises = await payload.find({
            collection: 'exercises',
            where: {
                name: {
                    contains: query,
                },
            },
            limit: 10,
            sort: 'name',
        })
        return { success: true, data: exercises.docs }
    } catch (error) {
        console.error('Error searching exercises:', error)
        return { success: false,data: [] , error: 'Failed to search exercises' }
    }
}
