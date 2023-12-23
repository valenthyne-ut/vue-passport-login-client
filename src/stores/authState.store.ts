import { User } from "@/classes/User";
import { defineStore } from "pinia";
import { ref } from "vue";

const useAuthStateStore = defineStore("authState", () => {
	const authenticated = ref(false);
	const user = ref<User | undefined>(undefined);

	return { authenticated, user };
});