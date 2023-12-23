<script setup lang="ts">
</script>

<template>
	<ul>
		<li>
			<RouterLink to="/">Home</RouterLink>
		</li>
		<li>
			<RouterLink to="/login">Login</RouterLink>
		</li>
		<li>
			<RouterLink to="/create_account">Create account</RouterLink>
		</li>
	</ul>
	<hr>
	<RouterView />
</template>