<script setup lang="ts">
</script>

<template>
	<form>
		<p class="error-message"></p>
		<label for="username">Username</label><br>
		<input type="text" name="username"><br><br>
		<label for="password">Password</label><br>
		<input type="password" name="password"><br><br>
		<button type="button">Submit</button>
	</form>
</template>

<style scoped>
p.error-message {
	color: red;
}
</style>