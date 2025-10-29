<script setup lang="ts">
import { ref, watch } from 'vue';

const model = defineModel<string>({ default: '' });
const emit = defineEmits<{ (e: 'debounced', value: string): void }>();

const debounced = ref('');
let t: number | undefined;

watch(model, (v) => {
  clearTimeout(t);
  t = window.setTimeout(() => {
    debounced.value = v.trim();
    emit('debounced', debounced.value);
  }, 250);
});
</script>

<template>
    <div class="search-input">
        <input
        v-model="model"
        placeholder="Search for Pokemon..."
        class="search"
        autofocus
        />
    </div>
</template>

<style>
.search{ 
    width:60%;
    padding:12px 16px;
    font-size:16px;
    border:1px solid #ccc;
    border-radius:8px;
}
.search-input{
    display:flex;
    justify-content:center;
}
</style>