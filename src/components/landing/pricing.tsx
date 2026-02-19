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
    SimpleGrid,
    rem,
} from '@mantine/core'

import Link from 'next/link'
export const Pricing = () => {
    const { theme, isDark } = useAppTheme()
    return (
        <Box
            id="pricing"
            style={{ backgroundColor: theme.bg, borderTop: `1px solid ${theme.border}` }}
        >
            <Container size="lg" py={100}>
                <Stack gap={60}>
                    <Stack gap="md" align="center" style={{ textAlign: 'center' }}>
                        <Text
                            style={{
                                fontSize: rem(14),
                                fontWeight: 700,
                                color: theme.secondary,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                            }}
                        >
                            Pricing
                        </Text>
                        <Title
                            order={2}
                            style={{
                                fontSize: rem(48),
                                fontWeight: 900,
                                color: theme.text,
                            }}
                        >
                            Plans for Every Athlete
                        </Title>
                        <Text
                            size="lg"
                            style={{
                                color: theme.textSecondary,
                                maxWidth: rem(600),
                            }}
                        >
                            Start free, upgrade when you're ready. All plans include mobile apps and
                            unlimited workout logging.
                        </Text>
                    </Stack>

                    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
                        {/* Starter Plan */}
                        <Card
                            shadow="sm"
                            padding="xl"
                            radius="lg"
                            style={{
                                border: `2px solid ${theme.border}`,
                                backgroundColor: theme.cardBg,
                            }}
                        >
                            <Stack gap="xl">
                                <Box>
                                    <Text
                                        style={{
                                            fontSize: rem(18),
                                            fontWeight: 700,
                                            color: theme.text,
                                            marginBottom: rem(8),
                                        }}
                                    >
                                        Starter
                                    </Text>
                                    <Group gap={4} align="baseline">
                                        <Text
                                            style={{
                                                fontSize: rem(48),
                                                fontWeight: 900,
                                                color: theme.text,
                                            }}
                                        >
                                            $0
                                        </Text>
                                        <Text size="md" style={{ color: theme.textSecondary }}>
                                            /month
                                        </Text>
                                    </Group>
                                    <Text
                                        size="sm"
                                        style={{
                                            color: theme.textSecondary,
                                            marginTop: rem(8),
                                        }}
                                    >
                                        Perfect for beginners starting their lifting journey
                                    </Text>
                                </Box>

                                <Stack gap="sm">
                                    {[
                                        'Unlimited workout logging',
                                        'Exercise library (200+ exercises)',
                                        'Basic progress tracking',
                                        'Community access',
                                        'Mobile & web apps',
                                    ].map((feature) => (
                                        <Group key={feature} gap="sm" wrap="nowrap">
                                            <Box style={{ color: theme.secondary }}>✓</Box>
                                            <Text size="sm" style={{ color: theme.text }}>
                                                {feature}
                                            </Text>
                                        </Group>
                                    ))}
                                </Stack>

                                <Button
                                    fullWidth
                                    size="md"
                                    variant="outline"
                                    component={Link}
                                    href="/signup"
                                    style={{
                                        borderColor: theme.border,
                                        color: theme.text,
                                        fontWeight: 600,
                                    }}
                                >
                                    Get Started Free
                                </Button>
                            </Stack>
                        </Card>

                        {/* Pro Plan - Featured */}
                        <Card
                            shadow="xl"
                            padding="xl"
                            radius="lg"
                            style={{
                                border: `3px solid ${theme.secondary}`,
                                backgroundColor: theme.cardBg,
                                position: 'relative',
                                transform: 'scale(1.05)',
                            }}
                        >
                            <Box
                                style={{
                                    position: 'absolute',
                                    top: 7,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    backgroundColor: theme.secondary,
                                    color: isDark ? theme.bg : '#FFFFFF',
                                    padding: `${rem(6)} ${rem(20)}`,
                                    borderRadius: rem(20),
                                    fontSize: rem(12),
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                }}
                            >
                                Most Popular
                            </Box>

                            <Stack gap="xl">
                                <Box>
                                    <Text
                                        style={{
                                            fontSize: rem(18),
                                            fontWeight: 700,
                                            color: theme.text,
                                            marginBottom: rem(8),
                                        }}
                                    >
                                        Pro
                                    </Text>
                                    <Group gap={4} align="baseline">
                                        <Text
                                            style={{
                                                fontSize: rem(48),
                                                fontWeight: 900,
                                                color: theme.text,
                                            }}
                                        >
                                            $12
                                        </Text>
                                        <Text size="md" style={{ color: theme.textSecondary }}>
                                            /month
                                        </Text>
                                    </Group>
                                    <Text
                                        size="sm"
                                        style={{
                                            color: theme.textSecondary,
                                            marginTop: rem(8),
                                        }}
                                    >
                                        For serious athletes tracking every detail
                                    </Text>
                                </Box>

                                <Stack gap="sm">
                                    {[
                                        'Everything in Starter, plus:',
                                        'Advanced analytics & charts',
                                        'Custom program builder',
                                        'Video upload & storage',
                                        'Coach messaging',
                                        'Export your data',
                                        'Priority support',
                                    ].map((feature) => (
                                        <Group key={feature} gap="sm" wrap="nowrap">
                                            <Box style={{ color: theme.secondary }}>✓</Box>
                                            <Text
                                                size="sm"
                                                style={{
                                                    color: theme.text,
                                                    fontWeight: feature.includes('Everything')
                                                        ? 600
                                                        : 400,
                                                }}
                                            >
                                                {feature}
                                            </Text>
                                        </Group>
                                    ))}
                                </Stack>

                                <Button
                                    fullWidth
                                    size="md"
                                    component={Link}
                                    href="/signup"
                                    style={{
                                        backgroundColor: theme.secondary,
                                        color: isDark ? theme.bg : '#FFFFFF',
                                        fontWeight: 600,
                                    }}
                                >
                                    Start 14-Day Free Trial
                                </Button>
                            </Stack>
                        </Card>

                        {/* Elite Plan */}
                        <Card
                            shadow="sm"
                            padding="xl"
                            radius="lg"
                            style={{
                                border: `2px solid ${theme.border}`,
                                backgroundColor: theme.cardBg,
                            }}
                        >
                            <Stack gap="xl">
                                <Box>
                                    <Text
                                        style={{
                                            fontSize: rem(18),
                                            fontWeight: 700,
                                            color: theme.text,
                                            marginBottom: rem(8),
                                        }}
                                    >
                                        Elite
                                    </Text>
                                    <Group gap={4} align="baseline">
                                        <Text
                                            style={{
                                                fontSize: rem(48),
                                                fontWeight: 900,
                                                color: theme.text,
                                            }}
                                        >
                                            $49
                                        </Text>
                                        <Text size="md" style={{ color: theme.textSecondary }}>
                                            /month
                                        </Text>
                                    </Group>
                                    <Text
                                        size="sm"
                                        style={{
                                            color: theme.textSecondary,
                                            marginTop: rem(8),
                                        }}
                                    >
                                        For competitive powerlifters and athletes
                                    </Text>
                                </Box>

                                <Stack gap="sm">
                                    {[
                                        'Everything in Pro, plus:',
                                        'Dedicated 1-on-1 coaching',
                                        'Weekly video form reviews',
                                        'Custom meet prep programs',
                                        'Nutrition guidance',
                                        'Phone/video call support',
                                        'Competition day strategy',
                                    ].map((feature) => (
                                        <Group key={feature} gap="sm" wrap="nowrap">
                                            <Box style={{ color: theme.secondary }}>✓</Box>
                                            <Text
                                                size="sm"
                                                style={{
                                                    color: theme.text,
                                                    fontWeight: feature.includes('Everything')
                                                        ? 600
                                                        : 400,
                                                }}
                                            >
                                                {feature}
                                            </Text>
                                        </Group>
                                    ))}
                                </Stack>

                                <Button
                                    fullWidth
                                    size="md"
                                    variant="outline"
                                    component={Link}
                                    href="/signup"
                                    style={{
                                        borderColor: theme.border,
                                        color: theme.text,
                                        fontWeight: 600,
                                    }}
                                >
                                    Contact Sales
                                </Button>
                            </Stack>
                        </Card>
                    </SimpleGrid>
                </Stack>
            </Container>
        </Box>
    )
}
