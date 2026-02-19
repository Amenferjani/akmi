import { useAppTheme } from "@/hooks/useAppTheme"
import { Workout } from "@/payload-types"
import { Badge, Box, Card, Group, rem, Stack, Text, Button } from "@mantine/core"
import { Calendar, Eye } from "lucide-react"
import Link from "next/link"
interface WorkoutItemProps {
    workout: Workout
    idx : number
}
export const WorkoutItem = ({ workout , idx }: WorkoutItemProps) => {
    const {theme , isDark} = useAppTheme()
    return (
        <Card
            key={idx}
            style={{
                backgroundColor: theme.bg,
                border: `1px solid ${theme.border}`,
                borderRadius: rem(8),
                transition: 'all 0.2s ease',
            }}
            padding="md"
        >
            <Group justify="space-between" mb="sm" align="center">
                <Group gap="xs">
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
                    <Text
                        fw={600}
                        style={{
                            color: theme.text,
                        }}
                    >
                        {new Date(workout.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </Text>
                </Group>
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
                    {workout.totalVolume} kg
                </Badge>
            </Group>

            <Stack gap={6} mb="md">
                {workout.exercises?.map((ex, i) => {
                    const exerciseName =
                        typeof ex.exercise === 'object' ? ex.exercise?.name : 'Exercise'

                    return (
                        <Group key={i} justify="space-between" wrap="nowrap">
                            <Text
                                size="sm"
                                style={{
                                    color: theme.text,
                                }}
                                truncate
                            >
                                • {exerciseName}
                            </Text>
                            <Text
                                size="sm"
                                style={{
                                    color: theme.textSecondary,
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {ex.sets
                                    ?.map((set: any) => `${set.weight}kg × ${set.reps}`)
                                    .join(', ')}
                            </Text>
                        </Group>
                    )
                })}
            </Stack>

            <Button
                component={Link}
                href={`/athlete/workouts/${workout.id}`}
                variant="light"
                fullWidth
                size="sm"
                leftSection={<Eye size={16} />}
                style={{
                    backgroundColor: isDark
                        ? 'rgba(0, 210, 255, 0.1)'
                        : 'rgba(0, 210, 255, 0.08)',
                    color: theme.secondary,
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
                View Details
            </Button>
        </Card>
    )
}