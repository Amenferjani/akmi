import { useAppTheme } from '@/hooks/useAppTheme'
import {
    Container,
    Title,
    Text,
    Button,
    Group,
    Stack,
    Box,
    rem,
} from '@mantine/core'
import {
    ArrowRight,
} from 'lucide-react'
import Link from 'next/link'
export const CTA = () => {
    const { theme, isDark } = useAppTheme()
    return (
        <Box
                style={{
                    background: isDark
                        ? `linear-gradient(135deg, ${theme.bgAlt} 0%, ${theme.bg} 100%)`
                        : `linear-gradient(135deg, ${theme.bgAlt} 0%, ${theme.bg} 100%)`,
                    borderTop: `1px solid ${theme.border}`,
                }}
            >
                <Container size="lg" py={100}>
                    <Stack gap={40} align="center" style={{ textAlign: 'center' }}>
                        <Box>
                            <Title
                                order={2}
                                style={{
                                    fontSize: rem(48),
                                    fontWeight: 900,
                                    color: theme.text,
                                    marginBottom: rem(16),
                                }}
                            >
                                Ready to Set Your Next PR?
                            </Title>
                            <Text
                                size="xl"
                                style={{
                                    color: theme.textSecondary,
                                    maxWidth: rem(700),
                                    margin: '0 auto',
                                }}
                            >
                                Join 50,000+ athletes using AKMI to track their training, connect
                                with coaches, and achieve their strength goals.
                            </Text>
                        </Box>

                        <Group gap="md">
                            <Button
                                size="xl"
                                component={Link}
                                href="/signup"
                                style={{
                                    backgroundColor: theme.secondary,
                                    color: isDark ? theme.bg : '#FFFFFF',
                                    fontSize: rem(18),
                                    fontWeight: 600,
                                    padding: `${rem(16)} ${rem(48)}`,
                                }}
                                rightSection={<ArrowRight size={20} />}
                            >
                                Start Training Free
                            </Button>
                        </Group>

                        <Text size="sm" c="dimmed">
                            Free forever • No credit card required • Cancel anytime
                        </Text>
                    </Stack>
                </Container>
            </Box>
    )
}