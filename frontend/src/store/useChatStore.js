import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import axios from "axios";
export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });

    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    console.log("sending message ...");
    console.log(messageData);
    const { selectedUser, messages } = get();
    console.log(messages);
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      set({ message: [...messages, res.data] });
      toast.success("message sent successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      console.log("reached finally");
    }
  },
  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },
}));
