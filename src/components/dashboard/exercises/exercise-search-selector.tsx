import { useAppTheme } from "@/hooks/useAppTheme"
import { Box, rem, Select } from "@mantine/core"
import { toast } from '@/components/ui/Toaster'
import { useState } from "react"
import { Exercise } from "@/payload-types"
import { searchExercises } from "@/services/server/exercises.server"
import { Loader, Search } from "lucide-react"
import { ExerciseEntry } from "@/types/exercises.type"


interface ExerciseSearchSelectorProps {
    exercise: ExerciseEntry
    updateExercise: (index: number, exerciseId: number | null) => void
    exerciseIndex: number
}

export const ExerciseSearchSelector = ({ exercise, updateExercise, exerciseIndex }: ExerciseSearchSelectorProps) => {
    const [searchQuery, setSearchQuery] = useState('')
    
        // Search exercises with debounce
        const [exercises, setExercises] = useState<Exercise[]>([])
        const [isLoadingExercises, setIsLoadingExercises] = useState(false)
    
        const handleSearch = async (query: string) => {
            if (query.length < 2) return
            setIsLoadingExercises(true)
            const results = await searchExercises(query)
    
            if (!results.success) {
                toast.error(results.error)
                setExercises([])
                setIsLoadingExercises(false)
                return
            }
    
            setExercises(results.data)
            setIsLoadingExercises(false)
        }

    const {theme , isDark} = useAppTheme()
    return (
        <Box style={{ position: 'relative' }}>
            <Select
                placeholder="Search and select an exercise..."
                data={
                    exercises?.map((ex: Exercise) => ({
                        value: ex.id.toString(),
                        label: ex.name,
                    })) || []
                }
                value={exercise.exerciseId?.toString()}
                onChange={(value) => updateExercise(exerciseIndex, value ? parseInt(value) : null)}
                searchable
                onSearchChange={(query) => {
                    setSearchQuery(query)
                    handleSearch(query)
                }}
                searchValue={searchQuery}
                nothingFoundMessage="No exercises found"
                required
                size="md"
                leftSection={<Search size={16} color={theme.textSecondary} />}
                rightSection={
                    isLoadingExercises && searchQuery ? (
                        <Loader size={16} color={theme.secondary} />
                    ) : null
                }
                styles={{
                    input: {
                        backgroundColor: theme.cardBg,
                        borderColor: theme.border,
                        color: theme.text,
                        borderRadius: rem(8),
                        fontWeight: 500,
                    },
                    dropdown: {
                        backgroundColor: theme.border,
                        borderColor: theme.border,
                        borderRadius: rem(8),
                    },
                    option: {
                        '&[data-selected]': {
                            backgroundColor: isDark
                                ? 'rgba(0, 210, 255, 0.1)'
                                : 'rgba(0, 210, 255, 0.08)',
                        },
                        '&:hover': {
                            backgroundColor: isDark
                                ? 'rgba(0, 210, 255, 0.15)'
                                : 'rgba(0, 210, 255, 0.12)',
                        },
                    },
                }}
            />
        </Box>
    )
}
