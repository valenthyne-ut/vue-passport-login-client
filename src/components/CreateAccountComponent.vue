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
		if(typeof result === "string") {
			errorText.value = result;
		} else {
			username.value = result.username;
			password.value = result.password;
			roles.value = result.roles;
		}
	} catch(error) {
		console.log(error);
	}
};
</script>

<template>
	<div>
		<p class="error-message">{{ errorText }}</p>
		<label for="role_select_user">User</label>
		<input type="radio" name="role_select" id="role_select_user" v-model="selectedRole" value="user">
		<label for="role_select_admin">Admin</label>
		<input type="radio" name="role_select" id="role_select_admin" v-model="selectedRole" value="admin"><br>
		<button type="button" @click="createNewAccount">Create new account</button>

		<div class="account-details" v-if="username && password">
			<br>Account details:<br>
			<span>
				<strong>Username:</strong> {{ username }}
			</span><br>
			<span>
				<strong>Password:</strong> {{ password }}
			</span><br>
			<span>
				<strong>Roles:</strong> <ul><li v-for="role, index in roles" :key="index">{{ role }}</li></ul>
			</span>
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