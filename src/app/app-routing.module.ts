import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { SigninComponent }      from './signin/signin.component';
import { SignupComponent }      from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './@core/guards/auth.guard';

const routes: Routes = [
    {
        path: 'signup',
        component: SignupComponent,
        canActivate: [AuthGuardService],
        data: {
            authNeeded: false
        }
    },
    {
        path: 'signin',
        component: SigninComponent,
        canActivate: [AuthGuardService],
        data: {
            authNeeded: false
        }
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuardService],
        data: {
            authNeeded: true
        }
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService],
        data: {
            authNeeded: true
        }
    },
    {
        path: '**',
        redirectTo: '/dashboard'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
