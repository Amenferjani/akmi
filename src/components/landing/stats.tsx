'use client'

import { useAppTheme } from '@/hooks/useAppTheme'
import {
    Container,
    Text,
    Stack,
    ThemeIcon,
    Box,
    SimpleGrid,
    rem,
} from '@mantine/core'
import {
    Award,
    Users,
    TrendingUp,
    Crown,
} from 'lucide-react'
export const Stats = () => {
    const { theme, isDark } = useAppTheme()

    return (
        <Box style={{ backgroundColor: theme.bg, borderTop: `1px solid ${theme.border}` }}>
            <Container size="lg" py={80}>
                <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="xl">
                    {[
                        { label: 'Active Athletes', value: '50K+', icon: Users },
                        { label: 'Total Volume', value: '2B+ Kg', icon: TrendingUp },
                        { label: 'Elite Coaches', value: '500+', icon: Crown },
                        { label: 'PRs Set', value: '1M+', icon: Award },
                    ].map((stat) => (
                        <Stack key={stat.label} gap="sm" align="center">
                            <ThemeIcon
                                size={48}
                                radius="md"
                                variant="light"
                                style={{
                                    backgroundColor: isDark
                                        ? 'rgba(6, 182, 212, 0.1)'
                                        : 'rgba(6, 182, 212, 0.05)',
                                    color: theme.secondary,
                                }}
                            >
                                <stat.icon size={24} strokeWidth={2} />
                            </ThemeIcon>
                            <Box style={{ textAlign: 'center' }}>
                                <Text
                                    style={{
                                        fontSize: rem(36),
                                        fontWeight: 900,
                                        color: theme.text,
                                        lineHeight: 1,
                                    }}
                                >
                                    {stat.value}
                                </Text>
                                <Text
                                    size="sm"
                                    style={{
                                        color: theme.textSecondary,
                                        fontWeight: 500,
                                        marginTop: rem(4),
                                    }}
                                >
                                    {stat.label}
                                </Text>
                            </Box>
                        </Stack>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    )
}
