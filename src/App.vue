<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useAuthStateStore } from "./stores/authState.store";
import { AuthAPI } from "./classes/api/Auth";
import router from "./router";

const authAPI = new AuthAPI();
const authStore = useAuthStateStore();

onBeforeMount(async () => {
	window.addEventListener("beforeunload", () => {
		if(authStore.jwtToken) { localStorage.setItem("jwtToken", authStore.jwtToken); }
	});

	const jwtToken = localStorage.getItem("jwtToken");
	if(jwtToken && !authStore.authenticated) {
		try {
			const result = await authAPI.getAuthDetails(jwtToken);
			authStore.authenticated = true;
			authStore.jwtToken = jwtToken;
			authStore.user = result.user;
			localStorage.removeItem("jwtToken");
			router.push({ path: "/" });
		} catch(error) {
			console.log(error);
		}
	}
});
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