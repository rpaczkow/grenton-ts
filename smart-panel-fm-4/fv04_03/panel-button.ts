// Created from: packages/grenton-api/interfaces/module_SMART_PANEL_FM_4_fv04_03.xml, object name="PANEL_BUTTON" version="04.03"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2,
    OnShortPress = 3,
    OnLongPress = 4,
    OnHold = 5,
    OnClick = 6,
}

enum PropertyType {
    Value = 0,
    Mode = 1,
    HoldDelay = 2,
    HoldInterval = 3,
    Label = 4,
    IconA = 5,
    IconB = 6,
}

enum MethodType {
    ShowOK = 0,
    ShowError = 0,
    LedSwitchOn = 1,
    RedLedSwitchOn = 2,
    LedSwitchOff = 2,
    SetLabel = 3,
    SetIconA = 4,
    SetIconB = 5,
}

enum ModeType {
    Monostable = 0,
    Bistable = 1,
    Locked = 2,
}

declare class PanelButtonRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: number, ...args: any[]): any;
}

interface IPanelButton {
    /**
     * Zdarzenie wywoływane w przypadku zmiany stanu na przeciwny
     * @param callback
     */
    addOnChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w momencie ustawienia stanu wysokiego na wejściu
     * @param callback
     */
    addOnSwitchOn: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w momencie ustawienia stanu niskiego na wejściu
     * @param callback
     */
    addOnSwitchOff: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po naciśnięciu przycisku na czas 500 ms - 2000 ms
     * @param callback
     */
    addOnShortPress: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po naciśnięciu przycisku na czas dłuższy niż 2000 ms
     * @param callback
     */
    addOnLongPress: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane gdy wejście jest w stanie wysokim, pierwszy raz po upłynięciu czasu HoldDelay, a następnie cyklicznie co wartość HoldInterval
     * @param callback
     */
    addOnHold: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po naciśnięciu przycisku na czas krótszy niż 500 ms
     * @param callback
     */
    addOnClick: (callback: () => void) => void
    /**
     * Ustawia wartość cechy Label
     * @param {string} text
     */
    setLabel: (text: string) => void
    /**
     * Ustawia nazwę pliku BMP ikony A
     * @param {string} filename
     */
    setIconA: (filename: string) => void
    /**
     * Ustawia nazwę pliku BMP ikony B
     * @param {string} filename
     */
    setIconB: (filename: string) => void
    /** Powoduje miganie zielonej diody na przycisku przez 2 sekundy (częstotliwość 500 ms). Czerwona dioda przycisku pozostaje zgaszona */
    showOK: () => void
    /** Powoduje miganie czerwonej diody na przycisku przez 2 sekundy (częstotliwość 500 ms). Zielona dioda przycisku pozostaje zgaszona */
    showError: () => void
    /** Załącza zieloną diodę na przycisku */
    ledSwitchOn: () => void
    /** Załącza czerwoną diodę na przycisku */
    redLedSwitchOn: () => void
    /** Wyłącza wszystkie diody na przycisku */
    ledSwitchOff: () => void
    /** Zwraca stan wejścia jako 0 lub 1 */
    readonly value: boolean
    /** Zwraca ustawiony tryb działania przycisku: 0 - monostabilny (monostable), 1 - bistabilny (bistable), 2 - zablokowany (locked) */
    readonly mode: ModeType
    /**
     * Ustawia tryb działania przycisku (0 - monostabilny (monostable), 1 - bistabilny (bistable), 2 - zablokowany (locked))
     * @param {ModeType} value
     */
    setMode: (value: ModeType) => void
    /** Czas w milisekundach, po jakim po wciśnięciu i przytrzymaniu przycisku wyzwalane jest zdarzenie OnHold (domyślnie 1000 ms) */
    readonly holdDelay: number
    /**
     * Ustawia wartość HoldDelay
     * @param {number} value
     */
    setHoldDelay: (value: number) => void
    /** Odstęp cykliczny w milisekundach, po jakim podczas trzymania przycisku wyzwalane są kolejne zdarzenia OnHold */
    readonly holdInterval: number
    /**
     * Ustawia wartość HoldInterval
     * @param {number} value
     */
    setHoldInterval: (value: number) => void
    /** Tekst, który opisuje przycisk */
    label: string
    /** Nazwa pliku ikony w trybie monostabilnym oraz bistabilnym w pozycji OFF. Nazwa poprzedzona ~ wyświetla ikonę w negatywie. IconA ma priorytet nad cechą Label */
    iconA: string
    /** Nazwa pliku ikony w trybie bistabilnym w pozycji ON. Nazwa poprzedzona ~ wyświetla ikonę w negatywie */
    iconB: string
}

class PanelButtonRemote implements IPanelButton {
    constructor(private objectName: string, private gate: RemoteGate) {
    }

    addOnChange(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnSwitchOn(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnSwitchOff(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnShortPress(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnLongPress(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnHold(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnClick(_callback: () => void): void {
        // Remote events are not supported
    }

    /**
     * Ustawia wartość cechy Label
     * @param {string} text
     */
    setLabel(text: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SetLabel)
            .addParameter(text)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia nazwę pliku BMP ikony A
     * @param {string} filename
     */
    setIconA(filename: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SetIconA)
            .addParameter(filename)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia nazwę pliku BMP ikony B
     * @param {string} filename
     */
    setIconB(filename: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SetIconB)
            .addParameter(filename)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Powoduje miganie zielonej diody na przycisku przez 2 sekundy (częstotliwość 500 ms). Czerwona dioda przycisku pozostaje zgaszona */
    showOK(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.ShowOK)
            .addParameter(0)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Powoduje miganie czerwonej diody na przycisku przez 2 sekundy (częstotliwość 500 ms). Zielona dioda przycisku pozostaje zgaszona */
    showError(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.ShowError)
            .addParameter(1)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Załącza zieloną diodę na przycisku */
    ledSwitchOn(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.LedSwitchOn)
            .addParameter(2)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Załącza czerwoną diodę na przycisku */
    redLedSwitchOn(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.RedLedSwitchOn)
            .addParameter(16)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Wyłącza wszystkie diody na przycisku */
    ledSwitchOff(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.LedSwitchOff)
            .addParameter(4)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Zwraca stan wejścia jako 0 lub 1 */
    get value(): boolean {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Value)
            .build();
        return this.gate.runScript(cmd!) === 1;
    }

    /** Zwraca ustawiony tryb działania przycisku: 0 - monostabilny (monostable), 1 - bistabilny (bistable), 2 - zablokowany (locked) */
    get mode(): ModeType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Mode)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia tryb działania przycisku (0 - monostabilny (monostable), 1 - bistabilny (bistable), 2 - zablokowany (locked))
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

    /** Czas w milisekundach, po jakim po wciśnięciu i przytrzymaniu przycisku wyzwalane jest zdarzenie OnHold (domyślnie 1000 ms) */
    get holdDelay(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.HoldDelay)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia wartość HoldDelay
     * @param {number} value
     */
    setHoldDelay(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.HoldDelay)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Odstęp cykliczny w milisekundach, po jakim podczas trzymania przycisku wyzwalane są kolejne zdarzenia OnHold */
    get holdInterval(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.HoldInterval)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia wartość HoldInterval
     * @param {number} value
     */
    setHoldInterval(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.HoldInterval)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Tekst, który opisuje przycisk */
    get label(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Label)
            .build();
        return this.gate.runScript(cmd!);
    }
    set label(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Label)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Nazwa pliku ikony w trybie monostabilnym oraz bistabilnym w pozycji OFF. Nazwa poprzedzona ~ wyświetla ikonę w negatywie. IconA ma priorytet nad cechą Label */
    get iconA(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.IconA)
            .build();
        return this.gate.runScript(cmd!);
    }
    set iconA(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.IconA)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Nazwa pliku ikony w trybie bistabilnym w pozycji ON. Nazwa poprzedzona ~ wyświetla ikonę w negatywie */
    get iconB(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.IconB)
            .build();
        return this.gate.runScript(cmd!);
    }
    set iconB(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.IconB)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

class PanelButton implements IPanelButton {
    private onChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];
    private onShortPressCallbacks: Array<() => void> = [];
    private onLongPressCallbacks: Array<() => void> = [];
    private onHoldCallbacks: Array<() => void> = [];
    private onClickCallbacks: Array<() => void> = [];

    constructor(private raw: PanelButtonRaw) {
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

    /**
     * Zdarzenie wywoływane w przypadku zmiany stanu na przeciwny
     * @param callback
     */
    addOnChange(callback: () => void): void {
        this.onChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane w momencie ustawienia stanu wysokiego na wejściu
     * @param callback
     */
    addOnSwitchOn(callback: () => void): void {
        this.onSwitchOnCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane w momencie ustawienia stanu niskiego na wejściu
     * @param callback
     */
    addOnSwitchOff(callback: () => void): void {
        this.onSwitchOffCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po naciśnięciu przycisku na czas 500 ms - 2000 ms
     * @param callback
     */
    addOnShortPress(callback: () => void): void {
        this.onShortPressCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po naciśnięciu przycisku na czas dłuższy niż 2000 ms
     * @param callback
     */
    addOnLongPress(callback: () => void): void {
        this.onLongPressCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane gdy wejście jest w stanie wysokim, pierwszy raz po upłynięciu czasu HoldDelay, a następnie cyklicznie co wartość HoldInterval
     * @param callback
     */
    addOnHold(callback: () => void): void {
        this.onHoldCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po naciśnięciu przycisku na czas krótszy niż 500 ms
     * @param callback
     */
    addOnClick(callback: () => void): void {
        this.onClickCallbacks.push(callback);
    }
    /**
     * Ustawia wartość cechy Label
     * @param {string} text
     */
    setLabel(text: string): void {
        this.raw.execute(MethodType.SetLabel, text);
    }
    /**
     * Ustawia nazwę pliku BMP ikony A
     * @param {string} filename
     */
    setIconA(filename: string): void {
        this.raw.execute(MethodType.SetIconA, filename);
    }
    /**
     * Ustawia nazwę pliku BMP ikony B
     * @param {string} filename
     */
    setIconB(filename: string): void {
        this.raw.execute(MethodType.SetIconB, filename);
    }
    /** Powoduje miganie zielonej diody na przycisku przez 2 sekundy (częstotliwość 500 ms). Czerwona dioda przycisku pozostaje zgaszona */
    showOK(): void {
        this.raw.execute(MethodType.ShowOK, 0);
    }
    /** Powoduje miganie czerwonej diody na przycisku przez 2 sekundy (częstotliwość 500 ms). Zielona dioda przycisku pozostaje zgaszona */
    showError(): void {
        this.raw.execute(MethodType.ShowError, 1);
    }
    /** Załącza zieloną diodę na przycisku */
    ledSwitchOn(): void {
        this.raw.execute(MethodType.LedSwitchOn, 2);
    }
    /** Załącza czerwoną diodę na przycisku */
    redLedSwitchOn(): void {
        this.raw.execute(MethodType.RedLedSwitchOn, 16);
    }
    /** Wyłącza wszystkie diody na przycisku */
    ledSwitchOff(): void {
        this.raw.execute(MethodType.LedSwitchOff, 4);
    }
    /** Zwraca stan wejścia jako 0 lub 1 */
    get value(): boolean {
        return this.raw.get(PropertyType.Value) === 1;
    }
    /** Zwraca ustawiony tryb działania przycisku: 0 - monostabilny (monostable), 1 - bistabilny (bistable), 2 - zablokowany (locked) */
    get mode(): ModeType {
        return this.raw.get(PropertyType.Mode);
    }
    /**
     * Ustawia tryb działania przycisku (0 - monostabilny (monostable), 1 - bistabilny (bistable), 2 - zablokowany (locked))
     * @param {ModeType} value
     */
    setMode(value: ModeType): void {
        this.raw.set(PropertyType.Mode, value);
    }
    /** Czas w milisekundach, po jakim po wciśnięciu i przytrzymaniu przycisku wyzwalane jest zdarzenie OnHold (domyślnie 1000 ms) */
    get holdDelay(): number {
        return this.raw.get(PropertyType.HoldDelay);
    }
    /**
     * Ustawia wartość HoldDelay
     * @param {number} value
     */
    setHoldDelay(value: number): void {
        this.raw.set(PropertyType.HoldDelay, value);
    }
    /** Odstęp cykliczny w milisekundach, po jakim podczas trzymania przycisku wyzwalane są kolejne zdarzenia OnHold */
    get holdInterval(): number {
        return this.raw.get(PropertyType.HoldInterval);
    }
    /**
     * Ustawia wartość HoldInterval
     * @param {number} value
     */
    setHoldInterval(value: number): void {
        this.raw.set(PropertyType.HoldInterval, value);
    }
    /** Tekst, który opisuje przycisk */
    get label(): string {
        return this.raw.get(PropertyType.Label);
    }
    set label(value: string) {
        this.raw.set(PropertyType.Label, value);
    }
    /** Nazwa pliku ikony w trybie monostabilnym oraz bistabilnym w pozycji OFF. Nazwa poprzedzona ~ wyświetla ikonę w negatywie. IconA ma priorytet nad cechą Label */
    get iconA(): string {
        return this.raw.get(PropertyType.IconA);
    }
    set iconA(value: string) {
        this.raw.set(PropertyType.IconA, value);
    }
    /** Nazwa pliku ikony w trybie bistabilnym w pozycji ON. Nazwa poprzedzona ~ wyświetla ikonę w negatywie */
    get iconB(): string {
        return this.raw.get(PropertyType.IconB);
    }
    set iconB(value: string) {
        this.raw.set(PropertyType.IconB, value);
    }
}

export { PanelButton, PanelButtonRaw, PanelButtonRemote, ModeType }
