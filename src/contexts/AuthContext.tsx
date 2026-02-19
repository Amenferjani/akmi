'use client'

import { createContext, useContext, useEffect, useMemo } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter, usePathname } from 'next/navigation'
import { User } from 'payload'
import { getMe, logoutUser, refreshToken } from '@/services/client/user.client'

type AuthState = 'loading' | 'authenticated' | 'guest'

type AuthContextType = {
    user: User | null
    authState: AuthState
    isLoading: boolean
    refetchUser: () => void
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const PUBLIC_ROUTES = ['/login', '/signup', '/verify', '/verify-notice', '/']

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
        isFetching,
        isSuccess,
        refetch,
    } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getMe,
        staleTime: 5 * 60 * 1000,
        retry: false,
    })

    /**
     * IMPORTANT:
     * We must distinguish:
     * - loading (don't know yet)
     * - guest (know there is no user)
     * - authenticated
     */
    const user = response?.success ? (response.data?.user ?? null) : null

    const authState: AuthState = useMemo(() => {
        if (!isSuccess) return 'loading'
        if (user) return 'authenticated'
        return 'guest'
    }, [isSuccess, user])

    /**
     * Silent token refresh (only when authenticated)
     */
    useEffect(() => {
        if (authState !== 'authenticated') return

        const timer = setInterval(
            () => {
                refreshToken()
            },
            10 * 60 * 1000,
        )

        return () => clearInterval(timer)
    }, [authState])

    /**
     * Route Protection — runs ONLY after auth resolved
     */
    useEffect(() => {
        if (authState === 'loading') return

        const isPublicRoute = PUBLIC_ROUTES.some(
            (route) => pathname === route || pathname.startsWith(`${route}/`),
        )

        // ❌ Guest trying to access protected route
        if (authState === 'guest' && !isPublicRoute) {
            router.replace('/login')
            return
        }

        // ✅ Logged in visiting auth pages
        if (authState === 'authenticated' && isPublicRoute && pathname !== '/') {
            const dashboardPath =
                ROLE_DASHBOARD_MAP[user!.role as keyof typeof ROLE_DASHBOARD_MAP] || '/athlete'

            router.replace(dashboardPath)
            return
        }

        // ✅ Role protection
        if (authState === 'authenticated' && user) {
            if (pathname.startsWith('/coach') && user.role !== 'coach') {
                router.replace('/athlete')
                return
            }

            if (pathname.startsWith('/athlete') && user.role !== 'athlete') {
                router.replace('/coach')
                return
            }
        }
    }, [authState, pathname, router, user])

    const logout = async () => {
        await logoutUser()
        queryClient.setQueryData(['currentUser'], null)
        router.replace('/login')
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                authState,
                isLoading: isLoading || isFetching,
                refetchUser: refetch,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}
