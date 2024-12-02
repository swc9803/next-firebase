import { create } from "zustand";

const useSidebarStore = create((set) => ({
	sidebarOpen: true,
	toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

export default useSidebarStore;
