'use client'

import { useAppTheme } from '@/hooks/useAppTheme'
import { useAuth } from '@/contexts/AuthContext'
import {
    Container,
    Title,
    Text,
    Button,
    Group,
    Stack,
    Card,
    Box,
    TextInput,
    NumberInput,
    Select,
    Textarea,
    Divider,
    ActionIcon,
    rem,
    Paper,
    Loader,
    Badge,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    Dumbbell,
    ArrowLeft,
    Plus,
    Trash2,
    Calendar,
    Weight,
    Repeat,
    Target,
    Save,
    X,
    Search,
    FileText,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from '@/components/ui/Toaster'
import { z } from 'zod'
import { ExerciseEntry, Set } from '@/types/exercises.type'
import { ExerciseCard } from '@/components/dashboard/exercises/add-exercises-card'
import { createWorkout } from '@/services/server/workout.server'

const workoutSchema = z.object({
    date: z.string().min(1, 'Date is required'),
    notes: z.string().optional(),
})

export default function CreateWorkoutPage() {
    const { theme, isDark } = useAppTheme()
    const { user } = useAuth()
    const queryClient = useQueryClient()
    const router = useRouter()
    const [isWorkoutCreationLoading, setIsWorkoutCreationLoading] = useState(false)
    const [selectedExercises, setSelectedExercises] = useState<ExerciseEntry[]>([
        { exerciseId: null, sets: [{ weight: null, reps: null, rpe: null }] },
    ])

    const form = useForm({
        initialValues: {
            date: new Date().toISOString().split('T')[0],
            notes: '',
        },
        validate: zodResolver(workoutSchema),
    })

    const addExercise = () => {
        setSelectedExercises([
            ...selectedExercises,
            { exerciseId: null, sets: [{ weight: null, reps: null, rpe: null }] },
        ])
    }

    const removeExercise = (index: number) => {
        setSelectedExercises(selectedExercises.filter((_, i) => i !== index))
    }

    const addSet = (exerciseIndex: number) => {
        const updated = [...selectedExercises]
        updated[exerciseIndex].sets.push({ weight: null, reps: null, rpe: null })
        setSelectedExercises(updated)
    }

    const removeSet = (exerciseIndex: number, setIndex: number) => {
        const updated = [...selectedExercises]
        updated[exerciseIndex].sets = updated[exerciseIndex].sets.filter((_, i) => i !== setIndex)
        setSelectedExercises(updated)
    }

    const updateSet = (
        exerciseIndex: number,
        setIndex: number,
        field: keyof Set,
        value: number | null,
    ) => {
        const updated = [...selectedExercises]
        updated[exerciseIndex].sets[setIndex][field] = value
        setSelectedExercises(updated)
    }

    const updateExercise = (exerciseIndex: number, exerciseId: number | null) => {
        const updated = [...selectedExercises]
        updated[exerciseIndex].exerciseId = exerciseId
        setSelectedExercises(updated)
    }

    const handleSubmit = async () => {
        // Validate form
        const formValidation = form.validate()
        if (formValidation.hasErrors) return

        // Validate exercises
        let hasErrors = false
        selectedExercises.forEach((exercise, exIndex) => {
            if (!exercise.exerciseId) {
                toast.error(`Exercise ${exIndex + 1}: Please select an exercise`)
                hasErrors = true
                return
            }

            exercise.sets.forEach((set, setIndex) => {
                if (set.weight && set.weight < 0.5) {
                    toast.error(
                        `Exercise ${exIndex + 1}, Set ${setIndex + 1}: Weight must be at least 0.5`,
                    )
                    hasErrors = true
                }
                if (set.reps && set.reps < 1) {
                    toast.error(
                        `Exercise ${exIndex + 1}, Set ${setIndex + 1}: Reps must be at least 1`,
                    )
                    hasErrors = true
                }
                if (set.rpe && (set.rpe < 1 || set.rpe > 10)) {
                    toast.error(
                        `Exercise ${exIndex + 1}, Set ${setIndex + 1}: RPE must be between 1 and 10`,
                    )
                    hasErrors = true
                }
            })
        })

        if (hasErrors) return

        // Filter out exercises with no selection
        const validExercises = selectedExercises
            .filter((ex) => ex.exerciseId)
            .map((ex) => ({
                exercise: ex.exerciseId,
                sets: ex.sets
                    .filter((s) => s.weight && s.reps)
                    .map((s) => ({
                        weight: s.weight,
                        reps: s.reps,
                        rpe: s.rpe || undefined,
                    })),
                notes: ex.notes,
            }))
            .filter((ex) => ex.sets.length > 0)

        if (validExercises.length === 0) {
            toast.error('Add at least one exercise with sets')
            return
        }

        const workoutData = {
            user: user?.id,
            date: form.values.date,
            exercises: validExercises,
            notes: form.values.notes || undefined,
        }
        setIsWorkoutCreationLoading(true)

        const { success, error } = await createWorkout(workoutData)
        if (success) {
            toast.success('Workout logged successfully!')
            await queryClient.invalidateQueries({
                queryKey: ['workouts'],
            })

            router.push('/athlete/workouts')
            router.refresh()
        } else {
            toast.error(error)
        }
        setIsWorkoutCreationLoading(false)
    }

    return (
        <Box style={{ backgroundColor: theme.bg, minHeight: '100vh' }}>
            <Box px={{ base: 'md', sm: 'lg', md: 'xl' }} py={{ base: 'lg', md: 'xl' }}>
                <Stack>
                    {/* Header */}
                    <Box>
                        <Group gap="md" mb="md">
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
                                    Log Workout
                                </Title>
                                <Text
                                    // size={{ base: 'sm', sm: 'md' }}
                                    style={{ color: theme.textSecondary }}
                                >
                                    Record your training session and track your progress
                                </Text>
                            </Stack>
                        </Group>
                    </Box>

                    {/* Main Form */}
                    <Card
                        style={{
                            backgroundColor: theme.cardBg,
                            border: `1px solid ${theme.border}`,
                            borderRadius: rem(12),
                        }}
                        // padding={{ base: 'md', sm: 'xl' }}
                        shadow="sm"
                    >
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSubmit()
                            }}
                        >
                            <Stack gap="xl">
                                {/* Date Section */}
                                <Box>
                                    <Group gap="xs" mb="sm">
                                        <Box
                                            style={{
                                                width: rem(32),
                                                height: rem(32),
                                                borderRadius: rem(8),
                                                backgroundColor: isDark
                                                    ? 'rgba(0, 210, 255, 0.1)'
                                                    : 'rgba(0, 210, 255, 0.08)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Calendar size={16} color={theme.secondary} />
                                        </Box>
                                        <Text fw={600} style={{ color: theme.text }}>
                                            Workout Date
                                        </Text>
                                    </Group>
                                    <TextInput
                                        type="date"
                                        size="md"
                                        required
                                        {...form.getInputProps('date')}
                                        styles={{
                                            input: {
                                                backgroundColor: theme.bg,
                                                borderColor: theme.border,
                                                color: theme.text,
                                                borderRadius: rem(8),
                                                fontWeight: 500,
                                            },
                                        }}
                                    />
                                </Box>
                                <Divider
                                    label={
                                        <Group gap="xs">
                                            <Dumbbell size={16} color={theme.secondary} />
                                            <Text size="sm" fw={600} style={{ color: theme.text }}>
                                                Exercises
                                            </Text>
                                        </Group>
                                    }
                                    labelPosition="left"
                                />
                                {/* Exercises */}
                                <Stack gap="md">
                                    {selectedExercises.map((exercise, exerciseIndex) => (
                                        <ExerciseCard
                                            key={exerciseIndex}
                                            exercise={exercise}
                                            exerciseIndex={exerciseIndex}
                                            totalExercises={selectedExercises.length}
                                            theme={theme}
                                            isDark={isDark}
                                            onRemove={removeExercise}
                                            onUpdateExercise={updateExercise}
                                            onAddSet={addSet}
                                            onRemoveSet={removeSet}
                                            onUpdateSet={updateSet}
                                            onUpdateNotes={(index, notes) => {
                                                const updated = [...selectedExercises]
                                                updated[index].notes = notes
                                                setSelectedExercises(updated)
                                            }}
                                        />
                                    ))}
                                </Stack>
                                {/* Add Exercise Button */}
                                <Button
                                    onClick={addExercise}
                                    variant="light"
                                    leftSection={<Plus size={18} />}
                                    size="md"
                                    fullWidth
                                    style={{
                                        color: theme.secondary,
                                        backgroundColor: isDark
                                            ? 'rgba(0, 210, 255, 0.1)'
                                            : 'rgba(0, 210, 255, 0.08)',
                                        borderRadius: rem(8),
                                    }}
                                    styles={{
                                        root: {
                                            '&:hover': {
                                                backgroundColor: isDark
                                                    ? 'rgba(0, 210, 255, 0.15)'
                                                    : 'rgba(0, 210, 255, 0.12)',
                                            },
                                        },
                                    }}
                                >
                                    Add Another Exercise
                                </Button>
                                <Divider />
                                {/* Workout Notes */}
                                <Box>
                                    <Group gap="xs" mb="sm">
                                        <Box
                                            style={{
                                                width: rem(32),
                                                height: rem(32),
                                                borderRadius: rem(8),
                                                backgroundColor: isDark
                                                    ? 'rgba(0, 210, 255, 0.1)'
                                                    : 'rgba(0, 210, 255, 0.08)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <FileText size={16} color={theme.secondary} />
                                        </Box>
                                        <Text fw={600} style={{ color: theme.text }}>
                                            Workout Notes (Optional)
                                        </Text>
                                    </Group>
                                    <Textarea
                                        placeholder="How did you feel? Any observations about this session..."
                                        minRows={3}
                                        size="md"
                                        {...form.getInputProps('notes')}
                                        styles={{
                                            input: {
                                                backgroundColor: theme.bg,
                                                borderColor: theme.border,
                                                color: theme.text,
                                                borderRadius: rem(8),
                                            },
                                        }}
                                    />
                                </Box>
                                {/* Submit Buttons */}
                                <Group justify="flex-end" mt="md" gap="sm">
                                    <Button
                                        variant="outline"
                                        component={Link}
                                        href="/athlete/workouts"
                                        size="md"
                                        style={{
                                            borderColor: theme.border,
                                            color: theme.text,
                                            borderRadius: rem(8),
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        loading={isWorkoutCreationLoading}
                                        leftSection={<Save size={18} />}
                                        size="md"
                                        style={{
                                            backgroundColor: theme.secondary,
                                            color: '#FFFFFF',
                                            borderRadius: rem(8),
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
                            </Stack>
                        </form>
                    </Card>
                </Stack>
            </Box>
        </Box>
    )
}
