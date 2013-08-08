/* 
 * Тесты по использованию интерфейсов
 */
/*global Vessel, Planet*/

(function tests() {
    var yandex = new Vessel('Яндекс', [1, 1], 2000),
        rambler = new Vessel('Рамблер', [10, 10], 1000),
        earth = new Planet('Земля', [1, 1], 5000),
        mars = new Planet('Марс', [100, 50], 3000);
    yandex.report();
    rambler.report();
    earth.report();
    earth.loadCargoTo(yandex, 100);
    yandex.report();
    earth.loadCargoTo(yandex, 2000);
    yandex.flyTo([50, 50]);
    yandex.flyTo(mars);
    mars.unloadCargoFrom(yandex, 200);
    yandex.report();
    mars.unloadCargoFrom(yandex, 100);
    yandex.report();
}());