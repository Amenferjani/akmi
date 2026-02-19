import { Workout } from '@/payload-types'
import { theme } from '@/theme/theme'
import { Box, Group,Stack, Card, rem, Skeleton, Button , Text} from '@mantine/core'
import {  Calendar, Plus } from 'lucide-react'
import { WorkoutItem } from './workout-item'
import { useAppTheme } from '@/hooks/useAppTheme'
import Link from 'next/link'

interface WorkoutListProps {
    workouts: Workout[]
    isLoading: boolean
}

export const WorkoutList = ({ workouts, isLoading }: WorkoutListProps) => {
    const { theme, isDark } = useAppTheme()
    return (
        <>
            <Box
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '0 var(--mantine-spacing-lg)',
                }}
            >
                <Stack gap="sm">
                    {isLoading ? (
                        // Loading skeletons
                        Array(4)
                            .fill(0)
                            .map((_, i) => (
                                <Card
                                    key={i}
                                    style={{
                                        backgroundColor: theme.bg,
                                        border: `1px solid ${theme.border}`,
                                        borderRadius: rem(8),
                                    }}
                                    padding="md"
                                >
                                    <Group justify="space-between" mb="xs">
                                        <Group gap="xs">
                                            <Skeleton height={16} width={16} circle />
                                            <Skeleton height={20} width={120} />
                                        </Group>
                                        <Skeleton height={20} width={80} />
                                    </Group>
                                    <Stack gap="xs">
                                        <Group justify="space-between">
                                            <Skeleton height={16} width={100} />
                                            <Skeleton height={16} width={80} />
                                        </Group>
                                        <Group justify="space-between">
                                            <Skeleton height={16} width={100} />
                                            <Skeleton height={16} width={80} />
                                        </Group>
                                    </Stack>
                                </Card>
                            ))
                    ) : workouts.length === 0 ? (
                        // Empty state
                        <Card
                            style={{
                                backgroundColor: theme.bg,
                                border: `2px dashed ${theme.border}`,
                                borderRadius: rem(12),
                            }}
                            padding="xl"
                        >
                            <Stack align="center" py="xl" gap="lg">
                                <Box
                                    style={{
                                        width: rem(64),
                                        height: rem(64),
                                        borderRadius: '50%',
                                        backgroundColor: isDark
                                            ? 'rgba(148, 163, 184, 0.1)'
                                            : 'rgba(148, 163, 184, 0.08)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Calendar size={32} color={theme.textSecondary} />
                                </Box>
                                <Stack gap="xs" align="center">
                                    <Text
                                        fw={600}
                                        style={{
                                            color: theme.text,
                                        }}
                                    >
                                        No workouts yet
                                    </Text>
                                    <Text
                                        size="sm"
                                        style={{
                                            color: theme.textSecondary,
                                            textAlign: 'center',
                                        }}
                                    >
                                        Start your fitness journey by logging your first workout
                                    </Text>
                                </Stack>
                                <Button
                                    component={Link}
                                    href="/athlete/workouts/new"
                                    variant="light"
                                    size="md"
                                    leftSection={<Plus size={18} />}
                                    style={{
                                        color: theme.secondary,
                                        backgroundColor: isDark
                                            ? 'rgba(0, 210, 255, 0.1)'
                                            : 'rgba(0, 210, 255, 0.08)',
                                    }}
                                >
                                    Log your first workout
                                </Button>
                            </Stack>
                        </Card>
                    ) : (
                        // Actual workouts
                        workouts.map((workout: Workout, idx: number) => (
                            <WorkoutItem key={workout.id} workout={workout} idx={idx} />
                        ))
                    )}
                </Stack>
            </Box>
        </>
    )
}
