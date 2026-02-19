'use client'

import { Group, Text, Avatar, Menu, rem, Container, Button, Burger } from '@mantine/core'
import { Dumbbell, LogOut } from 'lucide-react'
import { useAppTheme } from '@/hooks/useAppTheme'
import { useAuth } from '@/contexts/AuthContext'
import { ThemeToggle } from '../ui/Theme-toggle'
import { Menu as MenuIcon } from 'lucide-react'
interface DashboardNavbarProps {
    sidebarOpen: boolean
    toggleSidebar?: () => void
}
export function DashboardNavbar({ toggleSidebar, sidebarOpen }: DashboardNavbarProps) {
    const { theme } = useAppTheme()
    const { user, logout } = useAuth()

    return (
        <Container fluid h="100%">
            <Group h="100%" px="xs" justify="space-between">
                <Group gap="xs">
                    {/* Mobile menu button */}
                    {toggleSidebar && (
                        <Burger
                            opened={sidebarOpen}
                            onClick={toggleSidebar}
                            hiddenFrom="sm"
                            size="sm"
                            color={theme.text}
                        />
                    )}
                    <Dumbbell size={28} color={theme.secondary} />
                    <Text>AKMI</Text>
                </Group>

                <Group gap="md">
                    <ThemeToggle />
                    <Menu position="bottom-end" offset={15}>
                        <Menu.Target>
                            <Avatar
                                src={user?.profile?.profilePhoto?.url}
                                radius="xl"
                                color={theme.secondary}
                                style={{ cursor: 'pointer' }}
                            >
                                {user?.profile?.firstName?.[0].toUpperCase()}
                                {user?.profile?.lastName?.[0].toUpperCase()}
                            </Avatar>
                        </Menu.Target>
                        <Menu.Dropdown
                            style={{
                                scale: 1,
                                backgroundColor: theme.cardBg,
                                borderColor: theme.border,
                            }}
                        >
                            <Menu.Label style={{ color: theme.textSecondary }}>
                                Signed in as
                            </Menu.Label>
                            <Menu.Item disabled style={{ color: theme.text }}>
                                {user?.profile?.firstName} {user?.profile?.lastName}
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item
                                leftSection={<LogOut size={16} />}
                                onClick={logout}
                                style={{ color: theme.text }}
                            >
                                Logout
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Group>
        </Container>
    )
}
