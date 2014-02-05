z_modal v0.9.9.9
=======

Плагин jQuery для создания модального окна.:

  
  * *Нет подключающихся стилей и картинок.*
  * *Дизайн окна зависит только от Вас.*
  * **Один плагин - один файл.**
  

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
  * @param (str)options.windowClouseBackClick  - сыкрывать ли окно по щелчку на заднем фоне по умолчанию true
  * 
  * @param (fun)options.clouseFunction(mainContainer) - функция скрытия модального окна
  * @param (fun)options.openFunction(mainContainer) - функция открытия модального окна  
  * @param (fun)options.clouseFunctionIe(mainContainer) - функция скрытия модального окна для IE 6-8
  * @param (fun)options.openFunctionIe(mainContainer) - функция открытия модального окна  для IE 6-8
  * @param (str)options.clouseContent - контент для кнопки закрывания окна
  * @param (bul)options.clouseShow - показывать ли кнопку закрывания окна true(def)
  * 
  * @param (fun) options.hookBeforeCreateWindow - пользовательская функция до создания модального окна
  * @param (fun) options.hookAfterCreateWindow - пользовательская функция после создания модального окна
  * 
  * @param (str)options.idElementPrefix префикс для элементов модального окна
  * @param (str)zm_* - id блоков модального окна
  *
  * @return zm.clouseWindow() - функция которая закрывает окно
  * @return zm.create() - функция для создания окна
  *
  *
  * Вызов окна $.z_modal(content,options(необязательный параметр));
