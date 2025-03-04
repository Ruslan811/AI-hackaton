<template>
    <div class="flex">
        <aside class="w-64 bg-gray-800 text-white p-4">
            <h2 class="text-lg font-bold mb-4">Админка</h2>
            <nav>
                <router-link to="/admin/users" class="block py-2">Пользователи</router-link>
                <router-link to="/admin/messages" class="block py-2">Сообщения</router-link>
                <router-link to="/admin/places" class="block py-2">Места</router-link>
                <router-link to="/logout" class="block py-2">Выход</router-link>
            </nav>
        </aside>
        <main class="flex-1 p-4">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
export default { name: "AdminLayout" };
</script>
