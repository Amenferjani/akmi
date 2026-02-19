// app/dashboard/coach/page.tsx
'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Title, Text } from '@mantine/core'

export default function CoachDashboard() {
    const { user } = useAuth()
    return (
        <div>
            <Title>Welcome Coach {user?.profile.firstName}!</Title>
            <Text>Manage your athletes, create programs, and track progress</Text>
        </div>
    )
}