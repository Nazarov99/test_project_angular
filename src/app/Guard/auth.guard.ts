import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {InternalApiService} from '../Services/internal-api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private internalApi: InternalApiService, private router: Router) {}
  canActivate(): boolean {
    if (!this.internalApi.getToken()) {
      this.router.navigateByUrl('/login');
    }
    return this.internalApi.getToken();
  }

}
