<script setup lang="ts">
import { AuthAPI } from "@/classes/api/Auth";
import router from "@/router";
import { useAuthStateStore } from "@/stores/authState.store";

const authApi = new AuthAPI();
const authStore = useAuthStateStore();

const logout = async () => {
	try {
		await authApi.logout(authStore.jwtToken);

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
	<button @click="logout">Logout</button>
</template>