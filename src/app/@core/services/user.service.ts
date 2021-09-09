import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../@shared/models/user.model';
import { BaseHttpService } from './base-http-service.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserService extends BaseHttpService<User> {
    protected readonly RESOURCE_URL = '/users';
    private readonly RESOURCE_URL_PROFILE = '/profile';
    private readonly RESOURCE_URL_SOFT_DELETE = '/soft';
    private readonly RESOURCE_URL_HARD_DELETE = '/hard';

    constructor(http: HttpClient) {
        super(http);
    }

    public getProfile(): Observable<User> {
        return this.http.get<User>(`${this.getApiUrl()}${this.RESOURCE_URL_PROFILE}`);
    }

    public softDelete(): Observable<void> {
        return this.http.delete<void>(`${this.getApiUrl()}${this.RESOURCE_URL_SOFT_DELETE}`);
    }

    public hardDelete(): Observable<void> {
        return this.http.delete<void>(`${this.getApiUrl()}${this.RESOURCE_URL_HARD_DELETE}`);
    }
}
