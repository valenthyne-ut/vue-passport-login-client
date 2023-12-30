import { User } from "@/classes/User";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStateStore = defineStore("authState", () => {
	const authenticated = ref(false);
	const user = ref<User | undefined>(undefined);

	return { authenticated, user };
});