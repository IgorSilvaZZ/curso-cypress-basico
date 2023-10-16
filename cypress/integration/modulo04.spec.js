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

    cy.get("#title").contains("CAC TAT - Política de privacidade");
  });
});
