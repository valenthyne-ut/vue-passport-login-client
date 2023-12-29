<script setup lang="ts">
import { ref } from "vue";
import { AuthAPI } from "@/classes/api/Auth";

const username = ref<string>("");
const password = ref<string>("");
const errorText = ref<string>("");

const authApi = new AuthAPI();

const attemptLogin = async () => {
	try {
		await authApi.login(username.value, password.value);
	} catch(error) {
		errorText.value = error as string;
	}
};
</script>

<template>
	<form>
		<p class="error-message">{{ errorText }}</p>
		<label for="username">Username</label><br>
		<input type="text" name="username"><br><br>
		<label for="password">Password</label><br>
		<input type="password" name="password"><br><br>
		<button type="button" @click="attemptLogin">Submit</button>
	</form>
</template>

<style scoped>
p.error-message {
	color: red;
}
</style>