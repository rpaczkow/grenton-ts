// Created from: packages/grenton-api/interfaces/module_SMART_PANEL_FM_4_fv05_03.xml, object name="PANEL" version="05.03"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnGestureUp = 0,
    OnGestureDown = 1,
    OnGestureLeft = 2,
    OnGestureRight = 3,
    OnProximityDetect = 4,
    OnPageChange = 5,
    OnDisplayOn = 6,
    OnDisplayOff = 7,
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
    GestureMode = 15,
    GestureSens = 16,
    PageNr = 17,
    PageDisplayMode = 18,
    ButtonsLEDMode = 19,
    PageControlMode = 20,
    GestureDisplayMode = 21,
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
    SetBeep = 21,
    SetPageNr = 22,
    SetNextPage = 27,
    SetPrevPage = 28,
    Draw = 29,
    DrawBox = 30,
}

enum BuzzerValueType {
    Off = 0,
    On = 1,
}

enum GestureModeType {
    Off = 0,
    Vertical = 1,
    Horizontal = 2,
    VertHoriz = 3,
}

enum GestureSensType {
    Low = 1,
    Mid = 2,
    High = 3,
}

enum PageDisplayModeType {
    ShowImmediately = 0,
    ShowIconOrName = 1,
    ShowGesture = 2,
}

enum ButtonsLEDModeType {
    LocationLedOFF = 0,
    LocationLedON = 1,
    LocationLedONforActive = 2,
}

enum PageControlModeType {
    Command = 0,
    GestureCommand = 1,
}

enum GestureDisplayModeType {
    Off = 0,
    On = 1,
}

declare class PanelRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
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
     * Zdarzenie wywoływane w przypadku wykrycia zbliżającego się do wyświetlacza obiektu
     * @param callback
     */
    addOnProximityDetect: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w przypadku zmiany strony w panelu
     * @param callback
     */
    addOnPageChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w przypadku wybudzenia wyświetlacza
     * @param callback
     */
    addOnDisplayOn: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w przypadku wyłączenia wyświetlacza
     * @param callback
     */
    addOnDisplayOff: (callback: () => void) => void
    /** Wybudza wyświetlacz z trybu uśpienia */
    switchOnDisplay: () => void
    /** Zmienia tryb wyświetlania na 'buttons'. Czyści wyświetlacz i wyświetla ponownie ikony (lub tekst) dla wszystkich przycisków */
    showButtons: () => void
    /** Czyści zawartość wyświetlacza w trybie 'freedraw' */
    clearScreen: () => void
    /**
     * Wyświetla tekst w trybie 'freedraw'. x, y - współrzędne w pikselach; txt - tekst; fontSize - rozmiar czcionki (1: 10p, 2: 14p, 3: 32p)
     * @param {number} x
     * @param {number} y
     * @param {string} txt
     * @param {number} fontSize
     */
    printText: (x: number, y: number, txt: string, fontSize: number) => void
    /**
     * Wyświetla liczbę w trybie 'freedraw'. x, y - współrzędne w pikselach; number - wartość; precision - miejsca po przecinku; fontSize - rozmiar czcionki (1: 10p, 2: 14p, 3: 32p)
     * @param {number} x
     * @param {number} y
     * @param {number} number
     * @param {number} precision
     * @param {number} fontSize
     */
    printFloat: (x: number, y: number, number: number, precision: number, fontSize: number) => void
    /**
     * Rysuje linię w trybie 'freedraw'. x, y - współrzędne początkowe; xe, ye - końcowe; color - 0 czarny, 1 biały
     * @param {number} x
     * @param {number} y
     * @param {number} xe
     * @param {number} ye
     * @param {number} color
     */
    drawLine: (x: number, y: number, xe: number, ye: number, color: number) => void
    /**
     * Rysuje wypełniony prostokąt w trybie 'freedraw'. x, y - współrzędne; w - szerokość; h - wysokość; color - 0 czarny, 1 biały
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     * @param {number} color
     */
    drawBox: (x: number, y: number, w: number, h: number, color: number) => void
    /**
     * Rysuje punkt w trybie 'freedraw'. x, y - współrzędne w pikselach; color - 0 czarny, 1 biały
     * @param {number} x
     * @param {number} y
     * @param {number} color
     */
    drawPoint: (x: number, y: number, color: number) => void
    /**
     * Rysuje ikonę (bmp) w trybie 'freedraw'. x, y - współrzędne w pikselach; filename - nazwa ikony bez rozszerzenia
     * @param {number} x
     * @param {number} y
     * @param {string} filename
     */
    drawIcon: (x: number, y: number, filename: string) => void
    /** Wyświetla zawartość bufora pamięci graficznej. Zmienia tryb wyświetlania na 'freedraw' */
    displayContent: () => void
    /**
     * Generuje dźwięk o danej częstotliwości [Hz], czasie trwania [ms] i głośności
     * @param {number} frequency
     * @param {number} duration
     * @param {number} volume
     * @param {number} reserved
     */
    setBeep: (frequency: number, duration: number, volume: number, reserved: number) => void
    /**
     * Ustawia numer wyświetlanej strony
     * @param {number} nr
     */
    setPageNr: (nr: number) => void
    /** Wyświetla następną stronę */
    setNextPage: () => void
    /** Wyświetla poprzednią stronę */
    setPrevPage: () => void
    /** Wyzwala wywołanie zdarzenia OnDraw w przypadku gdy OLED jest aktywny */
    draw: () => void
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
    /** Czułość sensora zbliżeniowego (mniejsza wartość-większa czułość) */
    readonly proximitySens: number
    /**
     * Ustawia wartość ProximitySens
     * @param {number} value
     */
    setProximitySens: (value: number) => void
    /** Czas po jakim wyświetlacz zostanie wygaszony */
    readonly proximityTimeout: number
    /**
     * Ustawia czas w sekundach po jakim aktywuje się wygaszacz ekranu
     * @param {number} value
     */
    setProximityTimeout: (value: number) => void
    /** Sygnał sensora zbliżeniowego (wartość bezwymiarowa) */
    readonly proximityValue: number
    /** Sterowanie sygnalizacją dźwiękową: 0 - Off, 1 - On */
    readonly buzzerValue: BuzzerValueType
    /**
     * Sterowanie dźwiękiem (On/Off)
     * @param {BuzzerValueType} value
     */
    setBuzzerValue: (value: BuzzerValueType) => void
    /** Wybór orientacji gestów: 0 - Off, 1 - Vertical, 2 - Horizontal, 3 - Vert+Horiz */
    readonly gestureMode: GestureModeType
    /**
     * Wybór orientacji gestów
     * @param {GestureModeType} value
     */
    setGestureMode: (value: GestureModeType) => void
    /** Wybór czułości gestów: 1 - Low, 2 - Mid, 3 - High */
    readonly gestureSens: GestureSensType
    /**
     * Wybór czułości gestów
     * @param {GestureSensType} value
     */
    setGestureSens: (value: GestureSensType) => void
    /** Numer wyświetlanej aktualnie strony */
    pageNr: number
    /** Informacja przed zmianą strony: 0 - ShowImmediately, 1 - ShowIconOrName, 2 - ShowGesture */
    readonly pageDisplayMode: PageDisplayModeType
    /**
     * Ustawia tryb wyświetlania informacji przed zmianą strony
     * @param {PageDisplayModeType} value
     */
    setPageDisplayMode: (value: PageDisplayModeType) => void
    /** Lokalizacja przycisków za pomocą słabego światła LED: 0 - LocationLedOFF, 1 - LocationLedON, 2 - LocationLedONforActive */
    readonly buttonsLEDMode: ButtonsLEDModeType
    /**
     * Ustawia tryb lokalizacji przycisków za pomocą diod LED
     * @param {ButtonsLEDModeType} value
     */
    setButtonsLEDMode: (value: ButtonsLEDModeType) => void
    /** Źródło, które przełącza strony: 0 - Command, 1 - Gesture/Command */
    readonly pageControlMode: PageControlModeType
    /**
     * Ustawia źródło, które przełącza strony (komendy / gesty)
     * @param {PageControlModeType} value
     */
    setPageControlMode: (value: PageControlModeType) => void
    /** Wyświetlanie informacji o aktualnie wykonanym geście: 0 - Off, 1 - On */
    readonly gestureDisplayMode: GestureDisplayModeType
    /**
     * Ustawia tryb wyświetlania informacji o wykonanym geście
     * @param {GestureDisplayModeType} value
     */
    setGestureDisplayMode: (value: GestureDisplayModeType) => void
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
    addOnPageChange(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnDisplayOn(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnDisplayOff(_callback: () => void): void {
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
     * Wyświetla tekst w trybie 'freedraw'. x, y - współrzędne w pikselach; txt - tekst; fontSize - rozmiar czcionki (1: 10p, 2: 14p, 3: 32p)
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
     * Wyświetla liczbę w trybie 'freedraw'. x, y - współrzędne w pikselach; number - wartość; precision - miejsca po przecinku; fontSize - rozmiar czcionki (1: 10p, 2: 14p, 3: 32p)
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
     * Rysuje linię w trybie 'freedraw'. x, y - współrzędne początkowe; xe, ye - końcowe; color - 0 czarny, 1 biały
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
     * Rysuje wypełniony prostokąt w trybie 'freedraw'. x, y - współrzędne; w - szerokość; h - wysokość; color - 0 czarny, 1 biały
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     * @param {number} color
     */
    drawBox(x: number, y: number, w: number, h: number, color: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.DrawBox)
            .addParameter(x)
            .addParameter(y)
            .addParameter(w)
            .addParameter(h)
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
     * Rysuje ikonę (bmp) w trybie 'freedraw'. x, y - współrzędne w pikselach; filename - nazwa ikony bez rozszerzenia
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

    /**
     * Generuje dźwięk o danej częstotliwości [Hz], czasie trwania [ms] i głośności
     * @param {number} frequency
     * @param {number} duration
     * @param {number} volume
     * @param {number} reserved
     */
    setBeep(frequency: number, duration: number, volume: number, reserved: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SetBeep)
            .addParameter(frequency)
            .addParameter(duration)
            .addParameter(volume)
            .addParameter(reserved)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia numer wyświetlanej strony
     * @param {number} nr
     */
    setPageNr(nr: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SetPageNr)
            .addParameter(nr)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Wyświetla następną stronę */
    setNextPage(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SetNextPage)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Wyświetla poprzednią stronę */
    setPrevPage(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SetPrevPage)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Wyzwala wywołanie zdarzenia OnDraw w przypadku gdy OLED jest aktywny */
    draw(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Draw)
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
    setGestureIconRight(filename: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.GestureIconRight)
            .addParameter(filename)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Czułość sensora zbliżeniowego (mniejsza wartość-większa czułość) */
    get proximitySens(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ProximitySens)
            .build();
        return this.gate.runScript(cmd!);
    }
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
    setProximityTimeout(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ProximityTimeout)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Sygnał sensora zbliżeniowego (wartość bezwymiarowa) */
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
    setBuzzerValue(value: BuzzerValueType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.BuzzerValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Wybór orientacji gestów: 0 - Off, 1 - Vertical, 2 - Horizontal, 3 - Vert+Horiz */
    get gestureMode(): GestureModeType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.GestureMode)
            .build();
        return this.gate.runScript(cmd!);
    }
    setGestureMode(value: GestureModeType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.GestureMode)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Wybór czułości gestów: 1 - Low, 2 - Mid, 3 - High */
    get gestureSens(): GestureSensType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.GestureSens)
            .build();
        return this.gate.runScript(cmd!);
    }
    setGestureSens(value: GestureSensType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.GestureSens)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Numer wyświetlanej aktualnie strony */
    get pageNr(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.PageNr)
            .build();
        return this.gate.runScript(cmd!);
    }
    set pageNr(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.PageNr)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Informacja przed zmianą strony: 0 - ShowImmediately, 1 - ShowIconOrName, 2 - ShowGesture */
    get pageDisplayMode(): PageDisplayModeType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.PageDisplayMode)
            .build();
        return this.gate.runScript(cmd!);
    }
    setPageDisplayMode(value: PageDisplayModeType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.PageDisplayMode)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Lokalizacja przycisków za pomocą słabego światła LED: 0 - LocationLedOFF, 1 - LocationLedON, 2 - LocationLedONforActive */
    get buttonsLEDMode(): ButtonsLEDModeType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ButtonsLEDMode)
            .build();
        return this.gate.runScript(cmd!);
    }
    setButtonsLEDMode(value: ButtonsLEDModeType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ButtonsLEDMode)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Źródło, które przełącza strony: 0 - Command, 1 - Gesture/Command */
    get pageControlMode(): PageControlModeType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.PageControlMode)
            .build();
        return this.gate.runScript(cmd!);
    }
    setPageControlMode(value: PageControlModeType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.PageControlMode)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Wyświetlanie informacji o aktualnie wykonanym geście: 0 - Off, 1 - On */
    get gestureDisplayMode(): GestureDisplayModeType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.GestureDisplayMode)
            .build();
        return this.gate.runScript(cmd!);
    }
    setGestureDisplayMode(value: GestureDisplayModeType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.GestureDisplayMode)
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
    private onPageChangeCallbacks: Array<() => void> = [];
    private onDisplayOnCallbacks: Array<() => void> = [];
    private onDisplayOffCallbacks: Array<() => void> = [];

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
        this.raw.add_event(EventType.OnPageChange, () => {
            this.onPageChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnDisplayOn, () => {
            this.onDisplayOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnDisplayOff, () => {
            this.onDisplayOffCallbacks.forEach(callback => { callback(); });
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
     * Zdarzenie wywoływane w przypadku wykrycia zbliżającego się do wyświetlacza obiektu
     * @param callback
     */
    addOnProximityDetect(callback: () => void): void {
        this.onProximityDetectCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane w przypadku zmiany strony w panelu
     * @param callback
     */
    addOnPageChange(callback: () => void): void {
        this.onPageChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane w przypadku wybudzenia wyświetlacza
     * @param callback
     */
    addOnDisplayOn(callback: () => void): void {
        this.onDisplayOnCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane w przypadku wyłączenia wyświetlacza
     * @param callback
     */
    addOnDisplayOff(callback: () => void): void {
        this.onDisplayOffCallbacks.push(callback);
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
     * Wyświetla tekst w trybie 'freedraw'. x, y - współrzędne w pikselach; txt - tekst; fontSize - rozmiar czcionki (1: 10p, 2: 14p, 3: 32p)
     * @param {number} x
     * @param {number} y
     * @param {string} txt
     * @param {number} fontSize
     */
    printText(x: number, y: number, txt: string, fontSize: number): void {
        this.raw.execute(MethodType.PrintText, x, y, txt, fontSize);
    }
    /**
     * Wyświetla liczbę w trybie 'freedraw'. x, y - współrzędne w pikselach; number - wartość; precision - miejsca po przecinku; fontSize - rozmiar czcionki (1: 10p, 2: 14p, 3: 32p)
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
     * Rysuje linię w trybie 'freedraw'. x, y - współrzędne początkowe; xe, ye - końcowe; color - 0 czarny, 1 biały
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
     * Rysuje wypełniony prostokąt w trybie 'freedraw'. x, y - współrzędne; w - szerokość; h - wysokość; color - 0 czarny, 1 biały
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     * @param {number} color
     */
    drawBox(x: number, y: number, w: number, h: number, color: number): void {
        this.raw.execute(MethodType.DrawBox, x, y, w, h, color);
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
     * Rysuje ikonę (bmp) w trybie 'freedraw'. x, y - współrzędne w pikselach; filename - nazwa ikony bez rozszerzenia
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
    /**
     * Generuje dźwięk o danej częstotliwości [Hz], czasie trwania [ms] i głośności
     * @param {number} frequency
     * @param {number} duration
     * @param {number} volume
     * @param {number} reserved
     */
    setBeep(frequency: number, duration: number, volume: number, reserved: number): void {
        this.raw.execute(MethodType.SetBeep, frequency, duration, volume, reserved);
    }
    /**
     * Ustawia numer wyświetlanej strony
     * @param {number} nr
     */
    setPageNr(nr: number): void {
        this.raw.execute(MethodType.SetPageNr, nr);
    }
    /** Wyświetla następną stronę */
    setNextPage(): void {
        this.raw.execute(MethodType.SetNextPage);
    }
    /** Wyświetla poprzednią stronę */
    setPrevPage(): void {
        this.raw.execute(MethodType.SetPrevPage);
    }
    /** Wyzwala wywołanie zdarzenia OnDraw w przypadku gdy OLED jest aktywny */
    draw(): void {
        this.raw.execute(MethodType.Draw);
    }
    /** Nazwa pliku BMP z ikoną dla gestu Góra (bez rozszerzenia) */
    get gestureIconUp(): string {
        return this.raw.get(PropertyType.GestureIconUp);
    }
    setGestureIconUp(filename: string): void {
        this.raw.set(PropertyType.GestureIconUp, filename);
    }
    /** Nazwa pliku BMP z ikoną dla gestu Dół (bez rozszerzenia) */
    get gestureIconDown(): string {
        return this.raw.get(PropertyType.GestureIconDown);
    }
    setGestureIconDown(filename: string): void {
        this.raw.set(PropertyType.GestureIconDown, filename);
    }
    /** Nazwa pliku BMP z ikoną dla gestu Lewo (bez rozszerzenia) */
    get gestureIconLeft(): string {
        return this.raw.get(PropertyType.GestureIconLeft);
    }
    setGestureIconLeft(filename: string): void {
        this.raw.set(PropertyType.GestureIconLeft, filename);
    }
    /** Nazwa pliku BMP z ikoną dla gestu Prawo (bez rozszerzenia) */
    get gestureIconRight(): string {
        return this.raw.get(PropertyType.GestureIconRight);
    }
    setGestureIconRight(filename: string): void {
        this.raw.set(PropertyType.GestureIconRight, filename);
    }
    /** Czułość sensora zbliżeniowego (mniejsza wartość-większa czułość) */
    get proximitySens(): number {
        return this.raw.get(PropertyType.ProximitySens);
    }
    setProximitySens(value: number): void {
        this.raw.set(PropertyType.ProximitySens, value);
    }
    /** Czas po jakim wyświetlacz zostanie wygaszony */
    get proximityTimeout(): number {
        return this.raw.get(PropertyType.ProximityTimeout);
    }
    setProximityTimeout(value: number): void {
        this.raw.set(PropertyType.ProximityTimeout, value);
    }
    /** Sygnał sensora zbliżeniowego (wartość bezwymiarowa) */
    get proximityValue(): number {
        return this.raw.get(PropertyType.ProximityValue);
    }
    /** Sterowanie sygnalizacją dźwiękową: 0 - Off, 1 - On */
    get buzzerValue(): BuzzerValueType {
        return this.raw.get(PropertyType.BuzzerValue);
    }
    setBuzzerValue(value: BuzzerValueType): void {
        this.raw.set(PropertyType.BuzzerValue, value);
    }
    /** Wybór orientacji gestów: 0 - Off, 1 - Vertical, 2 - Horizontal, 3 - Vert+Horiz */
    get gestureMode(): GestureModeType {
        return this.raw.get(PropertyType.GestureMode);
    }
    setGestureMode(value: GestureModeType): void {
        this.raw.set(PropertyType.GestureMode, value);
    }
    /** Wybór czułości gestów: 1 - Low, 2 - Mid, 3 - High */
    get gestureSens(): GestureSensType {
        return this.raw.get(PropertyType.GestureSens);
    }
    setGestureSens(value: GestureSensType): void {
        this.raw.set(PropertyType.GestureSens, value);
    }
    /** Numer wyświetlanej aktualnie strony */
    get pageNr(): number {
        return this.raw.get(PropertyType.PageNr);
    }
    set pageNr(value: number) {
        this.raw.set(PropertyType.PageNr, value);
    }
    /** Informacja przed zmianą strony: 0 - ShowImmediately, 1 - ShowIconOrName, 2 - ShowGesture */
    get pageDisplayMode(): PageDisplayModeType {
        return this.raw.get(PropertyType.PageDisplayMode);
    }
    setPageDisplayMode(value: PageDisplayModeType): void {
        this.raw.set(PropertyType.PageDisplayMode, value);
    }
    /** Lokalizacja przycisków za pomocą słabego światła LED: 0 - LocationLedOFF, 1 - LocationLedON, 2 - LocationLedONforActive */
    get buttonsLEDMode(): ButtonsLEDModeType {
        return this.raw.get(PropertyType.ButtonsLEDMode);
    }
    setButtonsLEDMode(value: ButtonsLEDModeType): void {
        this.raw.set(PropertyType.ButtonsLEDMode, value);
    }
    /** Źródło, które przełącza strony: 0 - Command, 1 - Gesture/Command */
    get pageControlMode(): PageControlModeType {
        return this.raw.get(PropertyType.PageControlMode);
    }
    setPageControlMode(value: PageControlModeType): void {
        this.raw.set(PropertyType.PageControlMode, value);
    }
    /** Wyświetlanie informacji o aktualnie wykonanym geście: 0 - Off, 1 - On */
    get gestureDisplayMode(): GestureDisplayModeType {
        return this.raw.get(PropertyType.GestureDisplayMode);
    }
    setGestureDisplayMode(value: GestureDisplayModeType): void {
        this.raw.set(PropertyType.GestureDisplayMode, value);
    }
}

export {
    Panel, PanelRaw, PanelRemote,
    BuzzerValueType, GestureModeType, GestureSensType,
    PageDisplayModeType, ButtonsLEDModeType, PageControlModeType, GestureDisplayModeType
}
