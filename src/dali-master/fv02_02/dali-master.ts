// Created from: src/interfaces/module_2_0_DALI_MASTER_DIN_fv02_02.xml, object name="DALI_MASTER"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum StateType {
    WithoutGears = 0,
    DaliDiscovery = 1,
    DaliBusPowerFailure = 2,
    ConfigurationSaved = 3,
    GettingGroupInformation = 4
}

enum DiscoveryType {
    ResetAllLocalAddress = 0,
    NewWithoutLocalAddress = 2,
    GetConfiguration = 4
}

enum EventType {
    OnDALI_DiscoveryCompleted = 1,
    OnDALI_BusPowerFailure = 2
}

enum PropertyType {
    State = 0,
    NumberOfGear = 1,
    GearAddresses = 3,
    ActiveGears = 4,
    MissingGears = 5
}

enum MethodType {
    ChangeLocalAddress = 0,
    ResetGear = 1,
    SetDAPCValue = 2,
    Identify = 3,
    ResetLocalAddress = 4,
    DALI_Discovery = 5,
    SetGroupDAPCValue = 6,
    GroupSwitch = 7,
    GroupSwitchOn = 8,
    GroupSwitchOff = 9,
    RemoveGear = 10,
    SetPowerOnLevel = 12,
    ResolveAddressDuplicate = 13,
    SetLastActiveLevel = 14,
    UpdateMissingGears = 15
}

declare class DaliMasterRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    execute(method: MethodType, ...args: any[]): any;
}

interface IDaliMaster {
    /** Zdarzenie wywoływane po zakończeniu wyszukiwania stateczników i nadawaniu im adresów lokalnych */
    addOnDaliDiscoveryCompleted: (callback: () => void) => void
    /** Zdarzenie generowane:\n - przy braku zasilania magistrali DALI dłuższym niż 1s,\n - przy zwarciu na magistrali DALI */
    addOnDaliBusPowerFailure: (callback: () => void) => void
    /** 0 - brak konfiguracji stateczników\n1 - DALI Discovery\n2 - brak zasilania magistrali DALI\n3 - konfiguracja stateczników znajduje się na urządzeniu\n4 - zapisywanie informacji o grupach */
    readonly state: StateType
    /** Liczba aktywnych stateczników podłączonych do urządzenia. Wartość cechy odświeżana jest po restarcie systemu lub wywołaniu metody UpdateMissingGears */
    readonly numberOfGear: number
    /** Adresy stateczników nadane podczas DALI_Discovery. Wartość cechy odświeżana jest po Dali Discovery */
    readonly gearAddresses: string
    /** Adresy aktywnych stateczników znajdujących się w konfiguracji. Wartość cechy odświeżana jest po restarcie systemu lub wywołaniu metody UpdateMissingGears */
    readonly activeGears: string
    /** Adresy nieaktywnych stateczników znajdujących się w konfiguracji. Wartość cechy odświeżana jest po restarcie systemu lub wywołaniu metody UpdateMissingGears */
    readonly missingGears: string
    /** Włącza oprawę na 2 sekundy */
    identify: (address?: number) => void
    /** Restartuje statecznik */
    resetGear: (address?: number) => void
    /** Usuwa adres na stateczniku. Parametr RemoveFromController:\n- True - Usuwa adres z pamięci kontrolera\n- False - pozostawia adres w pamięci kontrolera */
    resetLocalAddress: (address?: number, removeFromController?: number) => void
    /** Zmienia aktualny LocalAddress statecznika na wybrany. Adres nie jest usuwany z pamięci Dali Controller */
    changeLocalAddress: (actualAddress: number, addressToSet: number) => void
    /** Usuwa statecznik z pamięci kontrolera */
    removeGear: (address?: number) => void
    /** Rozwiązuje konflikt adresów stateczników */
    resolveAddressDuplicate: (address?: number) => void
    /** Sprawdza aktywność stateczników które znajdują sie w konfiguracji */
    updateMissingGears: () => void
    /** Wyszukiwanie stateczników podłączonych do magistrali DALI oraz nadawanie im adresów lokalnych:\n - GetConfiguration - pobranie adresów stateczników znajdujących się na magistrali \n - NewWithoutLocalAddress - adresowanie nowych stateczników bez przypisanego adresu; \n - ResetAllLocalAddress - adresowanie wszystkich stateczników na magistrali.\nW momencie nadania adresu, dany statecznik zostaje załączony na 300 ms.\nPodczas DALI_Discovery nie należy wykonywać operacji na urządzeniu */
    daliDiscovery: (type?: DiscoveryType) => void
    /** Dla wybranego adresu zapisuje w pamięci statecznika DACPValue jakie ma zostać ustawione po restarcie/awarii magistrali */
    setPowerOnLevel: (address: number, dapcValue: number) => void
    /** Ustawia wartość z jaką świeci oprawa. Parametr RampTime ustawiany w skali logarytmicznej 0.8 - 90 [s] */
    setDAPCValue: (value: number, address?: number, rampTime?: number) => void
    /** Jeżeli statecznik jest wyłączony, włącza statecznik z wartością DACPValue ustawioną przed wyłączeniem */
    setLastActiveLevel: (address: number) => void
    /** Ustawia wartość z jaką świeci oprawa dla podanej grupy. Parametr RampTime ustawiany w skali logarytmicznej 0.8 - 90 [s] */
    setGroupDAPCValue: (groupAddress: number, value: number, rampTime?: number) => void
    /** Zmienia stan wyjścia dla grupy stateczników na przeciwny. Parametr RampTime ustawiany w skali logarytmicznej 0.8 - 90 [s] */
    groupSwitch: (groupAddress: number, rampTime?: number) => void
    /** Włącza oprawy dla podanej grupy. Parametr RampTime ustawiany w skali logarytmicznej 0.8 - 90 [s] */
    groupSwitchOn: (groupAddress: number, rampTime?: number) => void
    /** Wyłącza oprawy dla podanej grupy. Parametr RampTime ustawiany w skali logarytmicznej 0.8 - 90 [s] */
    groupSwitchOff: (groupAddress: number, rampTime?: number) => void
}

class DaliMaster implements IDaliMaster {
    private onDaliDiscoveryCompletedCallbacks: Array<() => void> = [];
    private onDaliBusPowerFailureCallbacks: Array<() => void> = [];

    constructor(private raw: DaliMasterRaw) {
        this.raw.add_event(EventType.OnDALI_DiscoveryCompleted, () => {
            this.onDaliDiscoveryCompletedCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnDALI_BusPowerFailure, () => {
            this.onDaliBusPowerFailureCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnDaliDiscoveryCompleted(callback: () => void): void { this.onDaliDiscoveryCompletedCallbacks.push(callback); }
    addOnDaliBusPowerFailure(callback: () => void): void { this.onDaliBusPowerFailureCallbacks.push(callback); }

    get state(): StateType { return this.raw.get(PropertyType.State); }
    get numberOfGear(): number { return this.raw.get(PropertyType.NumberOfGear); }
    get gearAddresses(): string { return this.raw.get(PropertyType.GearAddresses); }
    get activeGears(): string { return this.raw.get(PropertyType.ActiveGears); }
    get missingGears(): string { return this.raw.get(PropertyType.MissingGears); }

    identify(address: number = 255): void { this.raw.execute(MethodType.Identify, address); }
    resetGear(address: number = 255): void { this.raw.execute(MethodType.ResetGear, address); }
    resetLocalAddress(address: number = 255, removeFromController: number = 0): void { this.raw.execute(MethodType.ResetLocalAddress, address, removeFromController); }
    changeLocalAddress(actualAddress: number, addressToSet: number): void { this.raw.execute(MethodType.ChangeLocalAddress, actualAddress, addressToSet); }
    removeGear(address: number = 255): void { this.raw.execute(MethodType.RemoveGear, address); }
    resolveAddressDuplicate(address: number = 255): void { this.raw.execute(MethodType.ResolveAddressDuplicate, address); }
    updateMissingGears(): void { this.raw.execute(MethodType.UpdateMissingGears); }
    daliDiscovery(type: DiscoveryType = DiscoveryType.ResetAllLocalAddress): void { this.raw.execute(MethodType.DALI_Discovery, type); }
    setPowerOnLevel(address: number, dapcValue: number): void { this.raw.execute(MethodType.SetPowerOnLevel, address, dapcValue); }
    setDAPCValue(value: number, address: number = 255, rampTime: number = 0): void { this.raw.execute(MethodType.SetDAPCValue, address, value, rampTime); }
    setLastActiveLevel(address: number): void { this.raw.execute(MethodType.SetLastActiveLevel, address); }
    setGroupDAPCValue(groupAddress: number, value: number, rampTime: number = 0): void { this.raw.execute(MethodType.SetGroupDAPCValue, groupAddress, value, rampTime); }
    groupSwitch(groupAddress: number, rampTime: number = 0): void { this.raw.execute(MethodType.GroupSwitch, groupAddress, rampTime); }
    groupSwitchOn(groupAddress: number, rampTime: number = 0): void { this.raw.execute(MethodType.GroupSwitchOn, groupAddress, rampTime); }
    groupSwitchOff(groupAddress: number, rampTime: number = 0): void { this.raw.execute(MethodType.GroupSwitchOff, groupAddress, rampTime); }
}

class DaliMasterRemote implements IDaliMaster {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnDaliDiscoveryCompleted(_callback: () => void): void { /* Remote events are not supported */ }
    addOnDaliBusPowerFailure(_callback: () => void): void { /* Remote events are not supported */ }

    get state(): StateType {
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
    get activeGears(): string {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.ActiveGears).build();
        return this.gate.runScript(cmd!);
    }
    get missingGears(): string {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.MissingGears).build();
        return this.gate.runScript(cmd!);
    }

    identify(address: number = 255): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Identify).addParameter(address).build();
        this.gate.runScript(cmd!);
    }
    resetGear(address: number = 255): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.ResetGear).addParameter(address).build();
        this.gate.runScript(cmd!);
    }
    resetLocalAddress(address: number = 255, removeFromController: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.ResetLocalAddress).addParameter(address).addParameter(removeFromController).build();
        this.gate.runScript(cmd!);
    }
    changeLocalAddress(actualAddress: number, addressToSet: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.ChangeLocalAddress).addParameter(actualAddress).addParameter(addressToSet).build();
        this.gate.runScript(cmd!);
    }
    removeGear(address: number = 255): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.RemoveGear).addParameter(address).build();
        this.gate.runScript(cmd!);
    }
    resolveAddressDuplicate(address: number = 255): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.ResolveAddressDuplicate).addParameter(address).build();
        this.gate.runScript(cmd!);
    }
    updateMissingGears(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.UpdateMissingGears).build();
        this.gate.runScript(cmd!);
    }
    daliDiscovery(type: DiscoveryType = DiscoveryType.ResetAllLocalAddress): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.DALI_Discovery).addParameter(type).build();
        this.gate.runScript(cmd!);
    }
    setPowerOnLevel(address: number, dapcValue: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetPowerOnLevel).addParameter(address).addParameter(dapcValue).build();
        this.gate.runScript(cmd!);
    }
    setDAPCValue(value: number, address: number = 255, rampTime: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetDAPCValue).addParameter(address).addParameter(value).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    setLastActiveLevel(address: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetLastActiveLevel).addParameter(address).build();
        this.gate.runScript(cmd!);
    }
    setGroupDAPCValue(groupAddress: number, value: number, rampTime: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetGroupDAPCValue).addParameter(groupAddress).addParameter(value).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    groupSwitch(groupAddress: number, rampTime: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.GroupSwitch).addParameter(groupAddress).addParameter(rampTime).build();
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

export { DaliMaster, DaliMasterRaw, DaliMasterRemote, StateType, DiscoveryType }
