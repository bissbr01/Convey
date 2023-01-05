beforeEach(() => {
  cy.visit('http://localhost:3000');
});

describe('Home Page', () => {
  it('displays app bar', () => {
    cy.contains('Convey');
    cy.contains('Search');
    cy.contains('About');
  });

  it('displays keyword title', () => {
    cy.contains('Search by Keyword');
  });

  it('displays updated keyword after filtering input', () => {
    cy.get('input[type="text"]').type('hope');
    cy.contains('hope: 18');
  });

  it('displays initial keywords', () => {
    cy.contains('people: 640');
    cy.contains('things: 378');
    cy.contains('America: 104');
  });

  it('navigates to About page on nav click', () => {
    cy.contains('About').click();
    cy.url().should('include', '/about');
  });

  it('displays 20 stories + infinite scroll div from the default "college" keyword', () => {
    cy.get('main > .mantine-Group-root')
      .children('div')
      .should('have.length', 21);
  });

  it('displays 18 stories + infinite scroll div from the "hope" keyword', () => {
    cy.get('input[type="text"]').type('hope');
    cy.contains('hope: 18').click();
    cy.get('main > .mantine-Group-root')
      .children('div')
      .should('have.length', 19);
  });
});

export {};
