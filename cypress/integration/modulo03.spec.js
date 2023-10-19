/// <reference types='Cypress' />;

describe("Seção 07", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  Cypress._.times(3, () => {
    it("seleciona um arquivo da pasta fixtures", () => {
      cy.get("#file-upload")
        .should("not.have.value")
        .selectFile("cypress/fixtures/example.json")
        .should(($inputFile) => {
          expect($inputFile[0].files[0].name).to.equal("example.json");
        });
    });
  });

  it("seleciona um arquivo simulando um drag-and", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should(($inputFile) => {
        expect($inputFile[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json", { encoding: null }).as("fixtureFile");
    cy.get("#file-upload")
      .selectFile("@fixtureFile")
      .should(($inputFile) => {
        expect($inputFile[0].files[0].name).to.equal("example.json");
      });
  });
});
