import { DOCUMENT, inject, Injectable, Renderer2, RendererFactory2 } from "@angular/core";


 const DARK_MODE_CLASS = 'dark-mode';
 const THEME_KEY = 'ZAKRA_THEME';


@Injectable({
    providedIn: 'root'
})
export class ThemeService{
    
    readonly #document = inject(DOCUMENT)

    toggleDarkMode(){
        const theme = localStorage.getItem(THEME_KEY)
        if (theme === DARK_MODE_CLASS) {
            this.#document.body.classList.remove(DARK_MODE_CLASS);
            localStorage.setItem(THEME_KEY, 'light')
        } else {
            this.#document.body.classList.add(DARK_MODE_CLASS);
            localStorage.setItem(THEME_KEY, DARK_MODE_CLASS)
        }
    }
}