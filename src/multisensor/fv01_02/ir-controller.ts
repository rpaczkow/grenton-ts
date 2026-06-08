// Created from: src/interfaces/module_2_0_MULTISENSOR_fv01_02.xml, object name="IR_CONTROLLER"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnIrSend = 0,
    OnLearningStatusChange = 1,
    OnLearningOK = 2,
    OnLearning = 3,
    OnLearningFail = 4,
}

enum PropertyType {
    SavedCodes = 2,
}

enum MethodType {
    SendCode = 0,
    LearnCode = 1,
    EraseFlash = 2,
    EraseCode = 3,
}

declare class IrControllerRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): void;
}

interface IIrController {
    /**
     * Zdarzenie wywoływane w momencie wysłania kodu IR
     * @param callback
     */
    addOnIrSend: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w momencie zmiany statusu trybu uczenia kodu IR
     * @param callback
     */
    addOnLearningStatusChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w momencie zmiany statusu trybu uczenia kodu IR na "OK"
     * @param callback
     */
    addOnLearningOK: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w momencie zmiany statusu trybu uczenia kodu IR na "Learning"
     * @param callback
     */
    addOnLearning: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w momencie zmiany statusu trybu uczenia kodu IR na "Learning Fail"
     * @param callback
     */
    addOnLearningFail: (callback: () => void) => void
    /** Liczba zapisanych kodów w pamięci Flash */
    readonly savedCodes: number
    /**
     * Wysyła kod IR zapisany pod indeksem CodeNumber sygnalizując fakt zieloną diodą. Dioda czerwona sygnalizuje brak zapisanego kodu
     * @param {number} codeNumber
     */
    sendCode: (codeNumber: number) => void
    /**
     * Wywołuje tryb uczenia kodu IR pod indeksem CodeNumber
     * @param {number} codeNumber
     */
    learnCode: (codeNumber: number) => void
    /**
     * Kasuje kod IR zapisany pod indeksem CodeNumber
     * @param {number} codeNumber
     */
    eraseCode: (codeNumber: number) => void
    /**
     * Kasowanie wszystkich kodów IR zapisanych w pamięci Flash
     * @param {number} state
     */
    eraseFlash: (state?: number) => void
}

class IrController implements IIrController {
    private onIrSendCallbacks: Array<() => void> = [];
    private onLearningStatusChangeCallbacks: Array<() => void> = [];
    private onLearningOKCallbacks: Array<() => void> = [];
    private onLearningCallbacks: Array<() => void> = [];
    private onLearningFailCallbacks: Array<() => void> = [];

    constructor(private raw: IrControllerRaw) {
        this.raw.add_event(EventType.OnIrSend, () => {
            this.onIrSendCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLearningStatusChange, () => {
            this.onLearningStatusChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLearningOK, () => {
            this.onLearningOKCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLearning, () => {
            this.onLearningCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLearningFail, () => {
            this.onLearningFailCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnIrSend(callback: () => void): void {
        this.onIrSendCallbacks.push(callback);
    }
    addOnLearningStatusChange(callback: () => void): void {
        this.onLearningStatusChangeCallbacks.push(callback);
    }
    addOnLearningOK(callback: () => void): void {
        this.onLearningOKCallbacks.push(callback);
    }
    addOnLearning(callback: () => void): void {
        this.onLearningCallbacks.push(callback);
    }
    addOnLearningFail(callback: () => void): void {
        this.onLearningFailCallbacks.push(callback);
    }
    get savedCodes(): number {
        return this.raw.get(PropertyType.SavedCodes);
    }
    sendCode(codeNumber: number): void {
        this.raw.execute(MethodType.SendCode, codeNumber);
    }
    learnCode(codeNumber: number): void {
        this.raw.execute(MethodType.LearnCode, codeNumber);
    }
    eraseCode(codeNumber: number): void {
        this.raw.execute(MethodType.EraseCode, codeNumber);
    }
    eraseFlash(state: number = 0): void {
        this.raw.execute(MethodType.EraseFlash, state);
    }
}

class IrControllerRemote implements IIrController {
    constructor(private objectName: string, private gate: RemoteGate) {
    }

    addOnIrSend(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnLearningStatusChange(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnLearningOK(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnLearning(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnLearningFail(_callback: () => void): void {
        // Remote events are not supported
    }

    get savedCodes(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SavedCodes)
            .build();
        return this.gate.runScript(cmd!);
    }
    sendCode(codeNumber: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SendCode)
            .addParameter(codeNumber)
            .build();
        this.gate.runScript(cmd!);
    }
    learnCode(codeNumber: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.LearnCode)
            .addParameter(codeNumber)
            .build();
        this.gate.runScript(cmd!);
    }
    eraseCode(codeNumber: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.EraseCode)
            .addParameter(codeNumber)
            .build();
        this.gate.runScript(cmd!);
    }
    eraseFlash(state: number = 0): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.EraseFlash)
            .addParameter(state)
            .build();
        this.gate.runScript(cmd!);
    }
}

export { IrController, IrControllerRaw, IrControllerRemote }
