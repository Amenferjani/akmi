import { Box,Loader } from '@mantine/core'
import React, { Suspense } from 'react'

export const metadata = {
    title: 'Authentication',
}

export default async function AuthLayout(props: { children: React.ReactNode }) {
    const { children } = props

    return (
        <Suspense
            fallback={
                <Box
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <Loader size="lg" />
                </Box>
            }
        >
            {children}
        </Suspense>
    )
}
