import { HttpClient }          from '@angular/common/http';
import { NgModule }            from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule }          from './@core/core.module';
import { SharedModule }        from './@shared/shared.module';
import { AppRoutingModule }    from './app-routing.module';
import { AppComponent }        from './app.component';
import { CreatePostComponent } from './dashboard/create-post/create-post.component';
import { DashboardComponent }  from './dashboard/dashboard.component';
import { NavbarComponent }     from './navbar/navbar.component';
import { SigninComponent }     from './signin/signin.component';
import { SignupComponent }     from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { DeleteAccountModalComponent } from './profile/delete-account-modal/delete-account-modal.component';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        SigninComponent,
        SignupComponent,
        NavbarComponent,
        DashboardComponent,
        CreatePostComponent,
        ProfileComponent,
        DeleteAccountModalComponent
    ],
    imports     : [
        AppRoutingModule,
        CoreModule,
        SharedModule
    ],
    providers   : [],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule {

}
