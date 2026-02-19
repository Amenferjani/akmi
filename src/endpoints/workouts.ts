// src/endpoints/workouts.ts
import { Workout } from '@/payload-types'
import type { PayloadHandler } from 'payload'

export const getAthleteWorkoutStats: PayloadHandler = async (req) => {
    const workouts = await req.payload.find({
        collection: 'workouts',
        where: {
            user: { equals: req.user?.id }
        },
        sort: '-date',
        limit: 1000,
    })
    
    const totalWorkouts = workouts.totalDocs
    
    let totalVolume = 0
    const exerciseMaxes: Record<string, number> = {} 
    let prCount = 0
    
    workouts.docs.forEach(workout => {
        workout.exercises?.forEach((exercise: any) => {
            exercise.sets?.forEach((set: any) => {
                totalVolume += (set.weight || 0) * (set.reps || 0)
                
                const exerciseName = exercise.name || exercise.exercise?.name
                if (exerciseName && set.weight) {
                    const currentMax = exerciseMaxes[exerciseName] || 0
                    if (set.weight > currentMax) {
                        exerciseMaxes[exerciseName] = set.weight
                        prCount++ 
                    }
                }
            })
        })
    })
    
    let streak = 0
    if (workouts.docs.length > 0) {
        const workoutDates = workouts.docs.map(w => 
            new Date(w.date).toDateString()
        )
        const uniqueDates = [...new Set(workoutDates)]
        
        streak = 1
        for (let i = 1; i < uniqueDates.length; i++) {
            const prev = new Date(uniqueDates[i-1])
            const curr = new Date(uniqueDates[i])
            const diffDays = Math.round((prev.getTime() - curr.getTime()) / (1000*3600*24))
            
            if (diffDays === 1) streak++
            else break
        }
    }
    
    return Response.json({
        totalWorkouts,
        totalVolume,
        streak,
        totalPRs: prCount
    })
}

export const getAthleteRecentWorkouts: PayloadHandler = async (req) => {
    const workouts = await req.payload.find({
        collection: 'workouts',
        where: {
            user: { equals: req.user?.id }
        },
        sort: '-date',
        limit: 3,
        depth: 1 // Populate exercise details
    })
    
    return Response.json(workouts.docs  as Workout[])
}