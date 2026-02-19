import type { Access } from 'payload'

export const isAthlete: Access = ({ req: { user } }) => {
    if (!user) return false
    return user?.role === 'athlete'
}
