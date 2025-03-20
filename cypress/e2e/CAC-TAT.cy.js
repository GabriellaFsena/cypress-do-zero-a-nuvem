
describe('Central de Atendimento ao Cliente TAT', () => {
beforeEach(() => {
  cy.visit('src/index.html')
})
  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios', () => {
    const longText = Cypress._.repeat('Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia', 10)
    cy.get('#firstName').type('Joaquim')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('qOjYH@example.com')
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
    
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Joaquim')    
    cy.get('#lastName').type('Silva')    
    cy.get('#email').type('joaquim.silva')    
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia', {delay:0})    
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })
  it('campo de telefone continua vazio apos digitação de um valor nao numerico', () => {  
    cy.get('#phone')
    .type('abc')
    .should('have.value', '')

  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
    .type('Joaquim')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('qOjYH@example.com')
    cy.get('#phone').type('11999999999')    

    cy.get('#firstName')
    .should('have.value', 'Joaquim')
    .clear()
    .should('have.value', '')
 
  })
  // exercicio 4
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Joaquim')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('qOjYH@example.com')
    cy.get('[for="phone-checkbox"]').click() 
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia', {delay:0})
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
    
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  // envia o formuário com sucesso usando um comando customizado
  it('envia o formulário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Joaquim',
      lastName: 'Silva',
      email: 'qOjYH@example.com',
      phone: '11999999999',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia'
    }
    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')

    cy.fillMandatoryFieldsAndSubmit(data)


 
    cy.contains(' button', 'Enviar').click(); 
    cy.get('.success').should('be.visible')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
    .select('Mentoria')
    .should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
  })
  it('marcando um checkbox', () => {
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')
  })
  it('arca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
    .check()
    .last()
    .uncheck()
  })
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
       
    })
  })
    it('seleciona um arquivo simulando um drag-and-drop',() => {
      cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json' )
         
      })
    })
    it('seleciona um arquivo utilizando uma fixture para  aqual foi dada alias', () => {
      cy.fixture('example.json').as('sampleFile')
      cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json' )  
      })
  })
  it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', () => {
  
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
  })
})
