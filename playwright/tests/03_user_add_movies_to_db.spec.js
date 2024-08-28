const { test, expect } = require('@playwright/test')
const { BACKEND_ENDPOINT } = require('../utils/config')

test.describe('user can add movies to db' , () => {
  const mockUser = {
    username: "john",
    name: "jonathan",  
    favoriteGenre: "mystery",
    password: "password1"
  }

  test.beforeEach('clear db + create 1 user', async ({ page, request }) => {
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
  
  test.beforeEach('login mockUser',async ({ page }) => {
    await page.goto('/login')
    await page.getByTestId('username').fill(mockUser.username)
    await page.getByTestId('password').fill(mockUser.password)
    await page.getByTestId('confirmLogin').click()
    
    await expect(page.getByText(/in the Database/i)).toBeVisible()
  })

  test('user can search movie from outer API and add result to db', async({ page }) => {
    await page.goto('/movie-outer-api')

    await page.getByTestId('search-outer-api-title').fill('god father')
    await page.getByTestId('search-outer-api-submit').click()
    
    await expect(page.getByText(/god father found/i)).toBeVisible()

    const moreDetails = await page.getByText('more detail').all()

    // grab the first index and click
    await moreDetails[0].click()
    await expect(page.getByText(/Category/i)).toBeVisible()

    const addToDbButton = page.getByRole('button', { name: /add to db/i})
    
    //add movie for the first time -> Added a new movie to DB
    await addToDbButton.click()
    const notification = page.locator('.notification')
    await expect(notification).toContainText(/Added/i)

    //add same movie again make sure it trigger notification -> 'the movie already in the database'
    await addToDbButton.click()
    await addToDbButton.click()
    await addToDbButton.click()
    const notification2 = page.locator('.notification')
    await expect(notification2).toContainText(/already/i)
  })


})