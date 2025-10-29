<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePokemonStore } from '../stores/pokemon';

const route = useRoute();
const store = usePokemonStore();

const data = ref<{ name: string; image: string | null; flavor: string | null } | null>(null);
const error = ref<string | null>(null);
const loading = ref(true);

async function load() {
  loading.value = true; error.value = null; data.value = null;
  const name = String(route.params.name || '');
  try {
    const d = await store.loadDetail(name);
    data.value = { name: d?.name || '', image: d?.image || null, flavor: d?.flavor || null };
  } catch (e) {
    error.value = `Pokemon "${name}" doesn't exist.`;
  } finally {
    loading.value = false;
  }
}

onMounted(load);
watch(() => route.params.name, load);
</script>

<template>
  <div style="margin-top:40px">
    <router-link to="/" class="btn outline">← Back</router-link>

    <div v-if="loading" class="loading">Ładowanie…</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="data" class="card">
      <img v-if="data.image" :src="data.image" :alt="data.name" width="160" height="160" />
      <h1 style="text-transform: capitalize">{{ data.name }}</h1>
      <p v-if="data.flavor">{{ data.flavor }}</p>
    </div>
  </div>
</template>

<style>
.card{
  background:#fff;
  border:1px solid #eee;
  border-radius:12px;
  padding:24px;
  margin-top:16px}
.loading{
  font-size:24px;
  font-weight:bold;
  padding-top:16px;
}
.error{
  color:#c00;
  font-size:18px;
  font-weight:bold;
  padding-top:16px;
}
</style>
