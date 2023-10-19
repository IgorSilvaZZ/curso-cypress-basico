/// <reference types='Cypress' />;

describe("Seção 3", () => {
  const THREE_SECONDS_IN_MS = 3000;

  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("Verifica o titulo da aplicação", () => {
    // Dentro should também poderia ser o be.equal também
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    const longText = Cypress._.repeat("Lorem", 5);

    cy.get('input[id="firstName"]').type("Igor");
    cy.get('input[id="lastName"]').type("Silva");
    cy.get("input#email").type("igor@email.com");
    cy.get("select#product").select("cursos");
    cy.get("textarea#open-text-area").invoke("val", longText);

    cy.clock();

    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");

    cy.tick(THREE_SECONDS_IN_MS);

    cy.get(".success").should("not.be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get('input[id="firstName"]').type("Igor");
    cy.get('input[id="lastName"]').type("Silva");
    cy.get("input#email").type("igor1email.com");
    cy.get("textarea#open-text-area").invoke(
      "val",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    );

    cy.clock();

    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");

    cy.tick(THREE_SECONDS_IN_MS);

    cy.get(".error").should("not.be.visible");
  });

  it("validando se o campo telefone só aceita numeros de fato", () => {
    cy.get("input#firstName").type("Gabriel");
    cy.get("input#lastName").type("Lemos");
    cy.get("input#email").type("lemos@email.com");
    cy.get("input#phone").type("Teste").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("input#firstName").type("Gabriel");
    cy.get("input#lastName").type("Lemos");
    cy.get("input#email").type("lemos@email.com");
    cy.get("#phone-checkbox").check();
    cy.get("textarea#open-text-area").type(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      {
        delay: 0,
      }
    );

    cy.clock();

    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");

    cy.tick(THREE_SECONDS_IN_MS);

    cy.get(".error").should("not.be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("input#firstName")
      .type("Iguinho")
      .should("have.value", "Iguinho")
      .clear()
      .should("have.value", "");

    cy.get("input#lastName")
      .type("Silva")
      .should("have.value", "Silva")
      .clear()
      .should("have.value", "");

    cy.get("input#email")
      .type("iguinho@email.com")
      .should("have.value", "iguinho@email.com")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.clock();

    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");

    cy.tick(THREE_SECONDS_IN_MS);

    cy.get(".error").should("not.be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.clock();

    cy.fillMandatoryFieldsAndSubmit({
      firstName: "Beatriz",
      lastName: "Santos",
      email: "bia@email.com",
    });

    cy.get(".success").should("be.visible");

    cy.tick(THREE_SECONDS_IN_MS);
  });
});
