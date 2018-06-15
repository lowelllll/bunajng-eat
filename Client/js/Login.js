const Form = document.querySelector(".login__input-form")
Form.addEventListener("submit",function () {
    const FormId = Form.id.value.toLowerCase();
    const FormPw = Form.pw.value.toLowerCase();
    if (FormId === "" || FormPw === "") {
        alert("아이디 혹은 비밀번호가 공백입니다");
        return false;
    }
    fetch("https://bunjangeat.herokuapp.com/login/",{
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method:"POST",
        body:JSON.stringify({
            "username":FormId,
            "password":FormPw
        })
    }).then(response => {
        return response.json();
    }).then(function (tokenValue) {
        const token = tokenValue;
        if(token.token === undefined || token.token === null){
            alert("아이디 혹은 비밀번호가 잘못되었습니다.\n다시 입력해 주십시오");
            Form.id.value = "";
            Form.pw.value = "";
            Form.id.focus();
        }
        else{
            Form.id.value = "";
            Form.pw.value = "";
            localStorage.setItem("token",token.token);
            const Name = FormId.charAt(0).toUpperCase() + FormId.slice(1);
            alert(`인증회원 : [ ${Name} ]\n로그인에 성공했습니다\n확인 혹은 Enter를 누르시면 메인 페이지로 이동합니다`);
            location.href = "Main.html";
        }
    })
})