<script setup lang="ts">
	import { AccountAPI } from "@/classes/api/Account";
	import { ref } from "vue";

	const username = ref<string>("");
	const password = ref<string>("");
	const roles = ref<string[]>([]);
	const selectedRole = ref<string>("unselected");
	const errorText = ref<string>("");

	const accountAPI = new AccountAPI();
	const createNewAccount = async () => {
		errorText.value = "";
		try {
			const result = await accountAPI.createAccount(selectedRole.value);
			username.value = result.username;
			password.value = result.password;
			roles.value = result.roles;
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
		<div class="w-96 bg-white p-7 rounded-sm shadow-sm">
			<div class="bg-red-200 border rounded border-red-400 text-center p-4 mb-4" v-if="errorText">
				<span class="text-red-950">{{ errorText }}</span>
			</div>
			<RouterLink class="text-gray-400 text-sm" to="/login">Back to login</RouterLink>
			<div class="w-full flex justify-center space-x-4 mt-2">
				<div>
					<label class="select-none" for="role_select_user">User </label>
					<input type="radio" name="role_select" id="role_select_user" value="user" v-model="selectedRole">
				</div>
				<div>
					<label class="select-none" for="role_select_admin">Admin </label>
					<input type="radio" name="role_select" id="role_select_admin" value="admin" v-model="selectedRole">
				</div>
			</div>
			<button class="w-full border rounded-md bg-blue-600 text-white text-xl py-2 mt-4 mb-2" type="button" @click="createNewAccount">Create account</button>
			<div class="flex flex-col" v-if="username && password && roles">
				<hr class="my-4">
				<span>
					<strong>Username: </strong> {{ username }}
				</span>
				<span>
					<strong>Password: </strong> {{ password }}
				</span>
				<span>
					<strong>Role(s): </strong> {{ roles.join(", ") }}
				</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
p.error-message {
	color: red;
}
div.account-details > span {
	margin-left: 1em;
}
</style>