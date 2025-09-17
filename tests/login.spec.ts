import { test, expect } from "@playwright/test";

// 환경변수로부터 값 읽기
const url = process.env.TEST_URL;
const user = process.env.TEST_USER;
const pass = process.env.TEST_PASS;

test("로그인 성공 시나리오", async ({ page }) => {
    if (!url || !user || !pass) {
        throw new Error("환경변수 누락: TEST_URL, TEST_USER, TEST_PASS");
    }
    await page.goto(url, { waitUntil: "load" });
    await page.waitForTimeout(500);

    // 1. 지원서 수정/확인/삭제 클릭
    await page.locator('xpath=//*[@id="application"]/div/div[2]/div/div[2]/ul/li[5]').click();
    await page.waitForTimeout(500);

    // 2. 2025년 인천국제공항공사 신입직원 채용 클릭
    await page.locator("xpath=/html/body/div[2]/div/div/div[2]/div[2]/div/div/div/div/div[1]/div").click();
    await page.waitForTimeout(500);

    // 3. 아이디 입력
    await page.fill("#user_email", user);
    await page.waitForTimeout(500);
    // 4. 비밀번호 입력
    await page.fill("#passwd", pass);
    await page.waitForTimeout(500);
    // 5. 로그인 버튼 클릭
    await page.click("button.send-btn.lg.fill.rounded-3.w-100");
    await page.waitForTimeout(2000);
    // 6. 로그인 성공 여부: 예시로 로그인 후 특정 요소(예: 로그아웃 버튼)가 보이는지 확인

    // 밸리데이션 체크: 에러 메시지 리턴 및 input 내장 패턴 체크
    // 1. 커스텀 에러 메시지(화면에 표시되는 메시지)
    const errorMsgLocator = page.locator('.error-message, .alert, [role="alert"]');
    const isErrorVisible = await errorMsgLocator
        .first()
        .isVisible()
        .catch(() => false);
    let validationMessage = null;
    if (isErrorVisible) {
        validationMessage = await errorMsgLocator.first().textContent();
    }
    // 2. input 내장 패턴 유효성 검사 및 브라우저 기본 메시지
    const inputValidity = await page.$eval("#user_email", (el) => (el as HTMLInputElement).validity.valid);
    const inputValidationMessage = await page.$eval("#user_email", (el) => (el as HTMLInputElement).validationMessage);
    if (!inputValidity) {
        console.log("input 메시지:", inputValidationMessage);
    }
    // 결과 리턴 (테스트에서는 expect로 검증하거나, 콘솔로 확인)
    console.log("유효성 검사:", validationMessage);
});
