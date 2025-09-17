// Next.js API route to list available Playwright scenario files
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const testsDir = path.join(process.cwd(), "tests");
    try {
        const files = fs.readdirSync(testsDir).filter((file) => file.endsWith(".spec.ts"));
        res.status(200).json({ scenarios: files });
    } catch (e) {
        res.status(500).json({ error: "시나리오 파일을 읽을 수 없습니다." });
    }
}
