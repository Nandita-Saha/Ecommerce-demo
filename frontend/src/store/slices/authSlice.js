import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/users';

// Async Thunks
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const getUserProfile = createAsyncThunk('auth/getUserProfile', async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const token = state.auth.token;

        const response = await fetch(`${API_URL}/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch profile');
        }

        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const updateUserProfile = createAsyncThunk('auth/updateUserProfile', async (userData, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const token = state.auth.token;

        const response = await fetch(`${API_URL}/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update profile');
        }

        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});


const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.token = action.payload.token;
                localStorage.setItem('user', JSON.stringify(action.payload));
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.token = action.payload.token;
                localStorage.setItem('user', JSON.stringify(action.payload));
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get User Profile
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = { ...state.user, ...action.payload };
                localStorage.setItem('user', JSON.stringify({ ...state.user, ...action.payload }));
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update User Profile
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.token = action.payload.token;
                localStorage.setItem('user', JSON.stringify(action.payload));
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;

