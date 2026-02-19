'use client'

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
    TextInput,
    PasswordInput,
    Anchor,
    rem,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { Dumbbell, Mail, Lock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/Toaster'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginUser } from '@/services/client/user.client'

export default function LoginPage() {
    const { theme, isDark } = useAppTheme()
    const router = useRouter()
    const queryClient = useQueryClient()

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 6 ? 'Password too short' : null),
        },
    })

    const { mutate: loginMutation, isPending } = useMutation({
        mutationFn: loginUser,
        onSuccess: (result) => {
            if (!result.success) {
                toast.error(result.error || 'Login failed')
                return
            }

            // hydrate auth cache immediately (prevents race condition)
            queryClient.setQueryData(['currentUser'], {
                success: true,
                data: { user: result.data.user },
            })

            toast.success('Logged in successfully!')
            router.replace(`/${result.data.user.role}`)
        },
        onError: (error: any) => {
            toast.error(error.message || 'Login failed')
        },
    })

    const handleSubmit = (values: typeof form.values) => {
        loginMutation(values)
    }

    return (
        <Box style={{ backgroundColor: theme.bg, minHeight: '100vh' }}>
            <Container size="xs" py={40}>
                <Stack align="center" mb={48}>
                    <Group gap="xs">
                        <Dumbbell size={36} color={theme.secondary} strokeWidth={2.5} />
                        <Text style={{ fontSize: rem(32), fontWeight: 900, color: theme.text }}>
                            AKMI
                        </Text>
                    </Group>
                    <Title order={1} size={rem(32)} style={{ color: theme.text }}>
                        Welcome Back
                    </Title>
                    <Text size="md" style={{ color: theme.textSecondary }}>
                        Sign in to continue your journey
                    </Text>
                </Stack>

                <Card
                    style={{
                        backgroundColor: theme.cardBg,
                        border: `1px solid ${theme.border}`,
                        borderRadius: rem(12),
                    }}
                    padding="xl"
                >
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack gap="lg">
                            <TextInput
                                label="Email"
                                placeholder="your@email.com"
                                leftSection={<Mail size={16} />}
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

                            <PasswordInput
                                label="Password"
                                placeholder="Enter your password"
                                leftSection={<Lock size={16} />}
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

                            <Group justify="flex-end">
                                <Anchor
                                    component={Link}
                                    href="/forgot-password"
                                    size="sm"
                                    style={{ color: theme.secondary }}
                                >
                                    Forgot password?
                                </Anchor>
                            </Group>

                            <Button
                                type="submit"
                                loading={isPending}
                                fullWidth
                                size="md"
                                style={{
                                    backgroundColor: theme.secondary,
                                    color: '#FFFFFF',
                                }}
                                rightSection={<ArrowRight size={16} />}
                            >
                                Sign In
                            </Button>

                            <Text
                                size="sm"
                                style={{ color: theme.textSecondary, textAlign: 'center' }}
                            >
                                Don't have an account?{' '}
                                <Anchor
                                    component={Link}
                                    href="/signup"
                                    style={{ color: theme.secondary, fontWeight: 500 }}
                                >
                                    Create one
                                </Anchor>
                            </Text>
                        </Stack>
                    </form>
                </Card>
            </Container>
        </Box>
    )
}
