z_modal v 1.0.0.0
=======

Плагин jQuery для создания модального окна.:

  
  * *Нет подключающихся стилей и картинок.*
  * *Дизайн окна зависит только от Вас.*
  * **Один плагин - один файл.**

   Hello World!
   --------
  <script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
  <script src="https://rawgit.com/zsiteru/z_modal/master/js/z_modal.js"></script>

  <script>
     $.z_modal('Hello world!');
  </script>

  Manual
  --------
   *by Alexandr Voronin http://z-site.ru*
  
  
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
