<script setup lang="ts">
	import { onBeforeMount } from "vue";
	import { useAuthStateStore } from "./stores/authState.store";
	import { AuthAPI } from "./classes/api/Auth";
	import router from "./router";

	const authAPI = new AuthAPI();
	const authStore = useAuthStateStore();

	onBeforeMount(async () => {
		document.addEventListener("visibilitychange", () => {
			if(document.visibilityState == "hidden" && authStore.jwtToken) { 
				localStorage.setItem("jwtToken", authStore.jwtToken); 
			}
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
				localStorage.removeItem("jwtToken");
				console.log(error);
			}
		}
	});
</script>

<template>
	<RouterView class="bg-slate-50 w-full h-screen"/>
</template>