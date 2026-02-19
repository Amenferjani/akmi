import { useMantineColorScheme } from '@mantine/core'
import { useThemeColors } from '@/theme/colors'

export const useAppTheme = () => {
    const { colorScheme } = useMantineColorScheme()
    const themeColors = useThemeColors()
    const isDark = colorScheme === 'dark'

    return {
        theme: isDark ? themeColors.dark : themeColors.light,
        isDark,
        colorScheme,
    }
}
