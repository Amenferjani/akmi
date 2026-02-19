'use client'
import { useAppTheme } from '@/hooks/useAppTheme'
import {
    Container,
    Title,
    Text,
    Button,
    Group,
    Stack,
    Grid,
    Box,
    SimpleGrid,
    rem,
    Divider,
} from '@mantine/core'
import { TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'
export const Hero = () => {
    const { theme, isDark } = useAppTheme()
    return (
        <Box
            style={{
                background: isDark
                    ? `linear-gradient(180deg, ${theme.bg} 0%, ${theme.bgAlt} 100%)`
                    : `linear-gradient(180deg, ${theme.bg} 0%, ${theme.bgAlt} 100%)`,
                
            }}
        >
            <Container size="lg" py={100}>
                <Grid gutter="md" align="center">
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Stack gap="xl" align="center">
                            <Box style={{ textAlign: 'center' }}>
                                
                                <Text
                                    style={{
                                        fontSize: rem(14),
                                        fontWeight: 700,
                                        color: theme.secondary,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        marginBottom: rem(16),
                                    }}
                                >
                                    ⚡ The Complete Training Platform
                                </Text>
                                <Title
                                    order={1}
                                    style={{
                                        fontSize: rem(56),
                                        fontWeight: 900,
                                        color: theme.text,
                                        lineHeight: 1.1,
                                        letterSpacing: '-0.02em',
                                    }}
                                >
                                    Elevate Your{' '}
                                    <span style={{ color: theme.secondary }}>Powerlifting</span>{' '}
                                    Journey
                                </Title>
                            </Box>

                            <Text
                                size="lg"
                                style={{
                                    color: theme.textSecondary,
                                    lineHeight: 1.6,
                                    fontSize: rem(18),
                                    textAlign: 'center', // 👈 Add this
                                }}
                            >
                                Track every workout with precision. Get personalized coaching from
                                elite athletes. Compete with a global community of serious lifters.
                            </Text>

                            <Group gap="md" justify="center">
                                {' '}
                                {/* 👈 Add justify="center" */}
                                <Button
                                    size="lg"
                                    component={Link}
                                    href="/signup"
                                    style={{
                                        backgroundColor: theme.secondary,
                                        color: isDark ? theme.bg : '#FFFFFF',
                                        fontSize: rem(16),
                                        fontWeight: 600,
                                        padding: `${rem(12)} ${rem(32)}`,
                                    }}
                                    rightSection={<ArrowRight size={18} />}
                                >
                                    Start Training Free
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    component={Link}
                                    href="#features"
                                    style={{
                                        borderColor: theme.border,
                                        color: theme.text,
                                        fontSize: rem(16),
                                        fontWeight: 600,
                                        padding: `${rem(12)} ${rem(32)}`,
                                    }}
                                >
                                    See How It Works
                                </Button>
                            </Group>

                            <Group gap="md" justify="center">
                                {' '}
                                {/* 👈 Add justify="center" */}
                                <Text size="sm" c="dimmed">
                                    ✓ Free forever
                                </Text>
                                <Text size="sm" c="dimmed">
                                    ✓ No credit card
                                </Text>
                                <Text size="sm" c="dimmed">
                                    ✓ Cancel anytime
                                </Text>
                            </Group>
                        </Stack>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Box
                            style={{
                                backgroundColor: theme.cardBg,
                                border: `1px solid ${theme.border}`,
                                borderRadius: rem(16),
                                padding: rem(32),
                            }}
                        >
                            <Stack gap="lg">
                                <Group justify="space-between">
                                    <Text
                                        style={{
                                            fontSize: rem(14),
                                            fontWeight: 700,
                                            color: theme.textSecondary,
                                        }}
                                    >
                                        YOUR PROGRESS
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: rem(14),
                                            fontWeight: 600,
                                            color: theme.secondary,
                                        }}
                                    >
                                        This Week
                                    </Text>
                                </Group>

                                <Box>
                                    <Text
                                        style={{
                                            fontSize: rem(48),
                                            fontWeight: 900,
                                            color: theme.text,
                                        }}
                                    >
                                        12,450
                                        <span
                                            style={{
                                                fontSize: rem(20),
                                                color: theme.textSecondary,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {' '}
                                            Kg
                                        </span>
                                    </Text>
                                    <Text size="sm" c="dimmed">
                                        Total Volume
                                    </Text>
                                </Box>

                                <Divider color={theme.border} />

                                <SimpleGrid cols={3}>
                                    <Box>
                                        <Text
                                            style={{
                                                fontSize: rem(24),
                                                fontWeight: 800,
                                                color: theme.text,
                                            }}
                                        >
                                            8
                                        </Text>
                                        <Text size="xs" c="dimmed">
                                            Workouts
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text
                                            style={{
                                                fontSize: rem(24),
                                                fontWeight: 800,
                                                color: theme.text,
                                            }}
                                        >
                                            247
                                        </Text>
                                        <Text size="xs" c="dimmed">
                                            Sets
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text
                                            style={{
                                                fontSize: rem(24),
                                                fontWeight: 800,
                                                color: theme.secondary,
                                            }}
                                        >
                                            3
                                        </Text>
                                        <Text size="xs" c="dimmed">
                                            PRs
                                        </Text>
                                    </Box>
                                </SimpleGrid>

                                <Box
                                    style={{
                                        backgroundColor: isDark
                                            ? 'rgba(6, 182, 212, 0.1)'
                                            : 'rgba(6, 182, 212, 0.05)',
                                        padding: rem(16),
                                        borderRadius: rem(8),
                                        border: `1px solid ${theme.secondary}`,
                                    }}
                                >
                                    <Group gap="xs">
                                        <TrendingUp
                                            size={20}
                                            color={theme.secondary}
                                            strokeWidth={2.5}
                                        />
                                        <Text
                                            style={{
                                                fontSize: rem(14),
                                                fontWeight: 600,
                                                color: theme.secondary,
                                            }}
                                        >
                                            +15% from last week
                                        </Text>
                                    </Group>
                                </Box>
                            </Stack>
                        </Box>
                    </Grid.Col>
                </Grid>
            </Container>
        </Box>
    )
}
