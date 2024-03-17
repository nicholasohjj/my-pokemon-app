# Pokémon Details Website

This project is a Pokémon details site, created with [Next.js](https://nextjs.org/), and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
## Getting Started

To launch the development server and begin exploring the Pokémon universe, follow these steps:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Visit [http://localhost:3000](http://localhost:3000/) in your browser to view the website. Use the search bar to filter through Pokémon and find your favourite Pokemons faster.

## **Features**

- **Home Page**: Displays all Pokémon in an interactive card format, with a search bar for easy filtering.
- **Dynamic Pokémon Detail Pages**: Click on any Pokémon card to navigate to a dynamic page at **`/pokemon/{id}`**. Each page provides detailed information and a sprite image of the selected Pokémon.
- **Easy Navigation**: A link back to the Home page is available on each Pokémon's detail page for convenient browsing.
- **Optimized Fonts**: Utilizes **`[next/font](https://nextjs.org/docs/basic-features/font-optimization)`** to automatically optimize and load Inter, a custom Google Font, enhancing the site's typography.