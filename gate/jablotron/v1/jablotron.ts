// Created from: packages/grenton-api/interfaces/object_jablotron_v1.xml, object name="Jablotron" version="1"

import { rawExecutionBuilderFactory } from "../../../core/execution-builder"
import { RemoteGate } from "../../../core/remote-gate"

enum PropertyType {
    AdminCode = 0,
    UpdatePeriod = 1
}

declare class JablotronRaw {
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: never, ...args: any[]): any;
}

interface IJablotron {
    /** Kod dostępu administratora */
    adminCode: string
    /** Okres aktualizacji stanu centralki */
    updatePeriod: number
}

class Jablotron implements IJablotron {
    constructor(private raw: JablotronRaw) {
    }

    /**
     * Kod dostępu administratora
     * @returns {string}
     */
    get adminCode(): string {
        return this.raw.get(PropertyType.AdminCode);
    }
    set adminCode(value: string) {
        this.raw.set(PropertyType.AdminCode, value);
    }
    /**
     * Okres aktualizacji stanu centralki
     * @returns {number}
     */
    get updatePeriod(): number {
        return this.raw.get(PropertyType.UpdatePeriod);
    }
    set updatePeriod(value: number) {
        this.raw.set(PropertyType.UpdatePeriod, value);
    }
}

class JablotronRemote implements IJablotron {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Kod dostępu administratora
     * @returns {string}
     */
    get adminCode(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.AdminCode)
            .build();
        return this.gate.runScript(cmd!);
    }

    set adminCode(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.AdminCode)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Okres aktualizacji stanu centralki
     * @returns {number}
     */
    get updatePeriod(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.UpdatePeriod)
            .build();
        return this.gate.runScript(cmd!);
    }

    set updatePeriod(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.UpdatePeriod)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export {
    Jablotron, JablotronRaw, JablotronRemote
}
