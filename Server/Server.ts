import express from "express";

const server = express();

server.use(express.static("./Client"));

server.get("/sse", (req, res) => {
    // SSE 해더 설정
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    /* 클라이언트에 1초에 한번씩 페킷을 날리는 코드 */
    let i = 0;
    setInterval(async () => {
        //해당 메시지 규격은 꼭 지켜져야 한다
        /* 
        event: message\n\n

        data: 보낼데이터

        \n\n
        */

        // 이벤트 설정하기 event: (기본값: message) 내용이 바뀌면 클라이언트도 수정해야함
        res.write("event: message\n\n");

        // 보낼 데이터 data: 
        res.write(`data: ${JSON.stringify({ res: "서버응답" + i })}`);

        // 최종 푸쉬
        res.write("\n\n");
    }, 1000);
});

server.get("/", (req, res) => {
    res.sendFile("./Client/index.html");
});

server.listen(80, () => {
    console.log("80포트로 서버 실행중");
});
