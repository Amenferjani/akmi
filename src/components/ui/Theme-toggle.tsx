'use client'
import { Switch, useMantineColorScheme, rem } from '@mantine/core'
import { Sun, Moon } from 'lucide-react'
import { useThemeColors } from '@/theme/colors'

export function ThemeToggle() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const themeColors = useThemeColors()
    const isDark = colorScheme === 'dark'
    const theme = isDark ? themeColors.dark : themeColors.light

    return (
        <Switch
            checked={isDark}
            onChange={() => toggleColorScheme()}
            size="lg"
            onLabel={<Sun size={16} color={theme.secondary} />}
            offLabel={<Moon size={16} color={theme.secondary} />}
            styles={{
                track: {
                    backgroundColor: isDark 
                        ? 'rgba(6, 182, 212, 0.1)' 
                        : 'rgba(6, 182, 212, 0.08)',
                    cursor: 'pointer',
                    border: `1px solid ${theme.border}`,
                },
                thumb: {
                    backgroundColor: theme.secondary,
                    border: 'none',
                },
            }}
        />
    )
}