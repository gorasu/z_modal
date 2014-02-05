  /** z_modal v 0.9.9.9
  * by Alexandr Voronin http://z-site.ru
  *
  * @param (str or dom el) content - контент модального окна, принимает строку или ссылку на элемент dom содержимое элемента становится модальным окном
  * 
  * @param (obj)options - настройки плагина
  * @param (str)options.windowType  - fixed(default) - Тип модального окна фиксированное(полоса проктуки не появляется ). notFixed - полоса прокрутки появляется если контент выходит за пределы окна
  * @param (str)options.windowBackground  - цвет заднего фона по умолчанию black
  * @param (str)options.windowOpacity  - цвет прозрачность фона по умолчанию 0.5
  * @param (str)options.windowWidth  - ширина модального окна по умолчанию по содержимому
  * @param (arr)options.windowPosition  - позиция модального окна относительно окна браузера new Array(x,y) по умолчанию new Array('50%','50%')
  * 
  * @param (str)options.windowClouseBackClick  - сыкрывать ли окно по щелчку на заднем фоне по умолчанию true
  * 
  * @param (fun)options.clouseFunction - функция скрытия модального окна
  * @param (fun)options.openFunction - функция открытия модального окна  
  * @param (fun)options.clouseFunctionIe - функция скрытия модального окна для IE 6-8
  * @param (fun)options.openFunctionIe - функция открытия модального окна  для IE 6-8
  * @param (str)options.clouseContent - контент для закрывашки
  * @param (bul)options.clouseShow - показывать ли закрывашку true(def)
  *
  * @param (fun) options.hookBeforeCreateWindow - пользовательская функция до создания модального окна
  * @param (fun) options.hookAfterCreateWindow - пользовательская функция после создания модального окна
  * 
  * @param (str)options.idElementPrefix -zm_(default) префикс для элементов модального окна
  * @param zm_* - id блоков модального окна
  *
  *
  * @return zm.clouseWindow() - функция которая закрывает окно
  * @return zm.create() - функция для создания окна
  *
  *
  *
  */  

  jQuery.z_modal = function(content,options) {
 var zm = new Object();
 
jQuery(function( $ ){
   zm.content = content;
   if(typeof content == 'object'){
	zm.content = $(content).html();
   }
   
  
  zm.options = $.extend({
  'windowType':'fixed',
  'windowBackground':'black',
  'windowOpacity':'0.5',
  'windowWidth':'',
  'windowPosition': new Array('50%','50%'),
  'windowClouseBackClick':true,
  'clouseFunction':function(mainContainer){$(mainContainer).fadeOut(800);},
  'openFunction':function(mainContainer){$(mainContainer).fadeIn(800);},
  'openFunctionIe':function(mainContainer){$(mainContainer).css({'display':'block'});},
  'clouseFunctionIe':function(mainContainer){$(mainContainer).css({'display':'none'});},
  'clouseContent':'<span style="cursor:pointer;" title="clouse">X</span>',
  'clouseShow':true,
  'idElementPrefix':'zm_',
  'hookBeforeCreateWindow':function(){},
  'hookAfterCreateWindow':function(){}

  },options);
  
  $.fn.prefix = function(name){
   return zm.options.idElementPrefix+name;
  }
  var elements = {
  'zm_main':$(this).prefix('main'),
  'zm_backfon':$(this).prefix('backfon'),
  'zm_conteiner_text':$(this).prefix('conteiner_text'),
  'zm_text':$(this).prefix('text'),
  'zm_clouse':$(this).prefix('clouse'),
  'zm_styles':$(this).prefix('styles')
  }
   
  
  zm.options = $.extend(elements,zm.options);
  zm.is_opera_mobile = function() {
          if (navigator.appName == 'Opera')
  {
    var ua = navigator.userAgent;
      if ( ua.indexOf("Opera Mobi") > 0) {
        return true;
      }
  }
  return false;
        
    }
  

  
  zm.windowStyle = {
  'body':'overflow:hidden;',
  'containerText':'overflow:auto; position:relative;'
  }
  if (zm.is_opera_mobile()) {
        zm.windowStyle.body = 'overflow:auto;';
	zm.windowStyle.containerText = 'position:relative;';
  }
  
  if(zm.options.windowType == 'fixed'){
	zm.windowStyle.body = '';
	zm.windowStyle.containerText = 'position:fixed;';
  }
  
  
  $.fn.openWindow = function(){
  mainContainer = $('#'+zm.options.zm_main);
	if(zm.getInternetExplorerVersion()> 0 &&  zm.getInternetExplorerVersion() < 9){
	zm.options.openFunctionIe(mainContainer);
	}
	else {
	zm.options.openFunction(mainContainer);
	}
  }
  zm.clouseWindow = function(){
  mainContainer = $('#'+zm.options.zm_main);
	if(zm.getInternetExplorerVersion()> 0 &&  zm.getInternetExplorerVersion() < 9){
	 zm.options.clouseFunctionIe(mainContainer);
	}
	else {
	zm.options.clouseFunction(mainContainer);
	}
	/**После закрытия окна удаляем все созданные элементы */
	$('#'+zm.options.zm_styles).remove();
	$('#'+zm.options.zm_main).remove();
  }
  
  /*Версия IE*/
  zm.getInternetExplorerVersion = function ()

{
  var rv = -1;
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}
  /**Создание модального окна, добавляем в body контент*/
  zm.create = function(){
if(typeof(zm.options.hookBeforeCreateWindow) == 'function'){
   zm.options.hookBeforeCreateWindow();
}

$('body').prepend(function(index,el){

var s_return =  '<style id="'+zm.options.zm_styles+'">\
body {'+zm.windowStyle.body+'}\
#'+zm.options.zm_main+' {\
display:none;\
height:100%;\
width:100%;\
margin:0;\
padding:0;\
position:absolute;\}\
#'+zm.options.zm_backfon+' {\
background: '+zm.options.windowBackground+';\
position:fixed;\
*position:absolute;\
width:100%;\
height:100%;\
z-index:100;\
margin:0;\
paddin:0;\
top: expression(document.getElementsByTagName("body")[0].scrollTop + "px");  \
}\
\
#'+zm.options.zm_conteiner_text+' {\
background:;\
width:100%;\
height:100%;\
z-index:100001;\
'+zm.windowStyle.containerText+'\
*position:absolute;\
*top: expression(document.getElementsByTagName("body")[0].scrollTop + "px");  \
}\
#'+zm.options.zm_text+' {\
    width:'+zm.options.windowWidth+';\
    padding:0;\
    margin:0;\
    position:absolute;\
    left:'+zm.options.windowPosition[0]+';\
    top:'+zm.options.windowPosition[1]+';\
    color:white;\
}\
#'+zm.options.zm_clouse+'{\
marin-right:0px;\
clean:both;\
position:;\
}\
</style>';
var s_clouse ='';
if (zm.options.clouseShow) {
  //code

 s_clouse = '<div align="right" style="position:relative;"><div style="background:red;position:relative;width:0px;"><div style="position:absolute;" id="'+zm.options.zm_clouse+'">'+zm.options.clouseContent+'</div><br></div></div>';
}

s_return += '<div id="'+zm.options.zm_main+'">\
    <div  id="'+zm.options.zm_backfon+'"></div>\
	<div  id="'+zm.options.zm_conteiner_text+'">\
<div id="'+zm.options.zm_text+'" >'+s_clouse+''+zm.content+'</div>\
	  </div></div>';
    
  
return s_return;

});   
$(this).openWindow();
   /**Вызвали функции после создания*/
	$(this).afterCreate();
   if(typeof(zm.options.hookAfterCreateWindow) == 'function'){
      zm.options.hookAfterCreateWindow();
   }
}
/**Действия которые выполняются после создания модального окна*/
$.fn.afterCreate = function(){

	
	/**Скрытие окна если происходит клик по фону*/
	if(zm.options.windowClouseBackClick) {
	$('#'+zm.options.zm_main).click(function(event)	{
		var clicked = jQuery(event.target);
		var is_find = $('#'+zm.options.zm_text).find($(clicked));
		if(is_find.length == 0 && !(clicked.is('#'+zm.options.zm_text))) {
				zm.clouseWindow();
		}
   }); 
   }
	


/*Выравнивание окна по вертикали*/
var topSubtraction = $('#'+zm.options.zm_text).height();
topSubtraction = topSubtraction/2;
 topPadding = $('#'+zm.options.zm_text).css('top');
 _top = parseInt(topPadding) - parseInt(topSubtraction);
if (_top < 0) {
     _top = 0;
}
$('#'+zm.options.zm_text).css({'top':_top+'px'});


	/*Выравнивание окна по горизонтали*/
  var text_width = $('#'+zm.options.zm_text).width();
  var leftSubtraction = text_width;
  leftSubtraction = leftSubtraction/2;
  var leftPadding = parseInt($('#'+zm.options.zm_text).css('left'));
  var left = leftPadding - leftSubtraction;
  if (left < 0) {
     left = 0;
  }

  $('#'+zm.options.zm_text).css({'left': left});	
  $('#'+zm.options.zm_text).width(text_width); 

/*Добавление прозрачности*/
$('#'+zm.options.zm_backfon).fadeTo(0,zm.options.windowOpacity);
/*Добвыление функции скрытия окна на крестик*/
$('#'+zm.options.zm_clouse).click(function(){

zm.clouseWindow();

});

}
   /**Создали окно*/
	zm.create();

});  
return zm;
  }
