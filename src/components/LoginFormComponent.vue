<script setup lang="ts">
	import { ref } from "vue";
	import { AuthAPI } from "@/classes/api/Auth";
	import { useAuthStateStore } from "@/stores/authState.store";
	import router from "@/router";

	const username = ref<string>("");
	const password = ref<string>("");
	const errorText = ref<string>("");

	const authAPI = new AuthAPI();
	const authStore = useAuthStateStore();

	const attemptLogin = async () => {
		try {
			const response = await authAPI.login(username.value, password.value);
			
			authStore.authenticated = true;
			authStore.jwtToken = response.jwtToken;
			authStore.user = response.user;

			router.push({ path: "/" });
		} catch(error) {
			errorText.value = error as string;
		}
	};
</script>

<template>
	<form>
		<p class="error-message">{{ errorText }}</p>
		<label for="username">Username</label><br>
		<input type="text" name="username" v-model="username"><br><br>
		<label for="password">Password</label><br>
		<input type="password" name="password" v-model="password"><br><br>
		<button type="button" @click="attemptLogin">Submit</button>
	</form>
</template>

<style scoped>
p.error-message {
	color: red;
}
</style>