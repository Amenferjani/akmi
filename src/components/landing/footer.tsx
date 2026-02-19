import { useAppTheme } from '@/hooks/useAppTheme'
import {
    Container,
    Text,
    Group,
    Stack,
    Grid,
    Box,
    rem,
    Anchor,
    Divider,
} from '@mantine/core'
import {
    Dumbbell,
} from 'lucide-react'
import Link from 'next/link'
export const Footer = () => {
    const { theme } = useAppTheme()
    return (
        <Box
            style={{
                backgroundColor: theme.bgAlt,
                borderTop: `1px solid ${theme.border}`,
            }}
        >
            <Container size="lg" py={60}>
                <Grid gutter="xl">
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Stack gap="md">
                            <Group gap="xs">
                                <Dumbbell size={24} color={theme.secondary} strokeWidth={2.5} />
                                <Text
                                    style={{
                                        fontSize: rem(24),
                                        fontWeight: 900,
                                        color: theme.text,
                                    }}
                                >
                                    AKMI
                                </Text>
                            </Group>
                            <Text size="sm" style={{ color: theme.textSecondary }}>
                                The complete powerlifting platform for athletes, coaches, and
                                enthusiasts worldwide.
                            </Text>
                        </Stack>
                    </Grid.Col>

                    <Grid.Col span={{ base: 6, md: 2 }}>
                        <Stack gap="sm">
                            <Text
                                size="sm"
                                style={{
                                    fontWeight: 700,
                                    color: theme.text,
                                }}
                            >
                                Product
                            </Text>
                            {['Features', 'Pricing', 'Coaches', 'Mobile Apps'].map((link) => (
                                <Anchor
                                    key={link}
                                    href="#"
                                    size="sm"
                                    style={{
                                        color: theme.textSecondary,
                                        textDecoration: 'none',
                                    }}
                                >
                                    {link}
                                </Anchor>
                            ))}
                        </Stack>
                    </Grid.Col>

                    <Grid.Col span={{ base: 6, md: 2 }}>
                        <Stack gap="sm">
                            <Text
                                size="sm"
                                style={{
                                    fontWeight: 700,
                                    color: theme.text,
                                }}
                            >
                                Resources
                            </Text>
                            {['Blog', 'Community', 'Help Center', 'API Docs'].map((link) => (
                                <Anchor
                                    key={link}
                                    href="#"
                                    size="sm"
                                    style={{
                                        color: theme.textSecondary,
                                        textDecoration: 'none',
                                    }}
                                >
                                    {link}
                                </Anchor>
                            ))}
                        </Stack>
                    </Grid.Col>

                    <Grid.Col span={{ base: 6, md: 2 }}>
                        <Stack gap="sm">
                            <Text
                                size="sm"
                                style={{
                                    fontWeight: 700,
                                    color: theme.text,
                                }}
                            >
                                Company
                            </Text>
                            {['About', 'Careers', 'Contact'].map((link) => (
                                <Anchor
                                    key={link}
                                    href="#"
                                    size="sm"
                                    style={{
                                        color: theme.textSecondary,
                                        textDecoration: 'none',
                                    }}
                                >
                                    {link}
                                </Anchor>
                            ))}
                        </Stack>
                    </Grid.Col>

                    <Grid.Col span={{ base: 6, md: 2 }}>
                        <Stack gap="sm">
                            <Text
                                size="sm"
                                style={{
                                    fontWeight: 700,
                                    color: theme.text,
                                }}
                            >
                                Legal
                            </Text>
                            {['Privacy', 'Terms', 'Security'].map((link) => (
                                <Anchor
                                    key={link}
                                    href="#"
                                    size="sm"
                                    style={{
                                        color: theme.textSecondary,
                                        textDecoration: 'none',
                                    }}
                                >
                                    {link}
                                </Anchor>
                            ))}
                        </Stack>
                    </Grid.Col>
                </Grid>

                <Divider my="xl" color={theme.border} />

                <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                        © {new Date().getFullYear()} AKMI. All rights reserved.
                    </Text>
                    <Group gap="lg">
                        <Anchor href="#" size="sm" c="dimmed">
                            Twitter
                        </Anchor>
                        <Anchor href="#" size="sm" c="dimmed">
                            Instagram
                        </Anchor>
                        <Anchor href="#" size="sm" c="dimmed">
                            YouTube
                        </Anchor>
                    </Group>
                </Group>
            </Container>
        </Box>
    )
}
