let lis=[];
let newcheckbox=[];
let newinput=[];
let newlabel=[];
let newh1=[];
let newimg=[];
let newli=[];
inputnumber=0;
finish=0;
unfinish=0;
check();


inputnode=document.getElementById("todo-app__input");
todo_list=document.getElementById("todo-list");
inputnode.addEventListener('keypress',update);

function update(e) {
    if ((e.key==="Enter")&& (inputnode.value!="")){
        create(e.target.value,inputnumber); inputnumber++
    }
    else {write(e.target.value)}
}

temp.textContent="";
function write(e){
    temp.textContent=`${e}`;
}

function create(e,number){
    unfinish++;
    newcheckbox[number]=document.createElement("div");
    newcheckbox[number].classList.add("todo-app__checkbox");
    newinput[number]=document.createElement("input");
    newinput[number].type="checkbox";
    newlabel[number]=document.createElement("label");
    newlabel[number].for=`${inputnumber}`;
    newcheckbox[number].appendChild(newinput[number]);
    newcheckbox[number].appendChild(newlabel[number]);
    lis[number]=0;
    newh1[number]=document.createElement("h1");
    newh1[number].textContent=`${e}`;
    newh1[number].classList.add("todo-app__item-detail");
    newimg[number]=document.createElement("img");
    newimg[number].classList.add("todo-app__item-x");
    newimg[number].src="./img/x.png";

    newimg[number].addEventListener("click",function(){
        newli[number].style.display="None";
        if (lis[number]===0){unfinish--}
        else if (lis[number]===1){finish--};
        lis[number]=4;
        check();
    })

    newli[number]=document.createElement("li");
    newli[number].classList.add("todo-app__item");
    newli[number].id=`${number}`;
    newli[number].appendChild(newcheckbox[number]);
    newli[number].appendChild(newh1[number]);
    newli[number].appendChild(newimg[number]);

    newcheckbox[number].addEventListener("click",function(){
        if (lis[number]===0){
            newh1[number].classList.add("finish"); 
            lis[number]=1;
            newcheckbox[number].classList.add("seleced");
            finish++;
            unfinish--;
        }
        else if (lis[number]===1){
            newh1[number].classList.remove("finish"); 
            lis[number]=0;
            newcheckbox[number].classList.remove("seleced");
            unfinish++;
            finish--;
        }
        check();
    })
    
    todo_list.appendChild(newli[number]);
    inputnode.value="";
    lis[number]=0;
    check();
}

function check(){
    document.getElementById("todo-app__total").textContent=`${unfinish}`+"left(s)";
    if (finish+unfinish===0){
        document.getElementById("todo-footer").style.display="None";}
    else {document.getElementById("todo-footer").style.display="flex";}
    if (finish===0){document.getElementById("todo-app__clean").style.display="None";}
    else {document.getElementById("todo-app__clean").style.display="flex";}
}

function showall(){
    let i;
    for(i=0; i< lis.length ; i++){
        if(lis[i]===0){
        document.getElementById(`${i}`).style.display="flex";
        }
        else if (lis[i]===1){
        document.getElementById(`${i}`).style.display="flex";
        }
    }
}

function active(){
    let i;
    for(i=0; i< lis.length ; i++){
        if (lis[i]===1){
        document.getElementById(`${i}`).style.display="None";
        }
        else if (lis[i]===0){
        document.getElementById(`${i}`).style.display="flex";
        }
    }
}

function completed(){
    let i;
    for(i=0; i< lis.length ; i++){
        if (lis[i]===0){
        document.getElementById(`${i}`).style.display="None";
        }
        else if (lis[i]===1){
        document.getElementById(`${i}`).style.display="flex";
        }
    }
}

function clearcompleted(){
    let i;
    for(i=0; i< lis.length ; i++){
        if (lis[i]===1){
            lis[i]=4;
            document.getElementById(`${i}`).style.display="None";
            finish--;
        }
    check();
    }
}
