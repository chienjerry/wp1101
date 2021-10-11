currentalbum=0;
let albumone=document.getElementById("album1");
let albumtwo=document.getElementById("album2");
let albumthree=document.getElementById("album3");

function choosethealbum(number){
    albumone.classList.remove('chosen');
    albumtwo.classList.remove('chosen');
    albumthree.classList.remove('chosen')
    if (number===1){
    albumone.classList.add('chosen');
    document.getElementById("album1big").style.display="block";
    document.getElementById("album2big").style.display="none";
    showpic(1);
}
    else if (number==2){
    albumtwo.classList.add('chosen');
    document.getElementById("album1big").style.display="none";
    document.getElementById("album2big").style.display="block";
    showpic(5);
    
}
    else if (number==3){
    alert("這個相簿目前是空的");
   }
   
}

function showpic(number){
    document.getElementById("picfra1").style.background="rgb(184, 217, 255)";
    document.getElementById("picfra2").style.background="rgb(184, 217, 255)";
    document.getElementById("picfra3").style.background="rgb(184, 217, 255)";
    document.getElementById("picfra4").style.background="rgb(184, 217, 255)";
    document.getElementById("picfra5").style.background="rgb(184, 217, 255)";
    document.getElementById("picfra6").style.background="rgb(184, 217, 255)";
    document.getElementById("picfra7").style.background="rgb(184, 217, 255)";
    document.getElementById("picfra8").style.background="rgb(184, 217, 255)";
    document.getElementById("picture1").classList.remove('pic1focus');
    document.getElementById("picture2").classList.remove('pic2focus');
    document.getElementById("picture3").classList.remove('pic3focus');
    document.getElementById("picture4").classList.remove('pic4focus');
    document.getElementById("picture5").classList.remove('pic1focus');
    document.getElementById("picture6").classList.remove('pic2focus');
    document.getElementById("picture7").classList.remove('pic3focus');
    document.getElementById("picture8").classList.remove('pic4focus');
    
    if (number===1){
        
        document.getElementById("picfra1").style.background="rgb(200, 143, 253)"
        document.getElementById("show").innerHTML="您目前瀏覽的是第1個相簿中的第1張相片" ;
        document.getElementById("picture1").classList.add('pic1focus');
}
    else if (number===2){document.getElementById("show").innerHTML="您目前瀏覽的是第1個相簿中的第2張相片" ;
    document.getElementById("picfra2").style.background="rgb(200, 143, 253)"
    document.getElementById("picture2").classList.add('pic2focus');
    
}
    else if (number===3){document.getElementById("show").innerHTML="您目前瀏覽的是第1個相簿中的第3張相片" ;
    document.getElementById("picfra3").style.background="rgb(200, 143, 253)"
    document.getElementById("picture3").classList.add('pic3focus');
}
    else if (number===4){document.getElementById("show").innerHTML="您目前瀏覽的是第1個相簿中的第4張相片" ;
    document.getElementById("picfra4").style.background="rgb(200, 143, 253)"
    document.getElementById("picture4").classList.add('pic4focus');
}
    else if (number===5){document.getElementById("show").innerHTML="您目前瀏覽的是第2個相簿中的第1張相片" ;
    document.getElementById("picfra5").style.background="rgb(200, 143, 253)"
    document.getElementById("picture5").classList.add('pic1focus');
}
    else if (number===6){document.getElementById("show").innerHTML="您目前瀏覽的是第2個相簿中的第2張相片" ;
    document.getElementById("picfra6").style.background="rgb(200, 143, 253)"
    document.getElementById("picture6").classList.add('pic2focus');
}
    else if (number===7){document.getElementById("show").innerHTML="您目前瀏覽的是第2個相簿中的第3張相片" ;
    document.getElementById("picfra7").style.background="rgb(200, 143, 253)"
    document.getElementById("picture7").classList.add('pic3focus');
}
    else if (number===8){document.getElementById("show").innerHTML="您目前瀏覽的是第2個相簿中的第4張相片" ;
    document.getElementById("picfra8").style.background="rgb(200, 143, 253)"
    document.getElementById("picture8").classList.add('pic4focus');
}
    }

choosethealbum(1)

