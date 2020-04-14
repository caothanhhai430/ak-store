import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, Subject } from "rxjs";
import { catchError, shareReplay, tap } from "rxjs/operators";
import { LanguageService } from "@akfe/core/services/language.service";
import { SERVER_API_URL } from "@akfe/env/environment";
import { Account } from "../models/account.model";

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userIdentity: Account;
  private authenticated = false;
  private authenticationState = new Subject<any>();
  private accountCache$: Observable<Account>;

  constructor(
    private languageService: LanguageService,
    private http: HttpClient
  ) {}

  fetch(): Observable<Account> {
    return this.http.get<Account>(SERVER_API_URL + '/api/account');
  }

  save(account: Account): Observable<Account> {
    return this.http.post<Account>(SERVER_API_URL + '/api/account', account);
  }

  authenticate(identity) {
    this.userIdentity = identity;
    this.authenticated = identity !== null;
    this.authenticationState.next(this.userIdentity);
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (
      !this.authenticated ||
      !this.userIdentity ||
      !this.userIdentity.authorities
    ) {
      return false;
    }

    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }

    return authorities.some((authority: string) =>
      this.userIdentity.authorities.includes(authority)
    );
  }

  identity(force?: boolean): Observable<Account> {
    if (force || !this.authenticated) {
      this.accountCache$ = null;
    }

    if (!this.accountCache$) {
      this.accountCache$ = this.fetch().pipe(
        catchError(() => {
          return of(null);
        }),
        tap(account => {
          if (account) {
            this.userIdentity = account;
            this.authenticated = true;
            // After retrieve the account info, the language will be changed to
            // the user's preferred language configured in the account setting
            if (this.userIdentity.langKey) {
              const langKey =
                localStorage.getItem('currentLang') ||
                this.userIdentity.langKey;
              this.languageService.setActiveLang(langKey);
            }
          } else {
            this.userIdentity = null;
            this.authenticated = false;
          }
          this.authenticationState.next(this.userIdentity);
        }),
        shareReplay()
      );
    }
    return this.accountCache$;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  isIdentityResolved(): boolean {
    return this.userIdentity !== undefined;
  }

  getAuthenticationState(): Observable<any> {
    return this.authenticationState.asObservable();
  }

  getImageUrl(): string {
    return this.isIdentityResolved() ? this.userIdentity.imageUrl : null;
  }
}