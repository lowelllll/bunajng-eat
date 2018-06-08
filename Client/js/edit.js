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
function mykeydown() {
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

// 메뉴 생
$("#footer__submit").on("click",() => { // submit
    // e.preventDefault();

    let FormData  = $("#footer__changer").val();
    console.log(FormData);
    $.ajax({
        url:"http://menubot.pythonanywhere.com/menu/create/",
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

});

// 삭제
$("#menus").on("click", ".menu__delete", function() {
    const $menus = $(this).parent();
    const $input = $menus.find(".id");
    const pk = $input.val();
    console.log('id', pk);

    $.ajax({
        url:"http://menubot.pythonanywhere.com/menu/delete/",
        dataType:'json',
        type:'POST',
        data:{
            "pk":pk
        },
        success:function () {
            //alert("success")
        },
        error:function () {
            alert("error")
        }
    })


    $($menus).remove();
});

$.ajax({
    url:'http://menubot.pythonanywhere.com/menu/menus/',
    dataType:'json',
    method:'get',
    success:function (data) {
        for(let i=0;i<data.menus.length;i++){
            let name = data.menus[i]['name'];
            console.log(name);
            let id = data.menus[i]['id'];
            let last_date = data.menus[i]['last_date'];
            const tag = `
                <div class="menu">
                    <div class="menu__text">
                        <span class="menu__name">${name}</span>
                        <span class="menu__last-date">${last_date === null ? '먹은 적 없음' : last_date}</span>
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
