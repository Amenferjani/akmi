'use client'

import {
    Button,
    Group,
    Stack,
    Card,
    TextInput,
    Select,
    NumberInput,
    Textarea,
    Divider,
    Text,
    rem,
    FileInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { zodResolver } from 'mantine-form-zod-resolver'
import { z } from 'zod'
import { ArrowRight, Award, Upload, X } from 'lucide-react'
import { useAppTheme } from '@/hooks/useAppTheme'

// Schema for coach profile step
const coachProfileSchema = z.object({
    specialization: z.enum(['powerlifting', 'strength', 'general', 'bodybuilding'], {
        errorMap: () => ({ message: 'Please select a specialization' }),
    }),
    yearsOfExperience: z.number().min(0, 'Years of experience must be 0 or more'),
    price: z.number().min(0, 'Price must be 0 or more'),
    bio: z.string().min(50, 'Bio must be at least 50 characters'),
    certifications: z
        .array(
            z.object({
                name: z.string().min(1, 'Certification name is required'),
                issuingOrganization: z.string().optional(),
                yearObtained: z
                    .number()
                    .min(1900)
                    .max(new Date().getFullYear())
                    .nullable()
                    .optional(),
                file: z.instanceof(File).optional(),
            }),
        )
        .min(1, 'At least one certification is required'),
})

type CoachProfileFormValues = z.infer<typeof coachProfileSchema>

interface CoachProfileStepProps {
    onSubmit: (data: CoachProfileFormValues) => void
    onBack: () => void
    loading: boolean

}

export function CoachProfileStep({
    onSubmit,
    onBack,
    loading,
}: CoachProfileStepProps) {
    const { theme, isDark } = useAppTheme()

    const form = useForm<CoachProfileFormValues>({
        validate: zodResolver(coachProfileSchema),
        initialValues: {
            specialization: 'powerlifting',
            yearsOfExperience: 0,
            price: 0,
            bio: '',
            certifications: [
                {
                    name: '',
                    issuingOrganization: '',
                    yearObtained: null,
                    file: undefined,
                },
            ],
        },
    })

    const handleSubmit = (values: CoachProfileFormValues) => {
        onSubmit(values)
    }

    const addCertification = () => {
        form.insertListItem('certifications', {
            name: '',
            issuingOrganization: '',
            yearObtained: null,
            file: undefined,
        })
    }

    const removeCertification = (index: number) => {
        if (form.values.certifications.length > 1) {
            form.removeListItem('certifications', index)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack
                // gap={{ base: 'md', sm: 'lg' }}
                mt="xl"
            >
                <Select
                    label="Specialization"
                    data={[
                        { value: 'powerlifting', label: 'Powerlifting' },
                        { value: 'strength', label: 'Strength Training' },
                        { value: 'general', label: 'General Fitness' },
                        { value: 'bodybuilding', label: 'Bodybuilding' },
                    ]}
                    withAsterisk
                    size="md"
                    {...form.getInputProps('specialization')}
                    styles={{
                        input: {
                            backgroundColor: theme.bg,
                            borderColor: theme.border,
                            color: theme.text,
                        },
                    }}
                />

                <Group grow>
                    <NumberInput
                        label="Years of Experience"
                        placeholder="5"
                        min={0}
                        withAsterisk
                        size="md"
                        {...form.getInputProps('yearsOfExperience')}
                        styles={{
                            input: {
                                backgroundColor: theme.bg,
                                borderColor: theme.border,
                                color: theme.text,
                            },
                        }}
                    />

                    <NumberInput
                        label="Monthly rate ($)"
                        placeholder="50"
                        min={0}
                        withAsterisk
                        leftSection={<Award size={16} />}
                        size="md"
                        {...form.getInputProps('price')}
                        styles={{
                            input: {
                                backgroundColor: theme.bg,
                                borderColor: theme.border,
                                color: theme.text,
                            },
                        }}
                    />
                </Group>

                <Textarea
                    label="Professional Bio"
                    placeholder="Describe your coaching philosophy, experience, and approach..."
                    minRows={8}
                    withAsterisk
                    size="lg"
                    {...form.getInputProps('bio')}
                    styles={{
                        input: {
                            backgroundColor: theme.bg,
                            borderColor: theme.border,
                            color: theme.text,
                        },
                    }}
                />

                <Divider
                    label={
                        <Text size="sm" fw={600}>
                            Certifications
                        </Text>
                    }
                    labelPosition="left"
                />

                <Stack gap="md">
                    {form.values.certifications.map((cert, index) => (
                        <Card
                            key={index}
                            // padding={{ base: 'sm', sm: 'md' }}
                            style={{
                                border: `1px solid ${theme.border}`,
                                backgroundColor: theme.bg,
                                position: 'relative',
                            }}
                        >
                            {form.values.certifications.length > 1 && (
                                <Button
                                    variant="subtle"
                                    color="red"
                                    size="xs"
                                    style={{
                                        position: 'absolute',
                                        top: rem(8),
                                        right: rem(8),
                                        padding: rem(4),
                                        minWidth: 'auto',
                                    }}
                                    onClick={() => removeCertification(index)}
                                >
                                    <X size={16} />
                                </Button>
                            )}

                            <Stack gap="sm">
                                <TextInput
                                    label="Certification Name"
                                    placeholder="CSCS, NSCA-CPT, etc."
                                    withAsterisk
                                    size="md"
                                    {...form.getInputProps(`certifications.${index}.name`)}
                                    styles={{
                                        input: {
                                            backgroundColor: theme.cardBg,
                                            borderColor: theme.border,
                                            color: theme.text,
                                        },
                                    }}
                                />
                                <TextInput
                                    label="Issuing Organization"
                                    placeholder="NSCA, ACE, NASM..."
                                    size="md"
                                    {...form.getInputProps(
                                        `certifications.${index}.issuingOrganization`,
                                    )}
                                    styles={{
                                        input: {
                                            backgroundColor: theme.cardBg,
                                            borderColor: theme.border,
                                            color: theme.text,
                                        },
                                    }}
                                />
                                <NumberInput
                                    label="Year Obtained"
                                    placeholder="2020"
                                    min={1900}
                                    max={new Date().getFullYear()}
                                    size="md"
                                    {...form.getInputProps(`certifications.${index}.yearObtained`)}
                                    styles={{
                                        input: {
                                            backgroundColor: theme.cardBg,
                                            borderColor: theme.border,
                                            color: theme.text,
                                        },
                                    }}
                                />
                                <FileInput
                                    label="Certificate File (PDF/Image)"
                                    placeholder="Upload certificate"
                                    accept="image/*,application/pdf"
                                    leftSection={<Upload size={16} />}
                                    size="md"
                                    {...form.getInputProps(`certifications.${index}.file`)}
                                    styles={{
                                        input: {
                                            backgroundColor: theme.cardBg,
                                            borderColor: theme.border,
                                            color: theme.text,
                                        },
                                    }}
                                />
                            </Stack>
                        </Card>
                    ))}
                </Stack>

                <Button variant="light" color="cyan" onClick={addCertification} fullWidth size="md">
                    + Add Another Certification
                </Button>

                <Group justify="space-between" mt="lg">
                    <Button variant="subtle" onClick={onBack} size="md">
                        Back
                    </Button>
                    <Button
                        type="submit"
                        loading={loading}
                        size="md"
                        style={{
                            backgroundColor: theme.secondary,
                            color: '#FFFFFF',
                        }}
                        rightSection={<ArrowRight size={16} />}
                    >
                        Create Account
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}
