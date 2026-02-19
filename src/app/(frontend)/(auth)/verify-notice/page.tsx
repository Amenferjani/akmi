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
    rem,
    ThemeIcon,
} from '@mantine/core'
import { Dumbbell, Mail, ArrowRight, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function VerifyNoticePage() {
    const { theme, isDark } = useAppTheme()
    const searchParams = useSearchParams()
    const email = searchParams.get('email')

    return (
        <Box style={{ backgroundColor: theme.bg, minHeight: '100vh' }}>
            <Container size="sm" py={80}>
                {/* Header */}
                <Stack align="center" mb={48} gap="md">
                    <Group gap="xs">
                        <Dumbbell size={36} color={theme.secondary} strokeWidth={2.5} />
                        <Text
                            style={{
                                fontSize: rem(32),
                                fontWeight: 900,
                                color: theme.text,
                                letterSpacing: '-0.02em',
                            }}
                        >
                            AKMI
                        </Text>
                    </Group>
                </Stack>

                {/* Main Card */}
                <Card
                    style={{
                        backgroundColor: theme.cardBg,
                        border: `1px solid ${theme.border}`,
                        borderRadius: rem(16),
                    }}
                    padding="xl"
                >
                    <Stack align="center" gap="xl">
                        {/* Icon */}
                        <ThemeIcon
                            size={80}
                            radius={100}
                            style={{
                                backgroundColor: isDark 
                                    ? 'rgba(6, 182, 212, 0.15)' 
                                    : 'rgba(6, 182, 212, 0.1)',
                                color: theme.secondary,
                            }}
                        >
                            <Mail size={40} strokeWidth={1.5} />
                        </ThemeIcon>

                        {/* Title */}
                        <Stack align="center" gap="xs">
                            <Title
                                order={2}
                                style={{
                                    fontSize: rem(32),
                                    fontWeight: 700,
                                    color: theme.text,
                                    textAlign: 'center',
                                }}
                            >
                                Verify your email
                            </Title>
                            <Text
                                size="lg"
                                style={{
                                    color: theme.textSecondary,
                                    textAlign: 'center',
                                    maxWidth: rem(400),
                                }}
                            >
                                We've sent a verification link to
                            </Text>
                            <Text
                                size="lg"
                                style={{
                                    color: theme.secondary,
                                    fontWeight: 600,
                                    textAlign: 'center',
                                    wordBreak: 'break-all',
                                }}
                            >
                                {email || 'your email'}
                            </Text>
                        </Stack>

                        {/* Instructions */}
                        <Card
                            style={{
                                backgroundColor: theme.bgAlt,
                                border: `1px solid ${theme.border}`,
                                width: '100%',
                            }}
                            padding="lg"
                        >
                            <Stack gap="sm">
                                <Text size="sm" style={{ color: theme.textSecondary }}>
                                    1. Open your email inbox
                                </Text>
                                <Text size="sm" style={{ color: theme.textSecondary }}>
                                    2. Click the verification link in the email from AKMI
                                </Text>
                                <Text size="sm" style={{ color: theme.textSecondary }}>
                                    3. Your account will be verified and you can log in
                                </Text>
                            </Stack>
                        </Card>

                        {/* Action Buttons */}
                        <Stack gap="md" style={{ width: '100%' }}>
                            <Button
                                size="lg"
                                fullWidth
                                style={{
                                    backgroundColor: theme.secondary,
                                    color: '#FFFFFF',
                                }}
                                rightSection={<RefreshCw size={18} />}
                                onClick={() => {
                                    // Handle resend verification email
                                    fetch('/api/users/resend-verification', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ email }),
                                    })
                                }}
                            >
                                Resend Verification Email
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                fullWidth
                                component={Link}
                                href="/login"
                                style={{
                                    borderColor: theme.border,
                                    color: theme.text,
                                }}
                                rightSection={<ArrowRight size={18} />}
                            >
                                Go to Login
                            </Button>
                        </Stack>

                        {/* Help Text */}
                        <Text size="sm" style={{ color: theme.textSecondary, textAlign: 'center' }}>
                            Didn't receive the email? Check your spam folder or{' '}
                            <Link
                                href="/support"
                                style={{
                                    color: theme.secondary,
                                    textDecoration: 'none',
                                    fontWeight: 500,
                                }}
                            >
                                contact support
                            </Link>
                        </Text>
                    </Stack>
                </Card>
            </Container>
        </Box>
    )
}