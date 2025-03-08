## Theme Context

- [] Has to be registrable with initApp => key: `theme`
- [] Theme files should be separate .scss files
- [] Register themes as key value pair ex: `{ light: CSSStylesheet }`
- [] Theme file to only hold css variables, css variables can pierce shadow dom :tada:
- [] On theme change adopt theme file on document
- [] Initial load adopt document styles before app loads, most likely before entry point
- [] Make entry point mandatory, if not provided throw!!
- [] Detection for theme system settings with media queries :thinking:
- [] Theme listing => list only keys
- [] Expose a function to change theme const changeTheme: (theme: string) => void 
- [] Write as simple class with exposed initialization function
- [] Add option for system theme

Theme check:
```js
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  console.log("Dark mode is enabled");
} else {
  console.log("Light mode is enabled");
}

const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

darkModeMediaQuery.addEventListener('change', event => {
  if (event.matches) {
    console.log("Switched to dark mode");
  } else {
    console.log("Switched to light mode");
  }
});

```
