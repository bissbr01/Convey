beforeEach(() => {
  cy.visit('http://localhost:3000/about');
});

describe('About Page', () => {
  it('displays app bar', () => {
    cy.contains('About');
    cy.contains('The Problem');
    cy.contains('The Solution');
  });

  it('navigates to Home page on nav click', () => {
    cy.contains('Search').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});

export {};
