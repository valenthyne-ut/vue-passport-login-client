import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthStateStore } from "@/stores/authState.store";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView
		},
		{
			path: "/login",
			name: "login",
			component: () => import("../views/LoginView.vue")
		},
		{
			path: "/create_account",
			name: "create_account",
			component: () => import("../views/CreateAccountView.vue")
		}
	]
});

router.beforeEach(async (to, from) => {
	const authStore = useAuthStateStore();

	if(!authStore.authenticated && to.name == "home") {
		return { name: "login" };
	}
});

export default router;
