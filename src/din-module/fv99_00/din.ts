// Created from: src/interfaces/module_din_fv99_0.xml, object name="DIN"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2,
    OnShortPress = 3,
    OnLongPress = 4,
    OnHold = 5
}

enum PropertyType {
    Value = 0,
    Threshold = 1,
    HoldDelay = 2,
    HoldInterval = 3
}

enum MethodType {}

declare class DinRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IDin {
    /** Zdarzenie wywoływane w przypadku zmiany stanu na przeciwny */
    addOnChange: (callback: () => void) => void
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
    /** Zwraca stan wejścia jako 0 lub 1 */
    readonly value: boolean
    /** Minimalny czas jaki musi minąć między naciśnięciami przycisku aby było ono zinterpretowane jako nowe naciśnięcie */
    threshold: number
    /** Czas po jakim po wciśnięciu i przytrzymaniu wyzwalane jest zdarzenie OnHold */
    holdDelay: number
    /** Odstęp cykliczny w milisekundach, po jakim podczas trzymania przycisku wyzwalane są kolejne zdarzenia OnHold */
    holdInterval: number
    /** Ustawia czas progu zadziałania wejścia */
    setThreshold: (value: number) => void
    /** Ustawia wartość HoldDelay */
    setHoldDelay: (value: number) => void
    /** Ustawia wartość HoldInterval */
    setHoldInterval: (value: number) => void
}

class Din implements IDin {
    private onChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];
    private onShortPressCallbacks: Array<() => void> = [];
    private onLongPressCallbacks: Array<() => void> = [];
    private onHoldCallbacks: Array<() => void> = [];

    constructor(private raw: DinRaw) {
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => { callback(); });
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
    }

    addOnChange(callback: () => void): void { this.onChangeCallbacks.push(callback); }
    addOnSwitchOn(callback: () => void): void { this.onSwitchOnCallbacks.push(callback); }
    addOnSwitchOff(callback: () => void): void { this.onSwitchOffCallbacks.push(callback); }
    addOnShortPress(callback: () => void): void { this.onShortPressCallbacks.push(callback); }
    addOnLongPress(callback: () => void): void { this.onLongPressCallbacks.push(callback); }
    addOnHold(callback: () => void): void { this.onHoldCallbacks.push(callback); }

    get value(): boolean { return this.raw.get(PropertyType.Value) === 1; }
    get threshold(): number { return this.raw.get(PropertyType.Threshold); }
    set threshold(val: number) { this.raw.set(PropertyType.Threshold, val); }
    get holdDelay(): number { return this.raw.get(PropertyType.HoldDelay); }
    set holdDelay(val: number) { this.raw.set(PropertyType.HoldDelay, val); }
    get holdInterval(): number { return this.raw.get(PropertyType.HoldInterval); }
    set holdInterval(val: number) { this.raw.set(PropertyType.HoldInterval, val); }

    setThreshold(value: number): void { this.raw.set(PropertyType.Threshold, value); }
    setHoldDelay(value: number): void { this.raw.set(PropertyType.HoldDelay, value); }
    setHoldInterval(value: number): void { this.raw.set(PropertyType.HoldInterval, value); }
}

class DinRemote implements IDin {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOff(_callback: () => void): void { /* Remote events are not supported */ }
    addOnShortPress(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLongPress(_callback: () => void): void { /* Remote events are not supported */ }
    addOnHold(_callback: () => void): void { /* Remote events are not supported */ }

    get value(): boolean {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Value).build();
        return this.gate.runScript(cmd!) === 1;
    }
    get threshold(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Threshold).build();
        return this.gate.runScript(cmd!);
    }
    set threshold(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Threshold).addParameter(val).build();
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

    setThreshold(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Threshold).addParameter(value).build();
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

export { Din, DinRaw, DinRemote }
