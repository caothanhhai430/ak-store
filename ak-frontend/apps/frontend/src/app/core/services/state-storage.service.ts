import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({ providedIn: 'root' })
export class StateStorageService {
  constructor(private cookieService: CookieService) {}

  storeUrl(url: string) {
    this.cookieService.set('previousUrl', url);
  }

  getUrl() {
    return this.cookieService.get('previousUrl');
  }
}
