import Vuex from 'vuex';

import Summary from '../../../src/components/Summary.vue';
import store from '../../../src/store';

const mountVue = require('cypress-vue-unit-test');

describe('Summary', () => {
  context('Unit tests', () => {
    const extensions = {
      plugins: [Vuex],
      components: {
        Summary,
      },
    };
    const template = '<Summary />';

    beforeEach(mountVue({ template, store }, { extensions }));

    it('Renders correctly', () => {
      cy.get('.summary').should('be.visible');
    });

    // to do when swipe is working on desktop
    /* it('Swipes', () => {
      const spy = cy.spy();
      Cypress.vue.$on('swipeCard', spy);
      cy
        .get('.summary__wrapper')
        .scrollTo('left')
        .then(() => {
          // eslint-disable-next-line
          expect(spy).to.be.called;
        });
    }); */
  });

  context('e2e', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081/');
    });
  });
});
