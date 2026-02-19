import api from "../api"

export const verifyEmail = async (token: string) => {
    try {
        const response = await api.post(`/users/verify/${token}`)
        return { success: true, data: response.data }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Verification failed',
        }
    }
}

export const loginUser = async (credentials: { email: string; password: string }) => {
    try {
        const response = await api.post('/users/login', credentials)
        console.log('📦 Login response:', response.data)
        return { success: true, data: response.data }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Login failed',
        }
    }
}
export const getMe = async () => {
    try {
        const response = await api.get('/users/me')
        console.log('📦 GetMe response:', response.data.user )
        return { success: true, data: response.data}
    } catch (error) {
        console.log('❌ GetMe error:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch user'
        }
    }
}

export const logoutUser = async () => {
    try {
        const response = await api.post('/users/logout')
        return { success: true, data: response.data }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Logout failed'
        }
    }
}

export const refreshToken = async () =>{
    try {
        const response = await api.post('/users/refresh')
        return { success: true, data: response.data }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Refresh failed'
        }
    }
}