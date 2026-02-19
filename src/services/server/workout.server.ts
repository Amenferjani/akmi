'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'

export async function createWorkout(workoutData: any) {
    try {
        const headersList = await headers()
        
        const payload = await getPayload({ 
            config,
            
        })
        
        
        const workout = await payload.create({
            collection: 'workouts',
            data: workoutData,
            context: { headers: headersList }, 
        })
        
        return { success: true, data: workout }
    } catch (error: any) {
        console.error('Create workout error:', error)
        return { 
            success: false, 
            error: error.message || 'Failed to create workout' 
        }
    }
}

export async function getWorkoutById( id : string) {
    try {
        const headersList = await headers()

        const payload = await getPayload({
            config,
        })

        const workout = await payload.findByID({
            collection: 'workouts',
            id: parseInt(id),
            depth: 2,
            context: { headers: headersList },
        })

        return { success: true, data: workout }
    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Failed to get workout ',
        }
    }
}

export async function deleteWorkout(workoutId: string) {
    try {
        const headersList = await headers()
        
        const payload = await getPayload({
            config,
        })

        await payload.delete({
            collection: 'workouts',
            id: parseInt(workoutId),
            context: { headers: headersList },
        })

        return { success: true }
    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Failed to delete workout',
        }
    }
}