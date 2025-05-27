<template>
    <div class="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg shadow">
        <input v-model="url" @keydown.enter="navigate" type="text"
            class="flex-1 p-2 border text-slate-500 dark:text-white border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-600"
            placeholder="Digite a URL aqui" />
        <button @click="navigate"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
            Ir
        </button>
    </div>
</template>

<script setup lang="ts">
const url = ref('');

function navigate() {
    console.log('Navegando para:', url.value)
    if (!url.value) return

    // Adiciona http se não tiver
    const formattedUrl = url.value.startsWith('http') ? url.value : `https://${url.value}`

    // ENVIA a URL via IPC
    window.electronAPI?.send('navigate-url', formattedUrl)
};
</script>