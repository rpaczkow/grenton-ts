// Created from: src/interfaces/module_ROLLER_SH_WIFI_FM_fv01_02.xml, object name="DIN"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnValueChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2,
    OnShortPress = 3,
    OnLongPress = 4,
    OnHold = 5,
    OnClick = 6
}

enum PropertyType {
    Value = 0,
    Inertion = 1,
    HoldDelay = 2,
    HoldInterval = 3,
    Coupling = 4
}

enum MethodType {}

declare class DInRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IDIn {
    /** Zdarzenie wywoływane w przypadku zmiany stanu na przeciwny */
    addOnValueChange: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie ustawienia stanu wysokiego na wejściu */
    addOnSwitchOn: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie ustawienia stanu niskiego na wejściu */
    addOnSwitchOff: (callback: () => void) => void
    /** Zdarzenie wywoływane po naciśnięciu przycisku na okres 500ms-2000ms */
    addOnShortPress: (callback: () => void) => void
    /** Zdarzenie wywoływane po naciśnięciu przycisku na okres 2000ms-5000ms */
    addOnLongPress: (callback: () => void) => void
    /** Zdarzenie wywoływane gdy wejście jest w stanie wysokim, pierwszy raz po upłynięciu czasu HoldDelay, a następnie cyklicznie co wartość HoldInterval */
    addOnHold: (callback: () => void) => void
    /** Zdarzenie wywoływane po naciśnięciu przycisku na czas krótszy niż 500ms */
    addOnClick: (callback: () => void) => void
    /** Zwraca stan wejścia jako 0 lub 1 */
    readonly value: boolean
    /** Określa stałą czasową wejścia. Skok wartości co 20ms */
    inertion: number
    /** Czas po jakim po wciśnięciu i przytrzymaniu wyzwalane jest zdarzenie OnHold */
    holdDelay: number
    /** Odstęp cykliczny w milisekundach, po jakim podczas trzymania przycisku wyzwalane są kolejne zdarzenia OnHold */
    holdInterval: number
    /** Zwraca procentową wartość sprzężenia między przewodami:\n0% - brak sprzężenia, gdy wejście wyłączone,\n1%-30% - małe sprzężenie pomiędzy przewodami, gdy wejście wyłączone,\n31%-90% - duże sprzężenie pomiędzy przewodami mogące powodować błędy (za długie przewody), gdy wejście wyłączone,\n91-110% - wejście fizycznie załączone */
    readonly coupling: number
    /** Ustawia czas inercji wejścia */
    setInertion: (value: number) => void
    /** Ustawia wartość HoldDelay */
    setHoldDelay: (value: number) => void
    /** Ustawia wartość HoldInterval */
    setHoldInterval: (value: number) => void
}

class DIn implements IDIn {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];
    private onShortPressCallbacks: Array<() => void> = [];
    private onLongPressCallbacks: Array<() => void> = [];
    private onHoldCallbacks: Array<() => void> = [];
    private onClickCallbacks: Array<() => void> = [];

    constructor(private raw: DInRaw) {
        this.raw.add_event(EventType.OnValueChange, () => {
            this.onValueChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnShortPress, () => {
            this.onShortPressCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLongPress, () => {
            this.onLongPressCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnHold, () => {
            this.onHoldCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnClick, () => {
            this.onClickCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnValueChange(callback: () => void): void { this.onValueChangeCallbacks.push(callback); }
    addOnSwitchOn(callback: () => void): void { this.onSwitchOnCallbacks.push(callback); }
    addOnSwitchOff(callback: () => void): void { this.onSwitchOffCallbacks.push(callback); }
    addOnShortPress(callback: () => void): void { this.onShortPressCallbacks.push(callback); }
    addOnLongPress(callback: () => void): void { this.onLongPressCallbacks.push(callback); }
    addOnHold(callback: () => void): void { this.onHoldCallbacks.push(callback); }
    addOnClick(callback: () => void): void { this.onClickCallbacks.push(callback); }

    get value(): boolean { return this.raw.get(PropertyType.Value) === 1; }
    get inertion(): number { return this.raw.get(PropertyType.Inertion); }
    set inertion(val: number) { this.raw.set(PropertyType.Inertion, val); }
    get holdDelay(): number { return this.raw.get(PropertyType.HoldDelay); }
    set holdDelay(val: number) { this.raw.set(PropertyType.HoldDelay, val); }
    get holdInterval(): number { return this.raw.get(PropertyType.HoldInterval); }
    set holdInterval(val: number) { this.raw.set(PropertyType.HoldInterval, val); }
    get coupling(): number { return this.raw.get(PropertyType.Coupling); }

    setInertion(value: number): void { this.raw.set(PropertyType.Inertion, value); }
    setHoldDelay(value: number): void { this.raw.set(PropertyType.HoldDelay, value); }
    setHoldInterval(value: number): void { this.raw.set(PropertyType.HoldInterval, value); }
}

class DInRemote implements IDIn {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnValueChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOff(_callback: () => void): void { /* Remote events are not supported */ }
    addOnShortPress(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLongPress(_callback: () => void): void { /* Remote events are not supported */ }
    addOnHold(_callback: () => void): void { /* Remote events are not supported */ }
    addOnClick(_callback: () => void): void { /* Remote events are not supported */ }

    get value(): boolean {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Value).build();
        return this.gate.runScript(cmd!) === 1;
    }
    get inertion(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Inertion).build();
        return this.gate.runScript(cmd!);
    }
    set inertion(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Inertion).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get holdDelay(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.HoldDelay).build();
        return this.gate.runScript(cmd!);
    }
    set holdDelay(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.HoldDelay).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get holdInterval(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.HoldInterval).build();
        return this.gate.runScript(cmd!);
    }
    set holdInterval(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.HoldInterval).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get coupling(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Coupling).build();
        return this.gate.runScript(cmd!);
    }

    setInertion(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Inertion).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setHoldDelay(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.HoldDelay).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setHoldInterval(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.HoldInterval).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
}

export { DIn, DInRaw, DInRemote }
