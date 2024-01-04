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
		errorText.value = "";
		try {
			const response = await authAPI.login(username.value, password.value);
			
			authStore.authenticated = true;
			authStore.jwtToken = response.jwtToken;
			authStore.user = response.user;

			router.push({ path: "/" });
		} catch(error) {
			if(error instanceof Error) {
				errorText.value = error.message;
			} else if(typeof error === "string") {
				errorText.value = error;
			}
		}
	};
</script>

<template>
	<div class="h-screen flex justify-center items-center">
		<form class="w-96 bg-white p-6 rounded-md shadow-sm">
			<div class="bg-red-200 border rounded border-red-400 text-center p-4 mb-4" v-if="errorText">
				<span class="text-red-950">{{ errorText }}</span>
			</div>
			<h1 class="text-2xl font-medium text-center">Login</h1>
			<div class="flex flex-col mt-4">
				<label class="hidden" for="username">Username</label>
				<input class="border rounded px-2 py-2 outline outline-4 outline-transparent focus:outline-blue-500/75" type="text" id="username" name="username" placeholder="Username" v-model="username">
			</div>
			<div class="flex flex-col mt-1">
				<label class="hidden" for="password">Password</label>
				<input class="border rounded px-2 py-2 outline outline-4 outline-transparent focus:outline-blue-500/75" type="password" id="password" name="password" placeholder="Password" v-model="password">
			</div>
			<button class="w-full border rounded-md bg-blue-600 text-white text-xl py-2 mt-4 mb-2" type="button" @click="attemptLogin">Submit</button>
			<RouterLink class="inline-block text-sm text-blue-500 mt-1" to="create_account">Create account</RouterLink>
		</form>
	</div>
</template>