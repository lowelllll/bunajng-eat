$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

// 버튼 색 변화
const input = document.getElementById('footer__changer');
input.onkeydown = function() {
        document.getElementById('footer__changer').addEventListener('keyup', function(e){
            const footerSubmitEl = document.getElementById("footer__submit")
            if(e.target.selectionStart === 0){
                footerSubmitEl.style.backgroundColor = "gray";
                document.getElementById("footer__icon").style.color = "white";
            }
            else{
                footerSubmitEl.style.backgroundColor = "red";
                document.getElementById("footer__icon").style.color = "yellow";
            }
        })

}

// 메뉴 추가
$("#footer__submit").on("click",() => { // submit
    // e.preventDefault();
    let FormData  = $("#footer__changer").val();
    console.log(FormData);
    $.ajax({
        url:"//menubot.pythonanywhere.com/menu/create/",
        dataType:'json',
        type:'POST',
        data:{
            'name':FormData
        },
        success:(data) =>{
            $("#footer__changer").val("");
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
                        <i class="fas fa-trash-alt"></i>
                    </div>
                </div>
                `;
            $(".menus").prepend(tag);
        },
        error:() =>{
            console.log("error");
        }
    })
    return false;
});

// 메뉴 삭제
$("#menus").on("click", ".menu__delete", function() {
    const check = confirm("삭제하시겠습니까?");
    if(check === true){
        const $menus = $(this).parent();
        const $input = $menus.find(".id");
        const pk = $input.val();
        console.log('id', pk);

        $.ajax({
            url:"//menubot.pythonanywhere.com/menu/delete/",
            dataType:'json',
            type:'POST',
            data:{
                "pk":pk
            },
            success:function () {
                //alert("success")
            },
            error:function () {
                alert("error");
            }
        })
        $($menus).remove();
    }
});

// 마지막으로 먹은 날 계산

function date_calc(temp_date){
    const date = new Date();
    const yy = date.getFullYear();
    let mm = date.getMonth()+1;
    let dd = date.getDate();
    if(dd<10) { dd='0'+dd };
    if(mm<10) { mm='0'+mm };
    const temp_today = `${yy}-${mm}-${dd}`;
    let result = null;

    if(!(temp_date === null)){
        temp_date = temp_date.toString().substr(0,10);
        const dateArray = temp_date.split("-");
        const todayArray = temp_today.split("-");

        const last_date = new Date(dateArray[0],dateArray[1],dateArray[2]);
        const today = new Date(todayArray[0],todayArray[1],todayArray[2]);


        const dt = (today.getTime() - last_date.getTime())/ 1000 / 60 / 60 / 24;;

        if(dt === 0){
            result = "오늘 먹음";
        }
        else if(dt < 31){
            result = `${dt}일 전 먹음`;
        }
        else {
            result = last_date;
        }
    }
    else{
        result = "먹지 않음";
    }
    return result;
}

// 페이지 로딩 시 전체 리스트를 출력

$.ajax({
    url:'//menubot.pythonanywhere.com/menu/menus/',
    dataType:'json',
    method:'get',
    success:function (data) {
        for(let i=0;i<data.menus.length;i++){
            const last_date= date_calc(data.menus[i]['last_date']);
            const name = data.menus[i]['name'];
            const id = data.menus[i]['id'];

            const tag = `
                <div class="menu">
                    <div class="menu__text">
                        <span class="menu__name">${name}</span>
                        <span class="menu__last-date">${last_date}</span>
                    </div>
                    <input type="hidden" class="id" value="${id}" />
                    <div class="menu__delete">
                        <i class="fas fa-trash-alt"></i>
                    </div>
                </div>
            `;
            $(".menus").append(tag);
        }
    }
})

