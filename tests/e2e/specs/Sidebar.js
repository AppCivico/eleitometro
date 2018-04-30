import Sidebar from '../../../src/components/Sidebar.vue';

const mountVue = require('cypress-vue-unit-test');

describe('Sidebar', () => {
  context('Unit tests', () => {
    beforeEach(mountVue(Sidebar));

    it('Renders correctly', () => {
      cy.contains('h2', 'Resumo');
    });

    it('Closes sidebar', () => {
      cy.get('.sidebar__closeIcon').click();
      cy.get('.sidebar').should('not.have.class', 'open');
    });

    it('Emits "close" event on click', () => {
      const spy = cy.spy();
      Cypress.vue.$on('closeSidebar', spy);
      cy
        .get('.sidebar__closeIcon')
        .click()
        .then(() => {
          // eslint-disable-next-line
          expect(spy).to.be.called;
        });
    });

    it('Open submenu', () => {
      cy
        .get('.sidebar nav > ul > li:first > a')
        .click()
        .parent()
        .children('ul')
        .should('have.class', 'open');
    });

    it('Closes submenu', () => {
      cy
        .get('.sidebar nav > ul > li:first > a')
        .click()
        .click()
        .parent()
        .children('ul')
        .should('not.have.class', 'open');
    });
  });

  context('e2e', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081/');
    });

    it('Open sidebar', () => {
      cy.get('.header__menuIcon').click();
      cy.get('.sidebar').should('have.class', 'open');
    });
  });
});
