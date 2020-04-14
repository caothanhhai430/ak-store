import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LanguageSelect } from '@akfe/core/models/language';

@Component({
  selector: 'ak-nav-layout',
  templateUrl: './nav-layout.component.html',
  styleUrls: ['./nav-layout.component.scss']
})
export class NavLayoutComponent implements OnInit {
  @Input()
  isCollapsed = false;

  @Input() languages: LanguageSelect[] = [];
  @Output() selectLanguage = new EventEmitter<string>();
  @Input() activeLanguage: string = undefined;

  constructor() {}

  ngOnInit(): void {}
}
