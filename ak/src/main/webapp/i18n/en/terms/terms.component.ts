import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITerms } from 'app/shared/model/terms.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { TermsService } from './terms.service';
import { TermsDeleteDialogComponent } from './terms-delete-dialog.component';

@Component({
  selector: 'ak-terms',
  templateUrl: './terms.component.html'
})
export class TermsComponent implements OnInit, OnDestroy {
  terms: ITerms[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected termsService: TermsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.terms = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.termsService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ITerms[]>) => this.paginateTerms(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.terms = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInTerms();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITerms) {
    return item.id;
  }

  registerChangeInTerms() {
    this.eventSubscriber = this.eventManager.subscribe('termsListModification', () => this.reset());
  }

  delete(terms: ITerms) {
    const modalRef = this.modalService.open(TermsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.terms = terms;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateTerms(data: ITerms[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.terms.push(data[i]);
    }
  }
}
