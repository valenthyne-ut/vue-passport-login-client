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
			if(error instanceof Error) {
				errorText.value = error.message;
			} else if(typeof error === "string") {
				errorText.value = error;
			}
		}
	});	
</script>

<template>
	<main class="h-screen flex justify-center items-center">
		<div class="w-96 bg-white p-7 rounded-sm shadow-sm">
			<div class="bg-red-200 border rounded border-red-400 text-center p-4 mb-4" v-if="errorText">
				<span class="text-red-950">{{ errorText }}</span>
			</div>
			<h1 class="text-2xl font-medium text-center">Your account details</h1>
			<div class="flex flex-col mt-4">
				<span>
					<strong>Username: </strong> {{ username }}
				</span>
				<span>
					<strong>Role(s): </strong> {{ roles.join(", ") }}
				</span>
			</div>
			<LogoutButtonComponent/>
		</div>
	</main>
</template>

<style scoped>
p.error-message {
	color: red;
}
</style>