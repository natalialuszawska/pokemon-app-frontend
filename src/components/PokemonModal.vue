<script setup lang="ts">
const { open, name, image, flavor } = defineProps<{
  open: boolean;
  name: string;
  image: string | null;
  flavor: string | null;
}>();
const emit = defineEmits<{ (e: 'close'): void }>();
</script>

<template>
  <div v-if="open" class="overlay" @click.self="emit('close')">
    <div class="modal">
      <img v-if="image" :src="image" :alt="name" width="120" height="120" />
      <h2 style="text-transform: capitalize">{{ name }}</h2>
      <p v-if="flavor">{{ flavor }}</p>
      <router-link :to="`/pokemon/${name}`" class="btn">See details</router-link>
      <button class="btn outline" @click="emit('close')">Close</button>
    </div>
  </div>
</template>

<style>
.overlay{
    position:fixed;
    inset:0;
    background:#0006;
    display:flex;
    align-items:center;
    justify-content:center;
}
.modal{
    background:#fff;
    border-radius:12px;
    padding:24px;
    max-width:520px;
    width:100%;
    display:grid;
    gap:12px;
    place-items:center;
}

</style>
