<script setup lang="ts">
	import { AuthAPI } from "@/classes/api/Auth";
	import LogoutButtonComponent from "@/components/LogoutButtonComponent.vue";
	import { useAuthStateStore } from "@/stores/authState.store";
	import { onMounted, ref } from "vue";

	const username = ref<string>("");
	const roles = ref<Array<string>>([]);
	const errorText = ref<string>("");

	const authAPI = new AuthAPI();
	const authStore = useAuthStateStore();

	onMounted(async () => {
		errorText.value = "";
		try {
			const result = await authAPI.getAuthDetails(authStore.jwtToken);
			username.value = result.user.name;
			roles.value = result.user.roles;
		} catch(error) {
			errorText.value = error as string;
		}
	});	
</script>

<template>
	<main>
		<p class="error-message">{{ errorText }}</p>
		<div class="account-details" v-if="username && roles">
		<br>Your account details:<br>
		<span>
			<strong>Username:</strong> {{ username }}
		</span><br>		
		<span>
			<strong>Roles:</strong> <ul><li v-for="role, index in roles" :key="index">{{ role }}</li></ul>
		</span>
		</div>
		<LogoutButtonComponent/>
	</main>
</template>

<style scoped>
p.error-message {
	color: red;
}
</style>