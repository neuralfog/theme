type ThemeConfig = {
    light: CSSStyleSheet;
    dark: CSSStyleSheet;
};

type Theme = 'light' | 'dark' | 'system';

type ColorScheme = 'light' | 'dark';

type UseTheme = {
    themes: Theme[];
    activeTheme: Theme;
    activeColorScheme: ColorScheme;
    changeTheme: (theme: string) => void;
};

class ThemeProvider {
    private $colorSchemes = new Map<ColorScheme, CSSStyleSheet>();
    private $activeTheme: Theme;
    private $activeColorScheme: ColorScheme;

    constructor(
        private config: ThemeConfig,
        private localStorageKey: string,
    ) {
        this.initColorSchemes();
        this.$activeTheme = this.getTheme();
        this.$activeColorScheme = this.getColorScheme();
        this.adoptColorScheme();

        this.initColorSchemeListener();
    }

    get themes(): Theme[] {
        return ['light', 'dark', 'system'];
    }

    get activeTheme(): Theme {
        return this.$activeTheme;
    }

    get activeColorScheme(): ColorScheme {
        return this.$activeColorScheme;
    }

    private initColorSchemes(): void {
        for (const [key, styleSheet] of Object.entries(this.config)) {
            this.$colorSchemes.set(key as ColorScheme, styleSheet);
        }
    }

    private colorSchemeExists(colorScheme: ColorScheme): void {
        if (!this.$colorSchemes.has(colorScheme)) {
            throw new Error(`ColorScheme "${colorScheme}" does not exist`);
        }
    }

    private themeExists(theme: Theme): void {
        if (
            theme !== ('light' as Theme) &&
            theme !== ('dark' as Theme) &&
            theme !== ('system' as Theme)
        ) {
            throw new Error(`Theme "${theme}" does not exist`);
        }
    }

    private checkPrefferedSystemColorScheme(): ColorScheme {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    }

    private getTheme(): Theme {
        const storedTheme = localStorage.getItem(this.localStorageKey);
        return (storedTheme as Theme) || 'light';
    }

    private getColorScheme(): ColorScheme {
        if (this.activeTheme === 'system') {
            return this.checkPrefferedSystemColorScheme();
        }
        return this.activeTheme;
    }

    private adoptColorScheme(): void {
        this.colorSchemeExists(this.$activeColorScheme);
        const styleSheet = this.$colorSchemes.get(this.$activeColorScheme);
        if (styleSheet) document.adoptedStyleSheets = [styleSheet];
    }

    private storeTheme(theme: Theme): void {
        this.themeExists(theme);
        localStorage.setItem(this.localStorageKey, theme);
    }

    private initColorSchemeListener = (): void => {
        const darkModeMediaQuery = window.matchMedia(
            '(prefers-color-scheme: dark)',
        );

        darkModeMediaQuery.addEventListener('change', (event) => {
            if (event.matches) {
                this.changeTheme('dark');
            } else {
                this.changeTheme('light');
            }
        });
    };

    changeTheme = (theme: string): void => {
        const th = theme as Theme;
        this.storeTheme(th);
        this.$activeTheme = th;
        this.$activeColorScheme = this.getColorScheme();
        this.adoptColorScheme();
    };
}

let theme: ThemeProvider;

export const initTheme = (
    config: ThemeConfig,
    localStorageKey = 'theme-provider',
): void => {
    theme = new ThemeProvider(config, localStorageKey);
};

export const useTheme = (): UseTheme => {
    return {
        themes: theme.themes,
        activeTheme: theme.activeTheme,
        activeColorScheme: theme.activeColorScheme,
        changeTheme: theme.changeTheme,
    };
};
