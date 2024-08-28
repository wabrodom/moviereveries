const { test, expect } = require('@playwright/test')
const { BACKEND_ENDPOINT } = require('../utils/config')

test.describe('can sign up and log in' , () => {
  const mockUser = {
    username: "john",
    name: "jonathan",  
    favoriteGenre: "mystery",
    password: "password1" 
  }

  test.beforeEach(async ({ page, request }) => {

    await request.post(BACKEND_ENDPOINT, {
      data: { 
        query: `
          mutation Mutation {
            clearDirectorImdb
            clearGenre
            clearMovieImdb
            clearMovieList
            clearUser
          }
        `
      }  
    })


    // const registered = 
    await request.post(BACKEND_ENDPOINT, {
      data: {
        query: `
          mutation CreateUser($username: String!, $name: String!, $favoriteGenre: String!, $password: String!) {
            createUser(username: $username, name: $name, favoriteGenre: $favoriteGenre, password: $password) {
              username
              name
              favoriteGenre
              movieLists
              id
            }
          }
        `,
        variables :{
          "username": mockUser.username,
          "name": mockUser.name,  
          "favoriteGenre": mockUser.favoriteGenre,
          "password": mockUser.password 
        }
      }

    })
    // const resiteredResponse = await registered.json()

  })


  test('mock user can login', async({ page }) => {
    await page.goto('/login')

    await page.getByTestId('username').fill(mockUser.username)
    await page.getByTestId('password').fill(mockUser.password)
    await page.getByTestId('confirmLogin').click()
    
    const yourAccount = page.getByRole('link', { name: 'your account' })
    await expect(yourAccount).toBeVisible()
    await yourAccount.click()

    await expect(page.getByText(mockUser.name)).toBeVisible()
  })

  test('can sign up a new user', async({ page }) => {
    await page.goto('/signup')

    await page.getByTestId('signup-username').fill('chris')
    await page.getByTestId('signup-name').fill('Chris Wolstenholme')
    await page.getByTestId('signup-password').fill('password2')
    await page.getByTestId('signup-password-confirm').fill('password2')
    await page.getByTestId('signup-favorite-genre').fill('mystery')
    await page.getByTestId('signup-submit').click()

    const yourAccount = page.getByRole('link', { name: 'your account' })
    await expect(yourAccount).toBeVisible()
    await yourAccount.click()

    await expect(page.getByText('Chris Wolstenholme')).toBeVisible()
  })
})

/*
  variables :{
    "username": mockUser.username,
    "name": mockUser.name,  
    "favoriteGenre": mockUser.favoriteGenre,
    "password": mockUser.password 
  }

*/