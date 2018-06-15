const button = document.querySelector('.section__picker');
const edit = document.querySelector('.fa-cog');
const token = localStorage.getItem("token");
const LoginLink = "Login.html";
const $footer = document.querySelector(".footer");


if(token !== null){
    const tag =
        `<div class="footer__logout">
            <i class="fas fa-sign-out-alt"></i>
            <span class="footer__outText">LogOut</span>
        </div>`
    $footer.insertAdjacentHTML("afterbegin", tag);

    document.querySelector(".footer__logout").addEventListener('click', () => {
        const check = confirm("로그아웃 하시겠습니까?");
        if(check === true){
            localStorage.removeItem("token");
            document.querySelector(".footer__logout").remove();
            alert("로그아웃 되었습니다.");
            location.reload();
        }
        else{
            return;
        }
    });
}



button.addEventListener('click', () => {
    if(token !== null){
        const button = document.querySelector(".section__picker");
        fetch('//bunjangeat.herokuapp.com/menus/random/',{
            headers:{
                'Authorization':`Token ${token}`
            },
            method: "get"
        }).then(response => {
                // ...
                /*
                if (response.status === 404) {
                    window.location.href = '/404';
                }
                */
                return response.json();
            })
            .then(json => {
                const sectionResultEl = document.querySelector("#section__result");
                sectionResultEl.innerHTML = `오늘의 메뉴는 ${json.name} 입니다`;
                button.setAttribute("disabled",false);
            })
            .catch(error => {
                console.log('error', error);
            });
    }
    else{
        alert("로그인이 필요한 서비스입니다 \n로그인 페이지로 이동합니다");
        location.href = LoginLink;
    }
});

edit.addEventListener('click', () => {
    if(token === null){
        alert("로그인이 필요한 서비스입니다 \n로그인 페이지로 이동합니다");
        location.href = LoginLink;
    }
    else {
        location.href = "List.html";
    }
})