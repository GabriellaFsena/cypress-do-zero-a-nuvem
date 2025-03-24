Cypress._.times(3, () => {
  it('testa a pagina de privacidade', () => {
    cy.visit('src/privacy.html')
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    cy.contains('p', 'Talking About Testing').should('be.visible')
  })

})