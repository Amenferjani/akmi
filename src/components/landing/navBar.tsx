'use client'

import { useAppTheme } from '@/hooks/useAppTheme'
import { Anchor, Button, rem, Group, Box, Container, Text, Drawer, Stack, Burger } from '@mantine/core'
import { Dumbbell, X } from 'lucide-react'
import { ThemeToggle } from '../ui/Theme-toggle'
import Link from 'next/link'
import { useState } from 'react'

export const NavBar = () => {
    const { theme, isDark } = useAppTheme()
    const [drawerOpened, setDrawerOpened] = useState(false)

    const navLinks = [
        { href: '#features', label: 'Features' },
        { href: '#pricing', label: 'Pricing' },
        { href: '#', label: 'Coaches' },
        { href: '#', label: 'Community' },
    ]

    return (
        <Box
            style={{
                backgroundColor: theme.cardBg,
                borderBottom: `1px solid ${theme.border}`,
                position: 'sticky',
                top: 0,
                zIndex: 100,
                backdropFilter: 'blur(10px)',
                width: '100%', 
            }}
        >
            <Container size="lg">
                <Group justify="space-between" py="md">
                    {/* Logo */}
                    <Group gap="xs">
                        <Dumbbell size={28} color={theme.secondary} strokeWidth={2.5} />
                        <Text
                            style={{
                                fontSize: rem(24),
                                fontWeight: 900,
                                color: theme.text,
                                letterSpacing: '-0.02em',
                            }}
                        >
                            AKMI
                        </Text>
                    </Group>

                    {/* Desktop Navigation */}
                    <Group gap="xl" visibleFrom="sm">
                        {navLinks.map((link) => (
                            <Anchor
                                key={link.label}
                                href={link.href}
                                style={{
                                    color: theme.textSecondary,
                                    textDecoration: 'none',
                                    fontWeight: 500,
                                    transition: 'color 0.2s ease',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = theme.secondary)}
                                onMouseLeave={(e) => (e.currentTarget.style.color = theme.textSecondary)}
                            >
                                {link.label}
                            </Anchor>
                        ))}
                    </Group>

                    {/* Desktop Actions */}
                    <Group gap="md" visibleFrom="sm">
                        <ThemeToggle />
                        <Button
                            variant="subtle"
                            component={Link}
                            href="/login"
                            style={{
                                color: theme.text,
                                fontWeight: 600,
                            }}
                        >
                            Log In
                        </Button>
                        <Button
                            component={Link}
                            href="/signup"
                            style={{
                                backgroundColor: theme.secondary,
                                color: isDark ? theme.bg : '#FFFFFF',
                                fontWeight: 600,
                            }}
                        >
                            Get Started
                        </Button>
                    </Group>

                    {/* Mobile Menu Button */}
                    <Group hiddenFrom="sm" gap="xs">
                        <ThemeToggle />
                        <Burger
                            opened={drawerOpened}
                            onClick={() => setDrawerOpened(!drawerOpened)}
                            color={theme.text}
                            size="md"
                        />
                    </Group>
                </Group>
            </Container>

            {/* Mobile Drawer */}
            <Drawer
                opened={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                position="right"
                size="100%"
                styles={{
                    body: {
                        padding: 0,
                    },
                }}
            >
                <Box
                    style={{
                        backgroundColor: theme.bgAlt,
                        minHeight: '100vh',
                    }}
                >
                    <Container size="lg" py="xl">
                        <Group justify="space-between" mb="xl">
                            <Group gap="xs">
                                <Dumbbell size={28} color={theme.secondary} strokeWidth={2.5} />
                                <Text
                                    style={{
                                        fontSize: rem(24),
                                        fontWeight: 900,
                                        color: theme.text,
                                        letterSpacing: '-0.02em',
                                    }}
                                >
                                    AKMI
                                </Text>
                            </Group>
                            {/* <X
                                size={24}
                                color={theme.text}
                                onClick={() => setDrawerOpened(false)}
                                style={{ cursor: 'pointer' }}
                            /> */}
                        </Group>

                        <Stack gap="lg" mt="xl">
                            {navLinks.map((link) => (
                                <Anchor
                                    key={link.label}
                                    href={link.href}
                                    style={{
                                        color: theme.text,
                                        textDecoration: 'none',
                                        fontSize: rem(20),
                                        fontWeight: 500,
                                        padding: `${rem(8)} ${rem(16)}`,
                                        borderRadius: rem(8),
                                    }}
                                    onClick={() => setDrawerOpened(false)}
                                >
                                    {link.label}
                                </Anchor>
                            ))}

                            <Box mt="xl" style={{ borderTop: `1px solid ${theme.border}`, paddingTop: rem(20) }}>
                                <Stack gap="md">
                                    <Button
                                        variant="subtle"
                                        component={Link}
                                        href="/login"
                                        fullWidth
                                        size="lg"
                                        style={{
                                            color: theme.text,
                                            fontWeight: 600,
                                            border: `1px solid ${theme.border}`,
                                        }}
                                        onClick={() => setDrawerOpened(false)}
                                    >
                                        Log In
                                    </Button>
                                    <Button
                                        component={Link}
                                        href="/signup"
                                        fullWidth
                                        size="lg"
                                        style={{
                                            backgroundColor: theme.secondary,
                                            color: isDark ? theme.bg : '#FFFFFF',
                                            fontWeight: 600,
                                        }}
                                        onClick={() => setDrawerOpened(false)}
                                    >
                                        Get Started
                                    </Button>
                                </Stack>
                            </Box>
                        </Stack>
                    </Container>
                </Box>
            </Drawer>
        </Box>
    )
}