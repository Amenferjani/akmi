export interface ExerciseEntry {
    exerciseId: number | null
    exerciseName?: string
    sets: Set[]
    notes?: string
}

export interface Set {
    weight: number | null
    reps: number | null
    rpe?: number | null
}