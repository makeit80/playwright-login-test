import type { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { testUrl, userId, password, scenario, headless, browser } = req.body;
    if (!testUrl || !userId || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    // scenario 파라미터가 없으면 기본값(login.spec.ts) 사용
    const scenarioFile = scenario ? scenario.replace(/[^a-zA-Z0-9_.-]/g, "") : "login.spec.ts";
    // browser 값이 있으면 --project 옵션 추가
    const browserOption = browser ? ` --project=\"${browser}\"` : "";
    const command = `npx playwright test tests/${scenarioFile}${browserOption}`;

    const env = {
        ...process.env,
        TEST_URL: testUrl,
        TEST_USER: userId,
        TEST_PASS: password,
        HEADLESS: typeof headless === "string" ? headless : headless === false ? "false" : "true",
    };

    exec(command, { env }, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: stderr || error.message });
        }
        res.status(200).json({ result: stdout });
    });
}
