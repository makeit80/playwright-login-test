import { test, expect } from "@playwright/test";

// 환경변수로부터 값 읽기
const url = process.env.TEST_URL;
const user = process.env.TEST_USER;
const pass = process.env.TEST_PASS;

test("로그인 성공 시나리오", async ({ page }) => {
    if (!url || !user || !pass) {
        throw new Error("환경변수 누락: TEST_URL, TEST_USER, TEST_PASS");
    }
    await page.goto(url);
    // 아래 셀렉터는 실제 로그인 폼에 맞게 수정 필요
    await page.fill('input[name="username"]', user);
    await page.fill('input[name="password"]', pass);
    await page.click('button[type="submit"]');
    // 로그인 성공 후 URL 또는 요소 확인 (예시)
    await expect(page).not.toHaveURL(url);
});
