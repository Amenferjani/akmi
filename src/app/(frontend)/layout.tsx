import React from 'react'
import './styles.css'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'

import { Outfit } from 'next/font/google'
import { theme } from '@/theme/theme'
import { Toaster } from '@/components/ui/Toaster'
import { QueryProviders } from './provider'
import { ModalsProvider } from '@mantine/modals';

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
})

export default async function RootLayout(props: { children: React.ReactNode }) {
    const { children } = props

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <ColorSchemeScript defaultColorScheme="dark" />
            </head>
            <body className={outfit.className}>
                <MantineProvider theme={theme} defaultColorScheme="dark">
                    <ModalsProvider>
                        <QueryProviders>
                            {children}
                            <Toaster />
                        </QueryProviders>
                    </ModalsProvider>
                </MantineProvider>
            </body>
        </html>
    )
}
