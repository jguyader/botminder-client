import { Component } from '@angular/core';
import { DarkThemeService } from './@core/services/dark-theme.service';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent {
    title = 'frontend-botmind';

    public constructor(darkThemeService: DarkThemeService) {
        darkThemeService.isDarkTheme$.subscribe((isDarkTheme: boolean) => {
            document.body.classList.add(isDarkTheme ? 'dark' : 'light');
            document.body.classList.remove(isDarkTheme ? 'light' : 'dark');
        })
    }
}
