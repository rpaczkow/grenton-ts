// Created from: src/interfaces/module_2_0_RS232_CONTROLLER_DIN_fv01_02.xml, object name="RS232_CONTROLLER"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum RepresentationType {
    HEX = 0,
    ASCII = 1,
}

enum StopBitsType {
    One = 0,
    OnePointFive = 1,
    Two = 2,
}

enum ParityType {
    None = 0,
    Odd = 1,
    Even = 2,
}

enum EventType {
    OnReceive = 0,
    OnTransmit = 1,
    OnResponseTimeout = 2,
    OnOverflow = 4,
    OnTransmitError = 5,
}

enum PropertyType {
    RepresentationType = 0,
    BaudRate = 1,
    WordLenght = 2,
    StopBits = 3,
    Parity = 4,
    TxBuffer = 5,
    RxBuffer = 6,
    ResponseSize = 7,
    ResponseTimeout = 8,
}

enum MethodType {
    SetRepresentationType = 0,
    ClearRxBuffer = 0,
    SetBaudRate = 1,
    ClearTxBuffer = 1,
    SetWordLenght = 2,
    SendTxBuffer = 2,
    SetStopBits = 3,
    AddToTxBuffer = 3,
    SetParity = 4,
    SetResponseSize = 7,
    SetResponseTimeout = 8,
}

declare class Rs232ControllerRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): void;
}

interface IRs232Controller {
    /**
     * Zdarzenie wywoływane, kiedy kontroler odebrał dane. Jeśli rozmiar otrzymanych danych jest mniejszy niż ResponseSize, zdarzenie zostanie wygenerowane po uzbieraniu danych w buforze odbiorczym. Ustawienie ResponseSize=0 powoduje brak generowania zdarzenia
     * @param callback
     */
    addOnReceive: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane kiedy kontroler wysyła dane
     * @param callback
     */
    addOnTransmit: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane kiedy został przekroczony czas odpowiedzi
     * @param callback
     */
    addOnResponseTimeout: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w momencie przepełnienia bufora odbiorczego
     * @param callback
     */
    addOnOverflow: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w momencie niepoprawnego wysłania danych
     * @param callback
     */
    addOnTransmitError: (callback: () => void) => void
    /** Typ reprezentacji danych */
    representationType: RepresentationType
    /**
     * Ustawia typ reprezentacji danych
     * @param {RepresentationType} type
     */
    setRepresentationType: (type: RepresentationType) => void
    /** Prędkość transmisji */
    baudRate: number
    /**
     * Ustawia prędkość transmisji
     * @param {number} baudRate
     */
    setBaudRate: (baudRate: number) => void
    /** Długość słowa */
    wordLenght: number
    /**
     * Ustawia długość słowa
     * @param {number} wordLength
     */
    setWordLenght: (wordLength: number) => void
    /** Bity stopu:&#13; 0 - 1 bit stopu&#13; 1 - 1.5 bitu stopu&#13; 2 - 2 bity stopu */
    stopBits: StopBitsType
    /**
     * Ustawia liczbę bitów stopu
     * @param {StopBitsType} stopBits
     */
    setStopBits: (stopBits: StopBitsType) => void
    /** Bit parzystości:&#13; 0 - None&#13; 1 - Odd&#13; 2 - Even */
    parity: ParityType
    /**
     * Ustawia kontrolę parzystości
     * @param {ParityType} parity
     */
    setParity: (parity: ParityType) => void
    /** Bufor nadawczy. Czyszczony automatycznie po wysłaniu metody SendTxBuffer */
    readonly txBuffer: string
    /** Bufor odbiorczy. Dane przychodzące są dodawane do buforu. Po odczytaniu danych należy wyczyścić bufor metodą ClearRxBuffer */
    readonly rxBuffer: string
    /** Rozmiar spodziewanej odpowiedzi określany minimalną liczbą bajtów w buforze odbiorczym, dla której ma zostać wygenerowane zdarzenie OnReceive. Ustawienie 0 powoduje brak generowania zdarzenia */
    responseSize: number
    /**
     * Ustawia długość spodziewanej odpowiedzi
     * @param {number} size
     */
    setResponseSize: (size: number) => void
    /** Czas oczekiwania na odpowiedź */
    responseTimeout: number
    /**
     * Ustawia czas oczekiwania na odpowiedź
     * @param {number} time
     */
    setResponseTimeout: (time: number) => void
    /**
     * Dodaje dane do buforu nadawczego
     * @param {string} tx
     */
    addToTxBuffer: (tx: string) => void
    /**
     * Czyści bufor odbiorczy
     * @param {number} size
     */
    clearRxBuffer: (size: number) => void
    /**
     * Czyści bufor nadawczy
     * @param {number} size
     */
    clearTxBuffer: (size: number) => void
    /**
     * Wysyła bufor nadawczy
     * @param {number} endLineCharacter
     */
    sendTxBuffer: (endLineCharacter: number) => void
}

class Rs232Controller implements IRs232Controller {
    private onReceiveCallbacks: Array<() => void> = [];
    private onTransmitCallbacks: Array<() => void> = [];
    private onResponseTimeoutCallbacks: Array<() => void> = [];
    private onOverflowCallbacks: Array<() => void> = [];
    private onTransmitErrorCallbacks: Array<() => void> = [];

    constructor(private raw: Rs232ControllerRaw) {
        this.raw.add_event(EventType.OnReceive, () => {
            this.onReceiveCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnTransmit, () => {
            this.onTransmitCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnResponseTimeout, () => {
            this.onResponseTimeoutCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnOverflow, () => {
            this.onOverflowCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnTransmitError, () => {
            this.onTransmitErrorCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnReceive(callback: () => void): void {
        this.onReceiveCallbacks.push(callback);
    }
    addOnTransmit(callback: () => void): void {
        this.onTransmitCallbacks.push(callback);
    }
    addOnResponseTimeout(callback: () => void): void {
        this.onResponseTimeoutCallbacks.push(callback);
    }
    addOnOverflow(callback: () => void): void {
        this.onOverflowCallbacks.push(callback);
    }
    addOnTransmitError(callback: () => void): void {
        this.onTransmitErrorCallbacks.push(callback);
    }
    get representationType(): RepresentationType {
        return this.raw.get(PropertyType.RepresentationType);
    }
    set representationType(type: RepresentationType) {
        this.raw.set(PropertyType.RepresentationType, type);
    }
    setRepresentationType(type: RepresentationType): void {
        this.raw.set(PropertyType.RepresentationType, type);
    }
    get baudRate(): number {
        return this.raw.get(PropertyType.BaudRate);
    }
    set baudRate(baudRate: number) {
        this.raw.set(PropertyType.BaudRate, baudRate);
    }
    setBaudRate(baudRate: number): void {
        this.raw.set(PropertyType.BaudRate, baudRate);
    }
    get wordLenght(): number {
        return this.raw.get(PropertyType.WordLenght);
    }
    set wordLenght(wordLength: number) {
        this.raw.set(PropertyType.WordLenght, wordLength);
    }
    setWordLenght(wordLength: number): void {
        this.raw.set(PropertyType.WordLenght, wordLength);
    }
    get stopBits(): StopBitsType {
        return this.raw.get(PropertyType.StopBits);
    }
    set stopBits(stopBits: StopBitsType) {
        this.raw.set(PropertyType.StopBits, stopBits);
    }
    setStopBits(stopBits: StopBitsType): void {
        this.raw.set(PropertyType.StopBits, stopBits);
    }
    get parity(): ParityType {
        return this.raw.get(PropertyType.Parity);
    }
    set parity(parity: ParityType) {
        this.raw.set(PropertyType.Parity, parity);
    }
    setParity(parity: ParityType): void {
        this.raw.set(PropertyType.Parity, parity);
    }
    get txBuffer(): string {
        return this.raw.get(PropertyType.TxBuffer);
    }
    get rxBuffer(): string {
        return this.raw.get(PropertyType.RxBuffer);
    }
    get responseSize(): number {
        return this.raw.get(PropertyType.ResponseSize);
    }
    set responseSize(size: number) {
        this.raw.set(PropertyType.ResponseSize, size);
    }
    setResponseSize(size: number): void {
        this.raw.set(PropertyType.ResponseSize, size);
    }
    get responseTimeout(): number {
        return this.raw.get(PropertyType.ResponseTimeout);
    }
    set responseTimeout(time: number) {
        this.raw.set(PropertyType.ResponseTimeout, time);
    }
    setResponseTimeout(time: number): void {
        this.raw.set(PropertyType.ResponseTimeout, time);
    }
    addToTxBuffer(tx: string): void {
        this.raw.execute(MethodType.AddToTxBuffer, tx);
    }
    clearRxBuffer(size: number): void {
        this.raw.execute(MethodType.ClearRxBuffer, size);
    }
    clearTxBuffer(size: number): void {
        this.raw.execute(MethodType.ClearTxBuffer, size);
    }
    sendTxBuffer(endLineCharacter: number): void {
        this.raw.execute(MethodType.SendTxBuffer, endLineCharacter);
    }
}

class Rs232ControllerRemote implements IRs232Controller {
    constructor(private objectName: string, private gate: RemoteGate) {
    }

    addOnReceive(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnTransmit(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnResponseTimeout(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnOverflow(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnTransmitError(_callback: () => void): void {
        // Remote events are not supported
    }

    get representationType(): RepresentationType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.RepresentationType)
            .build();
        return this.gate.runScript(cmd!);
    }
    set representationType(type: RepresentationType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RepresentationType)
            .addParameter(type)
            .build();
        this.gate.runScript(cmd!);
    }
    setRepresentationType(type: RepresentationType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RepresentationType)
            .addParameter(type)
            .build();
        this.gate.runScript(cmd!);
    }
    get baudRate(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.BaudRate)
            .build();
        return this.gate.runScript(cmd!);
    }
    set baudRate(baudRate: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.BaudRate)
            .addParameter(baudRate)
            .build();
        this.gate.runScript(cmd!);
    }
    setBaudRate(baudRate: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.BaudRate)
            .addParameter(baudRate)
            .build();
        this.gate.runScript(cmd!);
    }
    get wordLenght(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.WordLenght)
            .build();
        return this.gate.runScript(cmd!);
    }
    set wordLenght(wordLength: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.WordLenght)
            .addParameter(wordLength)
            .build();
        this.gate.runScript(cmd!);
    }
    setWordLenght(wordLength: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.WordLenght)
            .addParameter(wordLength)
            .build();
        this.gate.runScript(cmd!);
    }
    get stopBits(): StopBitsType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.StopBits)
            .build();
        return this.gate.runScript(cmd!);
    }
    set stopBits(stopBits: StopBitsType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StopBits)
            .addParameter(stopBits)
            .build();
        this.gate.runScript(cmd!);
    }
    setStopBits(stopBits: StopBitsType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StopBits)
            .addParameter(stopBits)
            .build();
        this.gate.runScript(cmd!);
    }
    get parity(): ParityType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Parity)
            .build();
        return this.gate.runScript(cmd!);
    }
    set parity(parity: ParityType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Parity)
            .addParameter(parity)
            .build();
        this.gate.runScript(cmd!);
    }
    setParity(parity: ParityType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Parity)
            .addParameter(parity)
            .build();
        this.gate.runScript(cmd!);
    }
    get txBuffer(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.TxBuffer)
            .build();
        return this.gate.runScript(cmd!);
    }
    get rxBuffer(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.RxBuffer)
            .build();
        return this.gate.runScript(cmd!);
    }
    get responseSize(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ResponseSize)
            .build();
        return this.gate.runScript(cmd!);
    }
    set responseSize(size: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ResponseSize)
            .addParameter(size)
            .build();
        this.gate.runScript(cmd!);
    }
    setResponseSize(size: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ResponseSize)
            .addParameter(size)
            .build();
        this.gate.runScript(cmd!);
    }
    get responseTimeout(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ResponseTimeout)
            .build();
        return this.gate.runScript(cmd!);
    }
    set responseTimeout(time: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ResponseTimeout)
            .addParameter(time)
            .build();
        this.gate.runScript(cmd!);
    }
    setResponseTimeout(time: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ResponseTimeout)
            .addParameter(time)
            .build();
        this.gate.runScript(cmd!);
    }
    addToTxBuffer(tx: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.AddToTxBuffer)
            .addParameter(tx)
            .build();
        this.gate.runScript(cmd!);
    }
    clearRxBuffer(size: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.ClearRxBuffer)
            .addParameter(size)
            .build();
        this.gate.runScript(cmd!);
    }
    clearTxBuffer(size: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.ClearTxBuffer)
            .addParameter(size)
            .build();
        this.gate.runScript(cmd!);
    }
    sendTxBuffer(endLineCharacter: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SendTxBuffer)
            .addParameter(endLineCharacter)
            .build();
        this.gate.runScript(cmd!);
    }
}

export { Rs232Controller, Rs232ControllerRaw, Rs232ControllerRemote, RepresentationType, StopBitsType, ParityType }
