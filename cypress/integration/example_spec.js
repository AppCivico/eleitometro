//
// **** Kitchen Sink Tests ****
//
// This app was developed to demonstrate
// how to write tests in Cypress utilizing
// all of the available commands
//
// Feel free to modify this spec in your
// own application as a jumping off point

// Please read our "Introduction to Cypress"
// https://on.cypress.io/introduction-to-cypress

describe('Kitchen Sink', () => {
	it('.should() - assert that <title> is correct', () => {
		// https://on.cypress.io/visit
		cy.visit('https://example.cypress.io');

		// Here we've made our first assertion using a '.should()' command.
		// An assertion is comprised of a chainer, subject, and optional value.

		// https://on.cypress.io/should
		// https://on.cypress.io/and

		// https://on.cypress.io/title
		cy.title().should('include', 'Kitchen Sink');
		//   ↲               ↲            ↲
		// subject        chainer      value
	});
});
