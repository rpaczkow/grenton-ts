// Created from: src/interfaces/object_statistics_v1.xml, object name="Statistics" version="1"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnValueChange = 0
}

enum PropertyType {
    Value = 0,
    StatisticState = 1,
    Load = 2,
    StatisticTypeSensor = 4,
    StatisticTypeGrid = 5,
    StatisticSubtypeGrid = 6,
    StatisticTypeEnergyProduction = 7,
    StatisticTypeEnergyStorage = 8,
    StatisticTypeCharger = 9
}

enum StatisticStateType {
    Off = 0,
    Media = 1,
    Sensor = 4,
    Grid = 5,
    EnergyProduction = 6,
    EnergyStorage = 7,
    Charger = 8,
    Other = 9
}

enum StatisticTypeSensorType {
    Temperature = 0,
    Humidity = 1,
    Lux = 2,
    Pressure = 3,
    CO2 = 4,
    VOC = 5,
    Sound = 6,
    AverageValue = 18
}

enum StatisticTypeGridType {
    EnergyConsumption = 20,
    EnergyExport = 11,
    Voltage = 8,
    Power = 7,
    ReactivePower = 9
}

enum StatisticSubtypeGridType {
    General = 0,
    Phase1 = 1,
    Phase2 = 2,
    Phase3 = 3
}

enum StatisticTypeEnergyProductionType {
    EnergyProduction = 12,
    Power = 7,
    ReactivePower = 9
}

enum StatisticTypeEnergyStorageType {
    BatteryLevel = 15,
    EnergyCharging = 13,
    EnergyDischarging = 14
}

enum StatisticTypeChargerType {
    EnergyCharging = 13,
    Power = 7
}

declare class StatisticsRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: number, ...args: any[]): any;
}

interface IStatistics {
    /**
     * Zdarzenie wywoływane po zmianie wartości cechy Value.
     * @param callback
     */
    addOnValueChange: (callback: () => void) => void
    /** Wartość pomiarowa obliczana i wysyłana jako statystyka do serwera co pełne 15 minut. Dla pomiarów 'Media' – ustaw wartość w zakresie od 0.0 do 1.0 (zużycie energii zostanie obliczone automatycznie na podstawie cechy Load). Dla pomiarów 'Sensor', 'Battery Level', 'Voltage', 'Power', 'Reactive Power' i 'Other Average Value' – ustaw aktualną wartość (wartość średnia zostanie obliczona automatycznie). Dla pomiarów 'Energy' – ustaw aktualną całkowitą wartość energii w watogodzinach (różnica zostanie obliczona automatycznie). */
    readonly value: number
    /** Włącza raportowanie pomiaru do statystyk oraz definiuje kategorię pomiaru. Uwaga! Raz wysłana statystyka pozostaje w historii statystyk na serwerze. Możliwe jest manualne usunięcie statystyk z poziomu panelu konta w chmurze. Off - Statystyki nie są wysyłane do chmury. */
    statisticState: StatisticStateType
    /** Wartość obciążenia w watach. */
    load: number
    /** Statystyki są wysyłane na podstawie obliczenia wartości średniej dla ustawionej wartości cechy Value w okresie 15 minut. */
    statisticTypeSensor: StatisticTypeSensorType
    /** Dla pomiaru energii statystyki są wysyłane na podstawie zliczania różnicy w wartości cechy Value w okresie 15 minut. Cechę Value należy aktualizować o całkowitą wartość energii w watogodzinach. Dla pozostałych typów pomiaru zliczana jest wartość średnia w okresie 15 minut. */
    statisticTypeGrid: StatisticTypeGridType
    /** Podkategoria pomiaru. Może być to pomiar ogólny lub konkretna faza L1, L2 lub L3. */
    statisticSubtypeGrid: StatisticSubtypeGridType
    /** Dla pomiaru energii statystyki są wysyłane na podstawie zliczania różnicy w wartości cechy Value w okresie 15 minut. Cechę Value należy aktualizować o całkowitą wartość energii w watogodzinach. Dla pozostałych typów pomiaru zliczana jest wartość średnia w okresie 15 minut. */
    statisticTypeEnergyProduction: StatisticTypeEnergyProductionType
    /** Dla pomiaru poziomu naładowania zliczana jest wartość średnia w okresie 15 minut. Dla pomiaru energii ładowania i rozładowywania statystyki są wysyłane na podstawie zliczania różnicy w wartości cechy Value w okresie 15 minut. Cechę Value należy aktualizować o całkowitą wartość energii w watogodzinach. */
    statisticTypeEnergyStorage: StatisticTypeEnergyStorageType
    /** Dla pomiaru energii statystyki są wysyłane na podstawie zliczania różnicy w wartości cechy Value w okresie 15 minut. Cechę Value należy aktualizować o całkowitą wartość energii bieżącej sesji ładowania w watogodzinach. Dla pozostałych typów pomiaru zliczana jest wartość średnia w okresie 15 minut. */
    statisticTypeCharger: StatisticTypeChargerType
    /** Ustawia wartość cechy Value. */
    setValue: (value: number) => void
    /** Ustawia wartość cechy StatisticState. */
    setStatisticState: (value: StatisticStateType) => void
    /** Ustawia wartość cechy Load. */
    setLoad: (value: number) => void
    /** Ustawia wartość cechy StatisticTypeSensor. */
    setStatisticTypeSensor: (value: StatisticTypeSensorType) => void
    /** Ustawia wartość cechy StatisticTypeGrid. */
    setStatisticTypeGrid: (value: StatisticTypeGridType) => void
    /** Ustawia wartość cechy StatisticSubtypeGrid. */
    setStatisticSubtypeGrid: (value: StatisticSubtypeGridType) => void
    /** Ustawia wartość cechy StatisticTypeEnergyProduction. */
    setStatisticTypeEnergyProduction: (value: StatisticTypeEnergyProductionType) => void
    /** Ustawia wartość cechy StatisticTypeEnergyStorage. */
    setStatisticTypeEnergyStorage: (value: StatisticTypeEnergyStorageType) => void
    /** Ustawia wartość cechy StatisticTypeCharger. */
    setStatisticTypeCharger: (value: StatisticTypeChargerType) => void
}

class Statistics implements IStatistics {
    private onValueChangeCallbacks: Array<() => void> = [];

    constructor(private raw: StatisticsRaw) {
        this.raw.add_event(EventType.OnValueChange, () => {
            this.onValueChangeCallbacks.forEach(callback => { callback(); });
        });
    }

    /**
     * Zdarzenie wywoływane po zmianie wartości cechy Value.
     * @param callback
     */
    addOnValueChange(callback: () => void): void {
        this.onValueChangeCallbacks.push(callback);
    }
    /**
     * Wartość pomiarowa obliczana i wysyłana jako statystyka do serwera co pełne 15 minut. Dla pomiarów 'Media' – ustaw wartość w zakresie od 0.0 do 1.0 (zużycie energii zostanie obliczone automatycznie na podstawie cechy Load). Dla pomiarów 'Sensor', 'Battery Level', 'Voltage', 'Power', 'Reactive Power' i 'Other Average Value' – ustaw aktualną wartość (wartość średnia zostanie obliczona automatycznie). Dla pomiarów 'Energy' – ustaw aktualną całkowitą wartość energii w watogodzinach (różnica zostanie obliczona automatycznie).
     * @returns {number}
     */
    get value(): number {
        return this.raw.get(PropertyType.Value);
    }
    /**
     * Włącza raportowanie pomiaru do statystyk oraz definiuje kategorię pomiaru. Uwaga! Raz wysłana statystyka pozostaje w historii statystyk na serwerze. Możliwe jest manualne usunięcie statystyk z poziomu panelu konta w chmurze. Off - Statystyki nie są wysyłane do chmury.
     * @returns {StatisticStateType}
     */
    get statisticState(): StatisticStateType {
        return this.raw.get(PropertyType.StatisticState);
    }
    set statisticState(value: StatisticStateType) {
        this.raw.set(PropertyType.StatisticState, value);
    }
    /**
     * Wartość obciążenia w watach.
     * @returns {number}
     */
    get load(): number {
        return this.raw.get(PropertyType.Load);
    }
    set load(value: number) {
        this.raw.set(PropertyType.Load, value);
    }
    /**
     * Statystyki są wysyłane na podstawie obliczenia wartości średniej dla ustawionej wartości cechy Value w okresie 15 minut.
     * @returns {StatisticTypeSensorType}
     */
    get statisticTypeSensor(): StatisticTypeSensorType {
        return this.raw.get(PropertyType.StatisticTypeSensor);
    }
    set statisticTypeSensor(value: StatisticTypeSensorType) {
        this.raw.set(PropertyType.StatisticTypeSensor, value);
    }
    /**
     * Dla pomiaru energii statystyki są wysyłane na podstawie zliczania różnicy w wartości cechy Value w okresie 15 minut. Cechę Value należy aktualizować o całkowitą wartość energii w watogodzinach. Dla pozostałych typów pomiaru zliczana jest wartość średnia w okresie 15 minut.
     * @returns {StatisticTypeGridType}
     */
    get statisticTypeGrid(): StatisticTypeGridType {
        return this.raw.get(PropertyType.StatisticTypeGrid);
    }
    set statisticTypeGrid(value: StatisticTypeGridType) {
        this.raw.set(PropertyType.StatisticTypeGrid, value);
    }
    /**
     * Podkategoria pomiaru. Może być to pomiar ogólny lub konkretna faza L1, L2 lub L3.
     * @returns {StatisticSubtypeGridType}
     */
    get statisticSubtypeGrid(): StatisticSubtypeGridType {
        return this.raw.get(PropertyType.StatisticSubtypeGrid);
    }
    set statisticSubtypeGrid(value: StatisticSubtypeGridType) {
        this.raw.set(PropertyType.StatisticSubtypeGrid, value);
    }
    /**
     * Dla pomiaru energii statystyki są wysyłane na podstawie zliczania różnicy w wartości cechy Value w okresie 15 minut. Cechę Value należy aktualizować o całkowitą wartość energii w watogodzinach. Dla pozostałych typów pomiaru zliczana jest wartość średnia w okresie 15 minut.
     * @returns {StatisticTypeEnergyProductionType}
     */
    get statisticTypeEnergyProduction(): StatisticTypeEnergyProductionType {
        return this.raw.get(PropertyType.StatisticTypeEnergyProduction);
    }
    set statisticTypeEnergyProduction(value: StatisticTypeEnergyProductionType) {
        this.raw.set(PropertyType.StatisticTypeEnergyProduction, value);
    }
    /**
     * Dla pomiaru poziomu naładowania zliczana jest wartość średnia w okresie 15 minut. Dla pomiaru energii ładowania i rozładowywania statystyki są wysyłane na podstawie zliczania różnicy w wartości cechy Value w okresie 15 minut. Cechę Value należy aktualizować o całkowitą wartość energii w watogodzinach.
     * @returns {StatisticTypeEnergyStorageType}
     */
    get statisticTypeEnergyStorage(): StatisticTypeEnergyStorageType {
        return this.raw.get(PropertyType.StatisticTypeEnergyStorage);
    }
    set statisticTypeEnergyStorage(value: StatisticTypeEnergyStorageType) {
        this.raw.set(PropertyType.StatisticTypeEnergyStorage, value);
    }
    /**
     * Dla pomiaru energii statystyki są wysyłane na podstawie zliczania różnicy w wartości cechy Value w okresie 15 minut. Cechę Value należy aktualizować o całkowitą wartość energii bieżącej sesji ładowania w watogodzinach. Dla pozostałych typów pomiaru zliczana jest wartość średnia w okresie 15 minut.
     * @returns {StatisticTypeChargerType}
     */
    get statisticTypeCharger(): StatisticTypeChargerType {
        return this.raw.get(PropertyType.StatisticTypeCharger);
    }
    set statisticTypeCharger(value: StatisticTypeChargerType) {
        this.raw.set(PropertyType.StatisticTypeCharger, value);
    }

    /**
     * Ustawia wartość cechy Value.
     */
    setValue(value: number): void {
        this.raw.set(PropertyType.Value, value);
    }
    /**
     * Ustawia wartość cechy StatisticState.
     */
    setStatisticState(value: StatisticStateType): void {
        this.raw.set(PropertyType.StatisticState, value);
    }
    /**
     * Ustawia wartość cechy Load.
     */
    setLoad(value: number): void {
        this.raw.set(PropertyType.Load, value);
    }
    /**
     * Ustawia wartość cechy StatisticTypeSensor.
     */
    setStatisticTypeSensor(value: StatisticTypeSensorType): void {
        this.raw.set(PropertyType.StatisticTypeSensor, value);
    }
    /**
     * Ustawia wartość cechy StatisticTypeGrid.
     */
    setStatisticTypeGrid(value: StatisticTypeGridType): void {
        this.raw.set(PropertyType.StatisticTypeGrid, value);
    }
    /**
     * Ustawia wartość cechy StatisticSubtypeGrid.
     */
    setStatisticSubtypeGrid(value: StatisticSubtypeGridType): void {
        this.raw.set(PropertyType.StatisticSubtypeGrid, value);
    }
    /**
     * Ustawia wartość cechy StatisticTypeEnergyProduction.
     */
    setStatisticTypeEnergyProduction(value: StatisticTypeEnergyProductionType): void {
        this.raw.set(PropertyType.StatisticTypeEnergyProduction, value);
    }
    /**
     * Ustawia wartość cechy StatisticTypeEnergyStorage.
     */
    setStatisticTypeEnergyStorage(value: StatisticTypeEnergyStorageType): void {
        this.raw.set(PropertyType.StatisticTypeEnergyStorage, value);
    }
    /**
     * Ustawia wartość cechy StatisticTypeCharger.
     */
    setStatisticTypeCharger(value: StatisticTypeChargerType): void {
        this.raw.set(PropertyType.StatisticTypeCharger, value);
    }
}

class StatisticsRemote implements IStatistics {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane po zmianie wartości cechy Value.
     * @param callback
     */
    addOnValueChange(_callback: () => void): void {
        // Remote events are not supported
    }

    /**
     * Wartość pomiarowa obliczana i wysyłana jako statystyka do serwera co pełne 15 minut. Dla pomiarów 'Media' – ustaw wartość w zakresie od 0.0 do 1.0 (zużycie energii zostanie obliczone automatycznie na podstawie cechy Load). Dla pomiarów 'Sensor', 'Battery Level', 'Voltage', 'Power', 'Reactive Power' i 'Other Average Value' – ustaw aktualną wartość (wartość średnia zostanie obliczona automatycznie). Dla pomiarów 'Energy' – ustaw aktualną całkowitą wartość energii w watogodzinach (różnica zostanie obliczona automatycznie).
     * @returns {number}
     */
    get value(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Value)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Włącza raportowanie pomiaru do statystyk oraz definiuje kategorię pomiaru. Uwaga! Raz wysłana statystyka pozostaje w historii statystyk na serwerze. Możliwe jest manualne usunięcie statystyk z poziomu panelu konta w chmurze. Off - Statystyki nie są wysyłane do chmury.
     * @returns {StatisticStateType}
     */
    get statisticState(): StatisticStateType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.StatisticState)
            .build();
        return this.gate.runScript(cmd!);
    }

    set statisticState(value: StatisticStateType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatisticState)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Wartość obciążenia w watach.
     * @returns {number}
     */
    get load(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Load)
            .build();
        return this.gate.runScript(cmd!);
    }

    set load(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Load)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Statystyki są wysyłane na podstawie obliczenia wartości średniej dla ustawionej wartości cechy Value w okresie 15 minut.
     * @returns {StatisticTypeSensorType}
     */
    get statisticTypeSensor(): StatisticTypeSensorType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.StatisticTypeSensor)
            .build();
        return this.gate.runScript(cmd!);
    }

    set statisticTypeSensor(value: StatisticTypeSensorType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatisticTypeSensor)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Dla pomiaru energii statystyki są wysyłane na podstawie zliczania różnicy w wartości cechy Value w okresie 15 minut. Cechę Value należy aktualizować o całkowitą wartość energii w watogodzinach. Dla pozostałych typów pomiaru zliczana jest wartość średnia w okresie 15 minut.
     * @returns {StatisticTypeGridType}
     */
    get statisticTypeGrid(): StatisticTypeGridType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.StatisticTypeGrid)
            .build();
        return this.gate.runScript(cmd!);
    }

    set statisticTypeGrid(value: StatisticTypeGridType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatisticTypeGrid)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Podkategoria pomiaru. Może być to pomiar ogólny lub konkretna faza L1, L2 lub L3.
     * @returns {StatisticSubtypeGridType}
     */
    get statisticSubtypeGrid(): StatisticSubtypeGridType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.StatisticSubtypeGrid)
            .build();
        return this.gate.runScript(cmd!);
    }

    set statisticSubtypeGrid(value: StatisticSubtypeGridType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatisticSubtypeGrid)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Dla pomiaru energii statystyki są wysyłane na podstawie zliczania różnicy w wartości cechy Value w okresie 15 minut. Cechę Value należy aktualizować o całkowitą wartość energii w watogodzinach. Dla pozostałych typów pomiaru zliczana jest wartość średnia w okresie 15 minut.
     * @returns {StatisticTypeEnergyProductionType}
     */
    get statisticTypeEnergyProduction(): StatisticTypeEnergyProductionType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.StatisticTypeEnergyProduction)
            .build();
        return this.gate.runScript(cmd!);
    }

    set statisticTypeEnergyProduction(value: StatisticTypeEnergyProductionType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatisticTypeEnergyProduction)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Dla pomiaru poziomu naładowania zliczana jest wartość średnia w okresie 15 minut. Dla pomiaru energii ładowania i rozładowywania statystyki są wysyłane na podstawie zliczania różnicy w wartości cechy Value w okresie 15 minut. Cechę Value należy aktualizować o całkowitą wartość energii w watogodzinach.
     * @returns {StatisticTypeEnergyStorageType}
     */
    get statisticTypeEnergyStorage(): StatisticTypeEnergyStorageType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.StatisticTypeEnergyStorage)
            .build();
        return this.gate.runScript(cmd!);
    }

    set statisticTypeEnergyStorage(value: StatisticTypeEnergyStorageType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatisticTypeEnergyStorage)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Dla pomiaru energii statystyki są wysyłane na podstawie zliczania różnicy w wartości cechy Value w okresie 15 minut. Cechę Value należy aktualizować o całkowitą wartość energii bieżącej sesji ładowania w watogodzinach. Dla pozostałych typów pomiaru zliczana jest wartość średnia w okresie 15 minut.
     * @returns {StatisticTypeChargerType}
     */
    get statisticTypeCharger(): StatisticTypeChargerType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.StatisticTypeCharger)
            .build();
        return this.gate.runScript(cmd!);
    }

    set statisticTypeCharger(value: StatisticTypeChargerType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatisticTypeCharger)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia wartość cechy Value.
     */
    setValue(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Value)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia wartość cechy StatisticState.
     */
    setStatisticState(value: StatisticStateType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatisticState)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia wartość cechy Load.
     */
    setLoad(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Load)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia wartość cechy StatisticTypeSensor.
     */
    setStatisticTypeSensor(value: StatisticTypeSensorType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatisticTypeSensor)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia wartość cechy StatisticTypeGrid.
     */
    setStatisticTypeGrid(value: StatisticTypeGridType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatisticTypeGrid)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia wartość cechy StatisticSubtypeGrid.
     */
    setStatisticSubtypeGrid(value: StatisticSubtypeGridType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatisticSubtypeGrid)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia wartość cechy StatisticTypeEnergyProduction.
     */
    setStatisticTypeEnergyProduction(value: StatisticTypeEnergyProductionType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatisticTypeEnergyProduction)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia wartość cechy StatisticTypeEnergyStorage.
     */
    setStatisticTypeEnergyStorage(value: StatisticTypeEnergyStorageType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatisticTypeEnergyStorage)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia wartość cechy StatisticTypeCharger.
     */
    setStatisticTypeCharger(value: StatisticTypeChargerType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatisticTypeCharger)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export {
    Statistics, StatisticsRaw, StatisticsRemote,
    StatisticStateType, StatisticTypeSensorType, StatisticTypeGridType,
    StatisticSubtypeGridType, StatisticTypeEnergyProductionType,
    StatisticTypeEnergyStorageType, StatisticTypeChargerType
}
