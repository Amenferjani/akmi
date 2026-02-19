// app/(dashboard)/athlete/page.tsx
'use client'

import { useAppTheme } from '@/hooks/useAppTheme'
import { useAuth } from '@/contexts/AuthContext'
import {
    Title,
    Text,
    Button,
    Group,
    Stack,
    Card,
    Grid,
    SimpleGrid,
    Progress,
    RingProgress,
    rem,
    Box,
    Skeleton,
    Badge,
    Divider,
} from '@mantine/core'
import { Dumbbell, Calendar, TrendingUp, Award, ArrowRight, Plus, Flame, Clock } from 'lucide-react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getAthleteRecentWorkouts, getAthleteWorkoutStats } from '@/services/client/workouts.client'
import { Workout, Exercise } from '@/payload-types'
import { WorkoutItem } from '@/components/dashboard/workout/workout-item'
import { StatsCards } from '@/components/dashboard/workout/Stats-cards'
import { WorkoutList } from '@/components/dashboard/workout/workout-list'

export default function AthleteDashboard() {
    const { theme, isDark } = useAppTheme()
    const { user } = useAuth()
    const athleteHasProgram = false

    const { data: athleteStats, isLoading: isLoadingStats } = useQuery({
        queryKey: ['athleteStats'],
        queryFn: getAthleteWorkoutStats,
    })

    const { data: recentWorkouts, isLoading: isLoadingRecentWorkouts } = useQuery({
        queryKey: ['athleteRecentWorkouts'],
        queryFn: getAthleteRecentWorkouts,
    })

    const stats = [
        { label: 'Total Workouts', value: athleteStats?.totalWorkouts || '0', icon: Calendar },
        {
            label: 'Total Volume',
            value:
                (athleteStats?.totalVolume || `0`) +
                ' ' +
                (user?.preferences?.unitSystem === 'metric' ? 'kg' : 'lbs'),
            icon: Dumbbell,
        },
        { label: 'Current Streak', value: athleteStats?.streak || '0 days', icon: Flame },
        { label: 'Personal Records', value: athleteStats?.totalPRs || '0', icon: Award },
    ]

    const upcomingProgram = {
        name: 'Strength Block - Week 3',
        progress: 65,
        nextWorkout: 'Squat 5x5, Bench 5x5',
    }

    return (
        <Box style={{ backgroundColor: theme.bg }}>
            <Box px={{ base: 'md', sm: 'lg', md: 'xl' }}>
                <Stack
                // gap={{ base: 'lg', md: 'xl' }}
                >
                    {/* Welcome Header */}
                    <Box>
                        <Group justify="space-between" align="flex-start" wrap="wrap" gap="md">
                            <Stack gap={8}>
                                <Title
                                    order={1}
                                    // size={{ base: rem(24), sm: rem(32) }}
                                    style={{ color: theme.text, fontWeight: 800 }}
                                >
                                    Welcome back, {user?.profile?.firstName}!
                                </Title>
                                <Text
                                    // size={{ base: 'sm', sm: 'md' }}
                                    style={{ color: theme.textSecondary }}
                                >
                                    Track your progress and crush your goals today
                                </Text>
                            </Stack>
                        </Group>
                    </Box>

                    {/* Stats Cards */}
                    <StatsCards stats={stats} isLoading={isLoadingStats} />

                    {/* Main Content Grid */}
                    <Grid gutter={{ base: 'md', md: 'lg' }}>
                        {/* Recent Workouts */}

                        <Grid.Col span={{ base: 12, md: 8 }}>
                            <Card
                                style={{
                                    backgroundColor: theme.cardBg,
                                    border: `1px solid ${theme.border}`,
                                    borderRadius: rem(12),
                                    height: '630px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                                // padding={{ base: 'md', sm: 'lg' }}
                                shadow="sm"
                            >
                                <Stack gap="md" style={{ height: '100%' }}>
                                    <Group justify="space-between" align="center">
                                        <Title
                                            order={3}
                                            // size={{ base: rem(18), sm: rem(22) }}
                                            style={{ color: theme.text, fontWeight: 700 }}
                                        >
                                            Recent Workouts
                                        </Title>
                                        <Button
                                            component={Link}
                                            href="/athlete/workouts/new"
                                            size="lg"
                                            leftSection={<Plus size={20} />}
                                            // style={{
                                            //     backgroundColor: theme.secondary,
                                            //     color: '#FFFFFF',
                                            // }}
                                            style={{ color: theme.secondary }}
                                            variant="subtle"
                                            styles={{
                                                root: {
                                                    '&:hover': {
                                                        backgroundColor: theme.secondaryLight,
                                                        transform: 'translateY(-2px)',
                                                        transition: 'all 0.2s ease',
                                                    },
                                                },
                                            }}
                                        >
                                            Log Workout
                                        </Button>
                                    </Group>

                                    <Divider color={theme.border} />

                                    {/* Scrollable workout list */}
                                    <WorkoutList workouts={recentWorkouts} isLoading={isLoadingRecentWorkouts} />
                                    <Stack align="start">
                                        <Button
                                            component={Link}
                                            href="/athlete/workouts"
                                            variant="subtle"
                                            rightSection={<ArrowRight size={16} />}
                                            style={{ color: theme.secondary }}
                                            size="sm"
                                        >
                                            View All
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Card>
                        </Grid.Col>

                        {/* Program Card */}
                        <Grid.Col span={{ base: 12, md: 4 }}>
                            <Card
                                style={{
                                    backgroundColor: theme.cardBg,
                                    border: `1px solid ${theme.border}`,
                                    borderRadius: rem(12),
                                    height: '630px',
                                }}
                                // padding={{ base: 'md', sm: 'lg' }}
                                shadow="sm"
                            >
                                <Stack style={{ height: '100%' }} justify="space-between">
                                    <Stack gap="md">
                                        <Title
                                            order={3}
                                            // size={{ base: rem(18), sm: rem(22) }}
                                            style={{ color: theme.text, fontWeight: 700 }}
                                        >
                                            Your Program
                                        </Title>

                                        <Divider color={theme.border} />

                                        {athleteHasProgram ? (
                                            // Has program - show progress
                                            <Stack gap="lg">
                                                <Stack gap="xs">
                                                    <Text
                                                        fw={600}
                                                        size="lg"
                                                        style={{ color: theme.text }}
                                                    >
                                                        Strength Block
                                                    </Text>
                                                    <Badge
                                                        size="lg"
                                                        variant="light"
                                                        style={{
                                                            backgroundColor: isDark
                                                                ? 'rgba(0, 210, 255, 0.1)'
                                                                : 'rgba(0, 210, 255, 0.08)',
                                                            color: theme.secondary,
                                                        }}
                                                    >
                                                        Week 3/4
                                                    </Badge>
                                                </Stack>

                                                <Stack gap="xs">
                                                    <Group justify="space-between">
                                                        <Text
                                                            size="sm"
                                                            style={{ color: theme.textSecondary }}
                                                        >
                                                            Progress
                                                        </Text>
                                                        <Text
                                                            size="sm"
                                                            fw={600}
                                                            style={{ color: theme.secondary }}
                                                        >
                                                            75%
                                                        </Text>
                                                    </Group>
                                                    <Progress
                                                        value={75}
                                                        color={theme.secondary}
                                                        size="lg"
                                                        radius="xl"
                                                    />
                                                </Stack>

                                                <Box
                                                    style={{
                                                        backgroundColor: theme.bg,
                                                        padding: rem(16),
                                                        borderRadius: rem(8),
                                                        border: `1px solid ${theme.border}`,
                                                    }}
                                                >
                                                    <Stack gap="xs">
                                                        <Group gap="xs">
                                                            <Clock
                                                                size={16}
                                                                color={theme.secondary}
                                                            />
                                                            <Text
                                                                size="sm"
                                                                fw={600}
                                                                style={{ color: theme.text }}
                                                            >
                                                                Next workout:
                                                            </Text>
                                                        </Group>
                                                        <Text
                                                            size="sm"
                                                            style={{ color: theme.textSecondary }}
                                                        >
                                                            Squat 5x5, Bench 5x5
                                                        </Text>
                                                    </Stack>
                                                </Box>

                                                <Button
                                                    variant="light"
                                                    fullWidth
                                                    size="md"
                                                    rightSection={<ArrowRight size={16} />}
                                                    style={{
                                                        color: theme.secondary,
                                                        backgroundColor: isDark
                                                            ? 'rgba(0, 210, 255, 0.1)'
                                                            : 'rgba(0, 210, 255, 0.08)',
                                                    }}
                                                >
                                                    View Program
                                                </Button>
                                            </Stack>
                                        ) : (
                                            // No program - show CTA
                                            <Stack align="center" gap="lg" py="xl">
                                                <Box
                                                    style={{
                                                        width: rem(80),
                                                        height: rem(80),
                                                        borderRadius: rem(16),
                                                        backgroundColor: isDark
                                                            ? 'rgba(0, 210, 255, 0.1)'
                                                            : 'rgba(0, 210, 255, 0.08)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Dumbbell
                                                        size={40}
                                                        color={theme.secondary}
                                                        strokeWidth={2}
                                                    />
                                                </Box>
                                                <Stack gap="xs" align="center">
                                                    <Title
                                                        order={4}
                                                        size={rem(18)}
                                                        style={{
                                                            color: theme.text,
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        Ready to level up?
                                                    </Title>
                                                    <Text
                                                        size="sm"
                                                        style={{
                                                            color: theme.textSecondary,
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        Get a personalized program from our expert
                                                        coaches
                                                    </Text>
                                                </Stack>
                                                <Button
                                                    fullWidth
                                                    size="md"
                                                    rightSection={<ArrowRight size={16} />}
                                                    style={{
                                                        backgroundColor: theme.secondary,
                                                        color: '#FFFFFF',
                                                    }}
                                                    styles={{
                                                        root: {
                                                            '&:hover': {
                                                                backgroundColor:
                                                                    theme.secondaryLight,
                                                                transform: 'translateY(-2px)',
                                                                transition: 'all 0.2s ease',
                                                            },
                                                        },
                                                    }}
                                                >
                                                    Browse Programs
                                                </Button>
                                            </Stack>
                                        )}
                                    </Stack>
                                </Stack>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Box>
        </Box>
    )
}
