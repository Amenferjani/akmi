// components/shared/sideBar.tsx
'use client'

import { Box, NavLink, rem, Divider, Button } from '@mantine/core'
import { 
    Home, 
    Calendar, 
    TrendingUp, 
    User, 
    Users, 
    ClipboardList, 
    Dumbbell, 
    LogOut,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppTheme } from '@/hooks/useAppTheme'
import { useAuth } from '@/contexts/AuthContext'

interface DashboardSidebarProps {
    collapsed?: boolean
}

const roleNavItems = {
    athlete: [
        { label: 'Dashboard', icon: Home, href: '/athlete' },
        { label: 'Workouts', icon: Calendar, href: '/athlete/workouts' },
        { label: 'Progress', icon: TrendingUp, href: '/athlete/progress' },
        { label: 'Profile', icon: User, href: '/athlete/profile' },
    ],
    coach: [
        { label: 'Dashboard', icon: Home, href: '/coach' },
        { label: 'Athletes', icon: Users, href: '/coach/athletes' },
        { label: 'Programs', icon: ClipboardList, href: '/coach/programs' },
        { label: 'Exercises', icon: Dumbbell, href: '/coach/exercises' },
        { label: 'Profile', icon: User, href: '/coach/profile' },
    ],
}

export function DashboardSidebar({ collapsed = false }: DashboardSidebarProps) {
    const { theme } = useAppTheme()
    const { user, logout } = useAuth()
    const pathname = usePathname()

    if (!user) return null

    const navItems = roleNavItems[user.role as keyof typeof roleNavItems] || []

    return (
        <Box 
            p="md" 
            style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%',
                width: collapsed ? rem(80) : rem(250),
            }}
        >
            {/* Navigation Items */}
            <Box style={{ flex: 1 }}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.href}
                        component={Link}
                        href={item.href}
                        label={collapsed ? null : item.label}
                        leftSection={<item.icon size={20} />}
                        active={pathname === item.href}
                        color={theme.secondary}
                        style={{
                            borderRadius: rem(8),
                            marginBottom: rem(4),
                            color: theme.text,
                            justifyContent: collapsed ? 'center' : 'flex-start',
                        }}
                    />
                ))}
            </Box>

            {/* Logout Button */}
            <Divider my="md" color={theme.border} />
            <Button
                onClick={logout}
                variant="subtle"
                color="red"
                fullWidth
                leftSection={<LogOut size={20} />}
                styles={{
                    root: {
                        justifyContent: collapsed ? 'center' : 'flex-start',
                    },
                }}
            >
                {!collapsed && 'Logout'}
            </Button>
        </Box>
    )
}