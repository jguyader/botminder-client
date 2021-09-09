import { Component } from '@angular/core';
import { UserService } from '../../@core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../@core/services/auth.service';

@Component({
    selector: 'app-delete-account-modal',
    templateUrl: './delete-account-modal.component.html'
})
export class DeleteAccountModalComponent {
    public constructor(private readonly userService: UserService,
                       private readonly snackBar: MatSnackBar,
                       private readonly translate: TranslateService,
                       private readonly authService: AuthService) {
    }

    public softDelete(): void {
        this.userService.softDelete().subscribe(() => this.authService.logout());
    }

    public hardDelete(): void {
        this.userService.hardDelete().subscribe(() => this.authService.logout());
    }
}
