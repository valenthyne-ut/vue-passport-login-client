<script setup lang="ts">
	import { AuthAPI } from "@/classes/api/Auth";
	import router from "@/router";
	import { useAuthStateStore } from "@/stores/authState.store";

	const authAPI = new AuthAPI();
	const authStore = useAuthStateStore();

	const logout = async () => {
		try {
			await authAPI.logout(authStore.jwtToken);

			authStore.authenticated = false;
			authStore.jwtToken = "";
			authStore.user = undefined;

			router.push({ path: "/login" });
		} catch(error) {
			console.log(error as string);
		}
	};
</script>;

<template>
	<button class="w-full rounded-md bg-red-600 text-white text-xl py-2 mt-4 mb-2" @click="logout">Logout</button>
</template>