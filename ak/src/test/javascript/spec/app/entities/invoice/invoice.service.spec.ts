import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { InvoiceService } from 'app/entities/invoice/invoice.service';
import { IInvoice, Invoice } from 'app/shared/model/invoice.model';
import { ProcessStatus } from 'app/shared/model/enumerations/process-status.model';

describe('Service Tests', () => {
  describe('Invoice Service', () => {
    let injector: TestBed;
    let service: InvoiceService;
    let httpMock: HttpTestingController;
    let elemDefault: IInvoice;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(InvoiceService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Invoice(
        0,
        'AAAAAAA',
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        0,
        0,
        0,
        ProcessStatus.OPEN,
        currentDate,
        currentDate,
        0,
        0
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            invoiceDate: currentDate.format(DATE_FORMAT),
            dueDate: currentDate.format(DATE_FORMAT),
            timeCreated: currentDate.format(DATE_TIME_FORMAT),
            timeModified: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Invoice', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            invoiceDate: currentDate.format(DATE_FORMAT),
            dueDate: currentDate.format(DATE_FORMAT),
            timeCreated: currentDate.format(DATE_TIME_FORMAT),
            timeModified: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            invoiceDate: currentDate,
            dueDate: currentDate,
            timeCreated: currentDate,
            timeModified: currentDate
          },
          returnedFromService
        );
        service
          .create(new Invoice(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Invoice', () => {
        const returnedFromService = Object.assign(
          {
            invoiceNo: 'BBBBBB',
            invoiceDate: currentDate.format(DATE_FORMAT),
            dueDate: currentDate.format(DATE_FORMAT),
            billingAddress: 'BBBBBB',
            accountNumber: 'BBBBBB',
            poNumber: 'BBBBBB',
            notes: 'BBBBBB',
            productTotal: 1,
            vatTotal: 1,
            discountTotal: 1,
            total: 1,
            status: 'BBBBBB',
            timeCreated: currentDate.format(DATE_TIME_FORMAT),
            timeModified: currentDate.format(DATE_TIME_FORMAT),
            userIdCreated: 1,
            userIdModified: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            invoiceDate: currentDate,
            dueDate: currentDate,
            timeCreated: currentDate,
            timeModified: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Invoice', () => {
        const returnedFromService = Object.assign(
          {
            invoiceNo: 'BBBBBB',
            invoiceDate: currentDate.format(DATE_FORMAT),
            dueDate: currentDate.format(DATE_FORMAT),
            billingAddress: 'BBBBBB',
            accountNumber: 'BBBBBB',
            poNumber: 'BBBBBB',
            notes: 'BBBBBB',
            productTotal: 1,
            vatTotal: 1,
            discountTotal: 1,
            total: 1,
            status: 'BBBBBB',
            timeCreated: currentDate.format(DATE_TIME_FORMAT),
            timeModified: currentDate.format(DATE_TIME_FORMAT),
            userIdCreated: 1,
            userIdModified: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            invoiceDate: currentDate,
            dueDate: currentDate,
            timeCreated: currentDate,
            timeModified: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Invoice', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
