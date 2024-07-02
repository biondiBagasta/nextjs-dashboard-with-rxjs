import { create } from "zustand";

interface AuthenticatedState {
	userState: UserSystem;
	setUserState: (user: UserSystem) => void
}

export const useAuthenticatedStore = create<AuthenticatedState>((set) => ({
	userState: {} as UserSystem,
	setUserState: (user) => set((state) => ({ userState: user }))
}));