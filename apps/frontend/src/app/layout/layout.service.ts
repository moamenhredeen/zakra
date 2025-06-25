import {inject, Injectable} from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {

    #detailsPanelOpenedSubject = new BehaviorSubject(false)
    #router = inject(Router)

    get detailsPanelOpened$() {
        return this.#detailsPanelOpenedSubject.asObservable()
    }

    openDetailsPanel(){
        this.#detailsPanelOpenedSubject.next(true)
    }

    closeDetailsPanel() {
        this.#detailsPanelOpenedSubject.next(false)
        this.#router.navigate(['./', {outlets: { details: null}}])
    }
}
