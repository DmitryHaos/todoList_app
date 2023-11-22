import { createWebHistory, createRouter } from "vue-router";
import store from "@/store/index";

import Login from "@/views/Login";
import Register from "@/views/Register";
import Profile from "@/views/Profile";
import Todos from "@/views/Todos";
import Tasks from "@/views/Tasks";

const routes = [
	{
		path: "/",
		name: "title"
	},
	{
		path: "/:pathMatch(.*)*",
		name: "notFound",
		component: () => import("@/views/NotFound"),
		meta: {
			title: "Страница не найдена"
		}
	},
	{
		path: "/login",
		name: "login",
		component: Login,
		meta: {
			title: "Вход в систему",
			isAll: true
		}
	},
	{
		path: "/register",
		name: "register",
		component: Register,
		meta: {
			title: "Регистрация",
			isAll: true
		}
	},
	{
		path: "/profile",
		name: "profile",
		component: Profile,
		meta: {
			title: "Профиль",
			requiredAuth: true
		}
	},
	{
		path: "/todos",
		name: "list-todo",
		component: Todos,
		meta: {
			title: "Списки дел",
			requiredAuth: true,
			isUser: true
		}
	},
	{
		path: "/todos/:id",
		name: "item-todo",
		component: Tasks,
		props: route => ({id: parseInt(route.params.id)}),
		meta: {
			title: "Список дел",
			requiredAuth: true,
			isUser: true
		}
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: "nav-active-link"
});

// Проверка условий
function check(to, user, next){
	if (to.meta.isAdmin && user.role !== "Администратор"){
		return next({ path: "/" });
	}
	if (to.meta.isUser && user.role !== "Пользователь"){
		return next({ path: "/" });
	}
	if (to.meta.isAll){
		return next({ path: "/" });
	}
	return next();
}

router.beforeEach(async (to, from, next) => {
	document.title = to.meta.title || 'Главная страница';

	// получаем статус авторизации, активность токена и пользователя
	const auth = store.state.auth.loggedIn;
	const tokenActive = await store.getters["auth/isTokenActive"];
	const user = JSON.parse(localStorage.getItem("user"));

	if (auth) {
		if (!tokenActive){
			await store.dispatch("auth/refreshToken", user)
				.then(() => {
					return check(to, user, next);
				})
				.catch(() => {
					return next({path: "/"});
				});
		}
		return check(to, user, next);
	}
	else if (!auth && to.meta.requiredAuth) {
		return next({ path: "/login" });
	}
	return next();
});

export default router;