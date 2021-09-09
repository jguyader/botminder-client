import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DarkThemeService {
    public isDarkTheme$: BehaviorSubject<boolean>
        = new BehaviorSubject<boolean>(localStorage.getItem('darkTheme') === 'true');

    constructor() {
    }

    public setDarkTheme(dark: boolean) {
        localStorage.setItem('darkTheme', dark.toString());
        this.isDarkTheme$.next(dark);
    }
}
