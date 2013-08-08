/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {
    this.name = name;
    this.setPosition(position);
    this.capacity = capacity;
    this.cargo = 0;
}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
    document.write('Корабль "' + this.name + '". Местоположение: ' + this.position +
            '. Занято ' + this.getOccupiedSpace() + ' т. из ' + this.capacity + ' т.<br>');
};

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
    return this.capacity - this.cargo;
};

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
    return this.cargo;
};

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */
Vessel.prototype.flyTo = function (newPosition) {
    this.setPosition(newPosition);
};

/**
 * Устанавливаем координаты корабля в зависимести от типа переданного местоположения: координаты или планета
 * 
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 */
Vessel.prototype.setPosition = function (newPosition) {
    if (newPosition instanceof Planet) {
        this.position = newPosition.position;
        return;
    }
    if (newPosition instanceof Array && newPosition.length === 2) {
        this.position = newPosition;
        return;
    }
    document.write("Новая позиция не верна.");
};

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
    this.name = name;
    this.position = position;
    this.cargo = availableAmountOfCargo;
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
    document.write('Планета "' + this.name + '". Местоположение: ' + this.position +
            '. Доступно груза: ' + this.getAvailableAmountOfCargo() + ' т.<br>');
};

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
    return this.cargo;
};

/**
 * Загружает на корабль заданное количество груза.
 * 
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
    if (!this.vesselOnPlanet(vessel)) {
        return;
    }
    if (vessel.getFreeSpace() < cargoWeight) {
        document.write('Невозможно загрузить: нехватает свободного места на корабле<br>');
        return;
    }
    if (this.getAvailableAmountOfCargo() < cargoWeight) {
        document.write('Невозможно загрузить: на планете нет такого количества груза<br>');
        return;
    }
    vessel.cargo += cargoWeight;
    this.cargo -= cargoWeight;
    document.write('На корабль "' + vessel.name + '" загружено ' + cargoWeight + ' т. <br>');
};

/**
 * Выгружает с корабля заданное количество груза.
 * 
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
    if (!this.vesselOnPlanet(vessel)) {
        return;
    }
    if (vessel.getOccupiedSpace() < cargoWeight) {
        document.write('Невозможно выгрузить: на корабле нет такого количества груза<br>');
        return;
    }
    vessel.cargo -= cargoWeight;
    this.cargo += cargoWeight;
};
/**
 * Проверяет, сел ли корабль на планету (совпадают-ли их координаты)
 * 
 * @param {Vessel} vessel Проверяемый корабль
 * @returns {Boolean} Результат true - корабль сел на планету
 */
Planet.prototype.vesselOnPlanet = function (vessel) {
    if (!((vessel.position[0] === this.position[0]) && (vessel.position[1] === this.position[1]))) {
        document.write('Невозможно загрузить: корабль не сел на планету<br>');
        return false;
    }
    return true;
};