'use client'

import { createContext, useContext, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter, usePathname } from 'next/navigation'
import { User } from 'payload'
import { getMe, logoutUser, refreshToken } from '@/services/client/user.client'
import { Box, Loader } from '@mantine/core'
import { useAppTheme } from '@/hooks/useAppTheme'

type AuthContextType = {
    user: User | null
    isLoading: boolean
    refetchUser: () => void
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
    '/login',
    '/signup',
    '/verify',
    '/verify-notice',
    '/', // landing page
]

// Role-specific dashboard routes
const ROLE_DASHBOARD_MAP = {
    athlete: '/athlete',
    coach: '/coach',
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const queryClient = useQueryClient()

    const {
        data: response,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getMe,
        staleTime: 5 * 60 * 1000,
        retry: false,
    })

    const user = response?.success ? response.data?.user : null
    const isAuthenticated = !!user

    // Auto refresh token
    useEffect(() => {
        let refreshTimer: NodeJS.Timeout


        if (isAuthenticated) {
            refreshTimer = setInterval(refreshToken, 10 * 60 * 1000)
        }

        return () => clearInterval(refreshTimer)
    }, [isAuthenticated, refetch])

    // Route protection and redirects
    useEffect(() => {
        if (isLoading) return

        const isPublicRoute = PUBLIC_ROUTES.some(
            (route) => pathname === route || pathname.startsWith(`${route}/`),
        )

        // Not authenticated and trying to access protected route -> redirect to login
        if (!isAuthenticated && !isPublicRoute) {
            router.push('/login')
            return
        }

        // Authenticated and trying to access auth routes -> redirect to appropriate dashboard
        if (isAuthenticated && isPublicRoute && pathname !== '/') {
            const dashboardPath =
                ROLE_DASHBOARD_MAP[user?.role as keyof typeof ROLE_DASHBOARD_MAP] || '/athlete'
            router.push(dashboardPath)
            return
        }

        // Role-based route protection
        if (isAuthenticated && user) {
            // Protect coach routes
            if (pathname.startsWith('/coach') && user.role !== 'coach') {
                router.push('/athlete')
                return
            }

            // Protect athlete routes
            if (pathname.startsWith('/athlete') && user.role !== 'athlete') {
                router.push('/coach')
                return
            }
        }
    }, [user, isLoading, pathname, router])

    const logout = async () => {
        await logoutUser()
        queryClient.setQueryData(['currentUser'], null)
        router.push('/login')
    }

    const { theme } = useAppTheme()
    return (
        <AuthContext.Provider value={{ user, isLoading, refetchUser: refetch, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}
