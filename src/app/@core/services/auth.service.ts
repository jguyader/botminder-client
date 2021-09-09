import { HttpClient }  from '@angular/common/http';
import { Injectable }  from '@angular/core';
import jwt_decode      from 'jwt-decode';
import { Observable }  from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    protected readonly RESOURCE_URL = '/auth';
    private readonly tokenKey: string = 'userToken';

    constructor(private readonly http: HttpClient,
                private readonly router: Router) {
    }

    public getApiUrl(): string {
        return environment.apiUrl + this.RESOURCE_URL;
    }

    public post(data: { email: string, password: string }): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(this.getApiUrl(), data);
    }

    public login(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    public logout(): void {
        localStorage.removeItem(this.tokenKey);
        this.router.navigate(['signin']);
    }

    public isLoggedIn(): boolean {
        return !!this.getToken();
    }

    public getToken(): string {
        return localStorage.getItem(this.tokenKey) || '';
    }

    public getDecodedToken(): any {
        return jwt_decode(this.getToken());
    }

    public getUsername(): string {
        return this.getDecodedToken().username;
    };

    public getUserId(): number {
        return this.getDecodedToken().userId;
    };
}
