// app/(dashboard)/athlete/workouts/page.tsx
'use client'

import { useState } from 'react'
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
    Pagination,
    Box,
    Skeleton,
    rem,
    Select,
    Badge,
    Divider,
} from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import {
    Dumbbell,
    Calendar,
    TrendingUp,
    Award,
    Plus,
    Flame,
    ChevronLeft,
    ChevronRight,
    BarChart3,
    Clock,
    ArrowRight,
} from 'lucide-react'
import Link from 'next/link'
import { Workout } from '@/payload-types'
import { StatsCards } from '@/components/dashboard/workout/Stats-cards'
import { WorkoutItem } from '@/components/dashboard/workout/workout-item'
import { getAthleteWorkouts, getAthleteWorkoutStats } from '@/services/client/workouts.client'
import { WorkoutList } from '@/components/dashboard/workout/workout-list'

export default function WorkoutsPage() {
    const { theme, isDark } = useAppTheme()
    const { user } = useAuth()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    // Fetch workouts with pagination
    const { data: workoutsData, isLoading: isLoadingWorkouts } = useQuery({
        queryKey: ['workouts', page, limit],
        queryFn: () => getAthleteWorkouts(page, 10),
    })

    const { data: athleteStats, isLoading: isLoadingStats } = useQuery({
        queryKey: ['athleteStats'],
        queryFn: getAthleteWorkoutStats,
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

    const workouts = workoutsData?.docs || []
    const totalPages = workoutsData?.totalPages || 1
    const totalDocs = workoutsData?.totalDocs || 0

    return (
        <Box style={{ backgroundColor: theme.bg }}>
            <Box px={{ base: 'md', sm: 'lg', md: 'xl' }}>
                <Stack gap="xl">
                    {/* Header */}
                    <Box>
                        <Group justify="space-between" align="flex-start" wrap="wrap" gap="md">
                            <Stack gap={8}>
                                <Title order={1} style={{ color: theme.text, fontWeight: 800 }}>
                                    Workouts
                                </Title>
                                <Text style={{ color: theme.textSecondary }}>
                                    Track and review your training history
                                </Text>
                            </Stack>
                            <Button
                                component={Link}
                                href="/athlete/workouts/new"
                                size="lg"
                                leftSection={<Plus size={20} />}
                                style={{
                                    backgroundColor: theme.secondary,
                                    color: '#FFFFFF',
                                }}
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
                    </Box>

                    {/* Stats Cards */}
                    <StatsCards stats={stats} isLoading={isLoadingStats} />

                    {/* Workouts List */}
                    <Card
                        style={{
                            backgroundColor: theme.cardBg,
                            border: `1px solid ${theme.border}`,
                            borderRadius: rem(12),
                            height: '600px',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        shadow="sm"
                    >
                        {/* Header - stays at top */}
                        <Box px="lg" pt="lg">
                            <Group justify="space-between" align="center">
                                <Title order={3} style={{ color: theme.text, fontWeight: 700 }}>
                                    Workout History
                                </Title>
                                <Select
                                    value={limit.toString()}
                                    onChange={(value) => {
                                        setLimit(Number(value))
                                        setPage(1)
                                    }}
                                    data={['10', '20', '50']}
                                    size="sm"
                                    style={{ width: rem(80) }}
                                    styles={{
                                        input: {
                                            backgroundColor: theme.bg,
                                            borderColor: theme.border,
                                            color: theme.text,
                                        },
                                    }}
                                />
                            </Group>
                        </Box>

                        <Divider color={theme.border} mx="lg" my="md" />

                        {/* Scrollable content - takes remaining space */}
                        <WorkoutList workouts={workouts} isLoading={isLoadingWorkouts} />

                        {/* Pagination - sticks to bottom */}
                        {workouts.length > 0 && (
                            <>
                                <Divider color={theme.border} mx="lg" />
                                <Box px="lg" py="md">
                                    <Group justify="space-between" align="center">
                                        <Text size="sm" style={{ color: theme.textSecondary }}>
                                            Showing {(page - 1) * limit + 1} to{' '}
                                            {Math.min(page * limit, totalDocs)} of {totalDocs}
                                        </Text>
                                        <Pagination
                                            total={totalPages}
                                            value={page}
                                            onChange={setPage}
                                            color={theme.secondary}
                                            styles={{
                                                control: {
                                                    backgroundColor: theme.bg,
                                                    borderColor: theme.border,
                                                    color: theme.text,
                                                    '&[data-active]': {
                                                        backgroundColor: theme.secondary,
                                                        color: '#FFFFFF',
                                                    },
                                                },
                                            }}
                                        />
                                    </Group>
                                </Box>
                            </>
                        )}
                    </Card>
                </Stack>
            </Box>
        </Box>
    )
}
