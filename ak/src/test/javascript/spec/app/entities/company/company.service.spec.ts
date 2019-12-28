import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CompanyService } from 'app/entities/company/company.service';
import { ICompany, Company } from 'app/shared/model/company.model';

describe('Service Tests', () => {
  describe('Company Service', () => {
    let injector: TestBed;
    let service: CompanyService;
    let httpMock: HttpTestingController;
    let elemDefault: ICompany;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(CompanyService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Company(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        0,
        'AAAAAAA',
        false,
        currentDate,
        currentDate,
        0
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            startDate: currentDate.format(DATE_FORMAT),
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

      it('should create a Company', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            startDate: currentDate.format(DATE_FORMAT),
            timeCreated: currentDate.format(DATE_TIME_FORMAT),
            timeModified: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            startDate: currentDate,
            timeCreated: currentDate,
            timeModified: currentDate
          },
          returnedFromService
        );
        service
          .create(new Company(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Company', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            address: 'BBBBBB',
            logo: 'BBBBBB',
            email: 'BBBBBB',
            startDate: currentDate.format(DATE_FORMAT),
            numOfUsers: 1,
            type: 'BBBBBB',
            isActive: true,
            timeCreated: currentDate.format(DATE_TIME_FORMAT),
            timeModified: currentDate.format(DATE_TIME_FORMAT),
            userId: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startDate: currentDate,
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

      it('should return a list of Company', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            address: 'BBBBBB',
            logo: 'BBBBBB',
            email: 'BBBBBB',
            startDate: currentDate.format(DATE_FORMAT),
            numOfUsers: 1,
            type: 'BBBBBB',
            isActive: true,
            timeCreated: currentDate.format(DATE_TIME_FORMAT),
            timeModified: currentDate.format(DATE_TIME_FORMAT),
            userId: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            startDate: currentDate,
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

      it('should delete a Company', () => {
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
