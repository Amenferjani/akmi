'use client'
import { deleteWorkout, getWorkoutById } from '@/services/server/workout.server'
import { useAppTheme } from '@/hooks/useAppTheme'
import {
    Container,
    Title,
    Text,
    Button,
    Group,
    Stack,
    Card,
    Box,
    rem,
    Badge,
    Divider,
    Paper,
    ActionIcon,
    Skeleton,
    Center,
    SimpleGrid,
} from '@mantine/core'
import {
    Dumbbell,
    Calendar,
    ArrowLeft,
    Trash2,
    Weight,
    Repeat,
    Target,
    AlertCircle,
    FileText,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import { toast } from '@/components/ui/Toaster'
import type { Workout } from '@/payload-types'
import { formatDate } from '@/utils/utils'
import { useQueryClient } from '@tanstack/react-query'
import { modals } from '@mantine/modals'

interface PageProps {
    params: Promise<{ id: string }>
}

export default function WorkoutDetailsClient({ params }: PageProps) {
    const { theme, isDark } = useAppTheme()
    const router = useRouter()
    const queryClient = useQueryClient()
    const [isDeleting, setIsDeleting] = useState(false)
    const [workout, setWorkout] = useState<Workout | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const { id } = use(params)

    useEffect(() => {
        const fetchWorkout = async () => {
            setLoading(true)
            const result = await getWorkoutById(id)
            if (result.success) {
                setWorkout(result.data!)
            } else {
                setError(result.error)
            }
            setLoading(false)
        }

        fetchWorkout()
    }, [id])

    if (loading)
        return (
            <Box style={{ backgroundColor: theme.bg, minHeight: '100vh' }}>
                <Box px={{ base: 'md', sm: 'lg', md: 'xl' }} py={{ base: 'lg', md: 'xl' }}>
                    <Stack>
                        {/* Header Skeleton */}
                        <Group justify="space-between" align="center">
                            <Group gap="md">
                                <Skeleton height={48} width={48} radius="md" />
                                <Stack gap={8}>
                                    <Skeleton height={32} width={200} radius="sm" />
                                    <Skeleton height={20} width={150} radius="sm" />
                                </Stack>
                            </Group>
                            <Skeleton height={36} width={100} radius="md" />
                        </Group>

                        {/* Stats Cards Skeleton */}
                        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
                            {[1, 2, 3].map((i) => (
                                <Card
                                    key={i}
                                    style={{
                                        backgroundColor: theme.cardBg,
                                        border: `1px solid ${theme.border}`,
                                        borderRadius: rem(12),
                                    }}
                                    padding="lg"
                                >
                                    <Group align="center" gap="md">
                                        <Skeleton height={48} width={48} radius="md" />
                                        <Stack gap={8} style={{ flex: 1 }}>
                                            <Skeleton height={14} width="60%" radius="sm" />
                                            <Skeleton height={24} width="40%" radius="sm" />
                                        </Stack>
                                    </Group>
                                </Card>
                            ))}
                        </SimpleGrid>

                        {/* Exercises Skeleton */}
                        <Card
                            style={{
                                backgroundColor: theme.cardBg,
                                border: `1px solid ${theme.border}`,
                                borderRadius: rem(12),
                            }}
                            shadow="sm"
                        >
                            <Stack gap="xl">
                                <Skeleton height={20} width={120} radius="sm" />

                                {[1, 2].map((i) => (
                                    <Card
                                        key={i}
                                        style={{
                                            backgroundColor: theme.bg,
                                            border: `1px solid ${theme.border}`,
                                            borderRadius: rem(12),
                                        }}
                                        padding="lg"
                                    >
                                        <Stack gap="md">
                                            <Group justify="space-between">
                                                <Skeleton height={28} width={100} radius="md" />
                                                <Skeleton height={20} width={120} radius="sm" />
                                            </Group>
                                            <Stack gap="xs">
                                                {[1, 2, 3].map((j) => (
                                                    <Skeleton
                                                        key={j}
                                                        height={40}
                                                        width="100%"
                                                        radius="md"
                                                    />
                                                ))}
                                            </Stack>
                                        </Stack>
                                    </Card>
                                ))}
                            </Stack>
                        </Card>
                    </Stack>
                </Box>
            </Box>
        )

    if (error || !workout)
        return (
            <Box style={{ backgroundColor: theme.bg, minHeight: '100vh' }}>
                <Center style={{ minHeight: '80vh' }}>
                    <Stack align="center" gap="xl" px="md">
                        <Box
                            style={{
                                width: rem(120),
                                height: rem(120),
                                borderRadius: rem(24),
                                backgroundColor: isDark
                                    ? 'rgba(250, 82, 82, 0.1)'
                                    : 'rgba(250, 82, 82, 0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <AlertCircle size={56} color="#fa5252" strokeWidth={1.5} />
                        </Box>
                        <Stack gap="sm" align="center">
                            <Title order={2} style={{ color: theme.text, fontWeight: 800 }}>
                                Workout Not Found
                            </Title>
                            <Text
                                size="lg"
                                style={{
                                    color: theme.textSecondary,
                                    textAlign: 'center',
                                    maxWidth: rem(500),
                                }}
                            >
                                The workout you're looking for doesn't exist or you don't have
                                permission to view it.
                            </Text>
                        </Stack>
                        <Button
                            component={Link}
                            href="/athlete/workouts"
                            size="lg"
                            leftSection={<ArrowLeft size={20} />}
                            style={{
                                backgroundColor: theme.secondary,
                                color: '#FFFFFF',
                                marginTop: rem(16),
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
                            Back to Workouts
                        </Button>
                    </Stack>
                </Center>
            </Box>
        )

    const handleDelete = () => {
        modals.openConfirmModal({
            title: 'Delete Workout',
            centered: true,
            children: (
                <Text size="sm" c={theme.textSecondary}>
                    Are you sure you want to delete this workout? This action cannot be undone.
                </Text>
            ),
            labels: { confirm: 'Delete', cancel: 'Cancel' },
            confirmProps: {
                color: 'red',
                loading: isDeleting,
                style: { backgroundColor: '#fa5252' },
            },
            cancelProps: {
                style: {
                    borderColor: theme.border,
                    color: theme.text,
                },
            },
            onConfirm: async () => {
                setIsDeleting(true)
                try {
                    const result = await deleteWorkout(workout?.id.toString())

                    if (result.success) {
                        toast.success('Workout deleted successfully')
                        router.push('/athlete/workouts')
                        router.refresh()
                    } else {
                        toast.error(result.error || 'Failed to delete workout')
                    }
                } catch (error) {
                    toast.error('An unexpected error occurred')
                } finally {
                    setIsDeleting(false)
                }
            },
            onCancel: () => {
                console.log('Deletion cancelled')
            },
        })
    }

    return (
        <Box style={{ backgroundColor: theme.bg, minHeight: '100vh' }}>
            <Box px={{ base: 'md', sm: 'lg', md: 'xl' }} py={{ base: 'lg', md: 'xl' }}>
                <Stack>
                    {/* Header */}
                    <Group justify="space-between" align="center" wrap="wrap" gap="md">
                        <Group gap="md">
                            <ActionIcon
                                component={Link}
                                href="/athlete/workouts"
                                variant="subtle"
                                size="xl"
                                radius="md"
                                style={{
                                    color: theme.textSecondary,
                                    backgroundColor: theme.cardBg,
                                    border: `1px solid ${theme.border}`,
                                }}
                                styles={{
                                    root: {
                                        '&:hover': {
                                            backgroundColor: theme.bg,
                                        },
                                    },
                                }}
                            >
                                <ArrowLeft size={20} />
                            </ActionIcon>
                            <Stack gap={4}>
                                <Title order={1} style={{ color: theme.text, fontWeight: 800 }}>
                                    Workout Details 
                                </Title>
                                <Group gap="xs">
                                    <Box
                                        style={{
                                            width: rem(20),
                                            height: rem(20),
                                            borderRadius: rem(4),
                                            backgroundColor: isDark
                                                ? 'rgba(0, 210, 255, 0.1)'
                                                : 'rgba(0, 210, 255, 0.08)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Calendar size={12} color={theme.secondary} />
                                    </Box>
                                    <Text style={{ color: theme.textSecondary }}>
                                        {formatDate(workout?.date)}
                                    </Text>
                                </Group>
                            </Stack>
                        </Group>

                        <Button
                            onClick={handleDelete}
                            loading={isDeleting}
                            color="red"
                            variant="light"
                            size="md"
                            leftSection={<Trash2 size={16} />}
                            style={{
                                backgroundColor: isDark
                                    ? 'rgba(250, 82, 82, 0.1)'
                                    : 'rgba(250, 82, 82, 0.08)',
                            }}
                        >
                            Delete
                        </Button>
                    </Group>

                    {/* Workout Stats */}
                    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={{ base: 'sm', md: 'md' }}>
                        <Card
                            style={{
                                backgroundColor: theme.cardBg,
                                border: `1px solid ${theme.border}`,
                                borderRadius: rem(12),
                                transition: 'all 0.2s ease',
                            }}
                            padding="lg"
                            shadow="sm"
                            styles={{
                                root: {
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: isDark
                                            ? '0 8px 16px rgba(0, 0, 0, 0.3)'
                                            : '0 8px 16px rgba(0, 0, 0, 0.1)',
                                    },
                                },
                            }}
                        >
                            <Stack gap="md">
                                <Box
                                    style={{
                                        width: rem(48),
                                        height: rem(48),
                                        borderRadius: rem(12),
                                        backgroundColor: isDark
                                            ? 'rgba(0, 210, 255, 0.1)'
                                            : 'rgba(0, 210, 255, 0.08)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Dumbbell size={24} color={theme.secondary} strokeWidth={2} />
                                </Box>
                                <Stack gap={4}>
                                    <Text size="sm" fw={500} style={{ color: theme.textSecondary }}>
                                        Total Volume
                                    </Text>
                                    <Text
                                        size={rem(28)}
                                        fw={900}
                                        style={{ color: theme.text, lineHeight: 1 }}
                                    >
                                        {workout?.totalVolume} kg
                                    </Text>
                                </Stack>
                            </Stack>
                        </Card>

                        <Card
                            style={{
                                backgroundColor: theme.cardBg,
                                border: `1px solid ${theme.border}`,
                                borderRadius: rem(12),
                                transition: 'all 0.2s ease',
                            }}
                            padding="lg"
                            shadow="sm"
                            styles={{
                                root: {
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: isDark
                                            ? '0 8px 16px rgba(0, 0, 0, 0.3)'
                                            : '0 8px 16px rgba(0, 0, 0, 0.1)',
                                    },
                                },
                            }}
                        >
                            <Stack gap="md">
                                <Box
                                    style={{
                                        width: rem(48),
                                        height: rem(48),
                                        borderRadius: rem(12),
                                        backgroundColor: isDark
                                            ? 'rgba(0, 210, 255, 0.1)'
                                            : 'rgba(0, 210, 255, 0.08)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Repeat size={24} color={theme.secondary} strokeWidth={2} />
                                </Box>
                                <Stack gap={4}>
                                    <Text size="sm" fw={500} style={{ color: theme.textSecondary }}>
                                        Exercises
                                    </Text>
                                    <Text
                                        size={rem(28)}
                                        fw={900}
                                        style={{ color: theme.text, lineHeight: 1 }}
                                    >
                                        {workout?.exercises?.length || 0}
                                    </Text>
                                </Stack>
                            </Stack>
                        </Card>

                        <Card
                            style={{
                                backgroundColor: theme.cardBg,
                                border: `1px solid ${theme.border}`,
                                borderRadius: rem(12),
                                transition: 'all 0.2s ease',
                            }}
                            padding="lg"
                            shadow="sm"
                            styles={{
                                root: {
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: isDark
                                            ? '0 8px 16px rgba(0, 0, 0, 0.3)'
                                            : '0 8px 16px rgba(0, 0, 0, 0.1)',
                                    },
                                },
                            }}
                        >
                            <Stack gap="md">
                                <Box
                                    style={{
                                        width: rem(48),
                                        height: rem(48),
                                        borderRadius: rem(12),
                                        backgroundColor: isDark
                                            ? 'rgba(0, 210, 255, 0.1)'
                                            : 'rgba(0, 210, 255, 0.08)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Target size={24} color={theme.secondary} strokeWidth={2} />
                                </Box>
                                <Stack gap={4}>
                                    <Text size="sm" fw={500} style={{ color: theme.textSecondary }}>
                                        Total Sets
                                    </Text>
                                    <Text
                                        size={rem(28)}
                                        fw={900}
                                        style={{ color: theme.text, lineHeight: 1 }}
                                    >
                                        {workout?.exercises?.reduce(
                                            (total, ex) => total + (ex.sets?.length || 0),
                                            0,
                                        )}
                                    </Text>
                                </Stack>
                            </Stack>
                        </Card>
                    </SimpleGrid>

                    {/* Main Content */}
                    <Card
                        style={{
                            backgroundColor: theme.cardBg,
                            border: `1px solid ${theme.border}`,
                            borderRadius: rem(12),
                        }}
                        shadow="sm"
                    >
                        <Stack gap="xl">
                            <Divider
                                label={
                                    <Group gap="xs">
                                        <Box
                                            style={{
                                                width: rem(24),
                                                height: rem(24),
                                                borderRadius: rem(6),
                                                backgroundColor: isDark
                                                    ? 'rgba(0, 210, 255, 0.1)'
                                                    : 'rgba(0, 210, 255, 0.08)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Dumbbell size={14} color={theme.secondary} />
                                        </Box>
                                        <Text size="sm" fw={700} style={{ color: theme.text }}>
                                            Exercises
                                        </Text>
                                    </Group>
                                }
                                labelPosition="left"
                            />

                            {/* Exercises List */}
                            <Stack gap="md">
                                {workout?.exercises?.map((exercise: any, index: number) => (
                                    <Card
                                        key={exercise.id}
                                        style={{
                                            backgroundColor: theme.bg,
                                            border: `1px solid ${theme.border}`,
                                            borderRadius: rem(12),
                                        }}
                                        padding="lg"
                                    >
                                        <Stack gap="lg">
                                            <Group justify="space-between" align="center">
                                                <Badge
                                                    size="lg"
                                                    variant="light"
                                                    style={{
                                                        backgroundColor: isDark
                                                            ? 'rgba(0, 210, 255, 0.1)'
                                                            : 'rgba(0, 210, 255, 0.08)',
                                                        color: theme.secondary,
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Exercise {index + 1}
                                                </Badge>
                                                <Text
                                                    size="lg"
                                                    fw={700}
                                                    style={{ color: theme.text }}
                                                >
                                                    {exercise.exercise?.name}
                                                </Text>
                                            </Group>

                                            {/* Sets Table */}
                                            <Box>
                                                <Group
                                                    style={{
                                                        backgroundColor: theme.cardBg,
                                                        padding: rem(12),
                                                        borderRadius: `${rem(8)} ${rem(8)} 0 0`,
                                                        borderBottom: `2px solid ${theme.border}`,
                                                    }}
                                                >
                                                    <Text
                                                        size="sm"
                                                        fw={700}
                                                        style={{ flex: 0.5, color: theme.text }}
                                                    >
                                                        Set
                                                    </Text>
                                                    <Text
                                                        size="sm"
                                                        fw={700}
                                                        style={{ flex: 1, color: theme.text }}
                                                    >
                                                        <Group gap={4}>
                                                            <Weight
                                                                size={14}
                                                                color={theme.secondary}
                                                            />
                                                            Weight
                                                        </Group>
                                                    </Text>
                                                    <Text
                                                        size="sm"
                                                        fw={700}
                                                        style={{ flex: 1, color: theme.text }}
                                                    >
                                                        <Group gap={4}>
                                                            <Repeat
                                                                size={14}
                                                                color={theme.secondary}
                                                            />
                                                            Reps
                                                        </Group>
                                                    </Text>
                                                    <Text
                                                        size="sm"
                                                        fw={700}
                                                        style={{ flex: 1, color: theme.text }}
                                                    >
                                                        <Group gap={4}>
                                                            <Target
                                                                size={14}
                                                                color={theme.secondary}
                                                            />
                                                            RPE
                                                        </Group>
                                                    </Text>
                                                </Group>
                                                {exercise.sets?.map(
                                                    (set: any, setIndex: number) => (
                                                        <Group
                                                            key={setIndex}
                                                            style={{
                                                                padding: rem(12),
                                                                borderBottom: `1px solid ${theme.border}`,
                                                                backgroundColor:
                                                                    setIndex % 2 === 0
                                                                        ? 'transparent'
                                                                        : isDark
                                                                          ? 'rgba(255, 255, 255, 0.02)'
                                                                          : 'rgba(0, 0, 0, 0.01)',
                                                            }}
                                                        >
                                                            <Badge
                                                                size="md"
                                                                variant="light"
                                                                style={{
                                                                    flex: 0.5,
                                                                    backgroundColor: isDark
                                                                        ? 'rgba(0, 210, 255, 0.1)'
                                                                        : 'rgba(0, 210, 255, 0.08)',
                                                                    color: theme.secondary,
                                                                }}
                                                            >
                                                                {setIndex + 1}
                                                            </Badge>
                                                            <Text
                                                                size="sm"
                                                                fw={600}
                                                                style={{
                                                                    flex: 1,
                                                                    color: theme.text,
                                                                }}
                                                            >
                                                                {set.weight} kg
                                                            </Text>
                                                            <Text
                                                                size="sm"
                                                                fw={600}
                                                                style={{
                                                                    flex: 1,
                                                                    color: theme.text,
                                                                }}
                                                            >
                                                                {set.reps}
                                                            </Text>
                                                            <Text
                                                                size="sm"
                                                                fw={600}
                                                                style={{
                                                                    flex: 1,
                                                                    color: theme.text,
                                                                }}
                                                            >
                                                                {set.rpe || '-'}
                                                            </Text>
                                                        </Group>
                                                    ),
                                                )}
                                            </Box>

                                            {exercise.notes && (
                                                <Box
                                                    style={{
                                                        backgroundColor: theme.cardBg,
                                                        padding: rem(12),
                                                        borderRadius: rem(8),
                                                        border: `1px solid ${theme.border}`,
                                                    }}
                                                >
                                                    <Group gap="xs" mb="xs">
                                                        <FileText
                                                            size={14}
                                                            color={theme.secondary}
                                                        />
                                                        <Text
                                                            size="sm"
                                                            fw={600}
                                                            style={{ color: theme.text }}
                                                        >
                                                            Notes:
                                                        </Text>
                                                    </Group>
                                                    <Text
                                                        size="sm"
                                                        style={{ color: theme.textSecondary }}
                                                    >
                                                        {exercise.notes}
                                                    </Text>
                                                </Box>
                                            )}
                                        </Stack>
                                    </Card>
                                ))}
                            </Stack>

                            {workout?.notes && (
                                <>
                                    <Divider />
                                    <Box
                                        style={{
                                            backgroundColor: theme.bg,
                                            padding: rem(16),
                                            borderRadius: rem(12),
                                            border: `1px solid ${theme.border}`,
                                        }}
                                    >
                                        <Group gap="xs" mb="sm">
                                            <Box
                                                style={{
                                                    width: rem(28),
                                                    height: rem(28),
                                                    borderRadius: rem(6),
                                                    backgroundColor: isDark
                                                        ? 'rgba(0, 210, 255, 0.1)'
                                                        : 'rgba(0, 210, 255, 0.08)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <FileText size={14} color={theme.secondary} />
                                            </Box>
                                            <Text fw={700} style={{ color: theme.text }}>
                                                Workout Notes
                                            </Text>
                                        </Group>
                                        <Text style={{ color: theme.textSecondary }}>
                                            {workout?.notes}
                                        </Text>
                                    </Box>
                                </>
                            )}
                        </Stack>
                    </Card>
                </Stack>
            </Box>
        </Box>
    )
}
