import { Moment } from 'moment';
import { IInvoice } from 'app/shared/model/invoice.model';
import { ICustomerType } from 'app/shared/model/customer-type.model';
import { ITerms } from 'app/shared/model/terms.model';
import { ICompany } from 'app/shared/model/company.model';

export interface ICustomer {
  id?: number;
  isVendor?: boolean;
  vendorId?: number;
  code?: string;
  companyName?: string;
  address?: string;
  phone?: string;
  mobile?: string;
  fax?: string;
  email?: string;
  taxCode?: string;
  accountNumber?: string;
  bankAccount?: string;
  bankName?: string;
  balance?: number;
  totalBalance?: number;
  openBalance?: number;
  openBalanceDate?: Moment;
  creditLimit?: number;
  notes?: string;
  contactName?: string;
  isActive?: boolean;
  timeCreated?: Moment;
  timeModified?: Moment;
  userIdCreated?: number;
  userIdModified?: number;
  invoices?: IInvoice[];
  customerType?: ICustomerType;
  terms?: ITerms;
  company?: ICompany;
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public isVendor?: boolean,
    public vendorId?: number,
    public code?: string,
    public companyName?: string,
    public address?: string,
    public phone?: string,
    public mobile?: string,
    public fax?: string,
    public email?: string,
    public taxCode?: string,
    public accountNumber?: string,
    public bankAccount?: string,
    public bankName?: string,
    public balance?: number,
    public totalBalance?: number,
    public openBalance?: number,
    public openBalanceDate?: Moment,
    public creditLimit?: number,
    public notes?: string,
    public contactName?: string,
    public isActive?: boolean,
    public timeCreated?: Moment,
    public timeModified?: Moment,
    public userIdCreated?: number,
    public userIdModified?: number,
    public invoices?: IInvoice[],
    public customerType?: ICustomerType,
    public terms?: ITerms,
    public company?: ICompany
  ) {
    this.isVendor = this.isVendor || false;
    this.isActive = this.isActive || false;
  }
}
