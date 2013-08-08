/* 
 * Тесты по использованию интерфейсов
 */
/*global Vessel*/

(function start() {
    var yandex = new Vessel('Яндекс', [0, 0], 2000),
        rambler = new Vessel('Рамблер', [10, 10], 1000);
    yandex.report();
    rambler.report();
}());