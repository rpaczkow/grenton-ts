// Created from: packages/grenton-api/interfaces/object_denonmarantzavr_v1.xml, object name="DenonMarantzAVR" version="1"

import { rawExecutionBuilderFactory } from "../../../core/execution-builder"
import { RemoteGate } from "../../../core/remote-gate"

enum EventType {
    OnConnected = 0,
    OnDisconnected = 1,
    OnChange = 2,
    OnMuteChange = 3,
    OnVolumeChange = 4,
    OnSystemPowerChange = 5,
    OnZonePowerChange = 6,
    OnInputChange = 7,
    OnSurroundModeChange = 8,
    OnSpeakerPresetChange = 9
}

enum PropertyType {
    Host = 0,
    Zone = 1,
    Status = 2,
    SystemPower = 3,
    ZonePower = 4,
    Volume = 5,
    Mute = 6,
    Input = 7,
    SurroundMode = 8,
    SpeakerPreset = 9
}

enum MethodType {
    VolumeUp = 0,
    VolumeDown = 1,
    SwitchMute = 2,
    QuickSelect = 3
}

enum ZoneType {
    Main = 1,
    Zone2 = 2,
    Zone3 = 3
}

enum SystemPowerType {
    Standby = 0,
    On = 1
}

enum ZonePowerType {
    Off = 0,
    On = 1
}

enum MuteType {
    Off = 0,
    On = 1
}

declare class DenonMarantzAVRRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IDenonMarantzAVR {
    /**
     * Zdarzenie wywoływane po nawiązaniu połączenia z amplitunerem
     * @param callback
     */
    addOnConnected: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zerwaniu połączenia z amplitunerem
     * @param callback
     */
    addOnDisconnected: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości SystemPower, ZonePower, Volume, Mute, Input, SurroundMode lub SpeakerPreset
     * @param callback
     */
    addOnChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości Mute
     * @param callback
     */
    addOnMuteChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości Volume
     * @param callback
     */
    addOnVolumeChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości SystemPower
     * @param callback
     */
    addOnSystemPowerChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości ZonePower
     * @param callback
     */
    addOnZonePowerChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości Input
     * @param callback
     */
    addOnInputChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości SurroundMode
     * @param callback
     */
    addOnSurroundModeChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości SpeakerPreset
     * @param callback
     */
    addOnSpeakerPresetChange: (callback: () => void) => void
    /**
     * Zwiększa głośność o wartość określoną w procentach
     * @param {number} volumeStep
     */
    volumeUp: (volumeStep: number) => void
    /**
     * Zmniejsza głośność o wartość określoną w procentach
     * @param {number} volumeStep
     */
    volumeDown: (volumeStep: number) => void
    /** Przełącza stan wyciszenia */
    switchMute: () => void
    /**
     * Wybiera ustawienia Quick Select
     * @param {number} id
     */
    quickSelect: (id: number) => void
    /** Adres IP amplitunera AV */
    host: string
    /** Strefa amplitunera AV */
    zone: ZoneType
    /** Stan komunikacji z głośnikiem: 0 - brak połączenia, 1 - połączono */
    readonly status: number
    /** Stan zasilania systemu: 0 - uśpienie, 1 - włączone */
    systemPower: SystemPowerType
    /** Stan zasilania strefy: 0 - wyłączone, 1 - włączone */
    zonePower: ZonePowerType
    /** Głośność w zakresie od 0% do 98% */
    volume: number
    /** Stan wyciszenia: 0 - wyłączone, 1 - włączone */
    mute: MuteType
    /** Źródło sygnału */
    input: string
    /** Tryb dźwięku przestrzennego */
    surroundMode: string
    /** Preset głośników */
    speakerPreset: number
}

class DenonMarantzAVR implements IDenonMarantzAVR {
    private onConnectedCallbacks: Array<() => void> = [];
    private onDisconnectedCallbacks: Array<() => void> = [];
    private onChangeCallbacks: Array<() => void> = [];
    private onMuteChangeCallbacks: Array<() => void> = [];
    private onVolumeChangeCallbacks: Array<() => void> = [];
    private onSystemPowerChangeCallbacks: Array<() => void> = [];
    private onZonePowerChangeCallbacks: Array<() => void> = [];
    private onInputChangeCallbacks: Array<() => void> = [];
    private onSurroundModeChangeCallbacks: Array<() => void> = [];
    private onSpeakerPresetChangeCallbacks: Array<() => void> = [];

    constructor(private raw: DenonMarantzAVRRaw) {
        this.raw.add_event(EventType.OnConnected, () => {
            this.onConnectedCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnDisconnected, () => {
            this.onDisconnectedCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnMuteChange, () => {
            this.onMuteChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnVolumeChange, () => {
            this.onVolumeChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSystemPowerChange, () => {
            this.onSystemPowerChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnZonePowerChange, () => {
            this.onZonePowerChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnInputChange, () => {
            this.onInputChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSurroundModeChange, () => {
            this.onSurroundModeChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSpeakerPresetChange, () => {
            this.onSpeakerPresetChangeCallbacks.forEach(callback => { callback(); });
        });
    }

    /**
     * Zdarzenie wywoływane po nawiązaniu połączenia z amplitunerem
     * @param callback
     */
    addOnConnected(callback: () => void): void {
        this.onConnectedCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zerwaniu połączenia z amplitunerem
     * @param callback
     */
    addOnDisconnected(callback: () => void): void {
        this.onDisconnectedCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości SystemPower, ZonePower, Volume, Mute, Input, SurroundMode lub SpeakerPreset
     * @param callback
     */
    addOnChange(callback: () => void): void {
        this.onChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Mute
     * @param callback
     */
    addOnMuteChange(callback: () => void): void {
        this.onMuteChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Volume
     * @param callback
     */
    addOnVolumeChange(callback: () => void): void {
        this.onVolumeChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości SystemPower
     * @param callback
     */
    addOnSystemPowerChange(callback: () => void): void {
        this.onSystemPowerChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości ZonePower
     * @param callback
     */
    addOnZonePowerChange(callback: () => void): void {
        this.onZonePowerChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Input
     * @param callback
     */
    addOnInputChange(callback: () => void): void {
        this.onInputChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości SurroundMode
     * @param callback
     */
    addOnSurroundModeChange(callback: () => void): void {
        this.onSurroundModeChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości SpeakerPreset
     * @param callback
     */
    addOnSpeakerPresetChange(callback: () => void): void {
        this.onSpeakerPresetChangeCallbacks.push(callback);
    }
    /**
     * Zwiększa głośność o wartość określoną w procentach
     * @param {number} volumeStep
     */
    volumeUp(volumeStep: number): void {
        this.raw.execute(MethodType.VolumeUp, volumeStep);
    }
    /**
     * Zmniejsza głośność o wartość określoną w procentach
     * @param {number} volumeStep
     */
    volumeDown(volumeStep: number): void {
        this.raw.execute(MethodType.VolumeDown, volumeStep);
    }
    /** Przełącza stan wyciszenia */
    switchMute(): void {
        this.raw.execute(MethodType.SwitchMute);
    }
    /**
     * Wybiera ustawienia Quick Select
     * @param {number} id
     */
    quickSelect(id: number): void {
        this.raw.execute(MethodType.QuickSelect, id);
    }
    /**
     * Adres IP amplitunera AV
     * @returns {string}
     */
    get host(): string {
        return this.raw.get(PropertyType.Host);
    }
    set host(value: string) {
        this.raw.set(PropertyType.Host, value);
    }
    /**
     * Strefa amplitunera AV
     * @returns {ZoneType}
     */
    get zone(): ZoneType {
        return this.raw.get(PropertyType.Zone);
    }
    set zone(value: ZoneType) {
        this.raw.set(PropertyType.Zone, value);
    }
    /**
     * Stan komunikacji z głośnikiem: 0 - brak połączenia, 1 - połączono
     * @returns {number}
     */
    get status(): number {
        return this.raw.get(PropertyType.Status);
    }
    /**
     * Stan zasilania systemu: 0 - uśpienie, 1 - włączone
     * @returns {SystemPowerType}
     */
    get systemPower(): SystemPowerType {
        return this.raw.get(PropertyType.SystemPower);
    }
    set systemPower(value: SystemPowerType) {
        this.raw.set(PropertyType.SystemPower, value);
    }
    /**
     * Stan zasilania strefy: 0 - wyłączone, 1 - włączone
     * @returns {ZonePowerType}
     */
    get zonePower(): ZonePowerType {
        return this.raw.get(PropertyType.ZonePower);
    }
    set zonePower(value: ZonePowerType) {
        this.raw.set(PropertyType.ZonePower, value);
    }
    /**
     * Głośność w zakresie od 0% do 98%
     * @returns {number}
     */
    get volume(): number {
        return this.raw.get(PropertyType.Volume);
    }
    set volume(value: number) {
        this.raw.set(PropertyType.Volume, value);
    }
    /**
     * Stan wyciszenia: 0 - wyłączone, 1 - włączone
     * @returns {MuteType}
     */
    get mute(): MuteType {
        return this.raw.get(PropertyType.Mute);
    }
    set mute(value: MuteType) {
        this.raw.set(PropertyType.Mute, value);
    }
    /**
     * Źródło sygnału
     * @returns {string}
     */
    get input(): string {
        return this.raw.get(PropertyType.Input);
    }
    set input(value: string) {
        this.raw.set(PropertyType.Input, value);
    }
    /**
     * Tryb dźwięku przestrzennego
     * @returns {string}
     */
    get surroundMode(): string {
        return this.raw.get(PropertyType.SurroundMode);
    }
    set surroundMode(value: string) {
        this.raw.set(PropertyType.SurroundMode, value);
    }
    /**
     * Preset głośników
     * @returns {number}
     */
    get speakerPreset(): number {
        return this.raw.get(PropertyType.SpeakerPreset);
    }
    set speakerPreset(value: number) {
        this.raw.set(PropertyType.SpeakerPreset, value);
    }
}

class DenonMarantzAVRRemote implements IDenonMarantzAVR {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane po nawiązaniu połączenia z amplitunerem
     * @param callback
     */
    addOnConnected(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zerwaniu połączenia z amplitunerem
     * @param callback
     */
    addOnDisconnected(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości SystemPower, ZonePower, Volume, Mute, Input, SurroundMode lub SpeakerPreset
     * @param callback
     */
    addOnChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Mute
     * @param callback
     */
    addOnMuteChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Volume
     * @param callback
     */
    addOnVolumeChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości SystemPower
     * @param callback
     */
    addOnSystemPowerChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości ZonePower
     * @param callback
     */
    addOnZonePowerChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Input
     * @param callback
     */
    addOnInputChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości SurroundMode
     * @param callback
     */
    addOnSurroundModeChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości SpeakerPreset
     * @param callback
     */
    addOnSpeakerPresetChange(_callback: () => void): void {
        // Remote events are not supported
    }

    /**
     * Zwiększa głośność o wartość określoną w procentach
     * @param {number} volumeStep
     */
    volumeUp(volumeStep: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.VolumeUp)
            .addParameter(volumeStep)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Zmniejsza głośność o wartość określoną w procentach
     * @param {number} volumeStep
     */
    volumeDown(volumeStep: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.VolumeDown)
            .addParameter(volumeStep)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Przełącza stan wyciszenia */
    switchMute(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SwitchMute)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Wybiera ustawienia Quick Select
     * @param {number} id
     */
    quickSelect(id: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.QuickSelect)
            .addParameter(id)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Adres IP amplitunera AV
     * @returns {string}
     */
    get host(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Host)
            .build();
        return this.gate.runScript(cmd!);
    }

    set host(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Host)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Strefa amplitunera AV
     * @returns {ZoneType}
     */
    get zone(): ZoneType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Zone)
            .build();
        return this.gate.runScript(cmd!);
    }

    set zone(value: ZoneType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Zone)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Stan komunikacji z głośnikiem: 0 - brak połączenia, 1 - połączono
     * @returns {number}
     */
    get status(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Status)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Stan zasilania systemu: 0 - uśpienie, 1 - włączone
     * @returns {SystemPowerType}
     */
    get systemPower(): SystemPowerType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SystemPower)
            .build();
        return this.gate.runScript(cmd!);
    }

    set systemPower(value: SystemPowerType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.SystemPower)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Stan zasilania strefy: 0 - wyłączone, 1 - włączone
     * @returns {ZonePowerType}
     */
    get zonePower(): ZonePowerType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ZonePower)
            .build();
        return this.gate.runScript(cmd!);
    }

    set zonePower(value: ZonePowerType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ZonePower)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Głośność w zakresie od 0% do 98%
     * @returns {number}
     */
    get volume(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Volume)
            .build();
        return this.gate.runScript(cmd!);
    }

    set volume(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Volume)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Stan wyciszenia: 0 - wyłączone, 1 - włączone
     * @returns {MuteType}
     */
    get mute(): MuteType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Mute)
            .build();
        return this.gate.runScript(cmd!);
    }

    set mute(value: MuteType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Mute)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Źródło sygnału
     * @returns {string}
     */
    get input(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Input)
            .build();
        return this.gate.runScript(cmd!);
    }

    set input(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Input)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Tryb dźwięku przestrzennego
     * @returns {string}
     */
    get surroundMode(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SurroundMode)
            .build();
        return this.gate.runScript(cmd!);
    }

    set surroundMode(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.SurroundMode)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Preset głośników
     * @returns {number}
     */
    get speakerPreset(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SpeakerPreset)
            .build();
        return this.gate.runScript(cmd!);
    }

    set speakerPreset(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.SpeakerPreset)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export {
    DenonMarantzAVR, DenonMarantzAVRRaw, DenonMarantzAVRRemote, ZoneType, SystemPowerType, ZonePowerType, MuteType
}
