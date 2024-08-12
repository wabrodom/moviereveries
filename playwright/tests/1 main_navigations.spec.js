const { describe, test, expect } = require('@playwright/test')

const baseUrl = 'http://localhost:8888'

describe('Movie Reveries' , () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto(baseUrl)
  
    const locator = page.getByText('Movie Reveries')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Genres')).toBeVisible()
  })

  test('login form can be opened', async ({ page }) => {
    await page.goto(`${baseUrl}/login`)

    await page.getByRole('button', { name: 'Log In' }).click()
  })
})