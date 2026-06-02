// Created from: packages/grenton-api/interfaces/module_SMART_PANEL_FM_4_fv03_03.xml, object name="PANEL" version="03.03"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnGestureUp = 0,
    OnGestureDown = 1,
    OnGestureLeft = 2,
    OnGestureRight = 3,
    OnProximityDetect = 4,
}

enum PropertyType {
    GestureIconUp = 4,
    GestureIconDown = 5,
    GestureIconLeft = 6,
    GestureIconRight = 7,
    ProximitySens = 10,
    ProximityTimeout = 11,
    ProximityValue = 12,
    BuzzerValue = 13,
}

enum MethodType {
    SwitchOnDisplay = 0,
    ShowButtons = 1,
    ClearScreen = 2,
    PrintText = 3,
    DrawLine = 4,
    DrawPoint = 5,
    DrawIcon = 6,
    DisplayContent = 7,
    PrintFloat = 20,
}

enum BuzzerValueType {
    Off = 0,
    On = 1,
}

declare class PanelRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: number, ...args: any[]): any;
}

interface IPanel {
    /**
     * Zdarzenie wywoływane w przypadku wykonania gestu w górę
     * @param callback
     */
    addOnGestureUp: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w przypadku wykonania gestu w dół
     * @param callback
     */
    addOnGestureDown: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w przypadku wykonania gestu w lewo
     * @param callback
     */
    addOnGestureLeft: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w przypadku wykonania gestu w prawo
     * @param callback
     */
    addOnGestureRight: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w przypadku wykrycia zbliżającej się do wyświetlacza osoby
     * @param callback
     */
    addOnProximityDetect: (callback: () => void) => void
    /** Wybudza wyświetlacz z trybu uśpienia */
    switchOnDisplay: () => void
    /** Zmienia tryb wyświetlania na 'buttons'. Czyści wyświetlacz i wyświetla ponownie ikony (lub tekst) dla wszystkich przycisków */
    showButtons: () => void
    /** Czyści zawartość wyświetlacza w trybie 'freedraw' */
    clearScreen: () => void
    /**
     * Wyświetla tekst w trybie 'freedraw'. x, y - współrzędne; txt - string; font size: 1=10p, 2=14p, 3=32p
     * @param {number} x
     * @param {number} y
     * @param {string} txt
     * @param {number} fontSize
     */
    printText: (x: number, y: number, txt: string, fontSize: number) => void
    /**
     * Wyświetla liczbę w trybie 'freedraw'. x, y - współrzędne; number - liczba; precision - ilość miejsc po przecinku; font size: 1=10p, 2=14p, 3=32p
     * @param {number} x
     * @param {number} y
     * @param {number} number
     * @param {number} precision
     * @param {number} fontSize
     */
    printFloat: (x: number, y: number, number: number, precision: number, fontSize: number) => void
    /**
     * Rysuje linię w trybie 'freedraw'. x, y - współrzędne początkowe; xe, ye - współrzędne końcowe; color - 0 czarny, 1 biały
     * @param {number} x
     * @param {number} y
     * @param {number} xe
     * @param {number} ye
     * @param {number} color
     */
    drawLine: (x: number, y: number, xe: number, ye: number, color: number) => void
    /**
     * Rysuje punkt w trybie 'freedraw'. x, y - współrzędne w pikselach; color - 0 czarny, 1 biały
     * @param {number} x
     * @param {number} y
     * @param {number} color
     */
    drawPoint: (x: number, y: number, color: number) => void
    /**
     * Rysuje ikonę (bmp) w trybie 'freedraw'. x, y - współrzędne; filename - nazwa pliku (bez rozszerzenia)
     * @param {number} x
     * @param {number} y
     * @param {string} filename
     */
    drawIcon: (x: number, y: number, filename: string) => void
    /** Wyświetla zawartość bufora pamięci graficznej. Zmienia tryb wyświetlania na 'freedraw' */
    displayContent: () => void
    /** Nazwa pliku BMP z ikoną dla gestu Góra (bez rozszerzenia) */
    readonly gestureIconUp: string
    /**
     * Ustawia ikonę dla wykonania gestu w górę
     * @param {string} filename
     */
    setGestureIconUp: (filename: string) => void
    /** Nazwa pliku BMP z ikoną dla gestu Dół (bez rozszerzenia) */
    readonly gestureIconDown: string
    /**
     * Ustawia ikonę dla wykonania gestu w dół
     * @param {string} filename
     */
    setGestureIconDown: (filename: string) => void
    /** Nazwa pliku BMP z ikoną dla gestu Lewo (bez rozszerzenia) */
    readonly gestureIconLeft: string
    /**
     * Ustawia ikonę dla wykonania gestu w lewo
     * @param {string} filename
     */
    setGestureIconLeft: (filename: string) => void
    /** Nazwa pliku BMP z ikoną dla gestu Prawo (bez rozszerzenia) */
    readonly gestureIconRight: string
    /**
     * Ustawia ikonę dla wykonania gestu w prawo
     * @param {string} filename
     */
    setGestureIconRight: (filename: string) => void
    /** Czułość sensora zbliżeniowego */
    readonly proximitySens: number
    /**
     * Ustawia wartość ProximitySens
     * @param {number} value
     */
    setProximitySens: (value: number) => void
    /** Czas po jakim wyświetlacz zostanie wygaszony */
    readonly proximityTimeout: number
    /**
     * Ustawia czas w sekundach po jakim wyświetlacz gaśnie
     * @param {number} value
     */
    setProximityTimeout: (value: number) => void
    /** Sygnał sensora zbliżeniowego */
    readonly proximityValue: number
    /** Sterowanie sygnalizacją dźwiękową: 0 - Off, 1 - On */
    readonly buzzerValue: BuzzerValueType
    /**
     * Ustawia wartość BuzzerValue: 0 - Off, 1 - On
     * @param {BuzzerValueType} value
     */
    setBuzzerValue: (value: BuzzerValueType) => void
}

class PanelRemote implements IPanel {
    constructor(private objectName: string, private gate: RemoteGate) {
    }

    addOnGestureUp(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnGestureDown(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnGestureLeft(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnGestureRight(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnProximityDetect(_callback: () => void): void {
        // Remote events are not supported
    }

    /** Wybudza wyświetlacz z trybu uśpienia */
    switchOnDisplay(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SwitchOnDisplay)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Zmienia tryb wyświetlania na 'buttons'. Czyści wyświetlacz i wyświetla ponownie ikony (lub tekst) dla wszystkich przycisków */
    showButtons(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.ShowButtons)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Czyści zawartość wyświetlacza w trybie 'freedraw' */
    clearScreen(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.ClearScreen)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Wyświetla tekst w trybie 'freedraw'. x, y - współrzędne; txt - string; font size: 1=10p, 2=14p, 3=32p
     * @param {number} x
     * @param {number} y
     * @param {string} txt
     * @param {number} fontSize
     */
    printText(x: number, y: number, txt: string, fontSize: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.PrintText)
            .addParameter(x)
            .addParameter(y)
            .addParameter(txt)
            .addParameter(fontSize)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Wyświetla liczbę w trybie 'freedraw'. x, y - współrzędne; number - liczba; precision - ilość miejsc po przecinku; font size: 1=10p, 2=14p, 3=32p
     * @param {number} x
     * @param {number} y
     * @param {number} number
     * @param {number} precision
     * @param {number} fontSize
     */
    printFloat(x: number, y: number, number: number, precision: number, fontSize: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.PrintFloat)
            .addParameter(x)
            .addParameter(y)
            .addParameter(number)
            .addParameter(precision)
            .addParameter(fontSize)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Rysuje linię w trybie 'freedraw'. x, y - współrzędne początkowe; xe, ye - współrzędne końcowe; color - 0 czarny, 1 biały
     * @param {number} x
     * @param {number} y
     * @param {number} xe
     * @param {number} ye
     * @param {number} color
     */
    drawLine(x: number, y: number, xe: number, ye: number, color: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.DrawLine)
            .addParameter(x)
            .addParameter(y)
            .addParameter(xe)
            .addParameter(ye)
            .addParameter(color)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Rysuje punkt w trybie 'freedraw'. x, y - współrzędne w pikselach; color - 0 czarny, 1 biały
     * @param {number} x
     * @param {number} y
     * @param {number} color
     */
    drawPoint(x: number, y: number, color: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.DrawPoint)
            .addParameter(x)
            .addParameter(y)
            .addParameter(color)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Rysuje ikonę (bmp) w trybie 'freedraw'. x, y - współrzędne; filename - nazwa pliku (bez rozszerzenia)
     * @param {number} x
     * @param {number} y
     * @param {string} filename
     */
    drawIcon(x: number, y: number, filename: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.DrawIcon)
            .addParameter(x)
            .addParameter(y)
            .addParameter(filename)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Wyświetla zawartość bufora pamięci graficznej. Zmienia tryb wyświetlania na 'freedraw' */
    displayContent(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.DisplayContent)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Nazwa pliku BMP z ikoną dla gestu Góra (bez rozszerzenia) */
    get gestureIconUp(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.GestureIconUp)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia ikonę dla wykonania gestu w górę
     * @param {string} filename
     */
    setGestureIconUp(filename: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.GestureIconUp)
            .addParameter(filename)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Nazwa pliku BMP z ikoną dla gestu Dół (bez rozszerzenia) */
    get gestureIconDown(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.GestureIconDown)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia ikonę dla wykonania gestu w dół
     * @param {string} filename
     */
    setGestureIconDown(filename: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.GestureIconDown)
            .addParameter(filename)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Nazwa pliku BMP z ikoną dla gestu Lewo (bez rozszerzenia) */
    get gestureIconLeft(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.GestureIconLeft)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia ikonę dla wykonania gestu w lewo
     * @param {string} filename
     */
    setGestureIconLeft(filename: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.GestureIconLeft)
            .addParameter(filename)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Nazwa pliku BMP z ikoną dla gestu Prawo (bez rozszerzenia) */
    get gestureIconRight(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.GestureIconRight)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia ikonę dla wykonania gestu w prawo
     * @param {string} filename
     */
    setGestureIconRight(filename: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.GestureIconRight)
            .addParameter(filename)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Czułość sensora zbliżeniowego */
    get proximitySens(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ProximitySens)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia wartość ProximitySens
     * @param {number} value
     */
    setProximitySens(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ProximitySens)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Czas po jakim wyświetlacz zostanie wygaszony */
    get proximityTimeout(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ProximityTimeout)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia czas w sekundach po jakim wyświetlacz gaśnie
     * @param {number} value
     */
    setProximityTimeout(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ProximityTimeout)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Sygnał sensora zbliżeniowego */
    get proximityValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ProximityValue)
            .build();
        return this.gate.runScript(cmd!);
    }

    /** Sterowanie sygnalizacją dźwiękową: 0 - Off, 1 - On */
    get buzzerValue(): BuzzerValueType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.BuzzerValue)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia wartość BuzzerValue: 0 - Off, 1 - On
     * @param {BuzzerValueType} value
     */
    setBuzzerValue(value: BuzzerValueType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.BuzzerValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

class Panel implements IPanel {
    private onGestureUpCallbacks: Array<() => void> = [];
    private onGestureDownCallbacks: Array<() => void> = [];
    private onGestureLeftCallbacks: Array<() => void> = [];
    private onGestureRightCallbacks: Array<() => void> = [];
    private onProximityDetectCallbacks: Array<() => void> = [];

    constructor(private raw: PanelRaw) {
        this.raw.add_event(EventType.OnGestureUp, () => {
            this.onGestureUpCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnGestureDown, () => {
            this.onGestureDownCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnGestureLeft, () => {
            this.onGestureLeftCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnGestureRight, () => {
            this.onGestureRightCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnProximityDetect, () => {
            this.onProximityDetectCallbacks.forEach(callback => { callback(); });
        });
    }

    /**
     * Zdarzenie wywoływane w przypadku wykonania gestu w górę
     * @param callback
     */
    addOnGestureUp(callback: () => void): void {
        this.onGestureUpCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane w przypadku wykonania gestu w dół
     * @param callback
     */
    addOnGestureDown(callback: () => void): void {
        this.onGestureDownCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane w przypadku wykonania gestu w lewo
     * @param callback
     */
    addOnGestureLeft(callback: () => void): void {
        this.onGestureLeftCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane w przypadku wykonania gestu w prawo
     * @param callback
     */
    addOnGestureRight(callback: () => void): void {
        this.onGestureRightCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane w przypadku wykrycia zbliżającej się do wyświetlacza osoby
     * @param callback
     */
    addOnProximityDetect(callback: () => void): void {
        this.onProximityDetectCallbacks.push(callback);
    }
    /** Wybudza wyświetlacz z trybu uśpienia */
    switchOnDisplay(): void {
        this.raw.execute(MethodType.SwitchOnDisplay);
    }
    /** Zmienia tryb wyświetlania na 'buttons'. Czyści wyświetlacz i wyświetla ponownie ikony (lub tekst) dla wszystkich przycisków */
    showButtons(): void {
        this.raw.execute(MethodType.ShowButtons);
    }
    /** Czyści zawartość wyświetlacza w trybie 'freedraw' */
    clearScreen(): void {
        this.raw.execute(MethodType.ClearScreen);
    }
    /**
     * Wyświetla tekst w trybie 'freedraw'. x, y - współrzędne; txt - string; font size: 1=10p, 2=14p, 3=32p
     * @param {number} x
     * @param {number} y
     * @param {string} txt
     * @param {number} fontSize
     */
    printText(x: number, y: number, txt: string, fontSize: number): void {
        this.raw.execute(MethodType.PrintText, x, y, txt, fontSize);
    }
    /**
     * Wyświetla liczbę w trybie 'freedraw'. x, y - współrzędne; number - liczba; precision - ilość miejsc po przecinku; font size: 1=10p, 2=14p, 3=32p
     * @param {number} x
     * @param {number} y
     * @param {number} number
     * @param {number} precision
     * @param {number} fontSize
     */
    printFloat(x: number, y: number, number: number, precision: number, fontSize: number): void {
        this.raw.execute(MethodType.PrintFloat, x, y, number, precision, fontSize);
    }
    /**
     * Rysuje linię w trybie 'freedraw'. x, y - współrzędne początkowe; xe, ye - współrzędne końcowe; color - 0 czarny, 1 biały
     * @param {number} x
     * @param {number} y
     * @param {number} xe
     * @param {number} ye
     * @param {number} color
     */
    drawLine(x: number, y: number, xe: number, ye: number, color: number): void {
        this.raw.execute(MethodType.DrawLine, x, y, xe, ye, color);
    }
    /**
     * Rysuje punkt w trybie 'freedraw'. x, y - współrzędne w pikselach; color - 0 czarny, 1 biały
     * @param {number} x
     * @param {number} y
     * @param {number} color
     */
    drawPoint(x: number, y: number, color: number): void {
        this.raw.execute(MethodType.DrawPoint, x, y, color);
    }
    /**
     * Rysuje ikonę (bmp) w trybie 'freedraw'. x, y - współrzędne; filename - nazwa pliku (bez rozszerzenia)
     * @param {number} x
     * @param {number} y
     * @param {string} filename
     */
    drawIcon(x: number, y: number, filename: string): void {
        this.raw.execute(MethodType.DrawIcon, x, y, filename);
    }
    /** Wyświetla zawartość bufora pamięci graficznej. Zmienia tryb wyświetlania na 'freedraw' */
    displayContent(): void {
        this.raw.execute(MethodType.DisplayContent);
    }
    /** Nazwa pliku BMP z ikoną dla gestu Góra (bez rozszerzenia) */
    get gestureIconUp(): string {
        return this.raw.get(PropertyType.GestureIconUp);
    }
    /**
     * Ustawia ikonę dla wykonania gestu w górę
     * @param {string} filename
     */
    setGestureIconUp(filename: string): void {
        this.raw.set(PropertyType.GestureIconUp, filename);
    }
    /** Nazwa pliku BMP z ikoną dla gestu Dół (bez rozszerzenia) */
    get gestureIconDown(): string {
        return this.raw.get(PropertyType.GestureIconDown);
    }
    /**
     * Ustawia ikonę dla wykonania gestu w dół
     * @param {string} filename
     */
    setGestureIconDown(filename: string): void {
        this.raw.set(PropertyType.GestureIconDown, filename);
    }
    /** Nazwa pliku BMP z ikoną dla gestu Lewo (bez rozszerzenia) */
    get gestureIconLeft(): string {
        return this.raw.get(PropertyType.GestureIconLeft);
    }
    /**
     * Ustawia ikonę dla wykonania gestu w lewo
     * @param {string} filename
     */
    setGestureIconLeft(filename: string): void {
        this.raw.set(PropertyType.GestureIconLeft, filename);
    }
    /** Nazwa pliku BMP z ikoną dla gestu Prawo (bez rozszerzenia) */
    get gestureIconRight(): string {
        return this.raw.get(PropertyType.GestureIconRight);
    }
    /**
     * Ustawia ikonę dla wykonania gestu w prawo
     * @param {string} filename
     */
    setGestureIconRight(filename: string): void {
        this.raw.set(PropertyType.GestureIconRight, filename);
    }
    /** Czułość sensora zbliżeniowego */
    get proximitySens(): number {
        return this.raw.get(PropertyType.ProximitySens);
    }
    /**
     * Ustawia wartość ProximitySens
     * @param {number} value
     */
    setProximitySens(value: number): void {
        this.raw.set(PropertyType.ProximitySens, value);
    }
    /** Czas po jakim wyświetlacz zostanie wygaszony */
    get proximityTimeout(): number {
        return this.raw.get(PropertyType.ProximityTimeout);
    }
    /**
     * Ustawia czas w sekundach po jakim wyświetlacz gaśnie
     * @param {number} value
     */
    setProximityTimeout(value: number): void {
        this.raw.set(PropertyType.ProximityTimeout, value);
    }
    /** Sygnał sensora zbliżeniowego */
    get proximityValue(): number {
        return this.raw.get(PropertyType.ProximityValue);
    }
    /** Sterowanie sygnalizacją dźwiękową: 0 - Off, 1 - On */
    get buzzerValue(): BuzzerValueType {
        return this.raw.get(PropertyType.BuzzerValue);
    }
    /**
     * Ustawia wartość BuzzerValue: 0 - Off, 1 - On
     * @param {BuzzerValueType} value
     */
    setBuzzerValue(value: BuzzerValueType): void {
        this.raw.set(PropertyType.BuzzerValue, value);
    }
}

export { Panel, PanelRaw, PanelRemote, BuzzerValueType }
