/// <reference types="Cypress" />
import userData from '../../fixtures/data/user.json'
import loginPage from '../../model/loginID'
import { faker } from '@faker-js/faker'

Cypress.Commands.add('loginAccount', function () {
  cy.visit('/')
  cy.viewport(1920, 1080)
  cy.get(loginPage.emailBP).clear().type(userData.emailBP);
  cy.get(loginPage.passwordBP).clear().type(userData.passwordBP);
  cy.get(loginPage.buttonMasuk).click();
  cy.url().should('include', 'https://event.bintangpelajar.com')
})

Cypress.Commands.add('authenticateAndResetUjian', () => {
  // API untuk login dan reset ujian
  cy.api({
    method: 'POST',
    url: '/api/auth',
    failOnStatusCode: false,
    body: {
      username: userData.emailBP,
      password: userData.passwordBP,
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
    const token = response.body.data.token;

    cy.api({
      method: 'GET',
      url: '/api/ujian/child/4265',
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: {},
    }).then((response) => {
      expect(response.status).to.equal(200);
      const jawabId = response.body.data.data[0].jawaban_siswa.jawab_id;
      const ujianId = response.body.data.data[0].jawaban_siswa.jawab_judul;

      cy.api({
        method: 'DELETE',
        url: '/api/ujian/reset-by-specific-user',
        failOnStatusCode: false,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: {
          jawab_id: jawabId,
          ujian_id: ujianId,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    });
  });
});
