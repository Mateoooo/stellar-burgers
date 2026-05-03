import orderData from '../fixtures/order.json';

const SELECTORS = {
  ingredientBun: '[data-ingredient="bun"]',
  ingredientMain: '[data-ingredient="main"]',
  ingredientSauce: '[data-ingredient="sauce"]',
  orderButton: '[data-order-button]',
  totalPrice: '[data-total-price]',
  constructorItem: '[data-constructor-item]',
  modals: '#modals',
  modalCloseButton: '#modals button',
  modalTitle: '#modals h2'
};

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
    cy.get(SELECTORS.ingredientBun).first().contains('button', 'Добавить').click({ force: true });
    cy.get(SELECTORS.ingredientMain).first().contains('button', 'Добавить').click({ force: true });
    cy.get(SELECTORS.orderButton).should('be.enabled');
  });

  it('открывает и закрывает модальное окно ингредиента', () => {
    const ingredientName = 'Краторная булка N-200i';
    cy.get(SELECTORS.ingredientBun).first().click();
    cy.get(SELECTORS.modals).children().should('have.length', 2);
    cy.contains('Детали ингредиента').should('be.visible');
    cy.contains(ingredientName).should('be.visible');
    cy.get(SELECTORS.modalCloseButton).first().click();
    cy.get(SELECTORS.modals).children().should('have.length', 0);
  });

  it('оформляет заказ, отображает номер, закрывает модалку и очищает конструктор', () => {
    cy.get(SELECTORS.ingredientBun).first().contains('button', 'Добавить').click();
    cy.get(SELECTORS.ingredientMain).first().contains('button', 'Добавить').click({ force: true });
    cy.get(SELECTORS.ingredientSauce).first().contains('button', 'Добавить').click({ force: true });

    cy.get(SELECTORS.orderButton).click({ force: true });
    cy.wait('@createOrder');

    cy.get(SELECTORS.modals).children().should('have.length', 2);
    cy.get(SELECTORS.modalTitle).first().should('have.text', orderData.order.number.toString());

    cy.get(SELECTORS.modalCloseButton).first().click({ force: true });
    cy.get(SELECTORS.modals).children().should('have.length', 0);

    cy.get(SELECTORS.constructorItem).should('have.length', 0);
  });

  it('обновляет стоимость', () => {
    cy.get(SELECTORS.ingredientBun).first().contains('button', 'Добавить').click();
    cy.get(SELECTORS.totalPrice).invoke('text').then(parseInt).should('eq', 2510);
    cy.get(SELECTORS.ingredientMain).first().contains('button', 'Добавить').click({ force: true });
    cy.get(SELECTORS.totalPrice).invoke('text').then(parseInt).should('eq', 2934);
  });
});