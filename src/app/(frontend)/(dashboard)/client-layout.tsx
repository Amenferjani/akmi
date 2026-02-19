'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Box, Loader } from '@mantine/core'
import { AppShell, Burger } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useAppTheme } from '@/hooks/useAppTheme'
import { DashboardNavbar } from '@/components/shared/navBar'
import { DashboardSidebar } from '@/components/shared/sideBar'

// export const metadata = {
//     title: 'Dashboard',
// }

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const { theme } = useAppTheme()
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [opened, { toggle }] = useDisclosure()
    // const [collapsed, setCollapsed] = useState(false)

    useEffect(() => {
        if (isLoading) return

        // Check if user is authorized for this dashboard section
        const isAthleteRoute = pathname.startsWith('/athlete')
        const isCoachRoute = pathname.startsWith('/coach')

        if (!user) {
            router.push('/login')
            return
        }

        // Role-based access
        if (isAthleteRoute && user.role !== 'athlete') {
            router.push(`/${user.role}`)
            return
        }

        if (isCoachRoute && user.role !== 'coach') {
            router.push(`/${user.role}`)
            return
        }

        setIsAuthorized(true)
    }, [user, isLoading, pathname, router])

    if (isLoading || !isAuthorized) {
        return (
            <Box
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: theme?.bg || '#0A0A0A',
                }}
            >
                <Loader size="lg" color={theme?.secondary || '#06B6D4'} />
            </Box>
        )
    }

    return (
        <>
            <AppShell
                header={{ height: 70 }}
                navbar={{
                    width: 260,
                    breakpoint: 'sm',
                    collapsed: { mobile: !opened },
                }}
                padding="md"
                styles={{
                    main: {
                        backgroundColor: theme.bg,
                    },
                }}
            >
                <AppShell.Header
                    style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
                >
                    <DashboardNavbar sidebarOpen={opened} toggleSidebar={toggle} />
                </AppShell.Header>

                <AppShell.Navbar
                    style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
                >
                    <DashboardSidebar
                        // collapsed={collapsed}
                        // onToggle={() => setCollapsed(!collapsed)}
                    />
                </AppShell.Navbar>

                <AppShell.Main>{children}</AppShell.Main>
            </AppShell>
        </>
    )
}
