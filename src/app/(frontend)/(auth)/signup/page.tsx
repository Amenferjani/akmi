'use client'

import { useAppTheme } from '@/hooks/useAppTheme'
import {
    Container,
    Title,
    Text,
    Button,
    Group,
    Stack,
    Card,
    Box,
    Stepper,
    Alert,
    rem,
} from '@mantine/core'
import { Dumbbell, ArrowRight, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CoachProfileStep } from '@/components/auth/signup/Coachprofilestep'
import { AthleteProfileStep } from '@/components/auth/signup/Athleteprofilestep'
import { BasicInfoStep } from '@/components/auth/signup/BasicInfo'
import { createUser } from '@/services/server/user.server'
import { toast } from '@/components/ui/Toaster'

export default function SignupPage() {
    const { theme } = useAppTheme()
    const router = useRouter()
    const [active, setActive] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedRole, setSelectedRole] = useState<'athlete' | 'coach'>('athlete')

    const [basicData, setBasicData] = useState<any>(null)
    const [profileData, setProfileData] = useState<any>(null)

    const handleBasicInfoSubmit = (data: any) => {
        setBasicData(data)
        setActive(1)
    }

    const handleProfileSubmit = async (data: any) => {
        setLoading(true)
        setError(null)
        setProfileData(data)

        try {
            const { confirmPassword, ...basicDataWithoutConfirm } = basicData

            const submitData: any = {
                ...basicDataWithoutConfirm,
            }

            if (selectedRole === 'athlete') {
                submitData.athleteData = data
                delete submitData.coachData
            } else {
                submitData.coachData = data
                delete submitData.athleteData
            }

            console.log('Submitting data:', submitData)

            const result = await createUser(submitData)

            console.log('Create user result:', result)
            if (!result.success) {
                toast.error(result.error)
                return
            }

            router.push('/verify-notice?email=' + encodeURIComponent(basicData.email))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const handleBack = () => {
        setActive(0)
    }

    return (
        <Box style={{ backgroundColor: theme.bg, minHeight: '100vh' }}>
            <Container py={{ base: 20, sm: 30 }} px={{ base: 'sm', sm: 'xl' }}>
                {/* Header */}
                <Stack align="center" mb={{ base: 32, sm: 48 }} gap="md">
                    <Group gap="xs">
                        <Dumbbell size={36} color={theme.secondary} strokeWidth={2.5} />
                        <Text
                            style={{
                                fontSize: rem(32),
                                fontWeight: 900,
                                color: theme.text,
                                letterSpacing: '-0.02em',
                            }}
                        >
                            AKMI
                        </Text>
                    </Group>
                    <Title
                        order={1}
                        style={{ color: theme.text, textAlign: 'center', fontWeight: 800 }}
                    >
                        Create Your Account
                    </Title>
                    <Text
                        style={{
                            color: theme.textSecondary,
                            textAlign: 'center',
                            maxWidth: rem(500),
                            paddingInline: rem(16),
                        }}
                    >
                        Join thousands of lifters tracking their progress and breaking records
                    </Text>
                </Stack>

                {/* Main Card */}
                <Card
                    style={{
                        backgroundColor: theme.cardBg,
                        border: `1px solid ${theme.border}`,
                        borderRadius: rem(12),
                    }}
                    shadow="sm"
                >
                    <Stepper
                        active={active}
                        mb="xl"
                        color="cyan"
                        orientation="horizontal"
                        completedIcon={
                            <Box
                                style={{
                                    width: rem(20),
                                    height: rem(20),
                                    borderRadius: '50%',
                                    backgroundColor: theme.secondary,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    fontSize: rem(14),
                                }}
                            >
                                ✓
                            </Box>
                        }
                    >
                        <Stepper.Step label="Account" description="Basic information">
                            <BasicInfoStep
                                setSelectedRole={setSelectedRole}
                                onSubmit={handleBasicInfoSubmit}
                                initialRole={selectedRole}
                            />
                        </Stepper.Step>

                        <Stepper.Step
                            label="Profile"
                            description={
                                selectedRole === 'athlete' ? 'Athlete details' : 'Coach details'
                            }
                        >
                            {selectedRole === 'athlete' ? (
                                <AthleteProfileStep
                                    onSubmit={handleProfileSubmit}
                                    onBack={handleBack}
                                    loading={loading}
                                />
                            ) : (
                                <CoachProfileStep
                                    onSubmit={handleProfileSubmit}
                                    onBack={handleBack}
                                    loading={loading}
                                />
                            )}
                        </Stepper.Step>
                    </Stepper>

                    {error && (
                        <Alert
                            icon={<AlertCircle size={16} />}
                            color="red"
                            mb="lg"
                            title="Error"
                            withCloseButton
                            onClose={() => setError(null)}
                        >
                            {error}
                        </Alert>
                    )}
                </Card>

                {/* Footer Text */}
                <Text style={{ color: theme.textSecondary, textAlign: 'center' }} mt="xl" px="md">
                    By signing up, you agree to our{' '}
                    <Link
                        href="/terms"
                        style={{ color: theme.secondary, textDecoration: 'none', fontWeight: 500 }}
                    >
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                        href="/privacy"
                        style={{ color: theme.secondary, textDecoration: 'none', fontWeight: 500 }}
                    >
                        Privacy Policy
                    </Link>
                </Text>
            </Container>
        </Box>
    )
}
