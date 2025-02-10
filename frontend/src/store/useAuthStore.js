import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingUp: false,
  isCheckingAuth: true,
  isUpdatingProfile: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/user/checkAuth");
      set({ authUser: res.data.data });
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async ({ fullName, email, password }) => {
    set({ isSigningUp: true });

    try {
      const userResponse = await axiosInstance.post(
        "/user/signup",
        {
          fullName,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      set({ authUser: userResponse.data.data });
      toast.success("Account created successfully");
    } catch (error) {
      console.log("error aaya hai : ", error.response.data.message);
      if (!error.response.data.message) return toast.error("Network Error");
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/user/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  login: async (data) => {
    set({ isLoggingUp: true });
    try {
      const response = await axiosInstance.post("/user/login", data, {
        headers: { "Content-Type": "application/json" },
      });
      set({ authUser: response.data.data });
      toast.success("Login successfull");
    } catch (error) {
      toast.error(error.response.data.message || "Internal server error");
    } finally {
      set({ isLoggingUp: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });

    try {
      const response = await axiosInstance.put("/user/update-profile", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      set({ authUser: response.data.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("updatingProfile error: ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
