import LaunchScreen from '../../../src/components/LaunchScreen.vue';

const mountVue = require('cypress-vue-unit-test');

describe('LaunchScreen', () => {
  context('Unit tests', () => {
    const createCmp = propsData => mountVue(LaunchScreen, { propsData })();

    it('Renders correctly', () => {
      createCmp({ status: 'start' });
      cy.contains('h2', '2018');
    });

    it('Change subtitle', () => {
      createCmp({ status: 'loading' });
      cy.get('h2').should('not.contain', '2018');
    });

    it('Show loading bar', () => {
      createCmp({ status: 'loading' });
      cy.get('.loadingBar').should('have.class', 'visible');
    });

    it('Animate loading bar', () => {
      createCmp({ status: 'done' });
      cy.wrap(Cypress.vue.loading).should('equal', 100);
    });
  });

  context('e2e', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081/');
    });

    it('Hide LaunchScreen', () => {
      cy.get('.launchScreen').wait(1000).should('not.have.class', 'hidden');
    });
  });
});
