# Pokédex Lite

A lightweight Pokédex web app built with **Next.js**, **TailwindCSS**, and **JavaScript**.

## Features

- Browse all Pokémon with sprites and type badges
- Search by name (live filter)
- Filter by type (18 types supported)
- Pagination — 20 per page
- Favorite Pokémon — saved in `localStorage`
- Detail modal with stats, abilities, height, weight
- SSR detail page at `/pokemon/[id]` (bonus)
- Fully responsive (mobile → desktop)
- Smooth animations (card hover, modal open/close)

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Install dependencies

```bash
cd pokedex-lite
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

## Project Structure

```
pokedex-lite/
├── app/
│   ├── layout.js           # Root layout + font + metadata
│   ├── page.js             # Home page (listing, search, filter, pagination)
│   ├── globals.css         # Global styles + animations
│   └── pokemon/[id]/
│       └── page.js         # SSR detail page (bonus)
├── components/
│   ├── Navbar.jsx          # Search bar + logo + favorites toggle
│   ├── TypeFilter.jsx      # Type filter pill buttons
│   ├── PokemonCard.jsx     # Individual card
│   ├── PokemonGrid.jsx     # Responsive card grid
│   ├── Pagination.jsx      # Prev / page numbers / Next
│   ├── PokemonModal.jsx    # Detail modal with stats bars
│   ├── LoadingSpinner.jsx  # Loading state
│   └── ErrorMessage.jsx    # Error state
├── hooks/
│   ├── usePokemon.js       # Main data hook (pagination + type + search)
│   ├── useFavorites.js     # localStorage favorites
│   └── usePokemonDetail.js # Single Pokémon detail fetcher
└── lib/
    ├── api.js              # All PokéAPI fetch helpers
    └── constants.js        # Type colors, page size, etc.
```

## API

Data sourced from [PokéAPI](https://pokeapi.co/) — free, no key required.
