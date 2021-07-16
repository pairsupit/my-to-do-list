const submitBtn = document.getElementsByClassName('btn-submit');
const titleTxt = document.getElementById('title');
const areaTxt = document.getElementById('description');
const toDoListTxt = document.getElementById('toDoList');

submitBtn[0].addEventListener('click', function(e){
    e.preventDefault();
    console.log(titleTxt.value);
    let txt = titleTxt.value;

    if( txt.trim().length ){
        console.log('text is longer than 1')
        toDoListTxt.innerHTML += '<li><div class="front-section"><h2><u>'+ txt 
                            +'</u></h2>'+ areaTxt.value.trim()+'</div><div class="back-section">'
                            +'</div></li>';
        
        reset();

        
    }else{
        alert("Please enter title and description !");
    }
});

function reset(){
    titleTxt.value = '';
    areaTxt.value = '';
}
