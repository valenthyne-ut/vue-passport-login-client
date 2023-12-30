import { User } from "@/classes/User";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStateStore = defineStore("authState", () => {
	const authenticated = ref(false);
	const jwtToken = ref("");
	const user = ref<User | undefined>(undefined);

	return { authenticated, jwtToken, user };
});