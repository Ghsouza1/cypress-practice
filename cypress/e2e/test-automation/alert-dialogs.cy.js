describe('Alerts examples', () => {

  it("Simple Alert", function () {
    const stub = cy.stub()

    cy.visit("https://letcode.in/alert")

    cy.get('#accept').click()

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Hey! Welcome to LetCode');
    });
  });

  it("Confirm Alert", function () {
    const stub = cy.stub()

    cy.visit("https://letcode.in/alert")

    cy.get('#confirm').click()

    cy.on('window:confirm', (alertText) => {
      expect(alertText).to.equal('Are you happy with LetCode?');
      return true;
    });
  });

  it("Prompt Alert - eviltester", function () {
    const stub = cy.stub()

    cy.visit('https://testpages.eviltester.com/styled/alerts/alert-test.html', {
      onBeforeLoad(win) {
        cy.stub(win, 'prompt').returns('teste')
      }
    })

    cy.get('#promptexample').click()
    cy.get('#promptreturn').should('have.text', 'teste')
  });

  it("Prompt Alert - letcode", function () {
    const stub = cy.stub()

    cy.visit('https://letcode.in/alert', {
      onBeforeLoad(win) {
        cy.stub(win, 'prompt').returns('teste')
      }
    })
    cy.get('#prompt').click()
    cy.get('.notification').should('have.text', 'Your name is: teste')
  });
});