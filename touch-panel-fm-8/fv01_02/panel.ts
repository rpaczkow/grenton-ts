// Created from: packages/grenton-api/interfaces/module_2_0_TOUCH_PANEL_FM_8_fv01_02.xml, object name="PANEL" version="01.02"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum PropertyType {
    BuzzerValue = 13,
}

enum BuzzerValueType {
    Off = 0,
    On = 1,
}

declare class PanelRaw {
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
}

interface IPanel {
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
    constructor(private raw: PanelRaw) {
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
