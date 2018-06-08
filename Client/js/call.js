// let address = "http://menubot.pythonanywhere.com/menu/menus";
// let max = 0;
// let min = 18;

// function makeRandom(a,b){
//     return Math.floor(Math.random() * (a-b)+ b);
// }

/*
$("button").on("click", function () {
    $.getJSON(address, function(data){
        $(".section__result").html("오늘의 메뉴는 " + data.menus.[makeRandom(max,min)].name + " 입니다");
        $(".section__picker").html("다시하기");
        console.log(data[makeRandom(max,min)]);
    });
})
*/


$("button").on("click", () => {
    fetch('http://menubot.pythonanywhere.com/menu/')
        .then(response => {
            // ...
            if (response.status === 404) {
                window.location.href = '/404';
            }
            return response.json();
        })
        .then(json => {
            console.log(json);
            const sectionResultEl = document.querySelector("#section__result");
            const sectionButton = document.querySelector(".section__picker");
            sectionResultEl.innerHTML = `오늘의 메뉴는 ${json.name} 입니다`;
            $('button').attr("disabled","disabled");
        })
        .catch(error => {
            console.log('error', error);
        });
});





// const button = document.querySelector('#button');
// button.addEventListener('click', e => {
//     // TODO
//
// });




/*
    document.getElementById("result").innerHTML=data.name + "입니다!";
            if(last_date === null){
                document.getElementById("id").innerHTML="아직 먹은 적이 없습니다";
            }
            else{
                document.getElementById("id").innerHTML=last_date + "입니다!";
            }



*/