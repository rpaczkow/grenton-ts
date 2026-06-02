import { rawExecutionBuilderFactory } from "../../core/execution-builder";
import { RemoteGate } from "../../core/remote-gate";

enum EventType {
    OnValueChange = 0,
    OnValueRise = 1,
    OnValueLower = 2,
    OnOutOfRange = 3,
}


enum PropertyType {
    Threshold = 1,
    Sensitivity = 2,
    MinValue = 3,
    MaxValue = 4,
    Value = 0,
    StatisticState = 9
}

enum StatisticState {
    Off = 0,
    On = 1,
}

declare class PanelSensTempRaw {
    addEvent(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
}

interface IPanelSensTemp {
    /** Zdarzenie wywoływane w przypadku zmiany wartości cechy Value */
    addOnValueChange: (callback: () => void) => void;
    /** Zdarzenie wywoływane przy zmianie wartości na wyższą (zbocze narastające) */
    addOnValueRise: (callback: () => void) => void;
    /** Zdarzenie wywoływane przy zmianie wartości na niższą (zbocze opadające) */
    addOnValueLower: (callback: () => void) => void;
    /** Zdarzenie wywoływane, gdy wartość na wyjściu znajduje się poza wyznaczonym zakresem (MinValue - MaxValue) */
    addOnValueOutOfRange: (callback: () => void) => void;
    /** Wielkość histerezy (dokładność 0.1°C) określająca czułość, przy której następuje wygenerowanie zdarzeń: OnValueChange, OnValueLower, OnValueRise */
    threshold: number;
    /** Czas (w ms) dla którego próbkowane wartości są uśredniane */
    sensitivity: number;
    /** Minimalna wartość cechy Value, której przekroczenie wywołuje zdarzenie OnOutOfRange */
    minValue: number;
    /** Maksymalna wartość cechy Value, której przekroczenie wywołuje zdarzenie OnOutOfRange */
    maxValue: number;
    /** Wartość wejścia w zakresie od 0.0 do 40.0 (°C) */
    readonly value: number;
    /** Włącza raportowanie pomiaru do modułu statystyk */
    statisticState: StatisticState;
}

class PanelSensTempRemote implements IPanelSensTemp {
    constructor(private objectName: string, private gate: RemoteGate) {
    }

    /** Zdarzenie wywoływane w przypadku zmiany wartości cechy Value */
    addOnValueChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /** Zdarzenie wywoływane przy zmianie wartości na wyższą (zbocze narastające) */
    addOnValueRise(_callback: () => void): void {
        // Remote events are not supported
    }
    /** Zdarzenie wywoływane przy zmianie wartości na niższą (zbocze opadające) */
    addOnValueLower(_callback: () => void): void {
        // Remote events are not supported
    }
    /** Zdarzenie wywoływane, gdy wartość na wyjściu znajduje się poza wyznaczonym zakresem (MinValue - MaxValue) */
    addOnValueOutOfRange(_callback: () => void): void {
        // Remote events are not supported
    }
    /** Wielkość histerezy (dokładność 0.1°C) określająca czułość, przy której następuje wygenerowanie zdarzeń: OnValueChange, OnValueLower, OnValueRise */
    get threshold(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Threshold)
            .build();
        return this.gate.runScript(cmd!);
    }
    set threshold(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Threshold)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /** Czas (w ms) dla którego próbkowane wartości są uśredniane */
    get sensitivity(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Sensitivity)
            .build();
        return this.gate.runScript(cmd!);
    }
    set sensitivity(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Sensitivity)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /** Minimalna wartość cechy Value, której przekroczenie wywołuje zdarzenie OnOutOfRange */
    get minValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.MinValue)
            .build();
        return this.gate.runScript(cmd!);
    }
    set minValue(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MinValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /** Maksymalna wartość cechy Value, której przekroczenie wywołuje zdarzenie OnOutOfRange */
    get maxValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.MaxValue)
            .build();
        return this.gate.runScript(cmd!);
    }
    set maxValue(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MaxValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /** Wartość wejścia w zakresie od 0.0 do 40.0 (°C) */
    get value(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Value)
            .build();
        return this.gate.runScript(cmd!);
    }
    /** Włącza raportowanie pomiaru do modułu statystyk */
    get statisticState(): StatisticState {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.StatisticState)
            .build();
        return this.gate.runScript(cmd!);
    }
    set statisticState(value: StatisticState) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatisticState)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

class PanelSensTemp implements IPanelSensTemp {
    private sensTemp: PanelSensTempRaw
    private onValueChangeCallbacks: Array<() => void> = [];
    private onValueRiseCallbacks: Array<() => void> = [];
    private onValueLowerCallbacks: Array<() => void> = [];
    private onValueOutOfRangeCallbacks: Array<() => void> = [];

    constructor(sensTemp: PanelSensTempRaw){ 
        this.sensTemp = sensTemp;

        this.sensTemp.addEvent(EventType.OnValueChange, () => {
            this.onValueChangeCallbacks.forEach(callback => {
                callback();
            });
        });

        this.sensTemp.addEvent(EventType.OnValueRise, () => {
            this.onValueRiseCallbacks.forEach(callback => {
                callback();
            });
        });

        this.sensTemp.addEvent(EventType.OnValueLower, () => {
            this.onValueLowerCallbacks.forEach(callback => {
                callback();
            });
        });

        this.sensTemp.addEvent(EventType.OnOutOfRange, () => {
            this.onValueOutOfRangeCallbacks.forEach(callback => {
                callback();
            });
        });
    }

    /** Zdarzenie wywoływane w przypadku zmiany wartości cechy Value */
    addOnValueChange(callback: () => void): void {
        this.onValueChangeCallbacks.push(callback);
    }
    /** Zdarzenie wywoływane przy zmianie wartości na wyższą (zbocze narastające) */
    addOnValueRise(callback: () => void): void {
        this.onValueRiseCallbacks.push(callback);
    }
    /** Zdarzenie wywoływane przy zmianie wartości na niższą (zbocze opadające) */
    addOnValueLower(callback: () => void): void {
        this.onValueLowerCallbacks.push(callback);
    }
    /** Zdarzenie wywoływane, gdy wartość na wyjściu znajduje się poza wyznaczonym zakresem (MinValue - MaxValue) */
    addOnValueOutOfRange(callback: () => void): void {
        this.onValueOutOfRangeCallbacks.push(callback);
    }
    /** Wielkość histerezy (dokładność 0.1°C) określająca czułość, przy której następuje wygenerowanie zdarzeń: OnValueChange, OnValueLower, OnValueRise */
    get threshold(): number {
        return this.sensTemp.get(PropertyType.Threshold);
    }
    set threshold(value: number) {
        this.sensTemp.set(PropertyType.Threshold, value);
    }
    /** Czas (w ms) dla którego próbkowane wartości są uśredniane */
    get sensitivity(): number {
        return this.sensTemp.get(PropertyType.Sensitivity);
    }
    set sensitivity(value: number) {
        this.sensTemp.set(PropertyType.Sensitivity, value);
    }
    /** Minimalna wartość cechy Value, której przekroczenie wywołuje zdarzenie OnOutOfRange */
    get minValue(): number {
        return this.sensTemp.get(PropertyType.MinValue);
    }
    set minValue(value: number) {
        this.sensTemp.set(PropertyType.MinValue, value);
    }
    /** Maksymalna wartość cechy Value, której przekroczenie wywołuje zdarzenie OnOutOfRange */
    get maxValue(): number {
        return this.sensTemp.get(PropertyType.MaxValue);
    }
    set maxValue(value: number) {
        this.sensTemp.set(PropertyType.MaxValue, value);
    }
    /** Wartość wejścia w zakresie od 0.0 do 40.0 (°C) */
    get value(): number {
        return this.sensTemp.get(PropertyType.Value);
    }
    /** Włącza raportowanie pomiaru do modułu statystyk */
    get statisticState(): StatisticState {
        return this.sensTemp.get(PropertyType.StatisticState);
    }
    set statisticState(value: StatisticState) {
        this.sensTemp.set(PropertyType.StatisticState, value);
    }
}

export { PanelSensTemp, PanelSensTempRaw, PanelSensTempRemote, StatisticState }