import { cryptoPricesPage, cryptoMarketCap} from '../support/pages/CryptoPricesPage';

describe('1H Percentage Change Conditional Formatting', () => {

  beforeEach(() => {
    cy.visit('https://www.forbes.com/digital-assets/crypto-prices/');
  });

  it('Verify green color for positive values in 1H column', () => {
    cryptoPricesPage.verifyPositiveValuesAreGreen();
  });

  it('Verify red color for negative values in 1H column', () => {
    cryptoPricesPage.verifyNegativeValuesAreRed();
  });

  it('Verify black color for zero values in 1H column', () => {
    cryptoPricesPage.verifyNeutralValuesAreBlack();
  });

});

describe('Crypto Prices - Market Cap Sorting Functionality', () => {

    beforeEach(() => {
        cy.visit('https://www.forbes.com/digital-assets/crypto-prices/')
    });

    it('Sort by market cap descending (default)', () => {
        cryptoMarketCap.checkSortingOrder(true);
    });

    it('Sort by market cap ascending', () => {
        cryptoMarketCap.clickMarketCapHeader();
        cy.wait(3000);
        cryptoMarketCap.checkSortingOrder(false);
    });

    it('Sort by market cap descending after ascending', () => {
        cy.wait(3000);
        cryptoMarketCap.clickMarketCapHeader();
        cy.wait(3000);
        cryptoMarketCap.clickMarketCapHeader();
        cy.wait(3000);
        cryptoMarketCap.checkSortingOrder(true);
    });
});


