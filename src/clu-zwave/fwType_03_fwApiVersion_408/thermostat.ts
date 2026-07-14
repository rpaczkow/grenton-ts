// Created from: src/interfaces/object_thermostat_v2.xml, object name="Thermostat" version="2"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnChange = 0,
    OnStart = 1,
    OnStop = 2,
    OnOutOn = 3,
    OnOutOff = 4,
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
    CurrentTemp = 14
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

enum StateType {
    Off = 0,
    On = 1
}

declare class ThermostatRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IThermostat {
    /**
     * Zdarzenie wywoływane przy zmianie wartości PointValue
     * @param callback
     */
    addOnChange: (callback: () => void) => void
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
     * Zdarzenie wywoływane przy wystawieniu na wyjściu ControlOutValue wartości większej od zera
     * @param callback
     */
    addOnOutOn: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy wystawieniu na wyjściu ControlOutValue wartości równej zero
     * @param callback
     */
    addOnOutOff: (callback: () => void) => void
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
     * @param {StateType} value
     */
    setState: (value: StateType) => void
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
    readonly state: StateType
    /** Kierunek pracy: 0 - tryb normalny (grzanie) 1 - tryb odwrotny (chłodzenie) */
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
    /** Wartość przypisywana do wyjścia sterującego ogrzewaniem */
    readonly controlOutValue: number
    /** Zwraca wartość temperatury na czujniku */
    readonly currentTemp: number
    /** Ustawienie tygodniowego harmonogramu */
    setData: (value: string) => void
    /** Ustawia minimalną wartość zakresu wbudowanego harmonogramu */
    setMin: (value: number) => void
    /** Ustawia maksymalną wartość zakresu wbudowanego harmonogramu */
    setMax: (value: number) => void
    /** Ustawia powiązanie termostatu z czujnikiem temperatury */
    setSource: (value: any) => void
    /** Ustawia powiązanie termostatu z wyjściem sterującym */
    setControl: (value: any) => void
    /** Ustawia wartość ręcznie zadanej temperatury */
    setPointValue: (value: number) => void
    /** Ustawia wartość temperatury dla trybu wakacyjnego */
    setHolidayModeValue: (value: number) => void
    /** Ustawia wartość histerezy */
    setHysteresis: (value: number) => void
    /**
     * Ustawia kierunek pracy:
     * Normal - tryb normalny (grzanie)
     * Reverse - tryb odwrotny (chłodzenie)
     */
    setControlDirection: (value: ControlDirectionType) => void
}

class Thermostat implements IThermostat {
    private onChangeCallbacks: Array<() => void> = [];
    private onStartCallbacks: Array<() => void> = [];
    private onStopCallbacks: Array<() => void> = [];
    private onOutOnCallbacks: Array<() => void> = [];
    private onOutOffCallbacks: Array<() => void> = [];
    private onHolidayModeOnCallbacks: Array<() => void> = [];
    private onHolidayModeOffCallbacks: Array<() => void> = [];

    constructor(private raw: ThermostatRaw) {
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnStart, () => {
            this.onStartCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnStop, () => {
            this.onStopCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnOutOn, () => {
            this.onOutOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnOutOff, () => {
            this.onOutOffCallbacks.forEach(callback => { callback(); });
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
    addOnChange(callback: () => void): void {
        this.onChangeCallbacks.push(callback);
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
     * Zdarzenie wywoływane przy wystawieniu na wyjściu ControlOutValue wartości większej od zera
     * @param callback
     */
    addOnOutOn(callback: () => void): void {
        this.onOutOnCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy wystawieniu na wyjściu ControlOutValue wartości równej zero
     * @param callback
     */
    addOnOutOff(callback: () => void): void {
        this.onOutOffCallbacks.push(callback);
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
     * @param {StateType} value
     */
    setState(value: StateType): void {
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
     * @returns {StateType}
     */
    get state(): StateType {
        return this.raw.get(PropertyType.State);
    }
    /**
     * Kierunek pracy: 0 - tryb normalny (grzanie) 1 - tryb odwrotny (chłodzenie)
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
     * Wartość przypisywana do wyjścia sterującego ogrzewaniem
     * @returns {number}
     */
    get controlOutValue(): number {
        return this.raw.get(PropertyType.ControlOutValue);
    }
    /**
     * Zwraca wartość temperatury na czujniku
     * @returns {number}
     */
    get currentTemp(): number {
        return this.raw.get(PropertyType.CurrentTemp);
    }
    set source(value: any) {
        this.raw.set(PropertyType.Source, value);
    }
    set control(value: any) {
        this.raw.set(PropertyType.Control, value);
    }
    /** Ustawienie tygodniowego harmonogramu */
    setData(value: string): void {
        this.raw.set(PropertyType.Data, value);
    }
    /** Ustawia minimalną wartość zakresu wbudowanego harmonogramu */
    setMin(value: number): void {
        this.raw.set(PropertyType.Min, value);
    }
    /** Ustawia maksymalną wartość zakresu wbudowanego harmonogramu */
    setMax(value: number): void {
        this.raw.set(PropertyType.Max, value);
    }
    /** Ustawia powiązanie termostatu z czujnikiem temperatury */
    setSource(value: any): void {
        this.raw.set(PropertyType.Source, value);
    }
    /** Ustawia powiązanie termostatu z wyjściem sterującym */
    setControl(value: any): void {
        this.raw.set(PropertyType.Control, value);
    }
    /** Ustawia wartość ręcznie zadanej temperatury */
    setPointValue(value: number): void {
        this.raw.set(PropertyType.PointValue, value);
    }
    /** Ustawia wartość temperatury dla trybu wakacyjnego */
    setHolidayModeValue(value: number): void {
        this.raw.set(PropertyType.HolidayModeValue, value);
    }
    /** Ustawia wartość histerezy */
    setHysteresis(value: number): void {
        this.raw.set(PropertyType.Hysteresis, value);
    }
    /**
     * Ustawia kierunek pracy:
     * Normal - tryb normalny (grzanie)
     * Reverse - tryb odwrotny (chłodzenie)
     */
    setControlDirection(value: ControlDirectionType): void {
        this.raw.set(PropertyType.ControlDirection, value);
    }
}

class ThermostatRemote implements IThermostat {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane przy zmianie wartości PointValue
     * @param callback
     */
    addOnChange(_callback: () => void): void {
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
     * Zdarzenie wywoływane przy wystawieniu na wyjściu ControlOutValue wartości większej od zera
     * @param callback
     */
    addOnOutOn(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy wystawieniu na wyjściu ControlOutValue wartości równej zero
     * @param callback
     */
    addOnOutOff(_callback: () => void): void {
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
     * @returns {StateType}
     */
    get state(): StateType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.State)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Kierunek pracy: 0 - tryb normalny (grzanie) 1 - tryb odwrotny (chłodzenie)
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
     * Wartość przypisywana do wyjścia sterującego ogrzewaniem
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

    /** Ustawienie tygodniowego harmonogramu */
    setData(value: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Data)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia minimalną wartość zakresu wbudowanego harmonogramu */
    setMin(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Min)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia maksymalną wartość zakresu wbudowanego harmonogramu */
    setMax(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Max)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia powiązanie termostatu z czujnikiem temperatury */
    setSource(value: any): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Source)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia powiązanie termostatu z wyjściem sterującym */
    setControl(value: any): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Control)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia wartość ręcznie zadanej temperatury */
    setPointValue(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.PointValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia wartość temperatury dla trybu wakacyjnego */
    setHolidayModeValue(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.HolidayModeValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia wartość histerezy */
    setHysteresis(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Hysteresis)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia kierunek pracy:
     * Normal - tryb normalny (grzanie)
     * Reverse - tryb odwrotny (chłodzenie)
     */
    setControlDirection(value: ControlDirectionType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ControlDirection)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export {
    Thermostat, ThermostatRaw, ThermostatRemote, OutputTypeType, ControlDirectionType, ModeType, StateType
}
