import React from 'react'

export const metadata = {
    title: 'Landing Page',
}

export default async function LandingLayout(props: { children: React.ReactNode }) {
    const { children } = props

    return <>{children}</>
}
