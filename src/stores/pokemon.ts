import { defineStore } from 'pinia';
import { getAllPokemonNames, getPokemon, getSpecies, pickEnglishFlavorText } from '../services/api';

export const usePokemonStore = defineStore('pokemon', {
    state: () => ({
        list: [] as { name: string; url: string }[],
        details: new Map<string, { id: number; name: string; image: string | null; flavor: string | null }>(),
        loaded: false,
    }),
    actions: {
        async ensureList() {
            if (this.loaded) return;
            this.list = await getAllPokemonNames();
            this.loaded = true;
        },
        async loadDetail(name: string) {
            const key = name.toLowerCase();
            if (this.details.has(key)) return this.details.get(key);
            console.log(name, key)
            const p = await getPokemon(key);
            const s = await getSpecies(p.id);
            const obj = {
                id: p.id,
                name: p.name,
                image: p.sprites.front_default,
                flavor: pickEnglishFlavorText(s),
            };
            this.details.set(key, obj);
            return obj;
        },
    },
});
