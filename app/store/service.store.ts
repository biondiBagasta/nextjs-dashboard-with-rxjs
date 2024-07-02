import { AuthService } from "../services/auth.service";
import { create } from "zustand";
import { LocalStorageService } from "../services/local-storage.service";
import { CategoryService } from "../services/category.service";

interface ServiceState {
  authService: AuthService;
  localStorageService: LocalStorageService;
  categoryService: CategoryService;
}

export const userServiceStore = create<ServiceState>((set) => ({
  authService: new AuthService(),
  localStorageService: new LocalStorageService(),
  categoryService: new CategoryService()
}));