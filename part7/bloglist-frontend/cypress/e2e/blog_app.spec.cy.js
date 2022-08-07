describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });
  // 5.17
  it('Login form is shown', function () {
    cy.contains('Log in to application');
  });
  // 5.18
  describe('5.18 Login', function () {
    it('Login works', function () {
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();

      cy.contains('Matti Luukkainen logged-in');
    });
    it('Login gives an error', function () {
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('WRONG');
      cy.get('#login-button').click();
      cy.contains('Wrong credentials');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' });
      cy.createBlog({
        title: 'most likes',
        author: 'Author A',
        url: 'www.google.com',
        likes: 100,
      });
      cy.createBlog({
        title: 'least likes',
        author: 'Author A',
        url: 'www.google.com',
        likes: -100,
      });
      cy.createBlog({
        title: 'some likes',
        author: 'Author A',
        url: 'www.google.com',
        likes: 50,
      });
      cy.createBlog({
        title: 'some likes + 1',
        author: 'Author A',
        url: 'www.google.com',
        likes: 51,
      });
    });
    // 5.19
    it('5.19 A blog can be created', function () {
      cy.contains('create new blog').click();
      cy.get('input[placeholder="Title of the blog"]').type('New title');
      cy.get('input[placeholder="Author of the blog"]').type('New Author');
      cy.get('input[placeholder="Url of the blog"]').type('www.google.com');
      cy.get('#create-button').click();
      cy.contains('New title');
    });
    // 5.20
    it('5.20 User can like a blog', function () {
      cy.contains('some likes Author A').parent().contains('view').click();
      cy.contains('some likes Author A')
        .parent()
        .contains('likes 50')
        .contains('like')
        .click();
      cy.contains('some likes Author A').parent().contains('likes 51');
    });
    // 5.21
    it('5.21 User can delete a blog he created', function () {
      cy.contains('some likes Author A').parent().contains('view').click();
      cy.contains('some likes Author A').parent().contains('remove').click();
      cy.get('html').should('not.contain', 'some likes Author A');
    });
    // 5.22
    it('5.22 Initial order of the blogs is correct', function () {
      cy.get('.blog').eq(0).should('contain', 'most likes Author A');
      cy.get('.blog').eq(3).should('contain', 'least likes Author A');
    });
    // 5.22
    it('5.22 Order of the blogs is correct after additional likes', function () {
      cy.get('.blog').eq(1).should('contain', 'some likes + 1 Author A');
      cy.contains('some likes Author A').parent().contains('view').click();
      cy.contains('some likes Author A')
        .parent()
        .contains('likes 50')
        .contains('like')
        .click();
      cy.contains('some likes Author A')
        .parent()
        .contains('likes 51')
        .contains('like')
        .click();
      cy.contains('some likes Author A').parent().contains('likes 52');
      cy.get('.blog').eq(1).should('contain', 'some likes Author A');
    });
  });
});
