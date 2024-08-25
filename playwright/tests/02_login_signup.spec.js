const { beforeEach, describe, test, expect } = require('@playwright/test')
const { BACKEND_ENDPOINT } = require('../utils/config')

describe('can sign up and log in' , () => {
  beforeEach(async ({ page, request }) => {

    await request.post(BACKEND_ENDPOINT, {
      json: {
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

    await request.post(BACKEND_ENDPOINT, {
      json: {
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
            "username": "john",
            "name": "jonathan",  
            "favoriteGenre": "mystery",
            "password": "password1"
          
        }
      }

    })
  })


  test('mock user can login', async({ page }) => {
    await page.goto('/login')

    await page.getByTestId('username').fill('john')
    await page.getByTestId('password').fill('password1')
    await page.getByTestId('confirmLogin').click()
    
    await page.getByRole('link', { name: 'your account' }).click()
    await expect(page.getByText('HI! john')).toBeVisible()
  })

  test('can sign up a new user', async({ page }) => {
    await page.goto('/signup')

    await page.getByTestId('signup-username').fill('chris')
    await page.getByTestId('signup-name').fill('Chris Wolstenholme')
    await page.getByTestId('signup-password').fill('password2')
    await page.getByTestId('signup-password-confirm').fill('password2')
    await page.getByTestId('signup-favorite-genre').fill('mystery')
    await page.getByTestId('signup-submit').click()

    await page.getByRole('link', { name: 'your account' }).click()
    await expect(page.getByText('Chris Wolstenholme')).toBeVisible()
  })
})