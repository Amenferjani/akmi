import { useMantineTheme } from '@mantine/core'

export const useThemeColors = () => {
    const theme = useMantineTheme()

    return {
        light: {
            bg: theme.colors.gray[0],
            bgAlt: theme.colors.gray[1],
            text: theme.colors.gray[9],
            textSecondary: theme.colors.gray[7],
            primary: theme.colors.blue[7],
            primaryHover: theme.colors.blue[8],
            secondary: theme.colors.cyan[5],
            secondaryLight: theme.colors.cyan[4],
            border: theme.colors.gray[3],
            cardBg: theme.colors.gray[0],
            heroBg: theme.colors.dark[7],
            heroText: theme.colors.dark[0],
        },
        dark: {
            bg: theme.colors.dark[9],
            bgAlt: theme.colors.dark[8],
            text: theme.colors.dark[0],
            textSecondary: theme.colors.dark[3],
            primary: theme.colors.blue[5],
            primaryHover: theme.colors.blue[6],
            secondary: theme.colors.cyan[5],
            secondaryLight: theme.colors.cyan[4],
            border: theme.colors.dark[6],
            cardBg: theme.colors.dark[8],
            heroBg: theme.colors.dark[7],
            heroText: theme.colors.dark[0],
        },
    }
}
