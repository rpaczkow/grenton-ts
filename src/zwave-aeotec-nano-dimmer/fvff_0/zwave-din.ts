// Created from: src/interfaces/module_aeotec_nano_dimmer_ff.xml, object name="ZWAVE_DIN"

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
    HoldDelay = 2,
    HoldInterval = 3
}

enum MethodType {}

declare class ZwaveDinRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IZwaveDin {
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
    /** Czas po jakim po wciśnięciu i przytrzymaniu wyzwalane jest zdarzenie OnHold */
    holdDelay: number
    /** Odstęp cykliczny w milisekundach, po jakim podczas trzymania przycisku wyzwalane są kolejne zdarzenia OnHold */
    holdInterval: number
    /** Ustawia wartość HoldDelay */
    setHoldDelay: (value: number) => void
    /** Ustawia wartość HoldInterval */
    setHoldInterval: (value: number) => void
}

class ZwaveDin implements IZwaveDin {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];
    private onShortPressCallbacks: Array<() => void> = [];
    private onLongPressCallbacks: Array<() => void> = [];
    private onHoldCallbacks: Array<() => void> = [];
    private onClickCallbacks: Array<() => void> = [];

    constructor(private raw: ZwaveDinRaw) {
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

    /** Zdarzenie wywoływane w przypadku zmiany stanu na przeciwny */
    addOnValueChange(callback: () => void): void { this.onValueChangeCallbacks.push(callback); }
    /** Zdarzenie wywoływane w momencie ustawienia stanu wysokiego na wejściu */
    addOnSwitchOn(callback: () => void): void { this.onSwitchOnCallbacks.push(callback); }
    /** Zdarzenie wywoływane w momencie ustawienia stanu niskiego na wejściu */
    addOnSwitchOff(callback: () => void): void { this.onSwitchOffCallbacks.push(callback); }
    /** Zdarzenie wywoływane po naciśnięciu przycisku na okres 500ms-2000ms */
    addOnShortPress(callback: () => void): void { this.onShortPressCallbacks.push(callback); }
    /** Zdarzenie wywoływane po naciśnięciu przycisku na okres 2000ms-5000ms */
    addOnLongPress(callback: () => void): void { this.onLongPressCallbacks.push(callback); }
    /** Zdarzenie wywoływane gdy wejście jest w stanie wysokim, pierwszy raz po upłynięciu czasu HoldDelay, a następnie cyklicznie co wartość HoldInterval */
    addOnHold(callback: () => void): void { this.onHoldCallbacks.push(callback); }
    /** Zdarzenie wywoływane po naciśnięciu przycisku na czas krótszy niż 500ms */
    addOnClick(callback: () => void): void { this.onClickCallbacks.push(callback); }

    /** Zwraca stan wejścia jako 0 lub 1 */
    get value(): boolean { return this.raw.get(PropertyType.Value) === 1; }
    /** Czas po jakim po wciśnięciu i przytrzymaniu wyzwalane jest zdarzenie OnHold */
    get holdDelay(): number { return this.raw.get(PropertyType.HoldDelay); }
    set holdDelay(val: number) { this.raw.set(PropertyType.HoldDelay, val); }
    /** Odstęp cykliczny w milisekundach, po jakim podczas trzymania przycisku wyzwalane są kolejne zdarzenia OnHold */
    get holdInterval(): number { return this.raw.get(PropertyType.HoldInterval); }
    set holdInterval(val: number) { this.raw.set(PropertyType.HoldInterval, val); }

    /** Ustawia wartość HoldDelay */
    setHoldDelay(value: number): void { this.raw.set(PropertyType.HoldDelay, value); }
    /** Ustawia wartość HoldInterval */
    setHoldInterval(value: number): void { this.raw.set(PropertyType.HoldInterval, value); }
}

class ZwaveDinRemote implements IZwaveDin {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnValueChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOff(_callback: () => void): void { /* Remote events are not supported */ }
    addOnShortPress(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLongPress(_callback: () => void): void { /* Remote events are not supported */ }
    addOnHold(_callback: () => void): void { /* Remote events are not supported */ }
    addOnClick(_callback: () => void): void { /* Remote events are not supported */ }

    /** Zwraca stan wejścia jako 0 lub 1 */
    get value(): boolean {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Value).build();
        return this.gate.runScript(cmd!) === 1;
    }
    /** Czas po jakim po wciśnięciu i przytrzymaniu wyzwalane jest zdarzenie OnHold */
    get holdDelay(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.HoldDelay).build();
        return this.gate.runScript(cmd!);
    }
    set holdDelay(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.HoldDelay).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    /** Odstęp cykliczny w milisekundach, po jakim podczas trzymania przycisku wyzwalane są kolejne zdarzenia OnHold */
    get holdInterval(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.HoldInterval).build();
        return this.gate.runScript(cmd!);
    }
    set holdInterval(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.HoldInterval).addParameter(val).build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia wartość HoldDelay */
    setHoldDelay(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.HoldDelay).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    /** Ustawia wartość HoldInterval */
    setHoldInterval(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.HoldInterval).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveDin, ZwaveDinRaw, ZwaveDinRemote }
