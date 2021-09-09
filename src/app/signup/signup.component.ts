import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../@core/services/user.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})

export class SignupComponent {
    public passwordRegex: RegExp = new RegExp('^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,16}$');
    public form: FormGroup;

    constructor(fb: FormBuilder,
                private readonly router: Router,
                private readonly userService: UserService) {
        this.form = fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.pattern(this.passwordRegex)]],
            username: [null, Validators.required]
        });
    }

    public get emailControl(): AbstractControl {
        return this.form.controls['email'];
    }

    public get passwordControl(): AbstractControl {
        return this.form.controls['password'];
    }

    public get usernameControl(): AbstractControl {
        return this.form.controls['username'];
    }

    public onSubmit(): void {
        if (this.form.valid) {
            this.userService.post(this.form.value).subscribe(
                () => {
                    this.router.navigate(['signin']);
                }
            );
        }
    }
}
