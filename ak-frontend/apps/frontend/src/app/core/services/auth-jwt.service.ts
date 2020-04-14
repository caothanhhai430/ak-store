import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { JwtHelperService } from "@auth0/angular-jwt";

const jwtHelperService = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  private accessToken: string = null;

  initialize() {
    const token = this.cookieService.get('authenticationToken');
    if (token) {
      this.accessToken = token;
    }
  }

  getToken() {
    return this.accessToken;
  }

  storeAuthenticationToken(jwt: string, rememberMe?: boolean) {
    if (rememberMe) {
      const expiredTime = jwtHelperService.getTokenExpirationDate(jwt);
      this.cookieService.set('authenticationToken', jwt, expiredTime);
      this.accessToken = jwt;
    } else {
      this.cookieService.set('authenticationToken', jwt);
    }
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.cookieService.delete('authenticationToken');
      this.accessToken = null;
      observer.next();
      observer.complete();
    });
  }
}
