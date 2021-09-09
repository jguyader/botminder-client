import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../@shared/shared.module';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';
import { LikeService } from './services/like.service';
import { DarkThemeService } from './services/dark-theme.service';
import { AuthGuardService } from './guards/auth.guard';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
    declarations: [],
    imports: [
        SharedModule
    ],
    exports: [],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
        UserService,
        AuthService,
        PostService,
        LikeService,
        DarkThemeService,
        AuthGuardService
    ]
})
export class CoreModule {
}
