(function () {
    ymaps.ready(init);
    function init() {

        var myMap = new ymaps.Map("map", {

            center: [55.75, 37.597],
            zoom: 13.2,
            controls: ["zoomControl"],
            behaviors: ["drag"]
        });


        const marksArr = [
            {
                x: 55.74,
                y: 37.579
            },
            {
                x: 55.7499,
                y: 37.603
            },
            {
                x: 55.757,
                y: 37.620
            },
            {
                x: 55.758,
                y: 37.5827
            }
        ];


        var marks = [];


        for (let i = 0; i < marksArr.length; i++) {
            let placemark = new ymaps.Placemark([marksArr[i].x, marksArr[i].y], {}, {
                iconLayout: "default#image",
                iconImageHref: "img/card/marker.png",
                iconImageSize: [49, 59],
                iconImageOffset: [-24.5, -59]
            });
            marks.push(placemark);
        }

        marks.forEach((i, index) => {
            myMap.geoObjects.add(i)
        })



    }
})();


;(function(){
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
    
})();


;(function () {
  var menu = document.querySelector('#chocolateMenu');
  var menuButton = document.querySelector('#chocolateMenuButton');

  var sendButton = document.querySelector('#sendForm');
  var clearButton = document.querySelector('#clearForm');
  var formModal = document.querySelector('.form__modal-container');
  var sendResultContainer = document.querySelector('.modal__text');
  var closeModal = document.querySelector('#closeForm');

  var commentsControls = document.querySelectorAll(".comments__avatar");
  var comments = document.querySelectorAll(".comment");
  var currentComment = 0;
  var slideInterval = setInterval(nextComment, 4000);

  var volume = document.querySelector(".fas");


  const slideLeft = document.querySelector(".btn__arrow--prev");
  const slideRight = document.querySelector(".btn__arrow--next");
  const slider = document.querySelector("#slider");
  const slides = document.querySelectorAll(".slider__item");
  const slide = document.querySelector(".slider__item");
  let minRight = 0;

  let currentRight = 0;
  slider.style.right = currentRight;

  const accordeonItem = document.querySelector(".item__content-author");
  const accordeonItems = document.querySelectorAll(".item__content-author");

  const menuAccordeons = document.querySelectorAll(".menu1__button");

  for (let i = 0; i < accordeonItems.length; i++) {
    accordeonItems[i].addEventListener('click', (e) => {
      e.preventDefault();
      accordeonItems[i].parentNode.classList.toggle("item__content--active");
      for (let j = 0; j < accordeonItems.length; j++) {
        if (j != i) accordeonItems[j].parentNode.classList.remove("item__content--active");
      }

    })
  }


  for (let i = 0; i < menuAccordeons.length; i++) {
    menuAccordeons[i].addEventListener('click', (e) => {
      e.preventDefault();
      menuAccordeons[i].parentNode.classList.toggle("menu1__item--active");
      for (let j = 0; j < menuAccordeons.length; j++) {
        if (j != i) menuAccordeons[j].parentNode.classList.remove("menu1__item--active");
      }

    })
  }


  function toggleMenu(menue, button) {
    menue.classList.toggle("menu--active");
    button.classList.toggle("is-active");
    menue.classList.remove("fadeOut");
  }

  menuButton.addEventListener("click", function () {
    if (this.classList.contains("is-active")) {
      menu.classList.add("fadeOut");
      setTimeout(() => {
        toggleMenu(menu, menuButton);
      }, 400);


    } else {
      toggleMenu(menu, menuButton)
    }
  });


  menu.addEventListener("click", function (e) {
    e.preventDefault();
    var target = e.target;
    if (target.classList.contains('menu__link') && menu.classList.contains("menu--active")) {
      menu.classList.add("fadeOut");
      setTimeout(() => {
        menu.classList.remove("menu--active");
        menuButton.classList.remove("is-active");
      }, 400);


    }
  });


  clearButton.addEventListener("click", function (e) {
    e.preventDefault();
    for (let i = 0; i < document.forms[0].elements.length; i++) {
      document.forms[0].elements[i].value = "";
    }
  })

  sendButton.addEventListener("click", function (e) {
    e.preventDefault();
    var message = generateData(document.forms[0].elements);
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open("POST", "https://webdev-api.loftschool.com/sendmail");
    req.onload = function () {

      sendResultContainer.textContent = req.response.message
      closeModal.addEventListener("click", (e) => {
        e.preventDefault();
        formModal.classList.remove("form__modal-container--active");
        document.querySelector("body").style.overflow = "visible";
      })
      formModal.classList.add("form__modal-container--active");
      document.querySelector("body").style.overflow = "hidden";
    }
    req.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    req.send(message);
  });


  function generateData(value) {
    var data = new FormData();
    var form = value;
    data.append("name", form["name"].value);
    data.append("phone", form["phone"].value);
    data.append("comment", form["comment"].value);
    data.append("to", "jackpanchenko@mail.ru")
    return data;
  }


  for (let i = 0; i < commentsControls.length; i++) {
    const it = commentsControls[i];

    it.setAttribute('data-index', [i]);
    it.addEventListener("click", function (e) {
      e.preventDefault();
      this.classList.add("user--active");
      goToComment(it.getAttribute('data-index'));
    })
  }




  function nextComment() {
    goToComment(currentComment + 1);
  }

  function goToComment(n) {
    comments[currentComment].classList.remove("comment--active");
    comments[currentComment].style.display = "none";
    commentsControls[currentComment].classList.remove("user--active");
    currentComment = (n + comments.length) % comments.length;
    comments[currentComment].style.display = "flex";
    commentsControls[currentComment].classList.add("user--active");
    setTimeout(() => {
      comments[currentComment].classList.add("comment--active");
    }, 100);
  }




  function moveLeft() {
    let maxRight = (slides.length - 1) * slide.offsetWidth;
    let step = slide.offsetWidth;
    if (currentRight > minRight) {
      currentRight -= step;
      slider.style.right = currentRight + "px";
    }
    else {
      currentRight = maxRight;
      slider.style.right = maxRight + 'px'
    }




  }

  function moveRight() {
    let maxRight = (slides.length - 1) * slide.offsetWidth;
    let step = slide.offsetWidth;
    if (currentRight < maxRight) {
      currentRight += step;
      slider.style.right = currentRight + "px";
    }
    else {
      currentRight = minRight;
      slider.style.right = minRight + 'px'
    }
  }

  slideLeft.addEventListener("click", (e) => {
    e.preventDefault();
    moveLeft();
  })

  slideRight.addEventListener("click", (e) => {
    e.preventDefault();
    moveRight();
  })





  const sections = $(".section");
  const display = $(".maincontent");

  let inscroll = false;

  const md = new MobileDetect(window.navigator.userAgent);

  const isMobile = md.mobile();

  const switchActiveClassInSideMenu = menuItemIndex => {
    $(".fixed-menu__item")
      .eq(menuItemIndex)
      .addClass("active")
      .siblings()
      .removeClass("active");
  };

  const performTransition = sectionEq => {
    if (inscroll) return;

    const sectionEqNum = parseInt(sectionEq);

    if (!!sectionEqNum === false)
      console.error("не верное значение для аргуемента sectionEq");

    inscroll = true;

    const position = sectionEqNum * -100 + "%";

    sections
      .eq(sectionEq)
      .addClass("active")
      .siblings()
      .removeClass("active");

    display.css({
      transform: `translateY(${position})`
    });

    setTimeout(() => {
      inscroll = false;
      switchActiveClassInSideMenu(sectionEq);
    }, 1000 + 300); // продолжительность транзишна + 300мс - время для завершения инерции тачустройств
  };

  const scrollToSection = direction => {
    const activeSection = sections.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction === "next" && nextSection.length) {
      performTransition(nextSection.index());
    }

    if (direction === "prev" && prevSection.length) {
      performTransition(prevSection.index());
    }
  };

  $(".wrapper").on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;
    console.log(deltaY);
    if (deltaY > 0) {
      scrollToSection("next");
    }
    if (deltaY < 0) {
      scrollToSection("prev");
    }
  });

  $('.wrapper').on('touchmove', e => {
    e.preventDefault();
  });

  $(document).on("keydown", e => {
    switch (e.keyCode) {
      case 38:
        scrollToSection("prev");
        break;
      case 40:
        scrollToSection("next");
        break;
    }
  });

  $("[data-scroll-to]").on("click", e => {
    e.preventDefault();
    const target = $(e.currentTarget).attr("data-scroll-to");

    performTransition(target);
  });

  if (isMobile) {
    $(window).swipe({
      swipe: function (event, direction) {
        const nextOrPrev = direction === "up" ? "next" : "prev";
        scrollToSection(nextOrPrev);
      }
    });
  }
})();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmQuanMiLCJwbGF5ZXIuanMiLCJzY3JpcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQ3pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcbiAgICB5bWFwcy5yZWFkeShpbml0KTtcclxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcblxyXG4gICAgICAgIHZhciBteU1hcCA9IG5ldyB5bWFwcy5NYXAoXCJtYXBcIiwge1xyXG5cclxuICAgICAgICAgICAgY2VudGVyOiBbNTUuNzUsIDM3LjU5N10sXHJcbiAgICAgICAgICAgIHpvb206IDEzLjIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xzOiBbXCJ6b29tQ29udHJvbFwiXSxcclxuICAgICAgICAgICAgYmVoYXZpb3JzOiBbXCJkcmFnXCJdXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBjb25zdCBtYXJrc0FyciA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogNTUuNzQsXHJcbiAgICAgICAgICAgICAgICB5OiAzNy41NzlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogNTUuNzQ5OSxcclxuICAgICAgICAgICAgICAgIHk6IDM3LjYwM1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4OiA1NS43NTcsXHJcbiAgICAgICAgICAgICAgICB5OiAzNy42MjBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogNTUuNzU4LFxyXG4gICAgICAgICAgICAgICAgeTogMzcuNTgyN1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuXHJcblxyXG4gICAgICAgIHZhciBtYXJrcyA9IFtdO1xyXG5cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXJrc0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcGxhY2VtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhbbWFya3NBcnJbaV0ueCwgbWFya3NBcnJbaV0ueV0sIHt9LCB7XHJcbiAgICAgICAgICAgICAgICBpY29uTGF5b3V0OiBcImRlZmF1bHQjaW1hZ2VcIixcclxuICAgICAgICAgICAgICAgIGljb25JbWFnZUhyZWY6IFwiaW1nL2NhcmQvbWFya2VyLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlU2l6ZTogWzQ5LCA1OV0sXHJcbiAgICAgICAgICAgICAgICBpY29uSW1hZ2VPZmZzZXQ6IFstMjQuNSwgLTU5XVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbWFya3MucHVzaChwbGFjZW1hcmspO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWFya3MuZm9yRWFjaCgoaSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbXlNYXAuZ2VvT2JqZWN0cy5hZGQoaSlcclxuICAgICAgICB9KVxyXG5cclxuXHJcblxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuXHJcbiIsIihmdW5jdGlvbigpe1xyXG4gICAgdmFyIHZvbHVtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmFzXCIpO1xyXG4gICAgbGV0IHZpZGVvLCBkdXJhdGlvbkNvbnRyb2wsIHNvdW5kQ29udHJsb2wsIGludGVydmFsSWQ7XHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmlkZW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllclwiKTtcclxuICAgIFxyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGF5U3RvcCk7XHJcbiAgICBcclxuICAgICAgICBsZXQgcGxheUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYXlcIik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5QnV0dG9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBwbGF5QnV0dG9uc1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxheVN0b3ApO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICAgICAgbGV0IG1pY0NvbnRyb2wgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21pY1wiKVxyXG4gICAgICAgIG1pY0NvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNvdW5kT2YpXHJcbiAgICBcclxuICAgICAgICBkdXJhdGlvbkNvbnRyb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1cmF0aW9uTGV2ZWxcIik7ICAgIFxyXG4gICAgICAgIGR1cmF0aW9uQ29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsc2V0VmlkZW9EdXJhdGlvbik7XHJcbiAgICAgICAgZHVyYXRpb25Db250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ29ubW91c2Vtb3ZlJyxzZXRWaWRlb0R1cmF0aW9uKTtcclxuICAgICAgICBkdXJhdGlvbkNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgc3RvcEludGVydmFsKTsgXHJcbiAgICAgICAgZHVyYXRpb25Db250cm9sLm1pbiA9IDA7XHJcbiAgICAgICAgZHVyYXRpb25Db250cm9sLnZhbHVlID0gMDsgXHJcbiAgICBcclxuICAgICAgICBzb3VuZENvbnRyb2wgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21pY0xldmVsXCIpXHJcbiAgICAgICAgc291bmRDb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaGFuZ2VTb3VuZFZvbHVtZSlcclxuICAgICAgICBzb3VuZENvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcihcIm9ubW91c2Vtb3ZlXCIsIGNoYW5nZVNvdW5kVm9sdW1lKVxyXG4gICAgICAgIHNvdW5kQ29udHJvbC5taW4gPSAwXHJcbiAgICAgICAgc291bmRDb250cm9sLm1heCA9IDEwXHJcbiAgICAgICAgc291bmRDb250cm9sLnZhbHVlID0gc291bmRDb250cm9sLm1heFxyXG4gICAgXHJcbiAgICBcclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKFwiZW5kZWRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAkKFwiLnZpZGVvX19wbGF5ZXItaW1nXCIpLnRvZ2dsZUNsYXNzKFwiLnZpZGVvX19wbGF5ZXItaW1nIC52aWRlb19fcGxheWVyLWltZy0tYWN0aXZlXCIpXHJcbiAgICAgICAgICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gMFxyXG4gICAgICAgIH0pXHJcbiAgICBcclxuICAgIFxyXG4gICAgICAgIHZvbHVtZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZiAodm9sdW1lLmNsYXNzTGlzdC5jb250YWlucyhcImZhLXZvbHVtZS1vZmZcIikpIHtcclxuICAgICAgICAgICAgICAgIHZvbHVtZS5jbGFzc0xpc3QuYWRkKFwiZmEtdm9sdW1lLW11dGVcIilcclxuICAgICAgICAgICAgICAgIHZvbHVtZS5jbGFzc0xpc3QucmVtb3ZlKFwiZmEtdm9sdW1lLW9mZlwiKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdm9sdW1lLmNsYXNzTGlzdC5hZGQoXCJmYS12b2x1bWUtb2ZmXCIpXHJcbiAgICAgICAgICAgICAgICB2b2x1bWUuY2xhc3NMaXN0LnJlbW92ZShcImZhLXZvbHVtZS1tdXRlXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgXHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHBsYXlTdG9wKCl7XHJcbiAgICAgICAgICAgJChcIi52aWRlb19fcGxheS1pbWdcIikudG9nZ2xlQ2xhc3MoXCJ2aWRlb19fcGxheWVyLWltZy0tYWN0aXZlXCIpOyAgXHJcbiAgICAgICAgICBkdXJhdGlvbkNvbnRyb2wubWF4ID0gdmlkZW8uZHVyYXRpb247XHJcbiAgICBcclxuICAgICAgICAgIGlmICh2aWRlby5wYXVzZWQpe1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcclxuICAgICAgICAgICAgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKHVwZGF0ZUR1cmF0aW9uLDEwMDAvNjApO1xyXG4gICAgICAgICAgICAkKCcudmlkZW9fX3BsYXknKS5hZGRDbGFzcygndmlkZW9fX3BsYXktLWFjdGl2ZScpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIHZpZGVvLnBhdXNlKCk7ICBcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcclxuICAgICAgICAgICAgJCgnLnZpZGVvX19wbGF5JykucmVtb3ZlQ2xhc3MoJ3ZpZGVvX19wbGF5LS1hY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHN0b3BJbnRlcnZhbCgpe1xyXG4gICAgICAgIHZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBzZXRWaWRlb0R1cmF0aW9uKCl7XHJcbiAgICAgICAgaWYgKHZpZGVvLnBhdXNlZCl7XHJcbiAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcclxuICAgICAgICAgICAgJChcIi52aWRlb19fcGxheWVyLWltZ1wiKS5hZGRDbGFzcyhcInZpZGVvX19wbGF5ZXItaW1nLS1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICQoJy5kdXJhdGlvbl9faW1nJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB2aWRlby5wYXVzZSgpOyAgXHJcbiAgICAgICAgICAgICQoXCIudmlkZW9fX3BsYXllci1pbWdcIikucmVtb3ZlQ2xhc3MoXCJ2aWRlb19fcGxheWVyLWltZy0tYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAkKCcuZHVyYXRpb25fX2ltZycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSBkdXJhdGlvbkNvbnRyb2wudmFsdWU7ICBcclxuICAgICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodXBkYXRlRHVyYXRpb24sMTAwMC82MCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVEdXJhdGlvbigpeyAgICBcclxuICAgICAgICBkdXJhdGlvbkNvbnRyb2wudmFsdWUgPSB2aWRlby5jdXJyZW50VGltZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHNvdW5kT2YoKXsgICAgXHJcbiAgICBcclxuICAgICAgICBpZiAodmlkZW8udm9sdW1lID09PSAwKXtcclxuICAgICAgICAgICAgdmlkZW8udm9sdW1lID0gc291bmRMZXZlbDtcclxuICAgICAgICAgICAgc291bmRDb250cm9sLnZhbHVlID0gc291bmRMZXZlbCoxMDtcclxuICAgICAgICAgICAgJCgnLnNvdW5kJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgXHJcbiAgICAgICAgICAgc291bmRMZXZlbCA9IHZpZGVvLnZvbHVtZTtcclxuICAgICAgICAgICB2aWRlby52b2x1bWUgPSAwO1xyXG4gICAgICAgICAgIHNvdW5kQ29udHJvbC52YWx1ZSA9IDA7XHJcbiAgICAgICAgICAgJCgnLnNvdW5kJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgXHJcbiAgICAgICAgfSAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBjaGFuZ2VTb3VuZFZvbHVtZSgpe1xyXG4gICAgXHJcbiAgICAgICAgICAgXHJcbiAgICAgICBcclxuICAgICAgICB2aWRlby52b2x1bWUgPSBzb3VuZENvbnRyb2wudmFsdWUvMTA7IFxyXG4gICAgICAgIGlmKHZpZGVvLnZvbHVtZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICQoJy5zb3VuZCcpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcuc291bmQnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIH1cclxuICAgIFxyXG59KSgpO1xyXG5cclxuXHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hvY29sYXRlTWVudScpO1xyXG4gIHZhciBtZW51QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nob2NvbGF0ZU1lbnVCdXR0b24nKTtcclxuXHJcbiAgdmFyIHNlbmRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VuZEZvcm0nKTtcclxuICB2YXIgY2xlYXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xlYXJGb3JtJyk7XHJcbiAgdmFyIGZvcm1Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19tb2RhbC1jb250YWluZXInKTtcclxuICB2YXIgc2VuZFJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fdGV4dCcpO1xyXG4gIHZhciBjbG9zZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb3NlRm9ybScpO1xyXG5cclxuICB2YXIgY29tbWVudHNDb250cm9scyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29tbWVudHNfX2F2YXRhclwiKTtcclxuICB2YXIgY29tbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbW1lbnRcIik7XHJcbiAgdmFyIGN1cnJlbnRDb21tZW50ID0gMDtcclxuICB2YXIgc2xpZGVJbnRlcnZhbCA9IHNldEludGVydmFsKG5leHRDb21tZW50LCA0MDAwKTtcclxuXHJcbiAgdmFyIHZvbHVtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmFzXCIpO1xyXG5cclxuXHJcbiAgY29uc3Qgc2xpZGVMZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG5fX2Fycm93LS1wcmV2XCIpO1xyXG4gIGNvbnN0IHNsaWRlUmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bl9fYXJyb3ctLW5leHRcIik7XHJcbiAgY29uc3Qgc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzbGlkZXJcIik7XHJcbiAgY29uc3Qgc2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZXJfX2l0ZW1cIik7XHJcbiAgY29uc3Qgc2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlcl9faXRlbVwiKTtcclxuICBsZXQgbWluUmlnaHQgPSAwO1xyXG5cclxuICBsZXQgY3VycmVudFJpZ2h0ID0gMDtcclxuICBzbGlkZXIuc3R5bGUucmlnaHQgPSBjdXJyZW50UmlnaHQ7XHJcblxyXG4gIGNvbnN0IGFjY29yZGVvbkl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLml0ZW1fX2NvbnRlbnQtYXV0aG9yXCIpO1xyXG4gIGNvbnN0IGFjY29yZGVvbkl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pdGVtX19jb250ZW50LWF1dGhvclwiKTtcclxuXHJcbiAgY29uc3QgbWVudUFjY29yZGVvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1lbnUxX19idXR0b25cIik7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWNjb3JkZW9uSXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGFjY29yZGVvbkl0ZW1zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBhY2NvcmRlb25JdGVtc1tpXS5wYXJlbnROb2RlLmNsYXNzTGlzdC50b2dnbGUoXCJpdGVtX19jb250ZW50LS1hY3RpdmVcIik7XHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYWNjb3JkZW9uSXRlbXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBpZiAoaiAhPSBpKSBhY2NvcmRlb25JdGVtc1tqXS5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoXCJpdGVtX19jb250ZW50LS1hY3RpdmVcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWVudUFjY29yZGVvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgIG1lbnVBY2NvcmRlb25zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBtZW51QWNjb3JkZW9uc1tpXS5wYXJlbnROb2RlLmNsYXNzTGlzdC50b2dnbGUoXCJtZW51MV9faXRlbS0tYWN0aXZlXCIpO1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1lbnVBY2NvcmRlb25zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgaWYgKGogIT0gaSkgbWVudUFjY29yZGVvbnNbal0ucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKFwibWVudTFfX2l0ZW0tLWFjdGl2ZVwiKTtcclxuICAgICAgfVxyXG5cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gdG9nZ2xlTWVudShtZW51ZSwgYnV0dG9uKSB7XHJcbiAgICBtZW51ZS5jbGFzc0xpc3QudG9nZ2xlKFwibWVudS0tYWN0aXZlXCIpO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoXCJpcy1hY3RpdmVcIik7XHJcbiAgICBtZW51ZS5jbGFzc0xpc3QucmVtb3ZlKFwiZmFkZU91dFwiKTtcclxuICB9XHJcblxyXG4gIG1lbnVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucyhcImlzLWFjdGl2ZVwiKSkge1xyXG4gICAgICBtZW51LmNsYXNzTGlzdC5hZGQoXCJmYWRlT3V0XCIpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0b2dnbGVNZW51KG1lbnUsIG1lbnVCdXR0b24pO1xyXG4gICAgICB9LCA0MDApO1xyXG5cclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b2dnbGVNZW51KG1lbnUsIG1lbnVCdXR0b24pXHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG5cclxuICBtZW51LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xyXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnVfX2xpbmsnKSAmJiBtZW51LmNsYXNzTGlzdC5jb250YWlucyhcIm1lbnUtLWFjdGl2ZVwiKSkge1xyXG4gICAgICBtZW51LmNsYXNzTGlzdC5hZGQoXCJmYWRlT3V0XCIpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBtZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJtZW51LS1hY3RpdmVcIik7XHJcbiAgICAgICAgbWVudUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICB9LCA0MDApO1xyXG5cclxuXHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG5cclxuICBjbGVhckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9jdW1lbnQuZm9ybXNbMF0uZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgZG9jdW1lbnQuZm9ybXNbMF0uZWxlbWVudHNbaV0udmFsdWUgPSBcIlwiO1xyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIHNlbmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgbWVzc2FnZSA9IGdlbmVyYXRlRGF0YShkb2N1bWVudC5mb3Jtc1swXS5lbGVtZW50cyk7XHJcbiAgICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICByZXEucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xyXG4gICAgcmVxLm9wZW4oXCJQT1NUXCIsIFwiaHR0cHM6Ly93ZWJkZXYtYXBpLmxvZnRzY2hvb2wuY29tL3NlbmRtYWlsXCIpO1xyXG4gICAgcmVxLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIHNlbmRSZXN1bHRDb250YWluZXIudGV4dENvbnRlbnQgPSByZXEucmVzcG9uc2UubWVzc2FnZVxyXG4gICAgICBjbG9zZU1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBmb3JtTW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcImZvcm1fX21vZGFsLWNvbnRhaW5lci0tYWN0aXZlXCIpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLnN0eWxlLm92ZXJmbG93ID0gXCJ2aXNpYmxlXCI7XHJcbiAgICAgIH0pXHJcbiAgICAgIGZvcm1Nb2RhbC5jbGFzc0xpc3QuYWRkKFwiZm9ybV9fbW9kYWwtY29udGFpbmVyLS1hY3RpdmVcIik7XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuICAgIH1cclxuICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKFwiWC1SZXF1ZXN0ZWQtV2l0aFwiLCBcIlhNTEh0dHBSZXF1ZXN0XCIpXHJcbiAgICByZXEuc2VuZChtZXNzYWdlKTtcclxuICB9KTtcclxuXHJcblxyXG4gIGZ1bmN0aW9uIGdlbmVyYXRlRGF0YSh2YWx1ZSkge1xyXG4gICAgdmFyIGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgIHZhciBmb3JtID0gdmFsdWU7XHJcbiAgICBkYXRhLmFwcGVuZChcIm5hbWVcIiwgZm9ybVtcIm5hbWVcIl0udmFsdWUpO1xyXG4gICAgZGF0YS5hcHBlbmQoXCJwaG9uZVwiLCBmb3JtW1wicGhvbmVcIl0udmFsdWUpO1xyXG4gICAgZGF0YS5hcHBlbmQoXCJjb21tZW50XCIsIGZvcm1bXCJjb21tZW50XCJdLnZhbHVlKTtcclxuICAgIGRhdGEuYXBwZW5kKFwidG9cIiwgXCJqYWNrcGFuY2hlbmtvQG1haWwucnVcIilcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH1cclxuXHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29tbWVudHNDb250cm9scy5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgaXQgPSBjb21tZW50c0NvbnRyb2xzW2ldO1xyXG5cclxuICAgIGl0LnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIFtpXSk7XHJcbiAgICBpdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCJ1c2VyLS1hY3RpdmVcIik7XHJcbiAgICAgIGdvVG9Db21tZW50KGl0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuICBmdW5jdGlvbiBuZXh0Q29tbWVudCgpIHtcclxuICAgIGdvVG9Db21tZW50KGN1cnJlbnRDb21tZW50ICsgMSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnb1RvQ29tbWVudChuKSB7XHJcbiAgICBjb21tZW50c1tjdXJyZW50Q29tbWVudF0uY2xhc3NMaXN0LnJlbW92ZShcImNvbW1lbnQtLWFjdGl2ZVwiKTtcclxuICAgIGNvbW1lbnRzW2N1cnJlbnRDb21tZW50XS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBjb21tZW50c0NvbnRyb2xzW2N1cnJlbnRDb21tZW50XS5jbGFzc0xpc3QucmVtb3ZlKFwidXNlci0tYWN0aXZlXCIpO1xyXG4gICAgY3VycmVudENvbW1lbnQgPSAobiArIGNvbW1lbnRzLmxlbmd0aCkgJSBjb21tZW50cy5sZW5ndGg7XHJcbiAgICBjb21tZW50c1tjdXJyZW50Q29tbWVudF0uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgY29tbWVudHNDb250cm9sc1tjdXJyZW50Q29tbWVudF0uY2xhc3NMaXN0LmFkZChcInVzZXItLWFjdGl2ZVwiKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBjb21tZW50c1tjdXJyZW50Q29tbWVudF0uY2xhc3NMaXN0LmFkZChcImNvbW1lbnQtLWFjdGl2ZVwiKTtcclxuICAgIH0sIDEwMCk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuICBmdW5jdGlvbiBtb3ZlTGVmdCgpIHtcclxuICAgIGxldCBtYXhSaWdodCA9IChzbGlkZXMubGVuZ3RoIC0gMSkgKiBzbGlkZS5vZmZzZXRXaWR0aDtcclxuICAgIGxldCBzdGVwID0gc2xpZGUub2Zmc2V0V2lkdGg7XHJcbiAgICBpZiAoY3VycmVudFJpZ2h0ID4gbWluUmlnaHQpIHtcclxuICAgICAgY3VycmVudFJpZ2h0IC09IHN0ZXA7XHJcbiAgICAgIHNsaWRlci5zdHlsZS5yaWdodCA9IGN1cnJlbnRSaWdodCArIFwicHhcIjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBjdXJyZW50UmlnaHQgPSBtYXhSaWdodDtcclxuICAgICAgc2xpZGVyLnN0eWxlLnJpZ2h0ID0gbWF4UmlnaHQgKyAncHgnXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gbW92ZVJpZ2h0KCkge1xyXG4gICAgbGV0IG1heFJpZ2h0ID0gKHNsaWRlcy5sZW5ndGggLSAxKSAqIHNsaWRlLm9mZnNldFdpZHRoO1xyXG4gICAgbGV0IHN0ZXAgPSBzbGlkZS5vZmZzZXRXaWR0aDtcclxuICAgIGlmIChjdXJyZW50UmlnaHQgPCBtYXhSaWdodCkge1xyXG4gICAgICBjdXJyZW50UmlnaHQgKz0gc3RlcDtcclxuICAgICAgc2xpZGVyLnN0eWxlLnJpZ2h0ID0gY3VycmVudFJpZ2h0ICsgXCJweFwiO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGN1cnJlbnRSaWdodCA9IG1pblJpZ2h0O1xyXG4gICAgICBzbGlkZXIuc3R5bGUucmlnaHQgPSBtaW5SaWdodCArICdweCdcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNsaWRlTGVmdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIG1vdmVMZWZ0KCk7XHJcbiAgfSlcclxuXHJcbiAgc2xpZGVSaWdodC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIG1vdmVSaWdodCgpO1xyXG4gIH0pXHJcblxyXG5cclxuXHJcblxyXG5cclxuICBjb25zdCBzZWN0aW9ucyA9ICQoXCIuc2VjdGlvblwiKTtcclxuICBjb25zdCBkaXNwbGF5ID0gJChcIi5tYWluY29udGVudFwiKTtcclxuXHJcbiAgbGV0IGluc2Nyb2xsID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0IG1kID0gbmV3IE1vYmlsZURldGVjdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcblxyXG4gIGNvbnN0IGlzTW9iaWxlID0gbWQubW9iaWxlKCk7XHJcblxyXG4gIGNvbnN0IHN3aXRjaEFjdGl2ZUNsYXNzSW5TaWRlTWVudSA9IG1lbnVJdGVtSW5kZXggPT4ge1xyXG4gICAgJChcIi5maXhlZC1tZW51X19pdGVtXCIpXHJcbiAgICAgIC5lcShtZW51SXRlbUluZGV4KVxyXG4gICAgICAuYWRkQ2xhc3MoXCJhY3RpdmVcIilcclxuICAgICAgLnNpYmxpbmdzKClcclxuICAgICAgLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHBlcmZvcm1UcmFuc2l0aW9uID0gc2VjdGlvbkVxID0+IHtcclxuICAgIGlmIChpbnNjcm9sbCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHNlY3Rpb25FcU51bSA9IHBhcnNlSW50KHNlY3Rpb25FcSk7XHJcblxyXG4gICAgaWYgKCEhc2VjdGlvbkVxTnVtID09PSBmYWxzZSlcclxuICAgICAgY29uc29sZS5lcnJvcihcItC90LUg0LLQtdGA0L3QvtC1INC30L3QsNGH0LXQvdC40LUg0LTQu9GPINCw0YDQs9GD0LXQvNC10L3RgtCwIHNlY3Rpb25FcVwiKTtcclxuXHJcbiAgICBpbnNjcm9sbCA9IHRydWU7XHJcblxyXG4gICAgY29uc3QgcG9zaXRpb24gPSBzZWN0aW9uRXFOdW0gKiAtMTAwICsgXCIlXCI7XHJcblxyXG4gICAgc2VjdGlvbnNcclxuICAgICAgLmVxKHNlY3Rpb25FcSlcclxuICAgICAgLmFkZENsYXNzKFwiYWN0aXZlXCIpXHJcbiAgICAgIC5zaWJsaW5ncygpXHJcbiAgICAgIC5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHJcbiAgICBkaXNwbGF5LmNzcyh7XHJcbiAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHtwb3NpdGlvbn0pYFxyXG4gICAgfSk7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGluc2Nyb2xsID0gZmFsc2U7XHJcbiAgICAgIHN3aXRjaEFjdGl2ZUNsYXNzSW5TaWRlTWVudShzZWN0aW9uRXEpO1xyXG4gICAgfSwgMTAwMCArIDMwMCk7IC8vINC/0YDQvtC00L7Qu9C20LjRgtC10LvRjNC90L7RgdGC0Ywg0YLRgNCw0L3Qt9C40YjQvdCwICsgMzAw0LzRgSAtINCy0YDQtdC80Y8g0LTQu9GPINC30LDQstC10YDRiNC10L3QuNGPINC40L3QtdGA0YbQuNC4INGC0LDRh9GD0YHRgtGA0L7QudGB0YLQslxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNjcm9sbFRvU2VjdGlvbiA9IGRpcmVjdGlvbiA9PiB7XHJcbiAgICBjb25zdCBhY3RpdmVTZWN0aW9uID0gc2VjdGlvbnMuZmlsdGVyKFwiLmFjdGl2ZVwiKTtcclxuICAgIGNvbnN0IG5leHRTZWN0aW9uID0gYWN0aXZlU2VjdGlvbi5uZXh0KCk7XHJcbiAgICBjb25zdCBwcmV2U2VjdGlvbiA9IGFjdGl2ZVNlY3Rpb24ucHJldigpO1xyXG5cclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwibmV4dFwiICYmIG5leHRTZWN0aW9uLmxlbmd0aCkge1xyXG4gICAgICBwZXJmb3JtVHJhbnNpdGlvbihuZXh0U2VjdGlvbi5pbmRleCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInByZXZcIiAmJiBwcmV2U2VjdGlvbi5sZW5ndGgpIHtcclxuICAgICAgcGVyZm9ybVRyYW5zaXRpb24ocHJldlNlY3Rpb24uaW5kZXgoKSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgJChcIi53cmFwcGVyXCIpLm9uKFwid2hlZWxcIiwgZSA9PiB7XHJcbiAgICBjb25zdCBkZWx0YVkgPSBlLm9yaWdpbmFsRXZlbnQuZGVsdGFZO1xyXG4gICAgY29uc29sZS5sb2coZGVsdGFZKTtcclxuICAgIGlmIChkZWx0YVkgPiAwKSB7XHJcbiAgICAgIHNjcm9sbFRvU2VjdGlvbihcIm5leHRcIik7XHJcbiAgICB9XHJcbiAgICBpZiAoZGVsdGFZIDwgMCkge1xyXG4gICAgICBzY3JvbGxUb1NlY3Rpb24oXCJwcmV2XCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAkKCcud3JhcHBlcicpLm9uKCd0b3VjaG1vdmUnLCBlID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICB9KTtcclxuXHJcbiAgJChkb2N1bWVudCkub24oXCJrZXlkb3duXCIsIGUgPT4ge1xyXG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcclxuICAgICAgY2FzZSAzODpcclxuICAgICAgICBzY3JvbGxUb1NlY3Rpb24oXCJwcmV2XCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDQwOlxyXG4gICAgICAgIHNjcm9sbFRvU2VjdGlvbihcIm5leHRcIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gICQoXCJbZGF0YS1zY3JvbGwtdG9dXCIpLm9uKFwiY2xpY2tcIiwgZSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCB0YXJnZXQgPSAkKGUuY3VycmVudFRhcmdldCkuYXR0cihcImRhdGEtc2Nyb2xsLXRvXCIpO1xyXG5cclxuICAgIHBlcmZvcm1UcmFuc2l0aW9uKHRhcmdldCk7XHJcbiAgfSk7XHJcblxyXG4gIGlmIChpc01vYmlsZSkge1xyXG4gICAgJCh3aW5kb3cpLnN3aXBlKHtcclxuICAgICAgc3dpcGU6IGZ1bmN0aW9uIChldmVudCwgZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgbmV4dE9yUHJldiA9IGRpcmVjdGlvbiA9PT0gXCJ1cFwiID8gXCJuZXh0XCIgOiBcInByZXZcIjtcclxuICAgICAgICBzY3JvbGxUb1NlY3Rpb24obmV4dE9yUHJldik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSkoKTtcclxuXHJcbiJdfQ==
