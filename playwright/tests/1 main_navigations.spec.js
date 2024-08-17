const { beforeEach, describe, test, expect } = require('@playwright/test')


describe('basic navigation in Movie Reveries' , () => {
  beforeEach(async ({ page }) => {    
    await page.goto('')  
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Movie Reveries')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Genres in the')).toBeVisible()
  })

  test('login form can be opened', async ({ page }) => {
    await page.goto('/login')

    await page.getByRole('button', { name: 'Log In' }).click()
  })

  
  test('login can be navigate to', async ({ page }) => {
    await page.getByRole('link', { name: 'log in' }).click()
  })

  

  test('sign-up can be navigate to', async({ page }) => {
    await page.getByRole('link', { name: 'sign up' }).click()
  })

  // test('new user John can sign up', async({ page }) => {
  //   await page.getByRole('link', { name: 'log in' }).click()
  // })

  test('mock user can login', async({ page }) => {
    await page.goto('/login')

    await page.getByTestId('username').fill('john')
    await page.getByTestId('password').fill('password1')
    await page.getByTestId('confirmLogin').click()
    
    await page.getByRole('link', { name: 'your account' }).click()
    await expect(page.getByText('HI! john')).toBeVisible()
    

  })


})