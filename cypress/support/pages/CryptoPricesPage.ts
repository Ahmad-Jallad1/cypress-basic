class CryptoPricesPage {
    private row1HPositive = '[data-test^="row"] > [data-test^="row-cell-1H"] > .TableCellChange_tableCellChangePositive__N5OmP';
    private row1HNegative = '[data-test^="row"] > [data-test^="row-cell-1H"] > .TableCellChange_tableCellChangeNegative__FniV_';
    private row1HNeutral = '[data-test^="row"] > [data-test^="row-cell-1H"] ';
  
    verifyPositiveValuesAreGreen() {
        cy.get(this.row1HPositive)
          .each(($el) => {
            cy.wrap($el).invoke('text').then((text) => {
              expect(text).to.include('+');
              cy.wrap($el).should('have.css', 'color', 'rgb(0, 153, 51)');
            });
          });
      }
      
    verifyNegativeValuesAreRed() {
      cy.get(this.row1HNegative)
        .each(($el) => {
          cy.wrap($el).invoke('text').then((text) => {
            expect(text).to.include('-');
            cy.wrap($el).should('have.css', 'color', 'rgb(220, 0, 0)');
            
          });
        });
    }
  
    verifyNeutralValuesAreBlack() {
      cy.get(this.row1HNeutral)
        .each(($el) => {
          cy.wrap($el).invoke('text').then((text) => {
            if (text.includes('0.00%')) {
                cy.wrap($el).should('have.css', 'color', 'rgb(51, 51, 51)');
            }
          });
        });
    }
  }
  
  export const cryptoPricesPage = new CryptoPricesPage();
  

// add constructer and edit the if statments (regular expression)

class CryptoMarketCap {
  private marketCap = '[data-test="Market Cap"]';
  private marketCapRow = '[data-test^="row"] > [data-test^="row-cell-Market Cap"]';

  
  getMarketCapCells() {
      return cy.get(this.marketCapRow);
  }

  clickMarketCapHeader() {
      cy.get(this.marketCap).click();
  }

  convertMarketCap(marketCapText) {
      const numberPart = parseFloat(marketCapText.replace(/[^0-9.]/g, ''));
      if (marketCapText.includes('T')) return numberPart * 1000000000000;
      if (marketCapText.includes('B')) return numberPart * 1000000000;
      if (marketCapText.includes('M')) return numberPart * 1000000;
      if (marketCapText.includes('k')) return numberPart * 1000;
      return numberPart;
  }

  checkSortingOrder(isDescending) {
      this.getMarketCapCells()
          .each(($el, index, $list) => {
              if (index < $list.length - 1) {
                  const currentMarketCap = this.convertMarketCap($el.text());
                  const nextMarketCap = this.convertMarketCap(Cypress.$($list[index + 1]).text());

                  if (isDescending) {
                      expect(currentMarketCap).to.be.gte(nextMarketCap);
                  } else {
                      expect(currentMarketCap).to.be.lte(nextMarketCap);
                  }
              }
          });
  }
}

export const cryptoMarketCap = new CryptoMarketCap();
