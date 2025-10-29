const API = import.meta.env.dev.VITE_API_BASE ?? '/api'

export type PokemonBasic = { name: string; url: string };
export type PokemonDetail = {
    id: number; name: string; sprites: { front_default: string | null };
};
export type Species = {
    flavor_text_entries: Array<{ flavor_text: string; language: { name: string } }>;
};

export async function getAllPokemonNames(): Promise<PokemonBasic[]> {
    const res = await fetch(`${API}/pokemon?limit=10000&offset=0`);
    if (!res.ok) {
        throw new Error('Failed to load Pokemon list');
    }
    const data = await res.json();
    return data.results as PokemonBasic[];
}

export async function getPokemon(name: string): Promise<PokemonDetail> {
    const res = await fetch(`${API}/pokemon/${name.toLowerCase()}`);
    if (!res.ok) throw new Error('NOT_FOUND');
    return res.json();
}

export async function getSpecies(nameOrId: string | number): Promise<Species> {
    const res = await fetch(`${API}/pokemon-species/${nameOrId}`);
    if (!res.ok) throw new Error('NOT_FOUND');
    return res.json();
}

export function pickEnglishFlavorText(species: Species): string | null {
    const entry = species.flavor_text_entries.find(e => e.language.name === 'en');
    return entry ? entry.flavor_text.replace(/[\n\f]/g, ' ').trim() : null;
}
