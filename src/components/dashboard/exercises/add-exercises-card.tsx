// components/workouts/ExerciseCard.tsx
'use client'

import {
    Card,
    Group,
    Stack,
    Badge,
    ActionIcon,
    Box,
    Text,
    Button,
    NumberInput,
    Textarea,
    rem,
} from '@mantine/core'
import {
    Trash2,
    Plus,
    X,
    Repeat,
    Weight,
    Target,
    FileText,
} from 'lucide-react'
import type { Exercise } from '@/payload-types'
import { ExerciseSearchSelector } from './exercise-search-selector'

interface Set {
    weight: number | null
    reps: number | null
    rpe?: number | null
}

interface ExerciseEntry {
    exerciseId: number | null
    exerciseName?: string
    sets: Set[]
    notes?: string
}

interface ExerciseCardProps {
    exercise: ExerciseEntry
    exerciseIndex: number
    totalExercises: number
    theme: any
    isDark: boolean
    onRemove: (index: number) => void
    onUpdateExercise: (index: number, exerciseId: number | null) => void
    onAddSet: (index: number) => void
    onRemoveSet: (exerciseIndex: number, setIndex: number) => void
    onUpdateSet: (exerciseIndex: number, setIndex: number, field: keyof Set, value: number | null) => void
    onUpdateNotes: (index: number, notes: string) => void
}

export function ExerciseCard({
    exercise,
    exerciseIndex,
    totalExercises,
    theme,
    isDark,
    onRemove,
    onUpdateExercise,
    onAddSet,
    onRemoveSet,
    onUpdateSet,
    onUpdateNotes,
}: ExerciseCardProps) {
    return (
        <Card
            style={{
                backgroundColor: theme.bg,
                border: `1px solid ${theme.border}`,
                borderRadius: rem(12),
            }}
        >
            <Stack gap="lg">
                {/* Exercise Header */}
                <Group justify="space-between" align="flex-start">
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
                        Exercise {exerciseIndex + 1}
                    </Badge>
                    {totalExercises > 1 && (
                        <ActionIcon
                            onClick={() => onRemove(exerciseIndex)}
                            color="red"
                            variant="subtle"
                            size="lg"
                            radius="md"
                        >
                            <Trash2 size={18} />
                        </ActionIcon>
                    )}
                </Group>

                {/* Exercise Search */}
                <ExerciseSearchSelector
                    exerciseIndex={exerciseIndex}
                    exercise={exercise}
                    updateExercise={(exerciseIndex,exerciseId: number | null) => onUpdateExercise(exerciseIndex, exerciseId)}
                />

                {/* Sets Section */}
                <Box>
                    <Group justify="space-between" mb="sm">
                        <Group gap="xs">
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
                                <Repeat size={14} color={theme.secondary} />
                            </Box>
                            <Text size="sm" fw={600} style={{ color: theme.text }}>
                                Sets
                            </Text>
                        </Group>
                        <Button
                            variant="subtle"
                            size="xs"
                            onClick={() => onAddSet(exerciseIndex)}
                            leftSection={<Plus size={14} />}
                            style={{ color: theme.secondary }}
                        >
                            Add Set
                        </Button>
                    </Group>

                    <Stack gap="sm">
                        {exercise.sets.map((set, setIndex) => (
                            <Card
                                key={setIndex}
                                style={{
                                    backgroundColor: theme.cardBg,
                                    border: `1px solid ${theme.border}`,
                                    borderRadius: rem(8),
                                }}
                                padding="sm"
                            >
                                <Group align="flex-end" gap="xs" wrap="nowrap">
                                    <Text
                                        size="sm"
                                        fw={700}
                                        style={{
                                            color: theme.textSecondary,
                                            minWidth: rem(20),
                                            marginBottom: rem(8),
                                        }}
                                    >
                                        {setIndex + 1}
                                    </Text>
                                    <NumberInput
                                        placeholder="Weight"
                                        min={0.5}
                                        step={0.5}
                                        value={set.weight || undefined}
                                        onChange={(val) =>
                                            onUpdateSet(
                                                exerciseIndex,
                                                setIndex,
                                                'weight',
                                                val as number,
                                            )
                                        }
                                        leftSection={<Weight size={14} />}
                                        style={{ flex: 1 }}
                                        required
                                        size="sm"
                                        styles={{
                                            input: {
                                                backgroundColor: theme.bg,
                                                borderColor: theme.border,
                                                color: theme.text,
                                                borderRadius: rem(6),
                                            },
                                        }}
                                    />
                                    <NumberInput
                                        placeholder="Reps"
                                        min={1}
                                        step={1}
                                        value={set.reps || undefined}
                                        onChange={(val) =>
                                            onUpdateSet(
                                                exerciseIndex,
                                                setIndex,
                                                'reps',
                                                val as number,
                                            )
                                        }
                                        leftSection={<Repeat size={14} />}
                                        style={{ flex: 1 }}
                                        required
                                        size="sm"
                                        styles={{
                                            input: {
                                                backgroundColor: theme.bg,
                                                borderColor: theme.border,
                                                color: theme.text,
                                                borderRadius: rem(6),
                                            },
                                        }}
                                    />
                                    <NumberInput
                                        placeholder="RPE"
                                        min={1}
                                        max={10}
                                        step={0.5}
                                        value={set.rpe || undefined}
                                        onChange={(val) =>
                                            onUpdateSet(
                                                exerciseIndex,
                                                setIndex,
                                                'rpe',
                                                val as number,
                                            )
                                        }
                                        leftSection={<Target size={14} />}
                                        style={{ flex: 1 }}
                                        size="sm"
                                        styles={{
                                            input: {
                                                backgroundColor: theme.bg,
                                                borderColor: theme.border,
                                                color: theme.text,
                                                borderRadius: rem(6),
                                            },
                                        }}
                                    />
                                    {exercise.sets.length > 1 && (
                                        <ActionIcon
                                            onClick={() => onRemoveSet(exerciseIndex, setIndex)}
                                            color="red"
                                            variant="subtle"
                                            size="md"
                                            radius="md"
                                            style={{
                                                marginBottom: rem(4),
                                            }}
                                        >
                                            <X size={14} />
                                        </ActionIcon>
                                    )}
                                </Group>
                            </Card>
                        ))}
                    </Stack>
                </Box>

                {/* Exercise Notes */}
                <Textarea
                    placeholder="Notes for this exercise (optional)"
                    value={exercise.notes || ''}
                    onChange={(e) => onUpdateNotes(exerciseIndex, e.target.value)}
                    minRows={2}
                    size="sm"
                    leftSection={<FileText size={14} />}
                    styles={{
                        input: {
                            backgroundColor: theme.cardBg,
                            borderColor: theme.border,
                            color: theme.text,
                            borderRadius: rem(8),
                        },
                    }}
                />
            </Stack>
        </Card>
    )
}