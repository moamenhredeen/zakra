import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LayoutService {

    #detailsPanelOpenedSubject = new BehaviorSubject(false)
    
    get detailsPanelOpened$() {
        return this.#detailsPanelOpenedSubject.asObservable()
    }
    
    openDetailsPanel(){
        this.#detailsPanelOpenedSubject.next(true)
    }
    
    closeDetailsPanel() {
        this.#detailsPanelOpenedSubject.next(false)
    }
}