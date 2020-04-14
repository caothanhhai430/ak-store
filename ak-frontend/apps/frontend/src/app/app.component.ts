import { Component, OnInit } from "@angular/core";
import { LanguageSelect } from "@akfe/core/models/language";
import { LanguageService } from "@akfe/core/services/language.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'ak-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  languages: LanguageSelect[] = [
    {
      key: 'en',
      label: 'English'
    },
    {
      key: 'vi',
      label: 'Tiếng Việt'
    }
  ];
  se;
  activeLanguage$ = this.languageService.language$;

  constructor(
    private languageService: LanguageService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.languageService.initialize();
    const cookieValue = this.cookieService.get('Test');
    console.log(cookieValue);
  }

  onSelectLanguage(langKey: string) {
    this.languageService.setActiveLang(langKey);
    this.cookieService.set('Test', langKey, null);
  }
}
