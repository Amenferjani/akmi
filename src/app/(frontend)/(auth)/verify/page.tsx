'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAppTheme } from '@/hooks/useAppTheme'
import { Container, Card, Title, Text, Button, Stack, Box, rem, Loader, Group } from '@mantine/core'
import { CheckCircle, XCircle, Dumbbell } from 'lucide-react'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import { verifyEmail } from '@/services/client/user.client'

export default function VerifyPage() {
    const { theme } = useAppTheme()
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get('token')

    const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'already-verified'>(
        'loading',
    )
    const [message, setMessage] = useState('Verifying your email...')

    const { mutate: verifyEmailMutation, isPending } = useMutation({
        mutationFn: verifyEmail,
        onSuccess: (result) => {
            if (result.success) {
                setStatus('success')
                setMessage('Email verified successfully!')
                setTimeout(() => router.push('/login'), 3000)
            } else {
                // Handle the "already verified" case
                if (
                    result.error?.includes('already verified') ||
                    result.error?.includes('invalid')
                ) {
                    setStatus('already-verified')
                    setMessage('Email already verified - redirecting to login...')
                    setTimeout(() => router.push('/login'), 2000)
                } else {
                    setStatus('error')
                    setMessage(result.error || 'Verification failed')
                }
            }
        },
        onError: (error: any) => {
            setStatus('error')
            setMessage(error.message || 'Verification failed')
        },
    })

    useEffect(() => {
        if (!token) {
            setStatus('error')
            setMessage('No verification token provided')
            return
        }

        verifyEmailMutation(token)
    }, [token, verifyEmailMutation])

    return (
        
        <Box style={{ backgroundColor: theme.bg, minHeight: '100vh' }}>
            <Container size="sm" py={80}>
                <Stack align="center" mb={48}>
                    <Group gap="xs">
                        <Dumbbell size={36} color={theme.secondary} strokeWidth={2.5} />
                        <Text style={{ fontSize: rem(32), fontWeight: 900, color: theme.text }}>
                            AKMI
                        </Text>
                    </Group>
                </Stack>

                <Card
                    style={{
                        backgroundColor: theme.cardBg,
                        border: `1px solid ${theme.border}`,
                        borderRadius: rem(12),
                    }}
                    padding="xl"
                >
                    <Stack align="center" gap="lg">
                        {isPending && (
                            <>
                                <Loader size={48} color={theme.secondary} />
                                <Title order={2} style={{ color: theme.text }}>
                                    Verifying
                                </Title>
                            </>
                        )}

                        {status === 'success' && (
                            <>
                                <CheckCircle size={48} color={theme.secondary} />
                                <Title order={2} style={{ color: theme.text }}>
                                    Success!
                                </Title>
                            </>
                        )}

                        {status === 'already-verified' && (
                            <>
                                <CheckCircle size={48} color={theme.secondary} />
                                <Title order={2} style={{ color: theme.text }}>
                                    Already Verified
                                </Title>
                            </>
                        )}

                        {status === 'error' && (
                            <>
                                <XCircle size={48} color="#fa5252" />
                                <Title order={2} style={{ color: theme.text }}>
                                    Verification Failed
                                </Title>
                            </>
                        )}

                        <Text style={{ color: theme.textSecondary, textAlign: 'center' }}>
                            {message}
                        </Text>

                        {(status === 'success' || status === 'already-verified') && (
                            <Text size="sm" style={{ color: theme.textSecondary }}>
                                Redirecting to login...
                            </Text>
                        )}

                        {status === 'error' && (
                            <Button
                                component={Link}
                                href="/login"
                                style={{
                                    backgroundColor: theme.secondary,
                                    color: '#FFFFFF',
                                    marginTop: rem(16),
                                }}
                            >
                                Go to Login
                            </Button>
                        )}
                    </Stack>
                </Card>
            </Container>
        </Box>
    )
}
