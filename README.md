# Elemix Theme Provider

A lightweight theme management package for the Elemix framework that leverages the Constructable Stylesheet API to enable dynamic switching between light, dark, and system themes.

## Features

- **Multiple Themes:** Supports light, dark, and system themes.
- **Dynamic Switching:** Easily change themes on the fly.
- **System Integration:** Automatically detects the user’s preferred color scheme.
- **Efficient Styling:** Uses Constructable Stylesheets for improved performance and encapsulation.

---

## Installation

Install the package via npm:

```bash
npm install @neuralfog/theme-provider
```

---

## Usage

### Step 1: Create Your Stylesheets

The package relies on the Constructable Stylesheet API. Create a `CSSStyleSheet` for each theme:

```js
// Create a stylesheet for the light theme
const lightStyleSheet = new CSSStyleSheet();
lightStyleSheet.replaceSync(`
:root {
    --main: white;
    --primary: #76abae;
}
`);

// Create a stylesheet for the dark theme
const darkStyleSheet = new CSSStyleSheet();
darkStyleSheet.replaceSync(`
:root {
    --main: #222831;
    --primary: #76abae;
}
`);

// Vite usage
import css from './light.scss?inline';

const lightStyleSheet = new CSSStyleSheet();
darkStyleSheet.replaceSync(css);
```

### Step 2: Initialize the Theme Provider

Import and initialize the theme provider with your stylesheets:

```js
import { initTheme } from '@neuralfog/theme-provider';

initTheme({
  light: lightStyleSheet,
  dark: darkStyleSheet,
});
```

### Step 3: Using the Theme in Your Application

Retrieve theme data and change the theme dynamically:

```js
import { useTheme } from '@neuralfog/theme-provider';

const { activeTheme, activeColorScheme, themes, changeTheme } = useTheme();

console.log('Available themes:', themes);
console.log('Current active theme:', activeTheme);
console.log('Current active color scheme:', activeColorScheme);

// Example: Switch to dark theme manually
changeTheme('dark');
```

---

## API Reference

### Types

- **ThemeConfig**:  
  An object containing:
  - `light: CSSStyleSheet` – Stylesheet for the light theme.
  - `dark: CSSStyleSheet` – Stylesheet for the dark theme.

- **Theme**:  
  A union type: `'light' | 'dark' | 'system'`.

- **ColorScheme**:  
  A union type: `'light' | 'dark'`.

- **UseTheme**:  
  An object returned by `useTheme()` containing:
  - `themes: Theme[]` – An array of available themes.
  - `activeTheme: Theme` – The currently active theme.
  - `activeColorScheme: ColorScheme` – The currently active color scheme.
  - `changeTheme: (theme: string) => void` – Function to switch themes.

### Main Components

- **ThemeProvider Class**:  
  Manages theme initialization, storage, and dynamic switching. It listens for system color scheme changes and updates the active theme accordingly.

- **initTheme(config: ThemeConfig, localStorageKey?: string): void**:  
  Initializes the theme provider with the provided configuration. The optional `localStorageKey` is used to store the user’s theme preference.

- **useTheme(): UseTheme**:  
  Provides the current theme details along with a function to change the theme.

---

## CSSStyleSheet

The **CSSStyleSheet** object is part of the Constructable Stylesheet API, which allows you to create and manage stylesheets directly in JavaScript. 

[CSSStyleSheet](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/CSSStyleSheet)

## License

This project is licensed under the MIT License.

---

