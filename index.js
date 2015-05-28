// http://packery.metafizzy.co/packery.pkgd.js added as external resource

var VIDEOS = {
  '16':{
  user : "Les Lyonais",
  file : 'lyon.webm',
  landscape : true,
  color : 'E17B38',
},'10':{
  user : "Sam & Emma",
  file : 'samemma.webm',
  landscape : false,
  color : 'E17B38',
},'18':{
  user : "Luna",
  file : 'luna.mp4',
  landscape : true,
  color : 'E17B38',
}, '23':{
  user : "Sarouche",
  file : 'sarouche.webm',
  landscape : true,
  color : 'E17B38',
},'17':{
  user : "Léa",
  file : 'lea.mp4',
  landscape : false,
  color : 'E17B38',
},'20':{
  user : "Thomas",
  file : 'claret.mp4',
  landscape : false,
  color : 'E17B38',
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

docReady( function() {

  var stampElem = document.querySelector('.stamp');
  var container = document.querySelector('.packery');
  var pckry = new Packery( container , {
    itemSelector: '.item'
  });

  for (var i = 25 - 1; i >= 0; i--) {

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
      $video.innerHTML = 'Votre navigateur ne gère pas l\'élément <code>video</code>.'
      $video.setAttribute("controls","controls")  

      $video.addEventListener('error', function (e) {
        console.log(e.target.error);
      });

      var or = videoFile.landscape ? 'l' : 'p';
      $itemContent.classList.add('item-video-' + or);
      
      var $nameContainer = document.createElement('div');
      $nameContainer.classList.add('item-name-container');

      var $name = document.createElement('h2');
      $name.innerHTML = videoFile.user;
      $nameContainer.appendChild($name);

      var $overLay = document.createElement('div');
      $overLay.classList.add('item-overlay');
      $overLay.appendChild($nameContainer);
      $overLay.style.background = "#" + videoFile.color ;

      $itemContent.appendChild($overLay);
      $itemContent.appendChild($video);
    }

    $item.appendChild($itemContent);
    
    container.appendChild($item);
    pckry.appended( $item );
  };
  
  eventie.bind( container, 'click', function( event ) {

    var target = event.target;
    if ( !classie.has( target, 'item-content' )  ) {
      return;
    }
    var itemElem = target.parentNode;
    var isExpanded = classie.has( itemElem, 'is-expanded' );
    classie.toggleClass( itemElem, 'is-expanded' );

    pckry.stamp(stampElem); 

    if ( isExpanded ) {
      pckry.layout();
    } else {
      pckry.fit( itemElem );
    }
  });

  var $svgText = document.getElementById('l-text');
  

  var updateLang = self.setInterval(function  () {

    $svgText.classList.add('l-text-fading');

    var lang = BIRTHDAYS[Math.floor(Math.random() * BIRTHDAYS.length)]
    //$svgText.textContent = lang;

    setTimeout(function(){
      //$svgText.classList.remove("l-text-fading");     
    });
  }, 1000);

  //var goButton = document.querySelector('.go-button');
  //goButton.onclick = function () { alert(this.innerHTML); };
  
  setTimeout(function(){ 

    clearInterval(updateLang);

    var $intro = document.querySelector('.intro');
    $intro.style.opacity = 0;
    
    setTimeout(function(){ 
      document.body.removeChild(document.querySelector('.intro'));

      pckry.stamp(stampElem); 
      pckry.layout();
      
      
      var youtubeVid = document.querySelector('.stamp');
      youtubeVid.setAttribute('src',youtubeVid.getAttribute('src')+ '?autoplay=1');

    }, 1000);
  }, 6000);

});