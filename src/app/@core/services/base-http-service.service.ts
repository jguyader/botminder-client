import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable }             from 'rxjs';
import { environment }            from '../../../environments/environment';

export class BaseHttpService<T extends {id: number}> {
    protected readonly RESOURCE_URL: string = '';

    constructor(public http: HttpClient) {
    }

    public getApiUrl(): string {
        return environment.apiUrl + this.RESOURCE_URL;
    }

    public getOneById(id: number): Observable<T> {
        return this.http.get<T>(`${this.getApiUrl()}/${id}`);
    }

    public get(params: HttpParams = new HttpParams()): Observable<T[]> {
        return this.http.get<T[]>(this.getApiUrl(), { params });
    }

    public post(data: Partial<T>): Observable<T> {
        return this.http.post<T>(this.getApiUrl(), data);
    }

    public put(data: Partial<T>): Observable<T> {
        return this.http.put<T>(`${this.getApiUrl()}/${data.id}`,data);
    }

    public delete(id: number): Observable<void> {
        return this.http.delete<void>(this.getApiUrl() + `/${id}`);
    }

}
