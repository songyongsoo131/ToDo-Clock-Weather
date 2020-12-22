const form = document.querySelector(".js-form"),
    input = document.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello, ${text}!`;
}

function handleSubmit(event) {
    event.preventDefault(); // 디폴트 이벤트 삭제 -> 여기서는 submit의 기본 이벤트인 엔터 입력 이벤트 삭제
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        // 유저가 없는 경우
        askForName();
    } else {
        // 유저가 있는 경우
        paintGreeting(currentUser);
    }
}
function init() {
    loadName();
}
init();
