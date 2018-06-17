// 토큰 인증

const token = localStorage.getItem("token");
(function () {
    if(token === null){
        alert("로그인이 필요한 서비스입니다 \n로그인 페이지로 이동합니다");
        location.href = "Login.html";
    }
    else{
        return;
    }
})();


// 버튼 색 변화
const input = document.getElementById('footer__changer');
input.onkeydown = function() {
    document.getElementById('footer__changer').addEventListener('keyup', function(e) {
        const footerSubmitEl = document.querySelector("#footer__submit");
        const footerIconEl = document.querySelector("#footer__icon");
        if (e.target.selectionStart === 0) {
            footerSubmitEl.setAttribute("style", "background-color:gray");
            footerIconEl.setAttribute("style", "color:white");
        } else {
            footerSubmitEl.setAttribute("style", "background-color:red");
            footerIconEl.setAttribute("style", "color:yellow");
        }
    })
}


// 메뉴 추가
const FooterForm = document.querySelector('.footer__form');
FooterForm.addEventListener('submit', function() {

    const Form = document.querySelector("#footer__changer").value;
    if (Form === "") {
        alert("내용을 입력해주세요");
        return false;
    }
    const SendFormData = new FormData();
    SendFormData.append("name", Form);

    fetch("//bunjangeat.herokuapp.com/menus/", {
        headers:{
            'Authorization':`Token ${token}`
        },
        method: "POST",
        body: SendFormData
    }).then(response => {
        return response.json()
    }).then(data => {
            const $menus = document.querySelector(".menus");
            document.querySelector("#footer__changer").value = "";
            const name = data['name'];
            const id = data['id'];
            const last_date = data['last_date'];
            const tag = `
                <div class="menu">
                    <div class="menu__text">
                        <span class="menu__name">${name}</span>
                        <span class="menu__last-date">${last_date==null?'먹은 적 없음':last_date}</span>
                    </div>
                    <input type="hidden" class="id" value="${id}" />
                    <div class="menu__delete">         
                        <i class="fas fa-trash-alt" onclick="deleter()"></i>
                    </div>
                </div>
                `;
            $menus.insertAdjacentHTML("afterbegin", tag);
        })
    return false;
})


// 메뉴 삭제

function deleter() {
    const check = confirm("삭제하시겠습니까?");
    if (check === true) {

        const $menu = document.querySelectorAll('.menu');

        function deleteClick(idx) {
            $menu[idx].onclick = function () {
                const $input = $menu[idx].querySelector(".id");
                const pk = $input.value;

                const formData = new FormData();
                formData.append('pk', pk);
                fetch(`//bunjangeat.herokuapp.com/menus/${pk}/`, {
                    headers: {
                        'Authorization': `Token ${token}`
                    },
                    method: 'DELETE',
                    body: formData
                }).then(() => {
                    $menu[idx].remove();
                })
            };
        }

        for (let i = 0; i < $menu.length; i++) {
            deleteClick(i);
        }
    }
}



// 마지막으로 먹은 날 계산

function date_calc(temp_date) {
    const date = new Date();
    const yy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    if (dd < 10) {
        dd = '0' + dd
    };
    if (mm < 10) {
        mm = '0' + mm
    };
    const temp_today = `${yy}-${mm}-${dd}`;
    let result;

    if (!(temp_date === null)) {
        temp_date = temp_date.toString().substr(0, 10);
        const dateArray = temp_date.split("-");
        const todayArray = temp_today.split("-");

        const last_date = new Date(dateArray[0], dateArray[1], dateArray[2]);
        const today = new Date(todayArray[0], todayArray[1], todayArray[2]);

        const dt = (today.getTime() - last_date.getTime()) / 1000 / 60 / 60 / 24;

        if (dt === 0) {
            result = "오늘 먹음";
        } else if (dt < 31) {
            result = `${dt}일 전 먹음`;
        } else {
            result = last_date;
        }
    } else {
        result = "먹지 않음";
    }
    return result;
}


// 페이지 로딩 시 전체 리스트를 출력

fetch('//bunjangeat.herokuapp.com/menus/',{
    headers:{
        'Authorization':`Token ${token}`
    },
    dataType: 'json',
    method: 'GET'
}).then(response => {
    return response.json();
}).then(data => {
    const $menus = document.querySelector(".menus");
    for (let i = 0; i < data.results.length; i++) {
        const last_date = date_calc(data.results[i]['last_date']);
        const name = data.results[i]['name'];
        const id = data.results[i]['id'];
        const tag = `
                <div class="menu">
                    <div class="menu__text">
                        <span class="menu__name">${name}</span>
                        <span class="menu__last-date">${last_date}</span>
                    </div>
                    <input type="hidden" class="id" value="${id}" />
                    <div class="menu__delete">
                        <i class="fas fa-trash-alt" onclick="deleter()"></i>
                    </div>
                </div>
            `;
        $menus.insertAdjacentHTML("beforeend", tag);
    }
})