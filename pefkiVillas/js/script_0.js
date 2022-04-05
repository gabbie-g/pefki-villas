window.addEventListener("load", function(){


    var closeBtn = document.createElement("div");
    closeBtn.id = "close-button";

    $("#beach")[0].onclick = function(){
        document.body.style.overflow = "hidden";
        $(".background-dark")[0].style.display = "flex";
        $("#large-beach")[0].appendChild(closeBtn);
        closeBtn.addEventListener("click", function(){
            $(".background-dark")[0].style.display = "none";
            document.body.style.overflow = "auto";
        });
        document.onkeyup = (event)=>{
            if(event.key == "Escape"){
                $(".background-dark")[0].style.display = "none";
                document.body.style.overflow = "auto";
            }
        }
    }

    $("#boat")[0].onclick = function(){
        document.body.style.overflow = "hidden";
        $(".background-dark")[1].style.display = "flex";
        $("#boat-cruisers")[0].appendChild(closeBtn);
        closeBtn.addEventListener("click", function(){
            $(".background-dark")[1].style.display = "none";
            document.body.style.overflow = "auto";
        });
        document.onkeyup = (event)=>{
            if(event.key == "Escape"){
                $(".background-dark")[1].style.display = "none";
                document.body.style.overflow = "auto";
            }
        }
    }

    $("#food")[0].onclick = function(){
        document.body.style.overflow = "hidden";
        $(".background-dark")[2].style.display = "flex";
        $("#tavernas")[0].appendChild(closeBtn);
        closeBtn.addEventListener("click", function(){
            $(".background-dark")[2].style.display = "none";
            document.body.style.overflow = "auto";
        });
        document.onkeyup = (event)=>{
            if(event.key == "Escape"){
                $(".background-dark")[2].style.display = "none";
                document.body.style.overflow = "auto";
            }
        }
    }


    let buttons = document.getElementsByClassName("btn-danger");
    for(let i =0; i<buttons.length; i++){
        buttons[i].addEventListener("click", function(){

            (async function () {

                try{
                    let response = await fetch("data.json");
                    console.log(response.status);

                    if(response.status !== 200){
                        throw new Error("Fetch error");
                    }

                    let data = await response.json();
                    //console.log(data);
                    data = data.gallery;
                    //console.log(data);

                    document.body.style.overflow = "hidden";

                    let bgGallery = document.createElement("div");
                    document.body.appendChild(bgGallery);
                    bgGallery.id = "bg-gallery";

                    let photoGallery = document.createElement("div");
                    bgGallery.appendChild(photoGallery);
                    photoGallery.id = "photo-gallery";

                    var header = document.createElement("h2");
                    header.innerHTML = data.name;
                    header.style.color = "white";
                    photoGallery.appendChild(header);


                    photoGallery.appendChild(closeBtn);
                    let h = header.clientHeight - closeBtn.clientHeight;
                    var style = photoGallery.currentStyle || window.getComputedStyle(photoGallery);
                    closeBtn.style.top = parseInt(style.paddingTop) + h/2 + "px";
                    console.log(closeBtn.style.top);
                    closeBtn.addEventListener("click", function(){
                        bgGallery.style.display = "none";
                        document.body.style.overflow = "auto";
                    });
                    document.onkeyup = (event)=>{
                        if(event.key == "Escape"){
                            bgGallery.style.display = "none";
                            document.body.style.overflow = "auto";
                        }
                    };


                    let gallery = document.createElement("div");
                    photoGallery.appendChild(gallery);
                    gallery.id = "gallery";
                    gallery.classList.add('multi-carousel-inner');

                    data = data.images;

                    var container = document.createElement("div");
                    container.id = "container";
                    photoGallery.appendChild(container);

                    var imageContainer = document.createElement("div");
                    imageContainer.id = "image-container";
                    container.appendChild(imageContainer);


                    for(let i=0; i < data.length; i++){

                        let image = data[i].thumbnail;

                        gallery.innerHTML += "<img src=" + image.url + " id=" + data[i].id + " width=" + image.width
                            + " height=" + image.height + " title=" + data[i].title + " class='gallery-images multi-carousel-item'>";

                        container.style.height = $(photoGallery).height() - $(header).outerHeight(true) - $(gallery).outerHeight(true) + "px";
                    }


                    let arrowLeft = document.createElement("i");
                    container.appendChild(arrowLeft);
                    arrowLeft.classList.add("fas");
                    arrowLeft.classList.add("fa-chevron-left");
                    arrowLeft.id = "arrow-left";
                    arrowLeft.classList.add("arrow");
                    arrowLeft.style.top = container.clientHeight/2 - arrowLeft.clientHeight/2 + 'px';

                    
                    let arrowRight = document.createElement("i");
                    container.appendChild(arrowRight);
                    arrowRight.classList.add("fas");
                    arrowRight.classList.add("fa-chevron-right");
                    arrowRight.id = "arrow-right";
                    arrowRight.classList.add("arrow");
                    arrowRight.style.top = container.clientHeight/2 - arrowRight.clientHeight/2 + 'px';


                    let interval;

                    var images = document.getElementsByClassName("gallery-images");

                    for(let j = 0; j < images.length; j++){
                        console.log(images[j].id - 1);
                        
                        images[j].addEventListener("click", function(){

                            imageContainer.style.backgroundImage = "url(" + images[j].src + ")";
                            localStorage.setItem("selected-image", images[j].id - 1);

                            if(photoGallery.clientHeight < 550){
                                if(interval){
                                    cancelAnimationFrame(interval);
                                    interval = undefined;
                                }else{
                                    interval = requestAnimationFrame(update);
                                }
                            }
                        });
                    }



                    let gallery_1 = gallery.cloneNode(true);
                    photoGallery.insertBefore(gallery_1, container);
                    var images1 = gallery_1.getElementsByClassName("gallery-images");
                    console.log(images1.length);
                    for(let j = 0; j < images1.length; j++){
                        
                        images1[j].addEventListener("click", function(){

                            imageContainer.style.backgroundImage = "url(" + images1[j].src + ")";
                            localStorage.setItem("selected-image", images1[j].id - 1);

                            if(photoGallery.clientHeight < 550){
                                if(interval){
                                    cancelAnimationFrame(interval);
                                    interval = undefined;
                                }else{
                                    interval = requestAnimationFrame(update);
                                }
                            }

                        });
                    }
                    container.style.top =  gallery.clientHeight + parseFloat(window.getComputedStyle(gallery).marginBottom) + "px";

                    let pos = 0;
                    function update(){             
                        if(parseInt(gallery.style.left) <= -gallery.scrollWidth){
                            gallery.style.left = 0;
                            gallery_1.style.left = gallery.scrollWidth + 'px';
                            pos = 0;
                        } 
                           
                        pos--;
                        gallery.style.left = pos + 'px';
                        gallery_1.style.left = gallery.scrollWidth + pos + 'px';
                        interval = requestAnimationFrame(update);
                    }
                    update();
            
                    arrowLeft.onclick = ()=>{
                        if (localStorage.getItem("selected-image") =="0"){
                            localStorage.setItem("selected-image", images1.length - 1);
                            imageContainer.style.backgroundImage =   "url(" + gallery.children[parseInt(localStorage.getItem("selected-image"))].src + ")";
                        } else {
                            localStorage.setItem("selected-image", localStorage.getItem("selected-image") - 1);
                            imageContainer.style.backgroundImage = `url(${gallery.children[parseInt(localStorage.getItem("selected-image"))].src})`;
                        }
                    };
                    arrowRight.addEventListener("click", ()=>{

                        if (localStorage.getItem("selected-image") == images1.length - 1){
                            localStorage.setItem("selected-image", "0");
                            imageContainer.style.backgroundImage =   "url(" + gallery.children[parseInt(localStorage.getItem("selected-image"))].src + ")";
                        } else {
                            localStorage.setItem("selected-image", parseInt(localStorage.getItem("selected-image")) + 1);
                            imageContainer.style.backgroundImage =   "url(" + gallery.children[parseInt(localStorage.getItem("selected-image"))].src + ")";
                        }
                    });

                    if(localStorage.getItem("selected-image") != null){
                        imageContainer.style.backgroundImage =  "url(" + gallery.children[localStorage.getItem("selected-image")].src + ")";
                    } else {
                        imageContainer.style.backgroundImage = "url(" + data[0].thumbnail.url + ")";
                        localStorage.setItem("selected-image", 0);
                    }


                }
                catch(err){
                    console.log(err);
                }

            })();
        })
    }


    

    // let header = document.getElementById("header");
    // let hero = document.getElementById("hero-section");

    // document.onscroll = function(){
    //     if(this.documentElement.scrollTop > this.documentElement.clientHeight){
    //         header.classList.add("solid-header");
    //         header.classList.remove("p-3");
    //     } else {
    //         header.classList.remove("solid-header");
    //         header.classList.add("p-3");
    //     }
    // }

    $(document).scroll(function(){
        if(this.documentElement.scrollTop > this.documentElement.clientHeight){
            $("#header").addClass("solid-header");
            $("#header").removeClass("p-3");
        } else {
            $("#header").removeClass("solid-header");
            $("#header").addClass("p-3");
        }
    })

    
    $("#menu-btn").click(function(){
        $("#mobile-menu").css("display", "block");
    })
    $("#close-btn").click(function(){
        $("#mobile-menu").css("display", "none");
    })
    $(".mobile-menu-item").each(function(){
        $(this).click(function(){
            $("#mobile-menu").css("display", "none");
        })
    })
            

    var map = L.map('map', {
        center: [39.006525477492744, 23.210849951479815], 
        zoom: 14,
        scrollWheelZoom: false,
        gestureHandling: true,
        gestureHandlingOptions:{
            text:{touch: "Use two fingers to move the map"}
        } 
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([39.006525477492744, 23.210849951479815]).addTo(map)
        .bindPopup('Pefki Villas:<br> 39.006525477492744, 23.210849951479815')
        .openPopup();


    $(".map").each(function(){
        this.onclick=function(){
            let id = this.id;
            switch(id){
                case "plus":
                    map.zoomIn(1);
                    break;
                case "minus":
                    map.zoomOut(1);
                    break;
            }

        }
    })


})


