const { test, expect } = require('@playwright/test')
const { BACKEND_ENDPOINT } = require('../utils/config')
import { moviesFromApi } from './mockdata/movies_from_api'

test.describe('Can view movie in db, create list, view list ' , () => {
  const mockUser = {
    username: "john",
    name: "jonathan",  
    favoriteGenre: "mystery",
    password: "password1"
  }
  
  test.beforeAll('clear db + create 1 user' ,async ({ request }) => {
    // clear test db
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
  
    // create 1 user
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
  
  test.beforeAll('add 3 movie into db server way', async ({ request }) => {
    // log in and get token
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
  
    // use token to add mock movies to test DB
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

  test('01. Shows all movies - to non-login user', async({ page }) => {
    await page.goto('');
    await expect( page.getByRole('heading', { name: '3 Movies and' }) ).toBeVisible()

    await expect( page.getByRole('cell', { name: 'Rashomon-mock' }) ).toBeVisible()
    await expect( page.getByRole('cell', { name: 'The Thing-mock' }) ).toBeVisible()
    await expect( page.getByRole('cell', { name: 'Ferris Bueller\'s Day Off-mock' }) ).toBeVisible()
  })

  test('04. Search movies in the db - non-login can search', async({ page }) => {
    await page.goto('');

    await page.getByRole('textbox').fill('ferris')
    await expect( page.getByRole('cell', { name: 'Ferris Bueller\'s Day Off-mock' }) ).toBeVisible()
    await expect( page.getByRole('cell', { name: 'The Thing-mock' }) ).toBeHidden()
    await expect( page.getByRole('cell', { name: 'Rashomon-mock' }) ).toBeHidden()

  })

  test('12. Create Lists', async ({ page }) => {
    // login mockUser
    await page.goto('');
    await page.getByRole('link', { name: 'log in' }).click();
    await page.getByTestId('username').click();
    await page.getByTestId('username').fill('john');
    await page.getByTestId('username').press('Tab');
    await page.getByTestId('password').fill('password1');
    await page.getByTestId('confirmLogin').click();
    await expect(page.getByRole('columnheader', { name: 'Title' })).toBeVisible()
  
    // add movie to context
    await page.getByRole('link', { name: 'Rashomon-mock' }).click();
    await page.getByRole('button', { name: 'Add to List' }).click();
    await expect( page.getByText('added "Rashomon-mock" to') ).toBeVisible()
    await page.getByRole('button', { name: 'go back' }).click()
    
    await page.getByRole('link', { name: 'The Thing-mock' }).click();
    await page.getByRole('button', { name: 'Add to List' }).click();
    await expect( page.getByText('added "The Thing-mock" to') ).toBeVisible()

    await page.getByRole('button', { name: 'go back' }).click();
  
    // go to add list component
    await page.getByRole('link', { name: 'add movie list' }).click();
    await page.getByTestId('listName').click();
    await page.getByTestId('listName').fill('The list name');
    await page.getByTestId('listName').press('Tab');
    await page.getByTestId('description').fill('the description');
    await page.getByTestId('description').press('Tab');
    await page.getByLabel('Rashomon-mock').fill('1111');
    await page.getByLabel('Rashomon-mock').press('Tab');
    await page.getByLabel('The Thing-mock').fill('222');
    
    await page.getByRole('button', { name: 'save to cache' }).click();
    await expect( page.getByText('save current data to all the') ).toBeVisible()

    await page.getByRole('button', { name: 'Create new list' }).click();
    await expect( page.getByText('Added your new list "The list name') ).toBeVisible()

    
     // go to movie  list component
    await page.getByRole('link', { name: 'movie lists' }).click();
    await page.getByRole('button', { name: 'The list name' }).click();
    await page.getByRole('heading', { name: 'the description' }).click();
    await page.getByRole('button', { name: 'The list name' }).getByRole('button').click()

    await expect( page.getByRole('heading', { name: 'the description' }) ).toBeVisible()
    await expect( page.getByRole('cell', { name: '1111' }) ).toBeVisible()

    // log out, act as non-login user

  })

  test('02. Shows all available lists' , async({ page, context}) => {
    await page.goto('/movielist')

    await page.getByRole('button', { name: 'The list name' }).click();
    await page.getByRole('heading', { name: 'the description' }).click();
    await page.getByRole('cell', { name: 'Rashomon-mock' }).click();
    // double click to show toggle content
    await page.getByRole('button', { name: 'The list name' }).getByRole('button').click()
    await page.getByRole('button', { name: 'The list name' }).getByRole('button').click()

    // inside single movie list 
    await page.getByRole('heading', { name: 'The list name' }).click();
    await page.getByRole('heading', { name: 'the description' }).click();
    await page.getByRole('cell', { name: 'Rashomon-mock' }).click();
    
    await page.getByLabel('copy').click()
    await page.getByLabel('copy').click()


    // // in progress 03. display specific list by id 
    // copy url from clipboard to test if non-login can access a list
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    const handle = await page.evaluateHandle(() => navigator.clipboard.readText());
    const clipboardContent = await handle.jsonValue();
    
    console.log("copy text", clipboardContent)
    // in progress
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


/**
    test('user can create a list', async({ page }) => {
     // login mockUser
     await page.goto('/login')
     await page.getByTestId('username').click();
     await page.getByTestId('username').fill(mockUser.username);
     await page.getByTestId('username').press('Tab');
     await page.getByTestId('password').fill(mockUser.password);
     await page.getByTestId('confirmLogin').click();
     
     await expect(page.getByText(/in the Database/i)).toBeVisible()

    // const clearFilter = page.getByRole('button', { name: /clear filter/i})
    // await clearFilter.click()
 
    // add movie to context
    await page.getByRole('link', { name: 'Rashomon-mock' }).click();
    await page.getByRole('button', { name: 'Add to List' }).click();
    await expect(page.getByText('added "Rashomon-mock" to')).toBeVisible() //wait for noti show

    await page.getByRole('button', { name: 'go back' }).click();
    await page.getByRole('link', { name: 'The Thing-mock' }).click();
    await page.getByText('added "The Thing-mock" to').click();  //wait for noti show

    await page.getByRole('button', { name: 'Add to List' }).click();
    await page.getByRole('button', { name: 'go back' }).click();

    // go to add list component
    await page.goto('/addlist')
    await expect(page.getByText(/impression/i)).toBeVisible() // wait to make sure page loaded

    await page.getByTestId('listName').click();
    await page.getByTestId('listName').fill('list name');
    await page.getByTestId('listName').press('Tab');
    await page.getByTestId('description').fill('the description');
    await page.getByTestId('description').press('Tab');
    await page.getByLabel('Rashomon-mock').fill('1111');
    await page.getByLabel('Rashomon-mock').press('Tab');
    await page.getByLabel('The Thing-mock').fill('222');
    await page.getByRole('button', { name: 'save to cache' }).click();
    await page.getByText('save current data to all the').click(); //wait for noti show
    await page.getByRole('button', { name: 'Create new list' }).click();
    await page.getByText('Added your new list "list').click();  //wait for noti show


    // go to movie  list component
    await page.goto('/movielist')
    await page.getByRole('button', { name: 'The list name' }).click()   // element shown, so can click
    await expect( page.getByRole('heading', { name: 'the description' }) ).toBeVisible()
  
  })


 */