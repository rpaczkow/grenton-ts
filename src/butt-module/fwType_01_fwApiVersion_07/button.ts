// Created from: src/interfaces/module_butt_fv07_1.xml, object name="BUTTON"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum ModeType {
    Monostable = 0,
    Bistable = 1,
    Locked = 2
}

enum EventType {
    OnChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2,
    OnShortPress = 3,
    OnLongPress = 4,
    OnHold = 5,
    OnClick = 6
}

enum PropertyType {
    Value = 0,
    Mode = 1,
    HoldDelay = 2,
    HoldInterval = 3
}

enum MethodType {
    ShowOK = 0,
    ShowError = 1,
    LedSwitchOn = 2,
    LedSwitchOff = 4
}

declare class ButtonRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IButton {
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
    /** Zdarzenie wywoływane po naciśnięciu przycisku na czas krótszy niż 500ms */
    addOnClick: (callback: () => void) => void
    /** Zwraca stan wejścia jako 0 lub 1 */
    readonly value: number
    /** Zwraca ustawiony tryb działania przycisku (0 - monostabilny, 1 - bistabilny, 2 - zablokowany). W trybie zablokowanym diody świecą na czerwono ciągłym światłem */
    mode: ModeType
    /** Czas w milisekundach, po jakim po wciśnięciu i przytrzymaniu przycisku wyzwalane jest zdarzenie OnHold */
    holdDelay: number
    /** Odstęp cykliczny w milisekundach, po jakim podczas trzymania przycisku wyzwalane są kolejne zdarzenia OnHold */
    holdInterval: number
    /** Ustawia wartość HoldDelay */
    setHoldDelay: (value: number) => void
    /** Ustawia wartość HoldInterval */
    setHoldInterval: (value: number) => void
    /** Ustawia tryb działania przycisku (0 - monostabilny, 1 - bistabilny, 2 - zablokowany). W trybie zablokowanym diody świecą na czerwono ciągłym światłem. */
    setMode: (value: ModeType) => void
    /** Powoduje miganie zielonej diody na przycisku przez 2 sekundy (częstotliwość 500ms) */
    showOK: () => void
    /** Powoduje miganie czerwonej diody na przycisku przez 2 sekundy (częstotliwość 500ms) */
    showError: () => void
    /** Załącza zieloną diodę na przycisku */
    ledSwitchOn: () => void
    /** Wyłącza zieloną diodę na przycisku */
    ledSwitchOff: () => void
}

class Button implements IButton {
    private onChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];
    private onShortPressCallbacks: Array<() => void> = [];
    private onLongPressCallbacks: Array<() => void> = [];
    private onHoldCallbacks: Array<() => void> = [];
    private onClickCallbacks: Array<() => void> = [];

    constructor(private raw: ButtonRaw) {
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
        this.raw.add_event(EventType.OnClick, () => {
            this.onClickCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnChange(callback: () => void): void { this.onChangeCallbacks.push(callback); }
    addOnSwitchOn(callback: () => void): void { this.onSwitchOnCallbacks.push(callback); }
    addOnSwitchOff(callback: () => void): void { this.onSwitchOffCallbacks.push(callback); }
    addOnShortPress(callback: () => void): void { this.onShortPressCallbacks.push(callback); }
    addOnLongPress(callback: () => void): void { this.onLongPressCallbacks.push(callback); }
    addOnHold(callback: () => void): void { this.onHoldCallbacks.push(callback); }
    addOnClick(callback: () => void): void { this.onClickCallbacks.push(callback); }

    get value(): number { return this.raw.get(PropertyType.Value); }
    get mode(): ModeType { return this.raw.get(PropertyType.Mode); }
    set mode(val: ModeType) { this.raw.set(PropertyType.Mode, val); }
    get holdDelay(): number { return this.raw.get(PropertyType.HoldDelay); }
    set holdDelay(val: number) { this.raw.set(PropertyType.HoldDelay, val); }
    get holdInterval(): number { return this.raw.get(PropertyType.HoldInterval); }
    set holdInterval(val: number) { this.raw.set(PropertyType.HoldInterval, val); }

    setHoldDelay(value: number): void { this.raw.set(PropertyType.HoldDelay, value); }
    setHoldInterval(value: number): void { this.raw.set(PropertyType.HoldInterval, value); }
    setMode(value: ModeType): void { this.raw.set(PropertyType.Mode, value); }

    showOK(): void { this.raw.execute(MethodType.ShowOK); }
    showError(): void { this.raw.execute(MethodType.ShowError); }
    ledSwitchOn(): void { this.raw.execute(MethodType.LedSwitchOn); }
    ledSwitchOff(): void { this.raw.execute(MethodType.LedSwitchOff); }
}

class ButtonRemote implements IButton {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOff(_callback: () => void): void { /* Remote events are not supported */ }
    addOnShortPress(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLongPress(_callback: () => void): void { /* Remote events are not supported */ }
    addOnHold(_callback: () => void): void { /* Remote events are not supported */ }
    addOnClick(_callback: () => void): void { /* Remote events are not supported */ }

    get value(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Value).build();
        return this.gate.runScript(cmd!);
    }
    get mode(): ModeType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Mode).build();
        return this.gate.runScript(cmd!);
    }
    set mode(val: ModeType) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Mode).addParameter(val).build();
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

    setHoldDelay(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.HoldDelay).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setHoldInterval(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.HoldInterval).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setMode(value: ModeType): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Mode).addParameter(value).build();
        this.gate.runScript(cmd!);
    }

    showOK(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.ShowOK).build();
        this.gate.runScript(cmd!);
    }
    showError(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.ShowError).build();
        this.gate.runScript(cmd!);
    }
    ledSwitchOn(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.LedSwitchOn).build();
        this.gate.runScript(cmd!);
    }
    ledSwitchOff(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.LedSwitchOff).build();
        this.gate.runScript(cmd!);
    }
}

export { Button, ButtonRaw, ButtonRemote, ModeType }
