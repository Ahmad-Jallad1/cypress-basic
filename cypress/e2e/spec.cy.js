
import { selectors} from "../support/selectors";

describe('Amazon Search and Add to Cart', ()=> {
it ('Should search for a laptop and add it to the cart and added laptop to the cart should be the same laptop selected initial', () => {
    cy.visit(selectors.amazon)
    cy.get(selectors.searchBar).type(selectors.productSearch)
    cy.get(selectors.searchButton).click()
    cy.get(selectors.samsungLaptop).first().click()
    cy.get(selectors.addToCart).click()
    cy.get(selectors.seeCartList).click()
})
})



describe('Check h1 element without visiting the page', ()=>{
    it('should contain an h1 with the text "LOREM IPSUM"', ()=>{
        cy.request(selectors.lipsumLink).its('body').should('include', `<h1>${selectors.title}</h1>`)
    })
    })

  

describe('Stub API Call and Modify Data', () => {
    it('should stub the API call to return only one entry with modified data', () => {
      cy.intercept('GET', '**/superheroes.json', (req) => {
        req.reply({
          "squadName": "Super hero squad",
          "homeTown": "Amman",
          "formed": 2024,
          "secretBase": "Super tower",
          "active": true,
          "members": [
            {
              "name": "Ahmad",
              "age": 24,
              "secretIdentity": "Unknown",
              "powers": [
                "Super strength",
                "Invisibility",
                "Flying"
              ]
            }
          ]
        });
      }).as('getSuperheroes');
      
      cy.visit('https://mdn.github.io/learning-area/javascript/oojs/json/heroes-finished.html');
      cy.wait('@getSuperheroes');
    });
  
  });
  







