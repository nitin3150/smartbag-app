import api from "@/utils/client";
import { signInWithGoogle, signOutFromGoogle } from "@/utils/googleSignIn";
import { logger } from "@/utils/logger";
import {
    clearTokens,
    saveAccessToken,
    saveRefreshToken,
} from "@/utils/tokenStorage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/auth.types";

const initialState: AuthState = {
    user: null,
    requirePhone: false,
    isAuthenticated: false,
    isLoading: true,
    error: null,
};

// Regular login
export const login = createAsyncThunk(
    "auth/login",
    async (
        credentials: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const { data } = await api.post("/auth/login", credentials);

            await saveAccessToken(data.access_token);
            await saveRefreshToken(data.refresh_token);

            return {
                user: data.user,
                requirePhone: data.requires_phone || false,
            };
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.detail || "Login failed"
            );
        }
    }
);

// Google login
export const googleLogin = createAsyncThunk(
    "auth/googleLogin",
    async (_, { rejectWithValue }) => {
        try {
            const googleResult = await signInWithGoogle();

            logger.info('Sending Google user to backend', {
                email: googleResult.user.email,
            });

            const payload = {
                user: {
                    id: googleResult.user.id,
                    googleId: googleResult.user.id,
                    email: googleResult.user.email,
                    name: googleResult.user.name || googleResult.user.email.split('@')[0],
                    photo: googleResult.user.photo,
                }
            };

            const { data } = await api.post("/auth/google", payload);

            await saveAccessToken(data.access_token);
            await saveRefreshToken(data.refresh_token);

            logger.info('Google login successful', {
                requiresPhone: data.requires_phone
            });

            return {
                user: {
                    id: googleResult.user.id,
                    email: googleResult.user.email,
                    name: googleResult.user.name || undefined, // Convert null to undefined
                    phone: undefined,
                    role: 'customer',
                },
                requirePhone: data.requires_phone,
            };
        } catch (err: any) {
            logger.error('Google login failed', err);
            return rejectWithValue(
                err.message || err.response?.data?.detail || "Google login failed"
            );
        }
    }
);

// Restore auth
export const restoreAuth = createAsyncThunk(
    "auth/restore",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/auth/profile");

            const hasRealPhone = data.phone &&
                !data.phone.startsWith('TEMP_') &&
                !data.phone_is_temporary;

            return {
                user: data,
                requirePhone: !hasRealPhone,
            };
        } catch (err) {
            return rejectWithValue("Session expired");
        }
    }
);

// Update profile
export const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async (name: string, { rejectWithValue }) => {
        try {
            const { data } = await api.put("/auth/profile", { name });
            return data;
        } catch (err: any) {
            return rejectWithValue("Update failed: " + err.response?.data?.detail);
        }
    }
);

// Logout
export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            logger.warn('Backend logout failed', error as Error);
        } finally {
            await clearTokens();
            await signOutFromGoogle();
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        forceLogout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.requirePhone = false;
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.isLoading = false;
                state.user = action.payload.user;
                state.requirePhone = action.payload.requirePhone;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Google Login
            .addCase(googleLogin.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.isLoading = false;
                state.user = action.payload.user;
                state.requirePhone = action.payload.requirePhone;
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Restore
            .addCase(restoreAuth.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.requirePhone = action.payload.requirePhone;
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(restoreAuth.rejected, (state) => {
                state.isLoading = false;
            })

            // Update Profile
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.user = action.payload.user;
            })

            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.requirePhone = false;
            });
    }
});

export const { clearError, forceLogout } = authSlice.actions;
export default authSlice.reducer;