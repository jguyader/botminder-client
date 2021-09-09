import { Pipe, PipeTransform } from '@angular/core';
import { AuthService }         from '../../@core/services/auth.service';

@Pipe({ name: 'isLoggedInUser', pure: false })
export class IsLoggedInUserPipe implements PipeTransform {
    constructor(private readonly authService: AuthService) {
    }

    transform(value?: number): boolean {
        return value === this.authService.getUserId();
    }
}
