const { test, expect } = require('@playwright/test')
const { BACKEND_ENDPOINT } = require('../utils/config')

test.describe('can sign up and log in' , () => {
  const mockUser = {
    username: "john",
    name: "jonathan",  
    favoriteGenre: "mystery",
    password: "password1"
  }

  test.beforeEach('clear db + create 1 user' ,async ({ page, request }) => {
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

    
  })
  
  test.beforeEach('login mockUser', async ({ page }) => {
    await page.goto('/login')
    await page.getByTestId('username').fill(mockUser.username)
    await page.getByTestId('password').fill(mockUser.password)
    await page.getByTestId('confirmLogin').click()
    
    await expect(page.getByText(/in the Database/i)).toBeVisible()
  })

  test.beforeEach('add 3 movies to db', async ({ page }) => {
    await page.goto('/movie-outer-api')

    await page.getByTestId('search-outer-api-title').fill('godfather')
    await page.getByTestId('search-outer-api-submit').click()

    const movieMoreDetails = await page.getByText('more detail').all()
    for (let i = 0; i < movieMoreDetails.length; i++) {
      if (i === 3) break
      await movieMoreDetails[i].click() // go inside 
      await expect(page.getByText(/category/i)).toBeVisible()
  
      const addToDbButton = page.getByRole('button', { name: /add to db/i})
      await addToDbButton.click()
      
      const notification = page.locator('.notification')
      await expect(notification).toContainText(/Added/i) // wait to make sure it added.

      await page.goto('..')
    }
  })


  test.fixme('user can create a list', async({ page }) => {

  })


})