// Created from: packages/grenton-api/interfaces/object_multi_fan_ac_thermostat_v1.xml, object name="MultiFanACThermostat" version="1"

import { rawExecutionBuilderFactory } from "../../../core/execution-builder"
import { RemoteGate } from "../../../core/remote-gate"

enum EventType {
    OnPointValueChange = 0,
    OnStart = 1,
    OnStop = 2,
    OnControlOutValueOn = 3,
    OnControlOutValueOff = 4,
    OnHolidayModeOn = 5,
    OnHolidayModeOff = 6
}

enum PropertyType {
    Source = 0,
    Control = 1,
    OutputType = 2,
    PointValue = 3,
    HolidayModeValue = 4,
    Hysteresis = 5,
    State = 6,
    ControlDirection = 7,
    Mode = 8,
    Data = 9,
    Min = 10,
    Max = 11,
    TargetTemp = 12,
    ControlOutValue = 13,
    CurrentTemp = 14,
    FanLowControl = 15,
    FanMediumControl = 16,
    FanHighControl = 17,
    FanMode = 18,
    ControlSwitchDelay = 19,
    ProtectionDelayOn = 20,
    ProtectionDelayOff = 21,
    FanControlOutValue = 22,
    MediumFanSpeedDelta = 23,
    HighFanSpeedDelta = 24,
    FanSpeedHysteresis = 25
}

enum MethodType {
    Start = 0,
    Stop = 1,
    IncreaseDegree = 2,
    DecreaseDegree = 3,
    HeatUp = 4,
    HolidayModeStart = 5,
    HolidayModeStop = 6,
    AutoModeStart = 7,
    AutoModeStop = 8
}

enum OutputTypeType {
    Auto = -1,
    Digital = 0,
    Analog = 1
}

enum ControlDirectionType {
    Normal = 0,
    Reverse = 1
}

enum ModeType {
    UsePointValue = 0,
    HolidayMode = 1,
    AutoMode = 2,
    HeatUp = 3
}

enum FanModeType {
    Auto = 0,
    Low = 1,
    Medium = 2,
    High = 3
}

declare class MultiFanACThermostatRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IMultiFanACThermostat {
    /**
     * Zdarzenie wywoływane przy zmianie wartości PointValue
     * @param callback
     */
    addOnPointValueChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy wznowieniu pracy termostatu
     * @param callback
     */
    addOnStart: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy zatrzymaniu pracy termostatu
     * @param callback
     */
    addOnStop: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane gdy wyjście ControlOutValue jest załączane
     * @param callback
     */
    addOnControlOutValueOn: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane gdy wyjście ControlOutValue jest wyłączane
     * @param callback
     */
    addOnControlOutValueOff: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy uruchomieniu trybu wakacyjnego
     * @param callback
     */
    addOnHolidayModeOn: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy wyłączeniu trybu wakacyjnego
     * @param callback
     */
    addOnHolidayModeOff: (callback: () => void) => void
    /** Przełącza w stan aktywny (State=1) */
    start: () => void
    /** Przełącza w stan zatrzymania (State=0) */
    stop: () => void
    /** Zwiększa PointValue o 1°C */
    increaseDegree: () => void
    /** Zmniejsza PointValue o 1°C */
    decreaseDegree: () => void
    /**
     * Podnosi wartość PointValue o wartość Value, na wskazany okres czasu (Time) wyrażony w minutach
     * @param {number} value
     * @param {number} time
     */
    heatUp: (value: number, time: number) => void
    /** Uruchamia tryb wakacyjny */
    holidayModeStart: () => void
    /** Zatrzymuje tryb wakacyjny */
    holidayModeStop: () => void
    /** Uruchamia tryb AutoMode (pobieranie docelowej temperatury z harmonogramu zamiast z cechy PointValue) */
    autoModeStart: () => void
    /** Zatrzymuje tryb AutoMode */
    autoModeStop: () => void
    /**
     * Typ wyjścia: Auto - autodetekcja Digital - cyfrowe Analog - analogowe
     * @param {OutputTypeType} value
     */
    setOutputType: (value: OutputTypeType) => void
    /**
     * Ustawia stan: 1 - aktywny, 0 - zatrzymany
     * @param {number} value
     */
    setState: (value: number) => void
    /**
     * Ustawia tryb pracy
     * @param {ModeType} value
     */
    setMode: (value: ModeType) => void
    /** Typ wyjścia: -1 - autodetekcja 0 - cyfrowe 1 - analogowe */
    readonly outputType: OutputTypeType
    /** Wartość ręcznie zadanej temperatury */
    pointValue: number
    /** Wartość temperatury dla trybu wakacyjnego */
    holidayModeValue: number
    /** Wielkość histerezy */
    hysteresis: number
    /** Stan pracy: 1 - aktywny, 0 - zatrzymany */
    readonly state: number
    /** Kierunek pracy: 0 - tryb grzania 1 - tryb chłodzenia */
    controlDirection: ControlDirectionType
    /** Tryb pracy: 0 - tryb ręczny (użycie PointValue) 1 - tryb wakacyjny (użycie HolidayModeValue) 2 - tryb automatyczny (użycie wartości z Harmonogramu - AutoMode) 3 - tryb podgrzewania (użycie wartości HeatUp) */
    readonly mode: ModeType
    /** Wartość cechy Data */
    data: string
    /** Dolna wartość zakresu wbudowanego harmonogramu */
    min: number
    /** Górna wartość zakresu wbudowanego harmonogramu */
    max: number
    /** Zwraca aktualną wartość docelowej temperatury, w odróżnieniu od SetPoint uwzględnia status AutoMode i HolidayMode */
    readonly targetTemp: number
    /** Zwraca wartość temperatury na czujniku */
    readonly currentTemp: number
    /** Wartość przypisywana do wyjścia sterującego */
    readonly controlOutValue: number
    /** Wartość przypisywana do wyjścia sterującego wentylatorem: 0 - wyłączone, 1 - włączone (Low), 2 - włączone (Medium), 3 - włączone (High) */
    readonly fanControlOutValue: number
    /** Tryb pracy wentylatora: 0 - tryb automatyczny (automatyczne załączanie oraz zmiana prędkości), 1 - tryb pracy ciągłej (Low), 2 - tryb pracy ciągłej (Medium), 3 - tryb pracy ciągłej (High) */
    fanMode: FanModeType
    /** Opóźnienie włączenia lub wyłączenia wyjścia sterującego w stosunku do wyjścia wentylatora */
    controlSwitchDelay: number
    /** Czas, przez który wyjście sterujące nie może zostać załączone po wyłączeniu (funkcja ochrony sprężarki) */
    protectionDelayOn: number
    /** Czas, przez który wyjście sterujące nie może zostać wyłączone po załączeniu (funkcja ochrony sprężarki) */
    protectionDelayOff: number
    /** Różnica pomiędzy temperaturą źródłową a docelową dla załączenia drugiego stopnia wentylatora */
    mediumFanSpeedDelta: number
    /** Różnica pomiędzy temperaturą źródłową a docelową dla załączenia trzeciego stopnia wentylatora */
    highFanSpeedDelta: number
    /** Wielkość histerezy dla zmiany prędkości wentylatora */
    fanSpeedHysteresis: number
}

class MultiFanACThermostat implements IMultiFanACThermostat {
    private onPointValueChangeCallbacks: Array<() => void> = [];
    private onStartCallbacks: Array<() => void> = [];
    private onStopCallbacks: Array<() => void> = [];
    private onControlOutValueOnCallbacks: Array<() => void> = [];
    private onControlOutValueOffCallbacks: Array<() => void> = [];
    private onHolidayModeOnCallbacks: Array<() => void> = [];
    private onHolidayModeOffCallbacks: Array<() => void> = [];

    constructor(private raw: MultiFanACThermostatRaw) {
        this.raw.add_event(EventType.OnPointValueChange, () => {
            this.onPointValueChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnStart, () => {
            this.onStartCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnStop, () => {
            this.onStopCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnControlOutValueOn, () => {
            this.onControlOutValueOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnControlOutValueOff, () => {
            this.onControlOutValueOffCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnHolidayModeOn, () => {
            this.onHolidayModeOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnHolidayModeOff, () => {
            this.onHolidayModeOffCallbacks.forEach(callback => { callback(); });
        });
    }

    /**
     * Zdarzenie wywoływane przy zmianie wartości PointValue
     * @param callback
     */
    addOnPointValueChange(callback: () => void): void {
        this.onPointValueChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy wznowieniu pracy termostatu
     * @param callback
     */
    addOnStart(callback: () => void): void {
        this.onStartCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy zatrzymaniu pracy termostatu
     * @param callback
     */
    addOnStop(callback: () => void): void {
        this.onStopCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane gdy wyjście ControlOutValue jest załączane
     * @param callback
     */
    addOnControlOutValueOn(callback: () => void): void {
        this.onControlOutValueOnCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane gdy wyjście ControlOutValue jest wyłączane
     * @param callback
     */
    addOnControlOutValueOff(callback: () => void): void {
        this.onControlOutValueOffCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy uruchomieniu trybu wakacyjnego
     * @param callback
     */
    addOnHolidayModeOn(callback: () => void): void {
        this.onHolidayModeOnCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy wyłączeniu trybu wakacyjnego
     * @param callback
     */
    addOnHolidayModeOff(callback: () => void): void {
        this.onHolidayModeOffCallbacks.push(callback);
    }
    /** Przełącza w stan aktywny (State=1) */
    start(): void {
        this.raw.execute(MethodType.Start);
    }
    /** Przełącza w stan zatrzymania (State=0) */
    stop(): void {
        this.raw.execute(MethodType.Stop);
    }
    /** Zwiększa PointValue o 1°C */
    increaseDegree(): void {
        this.raw.execute(MethodType.IncreaseDegree);
    }
    /** Zmniejsza PointValue o 1°C */
    decreaseDegree(): void {
        this.raw.execute(MethodType.DecreaseDegree);
    }
    /**
     * Podnosi wartość PointValue o wartość Value, na wskazany okres czasu (Time) wyrażony w minutach
     * @param {number} value
     * @param {number} time
     */
    heatUp(value: number, time: number): void {
        this.raw.execute(MethodType.HeatUp, value, time);
    }
    /** Uruchamia tryb wakacyjny */
    holidayModeStart(): void {
        this.raw.execute(MethodType.HolidayModeStart);
    }
    /** Zatrzymuje tryb wakacyjny */
    holidayModeStop(): void {
        this.raw.execute(MethodType.HolidayModeStop);
    }
    /** Uruchamia tryb AutoMode (pobieranie docelowej temperatury z harmonogramu zamiast z cechy PointValue) */
    autoModeStart(): void {
        this.raw.execute(MethodType.AutoModeStart);
    }
    /** Zatrzymuje tryb AutoMode */
    autoModeStop(): void {
        this.raw.execute(MethodType.AutoModeStop);
    }
    /**
     * Typ wyjścia: Auto - autodetekcja Digital - cyfrowe Analog - analogowe
     * @param {OutputTypeType} value
     */
    setOutputType(value: OutputTypeType): void {
        this.raw.set(PropertyType.OutputType, value);
    }
    /**
     * Ustawia stan: 1 - aktywny, 0 - zatrzymany
     * @param {number} value
     */
    setState(value: number): void {
        this.raw.set(PropertyType.State, value);
    }
    /**
     * Ustawia tryb pracy
     * @param {ModeType} value
     */
    setMode(value: ModeType): void {
        this.raw.set(PropertyType.Mode, value);
    }
    /**
     * Typ wyjścia: -1 - autodetekcja 0 - cyfrowe 1 - analogowe
     * @returns {OutputTypeType}
     */
    get outputType(): OutputTypeType {
        return this.raw.get(PropertyType.OutputType);
    }
    /**
     * Wartość ręcznie zadanej temperatury
     * @returns {number}
     */
    get pointValue(): number {
        return this.raw.get(PropertyType.PointValue);
    }
    set pointValue(value: number) {
        this.raw.set(PropertyType.PointValue, value);
    }
    /**
     * Wartość temperatury dla trybu wakacyjnego
     * @returns {number}
     */
    get holidayModeValue(): number {
        return this.raw.get(PropertyType.HolidayModeValue);
    }
    set holidayModeValue(value: number) {
        this.raw.set(PropertyType.HolidayModeValue, value);
    }
    /**
     * Wielkość histerezy
     * @returns {number}
     */
    get hysteresis(): number {
        return this.raw.get(PropertyType.Hysteresis);
    }
    set hysteresis(value: number) {
        this.raw.set(PropertyType.Hysteresis, value);
    }
    /**
     * Stan pracy: 1 - aktywny, 0 - zatrzymany
     * @returns {number}
     */
    get state(): number {
        return this.raw.get(PropertyType.State);
    }
    /**
     * Kierunek pracy: 0 - tryb grzania 1 - tryb chłodzenia
     * @returns {ControlDirectionType}
     */
    get controlDirection(): ControlDirectionType {
        return this.raw.get(PropertyType.ControlDirection);
    }
    set controlDirection(value: ControlDirectionType) {
        this.raw.set(PropertyType.ControlDirection, value);
    }
    /**
     * Tryb pracy: 0 - tryb ręczny (użycie PointValue) 1 - tryb wakacyjny (użycie HolidayModeValue) 2 - tryb automatyczny (użycie wartości z Harmonogramu - AutoMode) 3 - tryb podgrzewania (użycie wartości HeatUp)
     * @returns {ModeType}
     */
    get mode(): ModeType {
        return this.raw.get(PropertyType.Mode);
    }
    /**
     * Wartość cechy Data
     * @returns {string}
     */
    get data(): string {
        return this.raw.get(PropertyType.Data);
    }
    set data(value: string) {
        this.raw.set(PropertyType.Data, value);
    }
    /**
     * Dolna wartość zakresu wbudowanego harmonogramu
     * @returns {number}
     */
    get min(): number {
        return this.raw.get(PropertyType.Min);
    }
    set min(value: number) {
        this.raw.set(PropertyType.Min, value);
    }
    /**
     * Górna wartość zakresu wbudowanego harmonogramu
     * @returns {number}
     */
    get max(): number {
        return this.raw.get(PropertyType.Max);
    }
    set max(value: number) {
        this.raw.set(PropertyType.Max, value);
    }
    /**
     * Zwraca aktualną wartość docelowej temperatury, w odróżnieniu od SetPoint uwzględnia status AutoMode i HolidayMode
     * @returns {number}
     */
    get targetTemp(): number {
        return this.raw.get(PropertyType.TargetTemp);
    }
    /**
     * Zwraca wartość temperatury na czujniku
     * @returns {number}
     */
    get currentTemp(): number {
        return this.raw.get(PropertyType.CurrentTemp);
    }
    /**
     * Wartość przypisywana do wyjścia sterującego
     * @returns {number}
     */
    get controlOutValue(): number {
        return this.raw.get(PropertyType.ControlOutValue);
    }
    /**
     * Wartość przypisywana do wyjścia sterującego wentylatorem: 0 - wyłączone, 1 - włączone (Low), 2 - włączone (Medium), 3 - włączone (High)
     * @returns {number}
     */
    get fanControlOutValue(): number {
        return this.raw.get(PropertyType.FanControlOutValue);
    }
    /**
     * Tryb pracy wentylatora: 0 - tryb automatyczny (automatyczne załączanie oraz zmiana prędkości), 1 - tryb pracy ciągłej (Low), 2 - tryb pracy ciągłej (Medium), 3 - tryb pracy ciągłej (High)
     * @returns {FanModeType}
     */
    get fanMode(): FanModeType {
        return this.raw.get(PropertyType.FanMode);
    }
    set fanMode(value: FanModeType) {
        this.raw.set(PropertyType.FanMode, value);
    }
    /**
     * Opóźnienie włączenia lub wyłączenia wyjścia sterującego w stosunku do wyjścia wentylatora
     * @returns {number}
     */
    get controlSwitchDelay(): number {
        return this.raw.get(PropertyType.ControlSwitchDelay);
    }
    set controlSwitchDelay(value: number) {
        this.raw.set(PropertyType.ControlSwitchDelay, value);
    }
    /**
     * Czas, przez który wyjście sterujące nie może zostać załączone po wyłączeniu (funkcja ochrony sprężarki)
     * @returns {number}
     */
    get protectionDelayOn(): number {
        return this.raw.get(PropertyType.ProtectionDelayOn);
    }
    set protectionDelayOn(value: number) {
        this.raw.set(PropertyType.ProtectionDelayOn, value);
    }
    /**
     * Czas, przez który wyjście sterujące nie może zostać wyłączone po załączeniu (funkcja ochrony sprężarki)
     * @returns {number}
     */
    get protectionDelayOff(): number {
        return this.raw.get(PropertyType.ProtectionDelayOff);
    }
    set protectionDelayOff(value: number) {
        this.raw.set(PropertyType.ProtectionDelayOff, value);
    }
    /**
     * Różnica pomiędzy temperaturą źródłową a docelową dla załączenia drugiego stopnia wentylatora
     * @returns {number}
     */
    get mediumFanSpeedDelta(): number {
        return this.raw.get(PropertyType.MediumFanSpeedDelta);
    }
    set mediumFanSpeedDelta(value: number) {
        this.raw.set(PropertyType.MediumFanSpeedDelta, value);
    }
    /**
     * Różnica pomiędzy temperaturą źródłową a docelową dla załączenia trzeciego stopnia wentylatora
     * @returns {number}
     */
    get highFanSpeedDelta(): number {
        return this.raw.get(PropertyType.HighFanSpeedDelta);
    }
    set highFanSpeedDelta(value: number) {
        this.raw.set(PropertyType.HighFanSpeedDelta, value);
    }
    /**
     * Wielkość histerezy dla zmiany prędkości wentylatora
     * @returns {number}
     */
    get fanSpeedHysteresis(): number {
        return this.raw.get(PropertyType.FanSpeedHysteresis);
    }
    set fanSpeedHysteresis(value: number) {
        this.raw.set(PropertyType.FanSpeedHysteresis, value);
    }
    set source(value: any) {
        this.raw.set(PropertyType.Source, value);
    }
    set control(value: any) {
        this.raw.set(PropertyType.Control, value);
    }
    set fanLowControl(value: any) {
        this.raw.set(PropertyType.FanLowControl, value);
    }
    set fanMediumControl(value: any) {
        this.raw.set(PropertyType.FanMediumControl, value);
    }
    set fanHighControl(value: any) {
        this.raw.set(PropertyType.FanHighControl, value);
    }
}

class MultiFanACThermostatRemote implements IMultiFanACThermostat {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane przy zmianie wartości PointValue
     * @param callback
     */
    addOnPointValueChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy wznowieniu pracy termostatu
     * @param callback
     */
    addOnStart(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy zatrzymaniu pracy termostatu
     * @param callback
     */
    addOnStop(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane gdy wyjście ControlOutValue jest załączane
     * @param callback
     */
    addOnControlOutValueOn(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane gdy wyjście ControlOutValue jest wyłączane
     * @param callback
     */
    addOnControlOutValueOff(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy uruchomieniu trybu wakacyjnego
     * @param callback
     */
    addOnHolidayModeOn(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy wyłączeniu trybu wakacyjnego
     * @param callback
     */
    addOnHolidayModeOff(_callback: () => void): void {
        // Remote events are not supported
    }

    /** Przełącza w stan aktywny (State=1) */
    start(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Start)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Przełącza w stan zatrzymania (State=0) */
    stop(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Stop)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Zwiększa PointValue o 1°C */
    increaseDegree(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.IncreaseDegree)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Zmniejsza PointValue o 1°C */
    decreaseDegree(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.DecreaseDegree)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Podnosi wartość PointValue o wartość Value, na wskazany okres czasu (Time) wyrażony w minutach
     * @param {number} value
     * @param {number} time
     */
    heatUp(value: number, time: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.HeatUp)
            .addParameter(value)
            .addParameter(time)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Uruchamia tryb wakacyjny */
    holidayModeStart(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.HolidayModeStart)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Zatrzymuje tryb wakacyjny */
    holidayModeStop(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.HolidayModeStop)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Uruchamia tryb AutoMode (pobieranie docelowej temperatury z harmonogramu zamiast z cechy PointValue) */
    autoModeStart(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.AutoModeStart)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Zatrzymuje tryb AutoMode */
    autoModeStop(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.AutoModeStop)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Typ wyjścia: Auto - autodetekcja Digital - cyfrowe Analog - analogowe
     * @param {OutputTypeType} value
     */
    setOutputType(value: OutputTypeType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.OutputType)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia stan: 1 - aktywny, 0 - zatrzymany
     * @param {number} value
     */
    setState(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.State)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia tryb pracy
     * @param {ModeType} value
     */
    setMode(value: ModeType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Mode)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Typ wyjścia: -1 - autodetekcja 0 - cyfrowe 1 - analogowe
     * @returns {OutputTypeType}
     */
    get outputType(): OutputTypeType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.OutputType)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Wartość ręcznie zadanej temperatury
     * @returns {number}
     */
    get pointValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.PointValue)
            .build();
        return this.gate.runScript(cmd!);
    }

    set pointValue(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.PointValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Wartość temperatury dla trybu wakacyjnego
     * @returns {number}
     */
    get holidayModeValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.HolidayModeValue)
            .build();
        return this.gate.runScript(cmd!);
    }

    set holidayModeValue(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.HolidayModeValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Wielkość histerezy
     * @returns {number}
     */
    get hysteresis(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Hysteresis)
            .build();
        return this.gate.runScript(cmd!);
    }

    set hysteresis(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Hysteresis)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Stan pracy: 1 - aktywny, 0 - zatrzymany
     * @returns {number}
     */
    get state(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.State)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Kierunek pracy: 0 - tryb grzania 1 - tryb chłodzenia
     * @returns {ControlDirectionType}
     */
    get controlDirection(): ControlDirectionType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ControlDirection)
            .build();
        return this.gate.runScript(cmd!);
    }

    set controlDirection(value: ControlDirectionType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ControlDirection)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Tryb pracy: 0 - tryb ręczny (użycie PointValue) 1 - tryb wakacyjny (użycie HolidayModeValue) 2 - tryb automatyczny (użycie wartości z Harmonogramu - AutoMode) 3 - tryb podgrzewania (użycie wartości HeatUp)
     * @returns {ModeType}
     */
    get mode(): ModeType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Mode)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Wartość cechy Data
     * @returns {string}
     */
    get data(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Data)
            .build();
        return this.gate.runScript(cmd!);
    }

    set data(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Data)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Dolna wartość zakresu wbudowanego harmonogramu
     * @returns {number}
     */
    get min(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Min)
            .build();
        return this.gate.runScript(cmd!);
    }

    set min(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Min)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Górna wartość zakresu wbudowanego harmonogramu
     * @returns {number}
     */
    get max(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Max)
            .build();
        return this.gate.runScript(cmd!);
    }

    set max(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Max)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Zwraca aktualną wartość docelowej temperatury, w odróżnieniu od SetPoint uwzględnia status AutoMode i HolidayMode
     * @returns {number}
     */
    get targetTemp(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.TargetTemp)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Zwraca wartość temperatury na czujniku
     * @returns {number}
     */
    get currentTemp(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.CurrentTemp)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Wartość przypisywana do wyjścia sterującego
     * @returns {number}
     */
    get controlOutValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ControlOutValue)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Wartość przypisywana do wyjścia sterującego wentylatorem: 0 - wyłączone, 1 - włączone (Low), 2 - włączone (Medium), 3 - włączone (High)
     * @returns {number}
     */
    get fanControlOutValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.FanControlOutValue)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Tryb pracy wentylatora: 0 - tryb automatyczny (automatyczne załączanie oraz zmiana prędkości), 1 - tryb pracy ciągłej (Low), 2 - tryb pracy ciągłej (Medium), 3 - tryb pracy ciągłej (High)
     * @returns {FanModeType}
     */
    get fanMode(): FanModeType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.FanMode)
            .build();
        return this.gate.runScript(cmd!);
    }

    set fanMode(value: FanModeType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.FanMode)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Opóźnienie włączenia lub wyłączenia wyjścia sterującego w stosunku do wyjścia wentylatora
     * @returns {number}
     */
    get controlSwitchDelay(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ControlSwitchDelay)
            .build();
        return this.gate.runScript(cmd!);
    }

    set controlSwitchDelay(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ControlSwitchDelay)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Czas, przez który wyjście sterujące nie może zostać załączone po wyłączeniu (funkcja ochrony sprężarki)
     * @returns {number}
     */
    get protectionDelayOn(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ProtectionDelayOn)
            .build();
        return this.gate.runScript(cmd!);
    }

    set protectionDelayOn(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ProtectionDelayOn)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Czas, przez który wyjście sterujące nie może zostać wyłączone po załączeniu (funkcja ochrony sprężarki)
     * @returns {number}
     */
    get protectionDelayOff(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ProtectionDelayOff)
            .build();
        return this.gate.runScript(cmd!);
    }

    set protectionDelayOff(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ProtectionDelayOff)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Różnica pomiędzy temperaturą źródłową a docelową dla załączenia drugiego stopnia wentylatora
     * @returns {number}
     */
    get mediumFanSpeedDelta(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.MediumFanSpeedDelta)
            .build();
        return this.gate.runScript(cmd!);
    }

    set mediumFanSpeedDelta(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MediumFanSpeedDelta)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Różnica pomiędzy temperaturą źródłową a docelową dla załączenia trzeciego stopnia wentylatora
     * @returns {number}
     */
    get highFanSpeedDelta(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.HighFanSpeedDelta)
            .build();
        return this.gate.runScript(cmd!);
    }

    set highFanSpeedDelta(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.HighFanSpeedDelta)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Wielkość histerezy dla zmiany prędkości wentylatora
     * @returns {number}
     */
    get fanSpeedHysteresis(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.FanSpeedHysteresis)
            .build();
        return this.gate.runScript(cmd!);
    }

    set fanSpeedHysteresis(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.FanSpeedHysteresis)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    set source(value: any) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Source)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    set control(value: any) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Control)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    set fanLowControl(value: any) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.FanLowControl)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    set fanMediumControl(value: any) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.FanMediumControl)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    set fanHighControl(value: any) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.FanHighControl)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export {
    MultiFanACThermostat, MultiFanACThermostatRaw, MultiFanACThermostatRemote,
    OutputTypeType, ControlDirectionType, ModeType, FanModeType
}
