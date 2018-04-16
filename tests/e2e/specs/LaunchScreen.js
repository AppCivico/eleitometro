// https://docs.cypress.io/api/introduction/api.html

describe('LaunchScreen', () => {
  it('Renders correctly', () => {
    cy.visit('/');
    cy.contains('h1', 'Eleitômetro');
  });
});
