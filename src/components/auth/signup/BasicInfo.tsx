'use client'

import {
    Button,
    Group,
    Stack,
    Card,
    Box,
    TextInput,
    PasswordInput,
    Select,
    Textarea,
    Text,
    rem,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { z } from 'zod'
import { ArrowRight, Mail, Lock, User } from 'lucide-react'
import Link from 'next/link'
import { useAppTheme } from '@/hooks/useAppTheme'

// Schema for basic info step
const basicInfoSchema = z
    .object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string(),
        role: z.enum(['athlete', 'coach']),
        profile: z.object({
            firstName: z.string().min(1, 'First name is required'),
            lastName: z.string().min(1, 'Last name is required'),
            age: z.string().min(1, 'Age range is required'),
            bio: z.string().optional(),
        }),
        preferences: z.object({
            unitSystem: z.enum(['metric', 'imperial']),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    })

type BasicInfoFormValues = z.infer<typeof basicInfoSchema>

interface BasicInfoStepProps {
    onSubmit: (data: BasicInfoFormValues) => void
    initialRole: 'athlete' | 'coach'
    setSelectedRole: (role: 'athlete' | 'coach') => void
}

export function BasicInfoStep({ onSubmit, initialRole, setSelectedRole }: BasicInfoStepProps) {
    const { theme, isDark } = useAppTheme()

    const form = useForm<BasicInfoFormValues>({
        validate: zodResolver(basicInfoSchema),
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            role: initialRole,
            profile: {
                firstName: '',
                lastName: '',
                age: '',
                bio: '',
            },
            preferences: {
                unitSystem: 'metric',
            },
        },
    })

    const handleSubmit = (values: BasicInfoFormValues) => {
        onSubmit(values)
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack
                // gap={{ base: 'md', sm: 'lg' }}
                mt="xl"
            >
                {/* Role Selection */}
                <Box>
                    <Text size="sm" fw={600} mb="xs" style={{ color: theme.text }}>
                        I am a <span style={{ color: theme.secondary }}>*</span>
                    </Text>
                    <Group grow>
                        <Card
                            // padding={{ base: 'sm', sm: 'md' }}
                            style={{
                                cursor: 'pointer',
                                border:
                                    form.values.role === 'athlete'
                                        ? `2px solid ${theme.secondary}`
                                        : `1px solid ${theme.border}`,
                                backgroundColor:
                                    form.values.role === 'athlete'
                                        ? isDark
                                            ? 'rgba(0, 210, 255, 0.05)'
                                            : 'rgba(0, 210, 255, 0.03)'
                                        : 'transparent',
                                transition: 'all 0.2s ease',
                            }}
                            onClick={() => {
                                form.setFieldValue('role', 'athlete')
                                setSelectedRole('athlete')
                            }}
                        >
                            <Group gap="xs" justify="center">
                                <Box
                                    style={{
                                        width: rem(20),
                                        height: rem(20),
                                        borderRadius: '50%',
                                        border: `2px solid ${form.values.role === 'athlete' ? theme.secondary : theme.border}`,
                                        backgroundColor:
                                            form.values.role === 'athlete'
                                                ? theme.secondary
                                                : 'transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {form.values.role === 'athlete' && (
                                        <Box
                                            style={{
                                                width: rem(8),
                                                height: rem(8),
                                                borderRadius: '50%',
                                                backgroundColor: '#fff',
                                            }}
                                        />
                                    )}
                                </Box>
                                <Text
                                    fw={600}
                                    // size={{ base: 'sm', sm: 'md' }}
                                    style={{ color: theme.text }}
                                >
                                    Athlete
                                </Text>
                            </Group>
                        </Card>

                        <Card
                            // padding={{ base: 'sm', sm: 'md' }}
                            style={{
                                cursor: 'pointer',
                                border:
                                    form.values.role === 'coach'
                                        ? `2px solid ${theme.secondary}`
                                        : `1px solid ${theme.border}`,
                                backgroundColor:
                                    form.values.role === 'coach'
                                        ? isDark
                                            ? 'rgba(0, 210, 255, 0.05)'
                                            : 'rgba(0, 210, 255, 0.03)'
                                        : 'transparent',
                                transition: 'all 0.2s ease',
                            }}
                            onClick={() => {
                                form.setFieldValue('role', 'coach')
                                setSelectedRole('coach')
                            }}
                        >
                            <Group gap="xs" justify="center">
                                <Box
                                    style={{
                                        width: rem(20),
                                        height: rem(20),
                                        borderRadius: '50%',
                                        border: `2px solid ${form.values.role === 'coach' ? theme.secondary : theme.border}`,
                                        backgroundColor:
                                            form.values.role === 'coach'
                                                ? theme.secondary
                                                : 'transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {form.values.role === 'coach' && (
                                        <Box
                                            style={{
                                                width: rem(8),
                                                height: rem(8),
                                                borderRadius: '50%',
                                                backgroundColor: '#fff',
                                            }}
                                        />
                                    )}
                                </Box>
                                <Text
                                    fw={600}
                                    // size={{ base: 'sm', sm: 'md' }}
                                    style={{ color: theme.text }}
                                >
                                    Coach
                                </Text>
                            </Group>
                        </Card>
                    </Group>
                </Box>

                <TextInput
                    label="Email"
                    placeholder="your@email.com"
                    leftSection={<Mail size={16} />}
                    withAsterisk
                    size="md"
                    {...form.getInputProps('email')}
                    styles={{
                        input: {
                            backgroundColor: theme.bg,
                            borderColor: theme.border,
                            color: theme.text,
                        },
                    }}
                />

                <Group grow>
                    <TextInput
                        label="First Name"
                        placeholder="John"
                        leftSection={<User size={16} />}
                        withAsterisk
                        size="md"
                        {...form.getInputProps('profile.firstName')}
                        styles={{
                            input: {
                                backgroundColor: theme.bg,
                                borderColor: theme.border,
                                color: theme.text,
                            },
                        }}
                    />

                    <TextInput
                        label="Last Name"
                        placeholder="Doe"
                        leftSection={<User size={16} />}
                        withAsterisk
                        size="md"
                        {...form.getInputProps('profile.lastName')}
                        styles={{
                            input: {
                                backgroundColor: theme.bg,
                                borderColor: theme.border,
                                color: theme.text,
                            },
                        }}
                    />
                </Group>

                <PasswordInput
                    label="Password"
                    placeholder="At least 8 characters"
                    leftSection={<Lock size={16} />}
                    withAsterisk
                    size="md"
                    {...form.getInputProps('password')}
                    styles={{
                        input: {
                            backgroundColor: theme.bg,
                            borderColor: theme.border,
                            color: theme.text,
                        },
                    }}
                />

                <PasswordInput
                    label="Confirm Password"
                    placeholder="Enter your password again"
                    leftSection={<Lock size={16} />}
                    withAsterisk
                    size="md"
                    {...form.getInputProps('confirmPassword')}
                    styles={{
                        input: {
                            backgroundColor: theme.bg,
                            borderColor: theme.border,
                            color: theme.text,
                        },
                    }}
                />

                <Group grow>
                    <Select
                        label="Age Range"
                        placeholder="Select age"
                        data={['Under 18', '18-24', '25-34', '35-44', '45-54', '55+']}
                        withAsterisk
                        size="md"
                        {...form.getInputProps('profile.age')}
                        styles={{
                            input: {
                                backgroundColor: theme.bg,
                                borderColor: theme.border,
                                color: theme.text,
                            },
                        }}
                    />

                    <Select
                        label="Unit System"
                        data={[
                            { value: 'metric', label: 'Metric (kg)' },
                            { value: 'imperial', label: 'Imperial (lbs)' },
                        ]}
                        withAsterisk
                        size="md"
                        {...form.getInputProps('preferences.unitSystem')}
                        styles={{
                            input: {
                                backgroundColor: theme.bg,
                                borderColor: theme.border,
                                color: theme.text,
                            },
                        }}
                    />
                </Group>

                <Textarea
                    label="Bio (Optional)"
                    placeholder="Tell us a bit about yourself..."
                    minRows={3}
                    size="md"
                    {...form.getInputProps('profile.bio')}
                    styles={{
                        input: {
                            backgroundColor: theme.bg,
                            borderColor: theme.border,
                            color: theme.text,
                        },
                    }}
                />

                <Group justify="space-between" mt="lg">
                    <Box /> {/* Empty box for spacing */}
                    <Group>
                        <Button
                            variant="outline"
                            component={Link}
                            href="/login"
                            size="md"
                            style={{
                                borderColor: theme.border,
                                color: theme.text,
                            }}
                        >
                            Sign In
                        </Button>
                        <Button
                            type="submit"
                            size="md"
                            style={{
                                backgroundColor: theme.secondary,
                                color: '#FFFFFF',
                            }}
                            rightSection={<ArrowRight size={16} />}
                        >
                            Continue
                        </Button>
                    </Group>
                </Group>
            </Stack>
        </form>
    )
}
