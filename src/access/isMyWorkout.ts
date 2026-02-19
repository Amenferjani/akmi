import type { Access } from 'payload'

export const isMyWorkout: Access = ({ req: { user } }) => {
    if (!user) return false
    if (user?.role === 'admin') return true
    return {
        user: { equals: user?.id },
    }
}
