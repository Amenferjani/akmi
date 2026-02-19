'use client'

import {
    Button,
    Group,
    Stack,
    TextInput,
    Select,
    NumberInput,
    Textarea,
    Divider,
    rem,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { z } from 'zod'
import { ArrowRight, Ruler, Target } from 'lucide-react'
import { useAppTheme } from '@/hooks/useAppTheme'

// Schema for athlete profile step
const athleteProfileSchema = z.object({
    weightClass: z.string().min(1, 'Weight class is required'),
    experienceLevel: z.enum(['beginner', 'intermediate', 'advanced'], {
        errorMap: () => ({ message: 'Please select an experience level' }),
    }),
    goals: z.string().min(10, 'Goals must be at least 10 characters'),
    currentPRs: z.object({
        squat: z.number().nullable().optional(),
        bench: z.number().nullable().optional(),
        deadlift: z.number().nullable().optional(),
    }),
})

type AthleteProfileFormValues = z.infer<typeof athleteProfileSchema>

interface AthleteProfileStepProps {
    onSubmit: (data: AthleteProfileFormValues) => void
    onBack: () => void
    loading: boolean
}

export function AthleteProfileStep({
    onSubmit,
    onBack,
    loading,
}: AthleteProfileStepProps) {
        const { theme, isDark } = useAppTheme()

    const form = useForm<AthleteProfileFormValues>({
        validate: zodResolver(athleteProfileSchema),
        initialValues: {
            weightClass: '',
            experienceLevel: 'beginner',
            goals: '',
            currentPRs: {
                squat: null,
                bench: null,
                deadlift: null,
            },
        },
    })

    const handleSubmit = (values: AthleteProfileFormValues) => {
        onSubmit(values)
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack
                // gap={{ base: 'md', sm: 'lg' }}
                mt="xl"
            >
                <TextInput
                    label="Weight Class"
                    placeholder="e.g., 83kg, 181lbs"
                    leftSection={<Ruler size={16} />}
                    withAsterisk
                    size="md"
                    {...form.getInputProps('weightClass')}
                    styles={{
                        input: {
                            backgroundColor: theme.bg,
                            borderColor: theme.border,
                            color: theme.text,
                        },
                    }}
                />

                <Select
                    label="Experience Level"
                    placeholder="Select your level"
                    data={[
                        { value: 'beginner', label: 'Beginner (0-2 years)' },
                        { value: 'intermediate', label: 'Intermediate (2-5 years)' },
                        { value: 'advanced', label: 'Advanced (5+ years)' },
                    ]}
                    withAsterisk
                    size="md"
                    {...form.getInputProps('experienceLevel')}
                    styles={{
                        input: {
                            backgroundColor: theme.bg,
                            borderColor: theme.border,
                            color: theme.text,
                        },
                    }}
                />

                <Textarea
                    label="Goals"
                    placeholder="What do you want to achieve? (e.g., compete in my first meet, hit a 500lb deadlift...)"
                    leftSection={<Target size={16} />}
                    withAsterisk
                    minRows={4}
                    size="md"
                    {...form.getInputProps('goals')}
                    styles={{
                        input: {
                            backgroundColor: theme.bg,
                            borderColor: theme.border,
                            color: theme.text,
                        },
                    }}
                />

                <Divider label="Current PRs (Optional)" labelPosition="center" />

                <Group grow>
                    <NumberInput
                        label="Squat"
                        placeholder="0"
                        min={0}
                        size="md"
                        {...form.getInputProps('currentPRs.squat')}
                        styles={{
                            input: {
                                backgroundColor: theme.bg,
                                borderColor: theme.border,
                                color: theme.text,
                            },
                        }}
                    />
                    <NumberInput
                        label="Bench"
                        placeholder="0"
                        min={0}
                        size="md"
                        {...form.getInputProps('currentPRs.bench')}
                        styles={{
                            input: {
                                backgroundColor: theme.bg,
                                borderColor: theme.border,
                                color: theme.text,
                            },
                        }}
                    />
                    <NumberInput
                        label="Deadlift"
                        placeholder="0"
                        min={0}
                        size="md"
                        {...form.getInputProps('currentPRs.deadlift')}
                        styles={{
                            input: {
                                backgroundColor: theme.bg,
                                borderColor: theme.border,
                                color: theme.text,
                            },
                        }}
                    />
                </Group>

                <Group justify="space-between" mt="lg">
                    <Button variant="subtle" onClick={onBack} size="md">
                        Back
                    </Button>
                    <Button
                        type="submit"
                        loading={loading}
                        size="md"
                        style={{
                            backgroundColor: theme.secondary,
                            color: '#FFFFFF',
                        }}
                        rightSection={<ArrowRight size={16} />}
                    >
                        Create Account
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}
