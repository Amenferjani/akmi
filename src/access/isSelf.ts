// access/isSelf.ts
import type { Access } from 'payload'

export const isSelf: Access = ({ req: { user } }) => {
    if (!user) return false
    return {
        id: {
            equals: user.id,
        },
    }
}
