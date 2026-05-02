import orderData from '../fixtures/order.json';

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept(/\/api\/ingredients/, { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept(/\/api\/auth\/user/, { fixture: 'user.json' }).as('getUser');
    cy.intercept(/\/api\/orders/, (req) => {
      if (req.method === 'POST') req.reply({ fixture: 'order.json' });
    }).as('createOrder');

    cy.setCookie('accessToken', 'Bearer mock-token');
    localStorage.setItem('refreshToken', 'mock-refresh-token');

    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

   afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('добавляет булку и начинку в конструктор', () => {
    cy.get('[data-ingredient="bun"]').first().contains('button', 'Добавить').click({ force: true });
    cy.get('[data-ingredient="main"]').first().contains('button', 'Добавить').click({ force: true });
    cy.get('[data-order-button]').should('be.enabled');
  });

  it('открывает и закрывает модальное окно ингредиента', () => {
    const ingredientName = 'Краторная булка N-200i';
    cy.get('[data-ingredient="bun"]').first().click();
    cy.get('#modals').children().should('have.length', 2);
    cy.contains('Детали ингредиента').should('be.visible');
    cy.contains(ingredientName).should('be.visible');
    cy.get('#modals button').first().click();
    cy.get('#modals').children().should('have.length', 0);
  });

  it('оформляет заказ, отображает номер, закрывает модалку и очищает конструктор', () => {
    cy.get('[data-ingredient="bun"]').first().contains('button', 'Добавить').click();
    cy.get('[data-ingredient="main"]').first().contains('button', 'Добавить').click({ force: true });
    cy.get('[data-ingredient="sauce"]').first().contains('button', 'Добавить').click({ force: true });

    cy.get('[data-order-button]').click({ force: true });
    cy.wait('@createOrder');

    cy.get('#modals').children().should('have.length', 2);
    cy.get('#modals h2').first().should('have.text', orderData.order.number.toString());

    cy.get('#modals button').first().click({ force: true }); 
    cy.get('#modals').children().should('have.length', 0);

    cy.get('[data-constructor-item]').should('have.length', 0);
  });

  it('обновляет стоимость', () => {
    cy.get('[data-ingredient="bun"]').first().contains('button', 'Добавить').click();
    cy.get('[data-total-price]').invoke('text').then(parseInt).should('eq', 2510);
    cy.get('[data-ingredient="main"]').first().contains('button', 'Добавить').click({ force: true });
    cy.get('[data-total-price]').invoke('text').then(parseInt).should('eq', 2934);
  });
});