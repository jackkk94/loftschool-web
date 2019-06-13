var volume = document.querySelector(".fas");
let video, durationControl, soundContrlol, intervalId;



$(document).ready(function () {
    video = document.querySelector("#player");

    video.addEventListener("click", playStop);

    let playButtons = document.querySelectorAll(".play");
    for (let i = 0; i < playButtons.length; i++) {
        playButtons[i].addEventListener("click", playStop);
    }


    let micControl = document.querySelector("#mic")
    micControl.addEventListener("click", soundOf)

    durationControl = document.getElementById("durationLevel");    
    durationControl.addEventListener('click',setVideoDuration);
    durationControl.addEventListener('onmousemove',setVideoDuration);
    durationControl.addEventListener('mousedown', stopInterval); 
    durationControl.min = 0;
    durationControl.value = 0; 

    soundControl = document.querySelector("#micLevel")
    soundControl.addEventListener("click", changeSoundVolume)
    soundControl.addEventListener("onmousemove", changeSoundVolume)
    soundControl.min = 0
    soundControl.max = 10
    soundControl.value = soundControl.max


    video.addEventListener("ended", () => {
        $(".video__player-img").toggleClass(".video__player-img .video__player-img--active")
        video.currentTime = 0
    })


    volume.addEventListener("click", (e) => {
        e.preventDefault();
        if (volume.classList.contains("fa-volume-off")) {
            volume.classList.add("fa-volume-mute")
            volume.classList.remove("fa-volume-off")
        } else {
            volume.classList.add("fa-volume-off")
            volume.classList.remove("fa-volume-mute")
        }
    })

})





function playStop(){
       $(".video__play-img").toggleClass("video__player-img--active");  
      durationControl.max = video.duration;

      if (video.paused){
   
        video.play();
        intervalId = setInterval(updateDuration,1000/60);
        $('.video__play').addClass('video__play--active');
    }else{
      
        video.pause();  
        clearInterval(intervalId);
        $('.video__play').removeClass('video__play--active');
    }
}

function stopInterval(){
    video.pause();
    clearInterval(intervalId);
}


function setVideoDuration(){
    if (video.paused){
        video.play();
        $(".video__player-img").addClass("video__player-img--active");
        $('.duration__img').addClass('active');
    }else{
        video.pause();  
        $(".video__player-img").removeClass("video__player-img--active");
        $('.duration__img').removeClass('active');
    }
    video.currentTime = durationControl.value;  
    intervalId = setInterval(updateDuration,1000/60);
}



function updateDuration(){    
    durationControl.value = video.currentTime;
}



function soundOf(){    

    if (video.volume === 0){
        video.volume = soundLevel;
        soundControl.value = soundLevel*10;
        $('.sound').removeClass('active');
    }else{

       soundLevel = video.volume;
       video.volume = 0;
       soundControl.value = 0;
       $('.sound').addClass('active');

    }    
}


function changeSoundVolume(){

       
   
    video.volume = soundControl.value/10; 
    if(video.volume == 0) {
        $('.sound').addClass('active');
    } else {
        $('.sound').removeClass('active');
    }


}
