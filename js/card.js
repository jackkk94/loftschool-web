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
            x:55.74,
            y:37.579
        },
        {
            x:55.7499,
            y:37.603
        },
        {
            x:55.757,
            y:37.620
        },
        {
            x:55.758,
            y:37.5827
        }
    ];


var marks=[];


for(let i=0;i<marksArr.length;i++){
    let placemark = new ymaps.Placemark([marksArr[i].x,marksArr[i].y ], {}, {
        iconLayout: "default#image",
        iconImageHref: "img/card/marker.png",
        iconImageSize: [49, 59],
        iconImageOffset: [-24.5, -59]
    });
    marks.push(placemark);
}

marks.forEach((i,index)=>{
    myMap.geoObjects.add(i)
})

   
 
}