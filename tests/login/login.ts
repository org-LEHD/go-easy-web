import { type Page } from '@playwright/test'

export const login = async (page:Page, name: string, password: string) => {
    await page.goto("http://localhost:3000");
    await page.click("text=Sign in");
    await page.click("text=Sign in with Discord");
    await page.fill('input[name="email"]', name);
    await page.fill('input[name="password"]', password);
    await page.getByRole('button', { name: 'Log In' }).click({trial: true})
    await page.getByRole('button', { name: 'Log In' }).click()
    await page.getByRole('button', { name: 'Authorize' }).click({trial: true})
    await page.getByRole('button', { name: 'Authorize' }).click()
}
