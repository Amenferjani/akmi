'use client'

import { useMantineTheme, useMantineColorScheme } from '@mantine/core'
import { Toaster as Sonner, toast } from 'sonner'

export function Toaster() {
    const theme = useMantineTheme()
    const { colorScheme } = useMantineColorScheme()

    return (
        <Sonner
            theme={colorScheme === 'dark' ? 'dark' : 'light'}
            position="bottom-right"
            toastOptions={{
                style: {
                    background:
                        colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                    color: colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
                    border: `1px solid ${colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3]}`,
                },
            }}
        />
    )
}

export { toast }
