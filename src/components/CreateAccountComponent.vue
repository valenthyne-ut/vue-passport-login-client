<script setup lang="ts">
import { ref } from "vue";

const username = ref<string | undefined>(undefined);
const password = ref<string | undefined>(undefined);
</script>

<template>
	<div>
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