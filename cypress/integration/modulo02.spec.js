describe("Seção 04, 05 & 06", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it("marca o tipo de atendimento Feedback", () => {
    // cy.get("#support-type > label > input").check("feedback");
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(($element) => {
        cy.wrap($element).check().should("be.checked");
      });
  });

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .as("checkboxes")
      .should("have.length", 2)
      .check();

    cy.get("@checkboxes").each(($checkbox) => {
      cy.wrap($checkbox).should("be.checked");
    });

    cy.get("@checkboxes").last().uncheck().should("not.be.checked");
  });
});
