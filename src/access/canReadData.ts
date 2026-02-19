import type { Access } from 'payload'

export const canReadData: Access = async ({ req: { user, payload } }) => {
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
            id: { in: athleteIds.length ? athleteIds : [0] },
        }
    }

    // Athletes see themselves AND their coach
    if (user.role === 'athlete') {
        // Find athlete's active coach
        const relationships = await payload.find({
            collection: 'coach-athlete',
            depth: 0,
            where: {
                athlete: { equals: user.id },
                status: { equals: 'active' },
            },
        })

        if (relationships.docs.length > 0) {
            const coachId = relationships.docs[0].coach as number
            
            // Return BOTH the athlete and their coach
            return {
                id: { 
                    in: [user.id, coachId] 
                }
            }
        }

        // No coach found - just return themselves
        return { id: { equals: user.id } }
    }

    return false
}