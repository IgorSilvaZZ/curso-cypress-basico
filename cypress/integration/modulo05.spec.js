/// <reference types='Cypress' />;

describe("Seção 12", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("exibe e esconde as mensagens de sucesso e erro usando o .invoke", () => {
    cy.get(".success")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Mensagem enviada com sucesso")
      .invoke("hide")
      .should("not.be.visible");

    cy.get(".error")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Valide os campos obrigatórios!")
      .invoke("hide")
      .should("not.be.visible");
  });

  it("preenche a area de texto usando o comando invoke", () => {
    const longText = Cypress._.repeat(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      10
    );

    cy.get("textarea#open-text-area")
      .invoke("val", longText)
      .should("have.value", longText);
  });

  it("faz uma requisição HTTP", () => {
    cy.request(
      "https://cac-tat.s3.eu-central-1.amazonaws.com/index.html"
    ).should(({ status, statusText, body }) => {
      expect(status).to.equal(200);
      expect(statusText).to.equal("OK");
      expect(body).to.include("CAC TAT");
    });
  });

  it.only("encontre o gato que esta escondido na aplicação", () => {
    cy.get("#cat")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "🐈");

    cy.get("#title").invoke("text", "CAT TAT");

    cy.get("#subtitle").invoke("text", "EU ❤ GATOS");
  });
});
