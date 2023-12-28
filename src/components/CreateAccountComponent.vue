<script setup lang="ts">
import { ref } from "vue";

const username = ref<string | undefined>(undefined);
const password = ref<string | undefined>(undefined);
</script>

<template>
	<div>
		<label for="role_select_admin">Admin</label>
		<input type="radio" name="role_select" id="role_select_admin" value="admin">
		<label for="role_select_user">User</label>
		<input type="radio" name="role_select" id="role_select_user" value="user"><br>
		<button type="button">Create new account</button>
		<div class="account-details" v-if="username && password">
			<br>Account details:
			<br><span><strong>Username:</strong> {{ username }}</span>
			<br><span><strong>Password:</strong> {{ password }}</span>
		</div>
	</div>
</template>

<style scoped>
div.account-details > span {
	margin-left: 1em;
}
</style>