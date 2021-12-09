describe('blog app', function () {
  const user = {
    name: 'John Doe',
    username: 'JohnDoe',
    password: 'password123',
  };

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('login form is shown', function () {
    cy.contains('log in to application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('JohnDoe');
      cy.get('#password').type('password123');
      cy.get('[data-cy=login-button]').click();

      cy.contains(`Welcome ${name}`);

      cy.contains('blogs');
      cy.contains(`${user.name} logged in`);
      cy.contains('logout');
      cy.contains('create new blog');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('JohnDoe');
      cy.get('#password').type('wrong password');
      cy.get('[data-cy=login-button]').click();

      cy.contains('Invalid username or password');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password });
    });

    it('a blog can be created', function () {
      cy.contains('create new blog').click();
      cy.get('#title').type('testTitle');
      cy.get('#author').type('testAuthor');
      cy.get('#url').type('testUrl');
      cy.get('[data-cy=create-blog-button]').click();

      cy.contains(`New blog testTitle added`);
    });

    describe('when a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'testTitle1',
          author: 'testAuthor1',
          url: 'testUrl1',
        });
      });

      describe('when multiple blogs exists', function () {
        beforeEach(function () {
          for (let i = 2; i < 4; i++) {
            cy.createBlog({
              title: `testTitle${i}`,
              author: `testAuthor${i}`,
              url: `testUrl${i}`,
            });
          }
        });

        it('are ordered according to likes with the blog with the most likes being first', function () {
          cy.contains('testTitle3');
          cy.contains('testTitle2');
        });
      });
    });
  });
});
