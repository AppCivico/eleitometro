import Card from '../../../src/components/Card.vue';

const mountVue = require('cypress-vue-unit-test');

describe('Card', () => {
  context('Unit tests', () => {
    const content = {
      backgroundColor: null,
      frontHTML:
        '<p>O topico <strong>Infraestrutura</strong> foi o mais associado ao candidato</p>',
      id: 2,
      order: 1,
    };
    const createCmp = propsData => mountVue(Card, { propsData })();

    it('Renders correctly', () => {
      createCmp({ content, width: 100 });
      cy.get('.card').should('be.visible');
    });

    it('Flip card', () => {
      createCmp({ content, width: 100 });
      cy
        .get('.card__front .card__flipBtn')
        .click()
        .then(() => {
          cy
            .wrap(Cypress)
            .its('vue.isFlipped')
            .should('equal', true);
        });
    });

    it('Unflip card', () => {
      createCmp({ content, width: 100 });
      cy.get('.card__front .card__flipBtn').click();

      cy
        .get('.card__flipBtn--back')
        .click()
        .then(() => {
          cy
            .wrap(Cypress)
            .its('vue.isFlipped')
            .should('equal', false);
        });
    });
  });

  context('e2e', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081/');
    });

    it('Flip Card', () => {
      cy.get('.card:first .card__front .card__flipBtn').click();
      cy.get('.card:first .card__flipper').should('have.class', 'flip');
    });
  });
});
