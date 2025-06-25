import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LoadingService {
    
    readonly #loading = signal<boolean>(false)
    readonly loading = this.#loading.asReadonly()
    
    startLoading() {
        this.#loading.set(true)
    }
    
    finishLoading(){
        this.#loading.set(false)
    }
}