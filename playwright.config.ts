import { defineConfig, devices } from "@playwright/test";

// process.env.HEADLESS 값이 'false'면 headful(창 보임), 그 외엔 headless(창 안 보임)
const isHeadless = process.env.HEADLESS !== "false";

export default defineConfig({
    use: {
        headless: isHeadless,
        ignoreHTTPSErrors: true, // 인증서 오류 무시
    },
    projects: [
        { name: "chromium", use: { ...devices["Desktop Chrome"] } },
        { name: "firefox", use: { ...devices["Desktop Firefox"] } },
        { name: "webkit", use: { ...devices["Desktop Safari"] } },
        { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
        { name: "Mobile Safari", use: { ...devices["iPhone 12"] } },
    ],
});
