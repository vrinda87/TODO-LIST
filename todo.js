let currentUser=JSON.parse(window.localStorage.getItem('user'));
if(!currentUser){
    window.location='index.html';

}

$('#LogOut').on('click',(e)=>{
    e.preventDefault();
    window.localStorage.removeItem('user');
    window.location='index.html';
    
})
const getList=async ()=>{
    try{
        const res=await axios.get('https://jsonplaceholder.typicode.com/todos');
        const lists=res.data;
        console.log(lists);
        let listcontent='';
        lists.forEach((el,index)=>{
            listcontent+=`<li class="list-group-item ${el.completed?'disabledList':''} ${index%2?'list-group-item-info':'list-group-item-success'}"> <input type="checkbox" class="checkbox" ${el.completed?' checked':''}/> <label for=""> ${el.title}</label></li>`
        });
        $('#todoList').html(listcontent);
        if(checkedCount){
            checkedCount=0;
        }

    }
    catch(e){
        console.log('failed to fetch data',e);
    }
}
$('#getList').on('click',(e)=>{
    e.preventDefault();
    getList();
});
let checkedCount=0;

const alertPromise= ()=>{
     return new Promise((resolve,reject)=>{


        if(checkedCount===5){
            resolve(checkedCount)
        }
        else{
            reject('count not equal 5');
        }
    });
}

const promiseCall=()=>{
    alertPromise().then((data)=>{
        alert('congrats..5 tasks completed successfully');
    })
    .catch((err)=>{
        console.log('promise rejected');
    })
}


getList();

$('#todoList').on('change','.checkbox',function(e){
    if($(this).prop('checked')===true){
        console.log('checked');
        checkedCount++; 
        $(this).parent().addClass('active');
    }
    else{
        checkedCount--;
        console.log('unchecked');
        $(this).parent().removeClass('active');
    }

    promiseCall();


});