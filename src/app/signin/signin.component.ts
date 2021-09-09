import { Component }                                           from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar }                                         from '@angular/material/snack-bar';
import { Router }                                              from '@angular/router';
import { TranslateService }                                    from '@ngx-translate/core';
import { AuthService }                                         from '../@core/services/auth.service';
import { UserService }                                         from '../@core/services/user.service';

@Component({
    selector   : 'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent {
    public form: FormGroup;

    constructor(fb: FormBuilder,
                private readonly translate: TranslateService,
                private readonly router: Router,
                private readonly authService: AuthService,
                private readonly userService: UserService,
                private readonly snackBar: MatSnackBar) {
        this.form = fb.group({
            email   : [null, Validators.required],
            password: [null, Validators.required]
        });
    }

    public get emailControl(): AbstractControl {
        return this.form.controls['email'];
    }

    public get passwordControl(): AbstractControl {
        return this.form.controls['password'];
    }

    public onSubmit(): void {
        if (this.form.valid) {
            this.authService.post(this.form.value).subscribe(
                (res: any) => {
                    this.authService.login(res.token);
                    this.snackBar.open(this.translate.instant('auth.signin.success', { username: this.authService.getUsername() }));
                    this.router.navigate(['dashboard']);
                }
            );
        }
    }
}
