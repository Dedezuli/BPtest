/// <reference types="Cypress" />
import ujianPage from '../model/ujianID'

describe('User Exam', () => {

  before(() => {
    cy.authenticateAndResetUjian();
  });

  it('Ensure User Can Start and Complete the Exam Successfully', function () {
    cy.loginAccount();
    cy.get(ujianPage.examButton).click();
    cy.contains('Belum Dikerjakan').click();
    cy.get(ujianPage.btnConfirmYes).click();
    cy.get(ujianPage.optionA).click();
    cy.get(ujianPage.btnExaminationNext).click();
    cy.get(ujianPage.optionA).click();
    cy.get(ujianPage.btnExaminationNext).click();
    cy.get(ujianPage.optionA).click();
    cy.get(ujianPage.btnExaminationSubmit).click();
    cy.get(ujianPage.collect).click();
    cy.get(ujianPage.resultText).should('be.visible');
  });

  it('Ensure User Can View Hasil Ujian Successfully', function () {
    cy.loginAccount();
    cy.get(ujianPage.examButton).click();
    cy.contains('Lihat Hasil Ujian').click();
    cy.get(ujianPage.resultText).should('be.visible');
  });
});
