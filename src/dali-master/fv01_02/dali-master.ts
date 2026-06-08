// Created from: src/interfaces/module_2_0_DALI_MASTER_DIN_fv01_02.xml, object name="DALI_MASTER"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnDALI_DiscoveryCompleated = 1
}

enum PropertyType {
    State = 0,
    NumberOfGear = 1,
    GearAddresses = 3
}

enum MethodType {
    SetLocalAddress = 0,
    ResetGear = 1,
    SetDAPCValue = 2,
    Identify = 3,
    DALI_Discovery = 5,
    SetGroupDAPCValue = 6,
    GroupSwitchOn = 8,
    GroupSwitchOff = 9
}

declare class DaliMasterRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    execute(method: MethodType, ...args: any[]): any;
}

interface IDaliMaster {
    /** Zdarzenie wywoływane po zakończeniu wyszukiwania stateczników i nadawaniu im adresów lokalnych */
    addOnDaliDiscoveryCompleated: (callback: () => void) => void
    /** 0 - brak konfiguracji stateczników\n1 - DALI Discovery\n3 - konfiguracja stateczników znajduje się na urządzeniu\n4 - zapisywanie informacji o grupach */
    readonly state: number
    /** Liczba stateczników w konfiguracji urządzenia */
    readonly numberOfGear: number
    /** Adresy stateczników nadane podczas DALI_Discovery. Wartość cechy odświeżana jest po restarcie systemu */
    readonly gearAddresses: string
    /** Ustawia adres lokalny statecznika */
    setLocalAddress: (address: number, findGear?: number) => void
    /** Resetuje statecznik */
    resetGear: (address?: number) => void
    /** Ustawia wartość z jaką świeci oprawa. Parametr RampTime ustawiany w skali logarytmicznej 0.8 - 90 [s] */
    setDAPCValue: (value: number, address?: number, rampTime?: number) => void
    /** Włącza oprawę na 2 sekundy */
    identify: (address?: number) => void
    /** Wyszukiwanie stateczników podłączonych do magistrali DALI oraz nadawanie im adresów lokalnych. W momencie nadania adresu, dany statecznik zostaje załączony na 300 ms.\nPodczas DALI_Discovery nie należy wykonywać operacji na urządzeniu */
    daliDiscovery: () => void
    /** Ustawia wartość z jaką świeci oprawa dla podanej grupy. Parametr RampTime ustawiany w skali logarytmicznej 0.8 - 90 [s] */
    setGroupDAPCValue: (groupAddress: number, value: number, rampTime?: number) => void
    /** Włącza oprawy dla podanej grupy. Parametr RampTime ustawiany w skali logarytmicznej 0.8 - 90 [s] */
    groupSwitchOn: (groupAddress: number, rampTime?: number) => void
    /** Wyłącza oprawy dla podanej grupy. Parametr RampTime ustawiany w skali logarytmicznej 0.8 - 90 [s] */
    groupSwitchOff: (groupAddress: number, rampTime?: number) => void
}

class DaliMaster implements IDaliMaster {
    private onDaliDiscoveryCompleatedCallbacks: Array<() => void> = [];

    constructor(private raw: DaliMasterRaw) {
        this.raw.add_event(EventType.OnDALI_DiscoveryCompleated, () => {
            this.onDaliDiscoveryCompleatedCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnDaliDiscoveryCompleated(callback: () => void): void { this.onDaliDiscoveryCompleatedCallbacks.push(callback); }

    get state(): number { return this.raw.get(PropertyType.State); }
    get numberOfGear(): number { return this.raw.get(PropertyType.NumberOfGear); }
    get gearAddresses(): string { return this.raw.get(PropertyType.GearAddresses); }

    setLocalAddress(address: number, findGear: number = 255): void { this.raw.execute(MethodType.SetLocalAddress, findGear, address); }
    resetGear(address: number = 255): void { this.raw.execute(MethodType.ResetGear, address); }
    setDAPCValue(value: number, address: number = 255, rampTime: number = 0): void { this.raw.execute(MethodType.SetDAPCValue, address, value, rampTime); }
    identify(address: number = 255): void { this.raw.execute(MethodType.Identify, address); }
    daliDiscovery(): void { this.raw.execute(MethodType.DALI_Discovery); }
    setGroupDAPCValue(groupAddress: number, value: number, rampTime: number = 0): void { this.raw.execute(MethodType.SetGroupDAPCValue, groupAddress, value, rampTime); }
    groupSwitchOn(groupAddress: number, rampTime: number = 0): void { this.raw.execute(MethodType.GroupSwitchOn, groupAddress, rampTime); }
    groupSwitchOff(groupAddress: number, rampTime: number = 0): void { this.raw.execute(MethodType.GroupSwitchOff, groupAddress, rampTime); }
}

class DaliMasterRemote implements IDaliMaster {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnDaliDiscoveryCompleated(_callback: () => void): void { /* Remote events are not supported */ }

    get state(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.State).build();
        return this.gate.runScript(cmd!);
    }
    get numberOfGear(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.NumberOfGear).build();
        return this.gate.runScript(cmd!);
    }
    get gearAddresses(): string {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.GearAddresses).build();
        return this.gate.runScript(cmd!);
    }

    setLocalAddress(address: number, findGear: number = 255): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetLocalAddress).addParameter(findGear).addParameter(address).build();
        this.gate.runScript(cmd!);
    }
    resetGear(address: number = 255): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.ResetGear).addParameter(address).build();
        this.gate.runScript(cmd!);
    }
    setDAPCValue(value: number, address: number = 255, rampTime: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetDAPCValue).addParameter(address).addParameter(value).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    identify(address: number = 255): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Identify).addParameter(address).build();
        this.gate.runScript(cmd!);
    }
    daliDiscovery(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.DALI_Discovery).build();
        this.gate.runScript(cmd!);
    }
    setGroupDAPCValue(groupAddress: number, value: number, rampTime: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetGroupDAPCValue).addParameter(groupAddress).addParameter(value).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    groupSwitchOn(groupAddress: number, rampTime: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.GroupSwitchOn).addParameter(groupAddress).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    groupSwitchOff(groupAddress: number, rampTime: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.GroupSwitchOff).addParameter(groupAddress).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
}

export { DaliMaster, DaliMasterRaw, DaliMasterRemote }
