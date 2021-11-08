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

      cy.get('.notification.success')
        .should('contain', `Welcome ${name}`)
        .and('have.css', 'color', 'rgb(0, 128, 0)');

      cy.contains('blogs');
      cy.contains(`${user.name} logged in`);
      cy.contains('logout');
      cy.contains('create new blog');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('JohnDoe');
      cy.get('#password').type('wrong password');
      cy.get('[data-cy=login-button]').click();

      cy.get('.notification.error')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
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

      cy.get('.notification.success').should(
        'contain',
        `New blog testTitle added`
      );
      cy.contains('view');
    });

    describe('when a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'testTitle1',
          author: 'testAuthor1',
          url: 'testUrl1',
        });
      });

      it('like a blog', function () {
        cy.contains('testTitle1').parent().as('blog1');
        cy.get('@blog1').contains('view').click();
        cy.get('@blog1').contains('likes 0');
        cy.get('@blog1').contains('like').click();
        cy.contains('Blog testTitle1 updated');
        cy.get('@blog1').contains('likes 1');
      });

      it('user who created the blog can delete it', function () {
        cy.contains('testTitle1').parent().as('blog1');
        cy.get('@blog1').contains('view').click();
        cy.get('@blog1').contains('delete').click();
        cy.on('window:confirm', function () {
          return true;
        });

        cy.contains('Blog testTitle1 deleted');
      });

      it('other user who did not create the blog cannot delete it', function () {
        const user2 = {
          name: 'Jane Doe',
          username: 'JaneDoe',
          password: 'password123',
        };
        cy.request('POST', 'http://localhost:3003/api/users/', user2);
        cy.contains('logout').click();
        cy.login({ username: user2.username, password: user2.password });

        cy.contains('testTitle1').parent().as('blog1');
        cy.get('@blog1').contains('view').click();
        cy.get('@blog1').should('not.contain', 'delete');
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
          cy.contains('testTitle3').parent().as('blog3');
          cy.get('@blog3').contains('view').click();
          cy.get('@blog3').contains('like').click();

          cy.contains('testTitle2').parent().as('blog2');
          cy.get('@blog2').contains('view').click();
          cy.get('@blog2').contains('like').click();
          cy.get('@blog2').contains('likes 1');
          cy.get('@blog2').contains('like').click();
          cy.get('@blog2').contains('likes 2');

          cy.get('[data-cy=blog]').first().contains('testTitle2');
          cy.get('[data-cy=blog]').last().contains('testTitle1');
        });
      });
    });
  });
});
