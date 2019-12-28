import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { JobsComponentsPage, JobsDeleteDialog, JobsUpdatePage } from './jobs.page-object';

const expect = chai.expect;

describe('Jobs e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let jobsComponentsPage: JobsComponentsPage;
  let jobsUpdatePage: JobsUpdatePage;
  let jobsDeleteDialog: JobsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Jobs', async () => {
    await navBarPage.goToEntity('jobs');
    jobsComponentsPage = new JobsComponentsPage();
    await browser.wait(ec.visibilityOf(jobsComponentsPage.title), 5000);
    expect(await jobsComponentsPage.getTitle()).to.eq('akApp.jobs.home.title');
  });

  it('should load create Jobs page', async () => {
    await jobsComponentsPage.clickOnCreateButton();
    jobsUpdatePage = new JobsUpdatePage();
    expect(await jobsUpdatePage.getPageTitle()).to.eq('akApp.jobs.home.createOrEditLabel');
    await jobsUpdatePage.cancel();
  });

  it('should create and save Jobs', async () => {
    const nbButtonsBeforeCreate = await jobsComponentsPage.countDeleteButtons();

    await jobsComponentsPage.clickOnCreateButton();
    await promise.all([
      jobsUpdatePage.setCodeInput('code'),
      jobsUpdatePage.setNameInput('name'),
      jobsUpdatePage.setStatusInput('5'),
      jobsUpdatePage.setStartDateInput('2000-12-31'),
      jobsUpdatePage.setEndDateInput('2000-12-31'),
      jobsUpdatePage.setEstimateInput('5'),
      jobsUpdatePage.setInvestorInput('investor'),
      jobsUpdatePage.setAddressInput('address'),
      jobsUpdatePage.setNotesInput('notes'),
      jobsUpdatePage.jobTypeSelectLastOption(),
      jobsUpdatePage.companySelectLastOption()
    ]);
    expect(await jobsUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
    expect(await jobsUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await jobsUpdatePage.getStatusInput()).to.eq('5', 'Expected status value to be equals to 5');
    expect(await jobsUpdatePage.getStartDateInput()).to.eq('2000-12-31', 'Expected startDate value to be equals to 2000-12-31');
    expect(await jobsUpdatePage.getEndDateInput()).to.eq('2000-12-31', 'Expected endDate value to be equals to 2000-12-31');
    expect(await jobsUpdatePage.getEstimateInput()).to.eq('5', 'Expected estimate value to be equals to 5');
    expect(await jobsUpdatePage.getInvestorInput()).to.eq('investor', 'Expected Investor value to be equals to investor');
    expect(await jobsUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');
    expect(await jobsUpdatePage.getNotesInput()).to.eq('notes', 'Expected Notes value to be equals to notes');
    await jobsUpdatePage.save();
    expect(await jobsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await jobsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Jobs', async () => {
    const nbButtonsBeforeDelete = await jobsComponentsPage.countDeleteButtons();
    await jobsComponentsPage.clickOnLastDeleteButton();

    jobsDeleteDialog = new JobsDeleteDialog();
    expect(await jobsDeleteDialog.getDialogTitle()).to.eq('akApp.jobs.delete.question');
    await jobsDeleteDialog.clickOnConfirmButton();

    expect(await jobsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
