import Sidebar from '../../../src/components/Sidebar.vue';

const mountVue = require('cypress-vue-unit-test');

describe('Sidebar', () => {
  beforeEach(mountVue(Sidebar));

  it('Renders correctly', () => {
    cy.contains('h2', 'Resumo');
  });
});
