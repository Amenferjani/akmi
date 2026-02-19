import api from '../api'

export const getAthleteWorkoutStats = async () => {
    try {
        const response = await api.get('/workouts-athlete-stats')
        return response.data
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch workout stats',
        }
    }
}

export const getAthleteRecentWorkouts = async () => {
    try {
        const response = await api.get('/workouts-athlete-recent')
        console.log(' Recent workouts response:', response.data)
        return response.data
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch recent workouts',
        }
    }
}

export const getAthleteWorkouts = async (page: number, limit: number) => {
    try {
        const response = await api.get(`/workouts?limit=${limit}&page=${page}&sort=-date&depth=1`)
        return response.data
    } catch (error) {
        console.error('❌ Fetch error:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch workouts',
        }
    }
}
