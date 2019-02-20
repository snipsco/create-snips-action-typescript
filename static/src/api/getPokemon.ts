import { httpFactory } from '../factories'

// Get a Pokemon by its id.
export function getPokemon (id: string) {
    const http = httpFactory.get()
    return http.url(`/pokemon/${id}/`).get().json()
}