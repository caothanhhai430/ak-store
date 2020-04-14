import { Component, OnInit } from '@angular/core';
import { LanguageSelect } from '@akfe/core/models/language';
import { LanguageService } from '@akfe/core/services/language.service';

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

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.initialize();
  }

  onSelectLanguage(langKey: string) {
    this.languageService.setActiveLang(langKey);
  }
}
