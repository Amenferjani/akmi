import type { Access, AccessArgs } from 'payload'

// Use the specific return type for admin access
export const isAdmin = ({ req: { user } }: AccessArgs) => {
    return user?.role === 'admin' // Returns boolean
}