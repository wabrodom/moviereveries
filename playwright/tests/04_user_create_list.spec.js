const { test, expect } = require('@playwright/test')
const { BACKEND_ENDPOINT } = require('../utils/config')
import { moviesFromApi } from './mockdata/movies_from_api'

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
  

  test.beforeEach('add 3 movie into db server way', async ({ page, request }) => {
    const loginResponse = await request.post(BACKEND_ENDPOINT, {
      data: {
        query: `
          mutation Login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
              value
            }
          }
        `,
        variables :{
          "username": mockUser.username,
          "password": mockUser.password 
        }
      }

    })

    const loggedInResult = await loginResponse.json()
    const token = loggedInResult.data.login.value

    for (let movie of moviesFromApi) {
      await request.post(BACKEND_ENDPOINT, {
        data: {
          query: `
            mutation AddMovieImdb($imdbId: String!, $originalTitle: String, $primaryTitle: String, $genres: [String], $plot: String, $isAdult: Boolean, $runtimeMinutes: Int, $startYear: Int, $endYear: Int, $type: String, $postersUse: [PosterInput], $directorsAddedUse: [DirectorsAddedUseInput]) {
            addMovieImdb(imdb_id: $imdbId, original_title: $originalTitle, primary_title: $primaryTitle, genres: $genres, plot: $plot, is_adult: $isAdult, runtime_minutes: $runtimeMinutes, start_year: $startYear, end_year: $endYear, type: $type, postersUse: $postersUse, directorsAddedUse: $directorsAddedUse) {
              primary_title
            }
          }
          `,
          variables :{ ...movie },
        },
        headers: { Authorization: `Bearer ${token}` }
  
      })

    }

  })


  test('user can create a list', async({ page }) => {
     // login mockUser
     await page.goto('/login')
     await page.getByTestId('username').fill(mockUser.username)
     await page.getByTestId('password').fill(mockUser.password)
     await page.getByTestId('confirmLogin').click()
     
     await expect(page.getByText(/in the Database/i)).toBeVisible()

    const clearFilter = page.getByRole('button', { name: /clear filter/i})
    await clearFilter.click()

    const mockLinks = page.getByRole('link', { name: '-mock', exact: false })

    for (let i = 0; i < mockLinks.length; i++) {
      if (i === 2) break
      await mockLinks[i].click() // go inside 
      await expect(page.getByText(/category/i)).toBeVisible()
  
      const addToDbButton = page.getByRole('button', { name: /add to db/i})
      await addToDbButton.click()
      
      const notification = page.locator('.notification')
      await expect(notification).toContainText(/Added/i) // wait to make sure it added.

      await page.goBack()
    }
    await page.goto('/addlist')

    await expect(page.getByText(/impression/i)).toBeVisible()
  })


})


/*
  // can't rely on external api, some times of day very slow to load
  test.beforeEach('add 3 movies to db', async ({ page }) => {
    // login mockUser
    await page.goto('/login')
    await page.getByTestId('username').fill(mockUser.username)
    await page.getByTestId('password').fill(mockUser.password)
    await page.getByTestId('confirmLogin').click()
    
    await expect(page.getByText(/in the Database/i)).toBeVisible()

    // start add movie to db
    await page.goto('/movie-outer-api')

    await page.getByTestId('search-outer-api-title').fill('godfather')
    await page.getByTestId('search-outer-api-submit').click()
    await expect(page.getByText(/godfather found/i)).toBeVisible()

    const movieMoreDetails = await page.getByText('more detail').all()
    for (let i = 0; i < movieMoreDetails.length; i++) {
      if (i === 3) break
      await movieMoreDetails[i].click() // go inside 
      await expect(page.getByText(/category/i)).toBeVisible()
  
      const addToDbButton = page.getByRole('button', { name: /add to db/i})
      await addToDbButton.click()
      
      const notification = page.locator('.notification')
      await expect(notification).toContainText(/Added/i) // wait to make sure it added.

      await page.goBack()
    }

    await page.goto('')  
  })
*/