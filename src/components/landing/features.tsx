import { useAppTheme } from '@/hooks/useAppTheme'
import { Container, Title, Text, Stack, Card, ThemeIcon, Box, SimpleGrid, rem } from '@mantine/core'
import { BarChart3, Award, Target, Users, Calendar, Video } from 'lucide-react'
export const Features = () => {
    const { theme, isDark } = useAppTheme()
    return (
        <Box
            id="features"
            style={{ backgroundColor: theme.bgAlt, borderTop: `1px solid ${theme.border}` }}
        >
            <Container size="lg" py={100}>
                <Stack gap={80}>
                    <Stack gap="md" align="center" style={{ textAlign: 'center' }}>
                        <Text
                            style={{
                                fontSize: rem(14),
                                fontWeight: 700,
                                color: theme.secondary,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                            }}
                        >
                            Features
                        </Text>
                        <Title
                            order={2}
                            style={{
                                fontSize: rem(48),
                                fontWeight: 900,
                                color: theme.text,
                                maxWidth: rem(600),
                            }}
                        >
                            Built for Athletes Who Take Training Seriously
                        </Title>
                        <Text
                            size="lg"
                            style={{
                                color: theme.textSecondary,
                                maxWidth: rem(700),
                            }}
                        >
                            From tracking your first workout to breaking world records, AKMI gives
                            you everything you need to reach your potential.
                        </Text>
                    </Stack>

                    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={40}>
                        {[
                            {
                                icon: Target,
                                title: 'Intelligent Tracking',
                                description:
                                    'Log sets, reps, and weight with ease. Automatic 1RM calculations, RPE tracking, and instant PR detection keep you motivated.',
                            },
                            {
                                icon: BarChart3,
                                title: 'Performance Analytics',
                                description:
                                    'Visualize your progress with detailed charts. Track volume, intensity, and frequency to optimize your training cycles.',
                            },
                            {
                                icon: Calendar,
                                title: 'Program Management',
                                description:
                                    'Access proven programs or create your own. Schedule workouts, set deload weeks, and plan your peak.',
                            },
                            {
                                icon: Users,
                                title: 'Expert Coaching',
                                description:
                                    'Connect with certified powerlifting coaches. Get personalized programs, technique feedback, and competition prep.',
                            },
                            {
                                icon: Video,
                                title: 'Video Analysis',
                                description:
                                    'Upload form videos for coach review. Compare lifts side-by-side and track technique improvements over time.',
                            },
                            {
                                icon: Award,
                                title: 'Global Competition',
                                description:
                                    'Join leaderboards by weight class. Compare your lifts, earn achievements, and connect with the community.',
                            },
                        ].map((feature) => (
                            <Card
                                key={feature.title}
                                shadow="sm"
                                padding="xl"
                                radius="md"
                                style={{
                                    backgroundColor: theme.cardBg,
                                    border: `1px solid ${theme.border}`,
                                }}
                            >
                                <Stack gap="md">
                                    <ThemeIcon
                                        size={56}
                                        radius="md"
                                        variant="light"
                                        style={{
                                            backgroundColor: isDark
                                                ? 'rgba(6, 182, 212, 0.1)'
                                                : 'rgba(6, 182, 212, 0.05)',
                                            color: theme.secondary,
                                        }}
                                    >
                                        <feature.icon size={28} strokeWidth={2} />
                                    </ThemeIcon>
                                    <Box>
                                        <Text
                                            style={{
                                                fontSize: rem(20),
                                                fontWeight: 700,
                                                color: theme.text,
                                                marginBottom: rem(8),
                                            }}
                                        >
                                            {feature.title}
                                        </Text>
                                        <Text
                                            size="sm"
                                            style={{
                                                color: theme.textSecondary,
                                                lineHeight: 1.6,
                                            }}
                                        >
                                            {feature.description}
                                        </Text>
                                    </Box>
                                </Stack>
                            </Card>
                        ))}
                    </SimpleGrid>
                </Stack>
            </Container>
        </Box>
    )
}
