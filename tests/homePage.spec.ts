import {test, expect} from '../fixtures/home.fixture'

test('usuário logado', async ({ homePage }) => {
    await expect(homePage.pageHeader).toBeVisible()

})