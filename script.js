const submitBtn = document.getElementsByClassName('btn-submit');
const titleTxt = document.getElementById('title');
const areaTxt = document.getElementById('description');
const list = document.getElementById('toDoList');
const deleteBut = document.getElementsByClassName('back-section');

/*
    add form title / description to to do list
*/
submitBtn[0].addEventListener('click', function(e){
    e.preventDefault();
    let titleStr = titleTxt.value;
    let descriptionStr = areaTxt.value;

    /* if title longer than 0 , add to-do-list */
    if( titleStr.trim().length ){
        console.log('text is longer than 1')

        let data = { title : "this is title", description : "this is description" }
        
        fetch(`http://localhost:3000/insert/`,{
            method: "POST",
            headers: {"Content-type": "application/json;charset=UTF-8"},
            body: JSON.stringify(data)
        })
            .then((response) => {
                response.json()
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) =>
                console.log('Error:', error)
            );
        
        reset();
        
    }else{
        alert("Please enter title and description !");
    }
});

function reset(){
    titleTxt.value = ``;
    areaTxt.value = ``;
}

/*
    showing to do list
*/
fetch(`http://localhost:3000/`,{
    method: "GET",
    headers: {"Content-type": "application/json;charset=UTF-8"}
    })
    .then((response) =>
        response.json()
    )
    .then((data) => {
        // console.log(data.length);
        // console.log(`${data[0].title} ${data[0].description}`);
    
        for(let i=0 ; i < data.length ; i++ ){
            list.innerHTML+=`<li>
                                <div class="front-section">
                                    <h2>
                                        <u>${data[i].title}</u>
                                    </h2>
                                        ${data[i].description}
                                </div>
                                        
                                <i class="far fa-trash-alt delete"></i>
                                        
                            </li>`;
        };
    })
    .catch((error) => {
        console.log(`Error: ${error}`);
    });

list.addEventListener('click', function(e){
    if(e.target.classList.contains('delete')){
        let checkTitle = e.target.parentElement.children[0].children[0].children[0].innerHTML;
        fetch(`http://localhost:3000/delete/${checkTitle}`, { 
            method: "DELETE"
        }).then((response) => {
            response.json()
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) =>
            console.log('Error:', error)
        );
    }
});