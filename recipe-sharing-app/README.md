# Recipe Sharing Application

A modern React application for sharing and managing recipes, built with Vite and Zustand for state management.

## Features

- ✅ Add new recipes with title and description
- ✅ View all recipes in a clean, organized list
- ✅ View detailed recipe information
- ✅ Edit existing recipes
- ✅ Delete recipes
- ✅ Responsive design
- ✅ Client-side routing with React Router

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and development server
- **Zustand** - State management
- **React Router DOM** - Client-side routing
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ibrsiaika/alx-fe-reactjs.git
cd alx-fe-reactjs/recipe-sharing-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── AddRecipeForm.jsx    # Form to add new recipes
│   ├── RecipeList.jsx       # Display list of recipes
│   ├── RecipeDetails.jsx    # Show detailed recipe view
│   ├── EditRecipeForm.jsx   # Form to edit existing recipes
│   ├── DeleteRecipeButton.jsx # Button to delete recipes
│   └── recipeStore.js       # Zustand store for state management
├── App.jsx                  # Main application component
├── main.jsx                # Application entry point
└── App.css                 # Application styles
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Expanding the Application

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) and add `plugin:react-hooks/recommended` to the `extends` list

## License

This project is part of the ALX Frontend React.js curriculum.
