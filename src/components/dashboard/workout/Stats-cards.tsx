import { useAppTheme } from "@/hooks/useAppTheme"
import { Box, Card, rem, SimpleGrid, Skeleton, Stack, Text } from "@mantine/core"

interface StatsCardsProps {
    stats: {
        label: string
        value: string | number
        icon: React.ElementType
    }[]
    isLoading: boolean
}

export const StatsCards = ({ stats, isLoading }: StatsCardsProps) => {
    const { theme, isDark } = useAppTheme()
    return (
        <>
            <SimpleGrid cols={{ base: 2, sm: 2, md: 4 }} spacing={{ base: 'sm', md: 'md' }}>
                {stats.map((stat) => (
                    <Card
                        key={stat.label}
                        style={{
                            backgroundColor: theme.cardBg,
                            border: `1px solid ${theme.border}`,
                            borderRadius: rem(12),
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                        }}
                        // padding={{ base: 'md', sm: 'lg' }}
                        shadow="sm"
                        styles={{
                            root: {
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: isDark
                                        ? '0 8px 16px rgba(0, 0, 0, 0.3)'
                                        : '0 8px 16px rgba(0, 0, 0, 0.1)',
                                },
                            },
                        }}
                    >
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            <Stack gap={4}>
                                <Text fw={900} style={{ color: theme.text, lineHeight: 1 }}>
                                    {isLoading ? (
                                        <Skeleton height={28} width={60} radius="sm" />
                                    ) : (
                                        stat.value
                                    )}
                                </Text>
                                <Text
                                    size="sm"
                                    style={{
                                        color: theme.textSecondary,
                                        fontWeight: 500,
                                    }}
                                >
                                    {stat.label}
                                </Text>
                            </Stack>

                            <Box
                                style={{
                                    width: rem(48),
                                    height: rem(48),
                                    borderRadius: rem(12),
                                    backgroundColor: isDark
                                        ? 'rgba(0, 210, 255, 0.1)'
                                        : 'rgba(0, 210, 255, 0.08)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <stat.icon size={24} color={theme.secondary} strokeWidth={2} />
                            </Box>
                        </Box>
                    </Card>
                ))}
            </SimpleGrid>
        </>
    )
}
