import type { Access } from 'payload'

export const isSelfOrAdminOrYourCoach: Access = async ({ req: { user, payload } }) => {
    if (!user) return false

    // Admin sees everything
    if (user.role === 'admin') return true

    // Coaches see their athletes
    if (user.role === 'coach') {
        const relationships = await payload.find({
            collection: 'coach-athlete',
            depth: 0,
            where: {
                coach: { equals: user.id },
                status: { equals: 'active' },
            },
        })

        const athleteIds = relationships.docs.map((rel) => rel.athlete as number)

        return {
            user: { in: athleteIds.length ? athleteIds : [0] }, 
        }
    }

    // Athletes see themselves
    if (user.role === 'athlete') {
        return {
            user: { equals: user.id }, 
        }
    }

    return false
}
