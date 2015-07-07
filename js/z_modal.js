/** z_modal v 1.0.0.0
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
 * @param (str)options.windowcloseBackClick  - сыкрывать ли окно по щелчку на заднем фоне по умолчанию true
 *
 * @param (fun)options.closeFunction - функция скрытия модального окна
 * @param (fun)options.openFunction - функция открытия модального окна
 * @param (fun)options.closeFunctionIe - функция скрытия модального окна для IE 6-8
 * @param (fun)options.openFunctionIe - функция открытия модального окна  для IE 6-8
 * @param (str)options.closeContent - контент для закрывашки
 * @param (bul)options.closeShow - показывать ли закрывашку true(def)
 *
 * @param (obj) options.hooks - объект содержащий в себе хуки hooks = {'HOOK_NAME':[{'function':function(data){},'data':data}]}
 * @param (bol) options.isDev - вывод отладочной информации
 *
 * @param (str)options.idElementPrefix -zm_(default) префикс для элементов модального окна
 * @param options.zm_* - id блоков модального окна
 *
 *
 * @return zm.closeWindow() - функция которая закрывает окно
 * @return zm.create() - функция для создания окна
 *
 *
 *  Рыбота с плагином
 *
 *  Для открытия модального окна достаточно вызвать следующую конструкцию
 *
 *  $.z_modal('Hello world!');
 *
 *  Описание опций см. документацию
 *
 *  Работа с хуками
 *
 *  В options необходимо передать объект hooks
 *  options.hooks = {
 *  'HookName': - имя хука
 *   [
 *   {'function':function(data){},'data':data}, - действия завязанные на хук
 *   {'function':function(data){},'data':data},
 *
 *   ]
 *  }
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
            'windowPosition': ['50%','50%'],
            "windowCloseBackClick":true,
            'closeFunction':function(mainContainer){$(mainContainer).fadeOut(800);},
            'openFunction':function(mainContainer){$(mainContainer).fadeIn(800);},
            'openFunctionIe':function(mainContainer){$(mainContainer).css({'display':'block'});},
            'closeFunctionIe':function(mainContainer){$(mainContainer).css({'display':'none'});},
            'closeContent':'<span style="cursor:pointer;" title="close">X</span>',
            'closeShow':true,
            'idElementPrefix':'zm_',
            'hooks':[],
            'isDev':false

        },options);

        zm.prefix = function(name){
            return zm.options.idElementPrefix+name;
        };
        var elements = {
            'zm_main':zm.prefix('main'),
            'zm_backfon':zm.prefix('backfon'),
            'zm_conteiner_text':zm.prefix('conteiner_text'),
            'zm_text':zm.prefix('text'),
            'zm_close':zm.prefix('close'),
            'zm_styles':zm.prefix('styles'),
            'zm_content':zm.prefix('content')

        };



        zm.options = $.extend(elements,zm.options);
        zm.isDev = function(){
          return   zm.options.isDev;
        }
        zm.is_opera_mobile = function() {
            if (navigator.appName == 'Opera')
            {
                var ua = navigator.userAgent;
                if ( ua.indexOf("Opera Mobi") > 0) {
                    return true;
                }
            }
            return false;

        };


        zm._callHooksObj = [];
        zm.callHook = function(hookName,data){
            if(zm.isDev()){
                console.group("Z-modal hooks");
                console.info('Hook name ' + hookName);
                console.groupEnd();
                zm._callHooksObj.push(hookName);
                console.log(zm._callHooksObj);
            }


            if(zm.options.hooks[hookName] == undefined){
                return false;
            }
            var hookArray =zm.options.hooks[hookName];

            if(!(hookArray instanceof Array)){
                hookArray = [hookArray];
            }
            for(var i = 0; i < hookArray.length; i++){
                if(!(hookArray[i]['function'] instanceof Function) ){
                    console.warn('Hook '+ hookName +'['+i+']["function"] is not a function');
                    continue;
                }
                hookArray[i]['function'](hookArray[i]['data'],data,zm);
            }
        }

        /*Настройки для статичного окна*/
        zm.windowStyle = {
            'body':'overflow:hidden;',
            'containerText':'overflow:auto; position:fixed;'
        };

        if (zm.is_opera_mobile()) {
            zm.windowStyle.body = 'overflow:auto;';
            zm.windowStyle.containerText = 'position:relative;';
        }

        if(zm.options.windowType == 'fixed'){
            zm.windowStyle.body = '';
            zm.windowStyle.containerText = 'position:fixed;';
        }
        else {
            $('body').on({
                'mousewheel': function(e) {
                    if ($('#'+zm.options.zm_main).find(e.target)) return;
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }


        zm.openWindow = function(){
            zm.callHook('beforeOpenWindow');
            mainContainer = $('#'+zm.options.zm_main);
            if(zm.getInternetExplorerVersion()> 0 &&  zm.getInternetExplorerVersion() < 9){
                zm.options.openFunctionIe(mainContainer);
            }
            else {
                zm.options.openFunction(mainContainer);
            }
            zm.callHook('afterOpenWindow');
        };
        zm.closeWindow = function(){
            zm.callHook('beforeCloseWindow');
            mainContainer = $('#'+zm.options.zm_main);
            if(zm.getInternetExplorerVersion()> 0 &&  zm.getInternetExplorerVersion() < 9){
                zm.options.closeFunctionIe(mainContainer);
            }
            else {
                zm.options.closeFunction(mainContainer);
            }
            /**После закрытия окна удаляем все созданные элементы */
            $('#'+zm.options.zm_styles).remove();
            $(mainContainer).remove();
            zm.callHook('afterCloseWindow');
        };

        zm.insetContent = function(content){
            $('#'+zm.options.zm_content).html(content);
            zm.alignment();
        };




        zm.alignment = function(){
            /*Выравнивание окна по вертикали*/
            var zmTextSelection =  '#'+zm.options.zm_text;
            var topSubtraction = $(zmTextSelection).height();
            topSubtraction = topSubtraction/2;
            topPadding = $(zmTextSelection).css('top');
            var _top = parseInt(topPadding) - parseInt(topSubtraction);
            if (_top < 0) {
                _top = 0;
            }
            $(zmTextSelection).css({'top':_top+'px'});

            /*Выравнивание окна по горизонтали*/
            // Сбрасываем ширину родительского контеинера
            $(zmTextSelection).css({'width': ""});
            var text_width = $('#'+zm.options.zm_content).width();
            var leftSubtraction = text_width;
            leftSubtraction = leftSubtraction/2;
            $(zmTextSelection).css({'left':''});
            var leftPadding = parseInt($(zmTextSelection).css('left'));
            var left = leftPadding - leftSubtraction;
            if (left < 0) {
                left = 0;
            }
            $(zmTextSelection).css({'left': left});
            $(zmTextSelection).width(text_width);

        };

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

            zm.callHook('beforeCreateWindow');


            $('body').prepend(function(index,el){
                var windowsWidthStyle = '';
                if(zm.options.windowWidth){
                    windowsWidthStyle = ' width:'+zm.options.windowWidth+';';
                }
                var s_return =  '<style id="'+zm.options.zm_styles+'">\
html,body{\
*height:100%\
}    \
body {'+zm.windowStyle.body+'}\
#'+zm.options.zm_main+' {\
display:none;\
height:100%;\
width:100%;\
margin:0;\
padding:0;\
z-index:1500;\
*position:absolute;}\
#'+zm.options.zm_backfon+' {\
background: '+zm.options.windowBackground+';\
position:fixed;\
*position:absolute;\
width:100%;\
height:100%;\
z-index:100;\
margin:0;\
paddin:0;\
top: expression(parseInt(document.documentElement.scrollTop + document.documentElement.clientHeight - this.offsetHeight, 10) -0 + "px");  \
}\
\
#'+zm.options.zm_conteiner_text+' {\
width:100%;\
height:100%;\
z-index:100001;\
'+zm.windowStyle.containerText+'\
*position:absolute;\
top: expression(parseInt(document.documentElement.scrollTop + document.documentElement.clientHeight - this.offsetHeight, 10) -0 + "px");   \
}\
#'+zm.options.zm_text+' {\
    '+windowsWidthStyle+'\
    padding:0;\
    margin:0;\
    position:absolute;\
    left:'+zm.options.windowPosition[0]+';\
    top:'+zm.options.windowPosition[1]+';\
    color:white;\
}\
#'+zm.options.zm_close+'{\
marin-right:0px;\
clean:both;\
position:;\
}\
</style>';
                var s_close ='';
                if (zm.options.closeShow) {
                    //code

                    s_close = '<div align="right" style="position:relative;"><div style="position:relative;width:0px;"><div style="position:absolute;" id="'+zm.options.zm_close+'">'+zm.options.closeContent+'</div><br></div></div>';
                }

                s_return += '<div id="'+zm.options.zm_main+'">\
    <div  id="'+zm.options.zm_backfon+'"></div>\
	<div  id="'+zm.options.zm_conteiner_text+'">\
<div id="'+zm.options.zm_text+'" >'+s_close+''+'<div id="'+zm.options.zm_content+'">'+zm.content+'</div></div>\
	  </div></div>';


                return s_return;

            });
            zm.openWindow();
            /**Вызвали функции после создания*/
            zm.afterCreate();
            zm.callHook('afterCreateWindow');


        };
        /**Действия которые выполняются после создания модального окна*/
        zm.afterCreate = function(){

            var layoutHtml =  $('#'+zm.options.zm_text).html();
            /**Скрытие окна если происходит клик по фону*/
            if(zm.options.windowCloseBackClick) {

                $('#'+zm.options.zm_main).click(function(event)	{
                    var clicked = jQuery(event.target);
                    var is_find = $('#'+zm.options.zm_text).find($(clicked));
                    if(is_find.length == 0){
                        if(layoutHtml.indexOf($(clicked).html(),0) >= 0){
                            is_find.length = 1;
                        }
                    }
                    if(is_find.length == 0 && !(clicked.is('#'+zm.options.zm_text))) {
                        zm.closeWindow();
                    }
                });
            }


            zm.alignment();
            /*Добавление прозрачности*/
            $('#'+zm.options.zm_backfon).fadeTo(0,zm.options.windowOpacity);
            /*Добавление функции скрытия окна при нажатии на крестик*/
            $('#'+zm.options.zm_close).add('[name="'+zm.options.zm_close+'"]').click(function(){

                zm.closeWindow();

            });

        }
        /**Создали окно*/
        zm.create();

    });
    return zm;
};
