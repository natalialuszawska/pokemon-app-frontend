<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import SearchInput from '../components/SearchInput.vue';
import PokemonModal from '../components/PokemonModal.vue';
import { usePokemonStore } from '../stores/pokemon';

const store = usePokemonStore();

const q = ref('');
const selected = ref<string | null>(null);
const selectedData = ref<{ name: string; image: string | null; flavor: string | null } | null>(null);
const loadingModal = ref(false);
const errorModal = ref<string | null>(null);

onMounted(() => store.ensureList());

const results = computed(() => {
  const s = q.value.toLowerCase();
  if (!s) return [];
  return store.list.filter(p => p.name.includes(s)).slice(0, 50);
});

async function openModal(name: string) {
  selected.value = name;
  loadingModal.value = true;
  errorModal.value = null;
  try {
    const d = await store.loadDetail(name);
    selectedData.value = { name: d?.name || '', image: d?.image || null, flavor: d?.flavor || null };
  } catch (e) {
    errorModal.value = 'Failed to download data.';
  } finally {
    loadingModal.value = false;
  }
}
</script>

<template>
    <div class="background">
        <div class="main-content">
    <SearchInput v-model="q" @debounced="v => q = v" />

    <ul v-if="results.length">
      <li v-for="p in results" :key="p.name">
        <button class="row" @click="openModal(p.name)">
          <span style="text-transform: capitalize">{{ p.name }}</span>
        </button>
      </li>
    </ul>

    <PokemonModal
      v-if="selected"
      :open="!!selected"
      :name="selectedData?.name ?? selected"
      :image="selectedData?.image ?? null"
      :flavor="selectedData?.flavor ?? null"
      @close="selected = null"
    />
    <div v-if="loadingModal">Ładowanie…</div>
    <div v-if="errorModal" style="color:#c00">{{ errorModal }}</div>
  </div>

    </div>
</template>

<style>
.background {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.background::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url('@/assets/pokeball-1594373.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 50%;
  opacity: 0.15;
  z-index: -1;
}
.main-content{
    display:grid; 
    gap:16px; 
    padding-top:60px;
    z-index: 1;
}
.row{
    width:100%;
    text-align:left;
    padding:10px 12px;
    border:1px solid #eee;
    background:#fff;
    border-radius:8px;
    margin:6px 0;
    cursor:pointer}
.row:hover{
    background:#f7f7f7
    }
</style>
