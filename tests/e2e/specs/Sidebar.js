import Sidebar from '../../../src/components/Sidebar.vue';

const mountVue = require('cypress-vue-unit-test');

describe('Sidebar', () => {
  beforeEach(mountVue(Sidebar));

  it('Renders correctly', () => {
    cy.contains('h2', 'Resumo');
  });

  it('Closes sidebar', () => {
    cy.get('.sidebar__closeIcon')
      .click();
    cy.get('.sidebar')
      .should('not.have.class', 'open');
  });

  it('Open submenu', () => {
    cy.get('.sidebar nav > ul > li:first > a')
      .click()
      .parent()
      .children('ul')
      .should('have.class', 'open');
  });
});
