import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Chat from "./components/Chat.vue";
import Login from "./components/Login.vue";

// Импорт админских страниц
import AdminIndex from "./components/Admin/Index.vue";
import UserIndex from "./components/Admin/User/Index.vue";
import MessageIndex from "./components/Admin/Message/Index.vue";
import PlaceIndex from "./components/Admin/Place/Index.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/chat", component: Chat },
    { path: "/login", component: Login },

    {
        path: "/admin",
        component: AdminIndex,
        children: [
            { path: "users", name: "admin.user.index", component: UserIndex },
            { path: "messages", name: "admin.message.index", component: MessageIndex },
            { path: "places", name: "admin.place.index", component: PlaceIndex },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
