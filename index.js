// http://packery.metafizzy.co/packery.pkgd.js added as external resource

var COLORS = [
'DFDF34',
'249967',
'1F8686',
'4A3199',
'E17B38',
'6E2995',
'304B96',
'2AB22A',
'B32A77'
];

var VIDEOS = {
  '28':{
    user : "Ludivine",
    file : 'ludi1.mp4',
    landscape : true,
    color : COLORS[0],
  },'9':{
    user : "Ludivine",
    file : 'ludi2.mp4',
    landscape : false,
    color : COLORS[0],
  },'8':{
    user : "Ludivine",
    file : 'ludi3.mp4',
    landscape : false,
    color : COLORS[0],
  },'10':{
    user : "Sam & Emma",
    file : 'samemma.webm',
    landscape : false,
    color : COLORS[1],
  },'12':{
    user : "Max",
    file : 'max1.mp4',
    landscape : false,
    color : COLORS[2],
  },'13':{
    user : "Kelly",
    file : 'kelly.mp4',
    landscape : true,
    color : COLORS[3],
  },'15':{
    user : "Max",
    file : 'max2.mp4',
    landscape : false,
    color : COLORS[2],
  },'16':{
    user : "Theo, Lou & Salom&eacute;",
    file : 'lyon.webm',
    landscape : true,
    color : COLORS[4],
  },'18':{
    user : "L&eacute;a",
    file : 'lea.mp4',
    landscape : false,
    color :  COLORS[5],
  },'20':{
    user : "Luna",
    file : 'luna.mp4',
    landscape : true,
    color : COLORS[6],
  },'27':{
    user : "Thomas",
    file : 'claret.mp4',
    landscape : false,
    color : COLORS[7],
  }, '33':{
    user : "Sarouche",
    file : 'sarouche.webm',
    landscape : true,
    color : COLORS[8],
  }};

  var BIRTHDAYS = [
  'Happy Bday ! ',
  'Joyeux Anniversaire!',
  'Feliz cumpleaños!',
  'O ku ojo ibi!',
  'عيد ميلاد سعيد!',
  '생일 축하 해요!',
  'जन्मदिन मुबारक!',
  '生日快乐！',
  'Doğum günün kutlu olsun!',
  'Ala bon sa bon anivèsè nesans!'

  ];

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  docReady( function() {

    //Canvas
    var canvas = document.getElementById("back-bands");
    canvas.width = window.innerWidth; //document.width is obsolete
    canvas.height =  window.innerHeight;

    
    function drawCanvas () {
      var ctx = canvas.getContext("2d");
      var height = document.body.clientHeight / COLORS.length;

      for (var ic = COLORS.length - 1; ic >= 0; ic--) {
        var color = COLORS[ic]
        ctx.fillStyle="#" + color;
        ctx.fillRect(0, ic * height, canvas.width, height);
      };
    }

    window.addEventListener('resize', drawCanvas, false);
    drawCanvas();
    


    //Above
    var stampElem = document.querySelector('.stamp');
    var container = document.querySelector('.packery');
    var pckry = new Packery( container , {
      itemSelector: '.item',
      "percentPosition": true
    });


    var stampElems = [];
    stampElems.push(stampElem);

    for (var i = 35 - 1; i >= 0; i--) {
      (function(idx){

        var addVideo = VIDEOS[i] != undefined;
        var $class = addVideo ? "item-video" : "item-image"; 

        var $itemContent = document.createElement('div');
        $itemContent.classList.add('item-content');
        $itemContent.classList.add($class);

        var $item = document.createElement('div');
        $item.classList.add('item');

        if(!addVideo){
          var fileName = "zo_" + i;

          $itemContent.style.background = 'url(http://storage.googleapis.com/ladusoleilpix/' + fileName + '.jpg)  50% 50%';
          $itemContent.style.backgroundSize = 'cover';
          $itemContent.style.backgroundRepeat = 'no-repeat';
        }else{
          var videoFile = VIDEOS[i];
          var fileName = videoFile.file;

          var $video = document.createElement('video');
          $video.src = 'http://storage.googleapis.com/ladusoleil/' + fileName;
          $video.autoPlay = false;
          $video.innerHTML = 'Votre navigateur ne gère pas l\'&eacute;l&eacute;ment <code>video</code>.'
          $video.setAttribute("controls","controls")  

          $video.addEventListener('error', function (e) {
            console.log(e.target.error);
          });

          var or = videoFile.landscape ? 'l' : 'p';
          $itemContent.classList.add('item-video-' + or);
          $itemContent.style.background = "#" + videoFile.color

          var $nameContainer = document.createElement('div');
          $nameContainer.classList.add('item-name-container');

          var $name = document.createElement('h2');
          $name.innerHTML = videoFile.user;
          $nameContainer.appendChild($name);

          var rgbColor = hexToRgb("#" + videoFile.color);
          var color = "rgba(" + rgbColor.r + "," + rgbColor.g + "," + rgbColor.b + ", 0.80" +")";

          var $overLay = document.createElement('div');
          $overLay.classList.add('item-overlay');
          $overLay.appendChild($nameContainer);
          $overLay.style.background = color;

          $itemContent.appendChild($overLay);
          $itemContent.appendChild($video);
          

          $itemContent.addEventListener("click", function(){
            $overLay.style.opacity = 0;
            if($video.paused) {
              $video.play();
            }else{
              $video.pause();
            }
          });

          $itemContent.addEventListener("mouseover", function(){
            $overLay.style.opacity = 0;
          });

          $itemContent.addEventListener("mouseout", function(){
            $overLay.style.opacity = 1;
          });
        }

        $item.appendChild($itemContent);

        container.appendChild($item);
        pckry.appended( $item );
      })(i);
    }

    var $svgText = document.getElementById('l-text');

    function closeIntro () {
     var $intro = document.querySelector('.intro');
     $intro.style.opacity = 0;

     setTimeout(function(){ 
      document.body.removeChild(document.querySelector('.intro'));

      pckry.stamp(stampElems); 
      pckry.layout();


      var youtubeVid = document.querySelector('.stamp');
      youtubeVid.setAttribute('src',youtubeVid.getAttribute('src')+ '?autoplay=1');

    }, 1000);
   }

  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      closeIntro();
    }
  };

  setTimeout(closeIntro, 6000);

});