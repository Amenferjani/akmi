'use client'

import { CTA } from '@/components/landing/CTA'
import { Features } from '@/components/landing/features'
import { Footer } from '@/components/landing/footer'
import { Hero } from '@/components/landing/hero'
import { NavBar } from '@/components/landing/navBar'
import { Pricing } from '@/components/landing/pricing'
import { Stats } from '@/components/landing/stats'
import { useAppTheme } from '@/hooks/useAppTheme'
import { Box } from '@mantine/core'
export default function LandingPage() {
    const { theme } = useAppTheme()
    return (
        <>
            <Box
                style={{
                    backgroundColor: theme.bg,
                    minHeight: '100vh',
                }}
            >
                {/* Navbar */}
                <NavBar />

                {/* Hero Section */}
                <Hero />

                {/* Stats Section */}
                <Stats />

                {/* Features Section */}
                <Features />

                {/* Pricing Section */}
                <Pricing />

                {/* CTA Section */}
                <CTA />

                {/* Footer */}
                <Footer />
            </Box>
        </>
    )
}
