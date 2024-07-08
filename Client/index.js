// SSE 클라이언트 객체 생성
const eventSource = new EventSource(`/sse`);

// 서버로부터 데이터가 오면
eventSource.addEventListener("message", (e) => {
    console.log(e.data);
});

// 만일 서버쪽에서 event: notification 으로 설정하면 해당 리스너에서 받을 수 있다
/* eventSource.addEventListener("notification", (e) => {
    console.log(e.data);
}); */


// connection되면
eventSource.addEventListener("open", (e) => {
    console.log("SSE 서버연동");
});

// error 나면
eventSource.addEventListener("error", () => {
    if (e.readyState === EventSource.CLOSED) {
        console.log("서버 중단");
    }
});
