import { Component } from '@angular/core';
import { DeleteAccountModalComponent } from './delete-account-modal/delete-account-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../@core/services/user.service';
import { User } from '../@shared/models/user.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent {
    public profile$: Observable<User>;

    public constructor(userService: UserService,
                       private readonly dialog: MatDialog) {
        this.profile$ = userService.getProfile();
    }

    public deleteAccount(): void {
        const dialogRef = this.dialog.open(DeleteAccountModalComponent);
    }
}
