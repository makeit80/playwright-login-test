import React, { useState, useEffect } from "react";

// 이 페이지는 Playwright로 로그인 테스트를 할 수 있는 화면이에요.

const IndexPage = () => {
    // 아래는 모두 화면에서 사용하는 값(상태)들이에요.
    // 테스트할 웹사이트 주소를 저장해요
    const [testUrl, setTestUrl] = useState("");
    // 로그인할 아이디를 저장해요
    const [userId, setUserId] = useState("");
    // 로그인할 비밀번호를 저장해요
    const [password, setPassword] = useState("");

    // 테스트가 진행 중인지 표시해요
    const [loading, setLoading] = useState(false);
    // 테스트 결과를 저장해요
    const [result, setResult] = useState<string | null>(null);
    // 선택할 수 있는 시나리오(테스트 파일) 목록을 저장해요
    const [scenarios, setScenarios] = useState<string[]>([]);
    // 사용자가 선택한 시나리오 파일 이름을 저장해요
    const [selectedScenario, setSelectedScenario] = useState<string>("");
    // headless/headful 모드 선택 (true: 창 안 보임, false: 창 보임)
    const [headless, setHeadless] = useState(false);
    // 브라우저 선택 상태 (chromium, firefox, webkit)
    const [browser, setBrowser] = useState("chromium");
    // 모달 표시 상태
    const [showModal, setShowModal] = useState(false);

    // 페이지가 처음 열릴 때, 서버에서 시나리오(테스트 파일) 목록을 받아와요
    useEffect(() => {
        fetch("/api/list-scenarios") // 서버에 시나리오 목록을 요청해요
            .then((res) => res.json())
            .then((data) => {
                // 시나리오 목록이 잘 오면 저장해요
                if (data.scenarios && Array.isArray(data.scenarios)) {
                    setScenarios(data.scenarios);
                    setSelectedScenario(data.scenarios[0] || ""); // 첫 번째 시나리오를 기본 선택
                }
            });
    }, []);

    // 폼에서 '테스트 시작' 버튼을 누르면 실행되는 함수에요
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // 폼이 새로고침되지 않게 막아요
        setLoading(true); // 테스트 중임을 표시해요
        setResult(null); // 결과를 초기화해요
        try {
            // 서버에 테스트를 실행해달라고 요청해요
            const res = await fetch("/api/run-playwright", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // 입력한 정보와 선택한 시나리오, headless, browser 옵션을 함께 보내요
                body: JSON.stringify({ testUrl, userId, password, scenario: selectedScenario, headless, browser }),
            });
            const data = await res.json();
            console.log("API 응답:", data); // 에러든 성공이든 전체 응답을 콘솔에 출력
            if (res.ok) {
                setResult(data.result || "테스트가 완료되었습니다."); // 성공 결과를 보여줘요
                setShowModal(true); // 모달을 열어요
            } else {
                setResult(data && data.error ? `에러: ${data.error}` : "에러가 발생했습니다."); // 상세 에러 메시지 표시
                setShowModal(true); // 모달을 열어요
            }
        } catch (err) {
            setResult("API 요청 중 에러가 발생했습니다."); // 네트워크 에러 등
            setShowModal(true); // 모달을 열어요
        } finally {
            setLoading(false); // 테스트가 끝났음을 표시해요
        }
    };

    // 모달을 닫는 함수
    const closeModal = () => {
        setShowModal(false);
        setResult(null);
    };

    return (
        <>
            <div className="login-container">
                {/* 로그인 테스트를 위한 입력 폼이에요 */}
                <form
                    className="login-form"
                    onSubmit={handleSubmit}>
                    <h2 className="login-title">Playwright 로그인 테스트</h2>
                    {/* 테스트할 링크 입력 */}
                    <div className="login-field">
                        <label
                            htmlFor="testUrl"
                            className="login-label">
                            테스트 링크
                        </label>
                        <input
                            id="testUrl"
                            type="url"
                            value={testUrl}
                            onChange={(e) => setTestUrl(e.target.value)}
                            placeholder="https://example.com/login"
                            required
                            className="login-input"
                        />
                    </div>
                    {/* 아이디 입력 */}
                    <div className="login-field">
                        <label
                            htmlFor="userId"
                            className="login-label">
                            아이디
                        </label>
                        <input
                            id="userId"
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="아이디를 입력하세요"
                            required
                            className="login-input"
                        />
                    </div>
                    {/* 비밀번호 입력 */}
                    <div className="login-field">
                        <label
                            htmlFor="password"
                            className="login-label">
                            패스워드
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="패스워드를 입력하세요"
                            required
                            className="login-input"
                        />
                    </div>
                    {/* 시나리오(테스트 파일) 선택 */}
                    <div className="login-field">
                        <label
                            htmlFor="scenario"
                            className="login-label">
                            시나리오 선택
                        </label>
                        <select
                            id="scenario"
                            className="login-input"
                            value={selectedScenario}
                            onChange={(e) => setSelectedScenario(e.target.value)}
                            required>
                            {/* 서버에서 받아온 시나리오 목록을 보여줘요 */}
                            {scenarios.map((s) => (
                                <option
                                    key={s}
                                    value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* 브라우저 선택 */}
                    <div className="login-field">
                        <label
                            htmlFor="browser"
                            className="login-label">
                            브라우저 선택
                        </label>
                        <select
                            id="browser"
                            className="login-input"
                            value={browser}
                            onChange={(e) => setBrowser(e.target.value)}
                            required>
                            <option value="chromium">크롬(Chromium)</option>
                            <option value="firefox">파이어폭스(Firefox)</option>
                            <option value="webkit">사파리(WebKit)</option>
                            <option value="Mobile Chrome">모바일 크롬(Pixel 5)</option>
                            <option value="Mobile Safari">모바일 사파리(iPhone 12)</option>
                        </select>
                    </div>
                    {/* headless/headful 모드 선택 */}
                    <div className="login-field login-radio-group">
                        <span className="login-label login-radio-label">브라우저 모드</span>
                        <label className="login-radio">
                            <input
                                type="radio"
                                name="headless"
                                value="false"
                                checked={headless === false}
                                onChange={() => setHeadless(false)}
                            />
                            <span>창 보임(headful)</span>
                        </label>
                        <label className="login-radio">
                            <input
                                type="radio"
                                name="headless"
                                value="true"
                                checked={headless === true}
                                onChange={() => setHeadless(true)}
                            />
                            <span>창 안 보임(headless)</span>
                        </label>
                    </div>
                    {/* 테스트 시작 버튼 */}
                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}>
                        {loading ? "테스트 중..." : "테스트 시작"}
                    </button>
                </form>
            </div>

            {/* 결과 모달 */}
            {showModal && result && (
                <div
                    className="modal-backdrop"
                    onClick={closeModal}>
                    <div
                        className="modal-container"
                        onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">{result.includes("에러") ? "테스트 실패" : "테스트 완료"}</h3>
                            <button
                                className="modal-close"
                                onClick={closeModal}>
                                ×
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className={`modal-result ${result.includes("에러") ? "error" : "success"}`}>{result}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default IndexPage;
