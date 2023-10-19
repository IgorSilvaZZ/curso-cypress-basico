/// <reference types='Cypress' />;

describe("Seção 08", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.get("a")
      .contains("Política de Privacidade")
      .should("have.attr", "target", "_blank");
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.get("a")
      .contains("Política de Privacidade")
      .invoke("removeAttr", "target")
      .click();

    cy.get("#title")
      .contains("CAC TAT - Política de privacidade")
      .should("be.visible");
  });

  it("testa a página da política de privacidade de forma independente", () => {
    cy.get("a")
      .contains("Política de Privacidade")
      .invoke("removeAttr", "target")
      .click();

    cy.get("#title").contains("CAC TAT - Política de privacidade");

    cy.get(".privacy").should("be.visible");

    cy.get("p").as("paragraphs").should("have.length", 4);

    cy.get("@paragraphs").each(($paragraph) => {
      cy.wrap($paragraph).should("be.visible");
    });

    cy.get(".privacy > p").contains("Talking About Testing");
  });
});
