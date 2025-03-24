
describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios', () => {
    cy.clock()
    const longText = Cypress._.repeat('Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia', 10)
    cy.get('#firstName').type('Joaquim')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('qOjYH@example.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')

  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()
    cy.get('#firstName').type('Joaquim')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('joaquim.silva')
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia', { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

  it('campo de telefone continua vazio apos digitação de um valor nao numerico', () => {
    cy.get('#phone')
      .type('abc')
      .should('have.value', '')

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()

    cy.get('#firstName').type('Joaquim')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('joaquim.silva')
    cy.get('#open-text-area').type('Test')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.get('#firstName').type('Joaquim')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('qOjYH@example.com')
    cy.get('#phone').type('11999999999')

    cy.get('#firstName')
      .should('have.value', 'Joaquim')
      .clear()
    cy.get('#lastName')
      .should('have.value', 'Silva')
      .clear()
      .should('have.value', '')


  })
  // exercicio 4
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    cy.get('#firstName').type('Joaquim')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('qOjYH@example.com')
    cy.get('[for="phone-checkbox"]').click()
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia', { delay: 0 })
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')

    cy.get('.success').should('not.be.visible')
    cy.tick(3000)

  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  // envia o formuário com sucesso usando um comando customizado
  it('envia o formulário com sucesso usando um comando customizado', () => {
    cy.clock()

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')

    cy.tick(3000)
    cy.get('.success').should('not.be.visible')

  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('Mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1)
      .should('have.value', 'blog')
  })

  it('marcando um checkbox', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
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
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')

      })
  })
  it('seleciona um arquivo utilizando uma fixture para  aqual foi dada alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
     
  })
  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })
  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#open-text-area').invoke('val', 'um texto qualquer')
    .should('have.value', 'um texto qualquer')
  })
  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
    .as('getRequest')
    .its('status')
    .should('be.equal', 200)
    cy.get('@getRequest')
    .its('statusText')
    .should('be.equal', 'OK')
    cy.get('@getRequest')
    .its('body')
    .should('include', 'CAC TAT')
  })
  it('invoke o gato', () => {
    cy.get('#cat')
    .invoke('show')
    .should('be.visible')
    .invoke('hide')
    .should('not.be.visible')
  })
})
