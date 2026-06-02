// Created from: packages/grenton-api/interfaces/module_SMART_PANEL_FM_4_fv06_03.xml, object name="PANEL_PAGE" version="06.03"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnPageOpen = 0,
    OnPageClose = 1,
    OnDraw = 2,
    OnTherm1ModeButtonClick = 4,
    OnTherm2ModeButtonClick = 5,
    OnTherm3ModeButtonClick = 6,
    OnTherm4ModeButtonClick = 7,
}

enum PropertyType {
    PageType = 0,
    PageName = 1,
    Object_1_Id = 3,
    Object_1_Name = 4,
    Object_2_Id = 5,
    Object_2_Name = 6,
    Object_3_Id = 7,
    Object_3_Name = 8,
    Object_4_Id = 9,
    Object_4_Name = 10,
    DistributedLogicGroup_1 = 11,
    DistributedLogicGroup_2 = 12,
    DistributedLogicGroup_3 = 13,
    DistributedLogicGroup_4 = 14,
    Object_1_CustomIcon = 15,
    Object_2_CustomIcon = 16,
    Object_3_CustomIcon = 17,
    Object_4_CustomIcon = 18,
}

enum PageType {
    Inactive = 0,
    Buttons = 1,
    Thermostats = 2,
    FreeDraw = 3,
}

enum CustomIconType {
    Zero = "0",
    One = "1",
    Two = "2",
    Three = "3",
    Four = "4",
    Five = "5",
    Six = "6",
    Seven = "7",
    Eight = "8",
    Nine = "9"
}

declare class PanelPageRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
}

interface IPanelPage {
    /**
     * Zdarzenie wywoływane po otwarciu strony
     * @param callback
     */
    addOnPageOpen: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zamknięciu strony
     * @param callback
     */
    addOnPageClose: (callback: () => void) => void
    /**
     * Zdarzenie sygnalizujące potrzebę przerysowania strony
     * @param callback
     */
    addOnDraw: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po kliknięciu lewego-górnego przycisku 'mode' w termostacie nr 1
     * @param callback
     */
    addOnTherm1ModeButtonClick: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po kliknięciu lewego-górnego przycisku 'mode' w termostacie nr 2
     * @param callback
     */
    addOnTherm2ModeButtonClick: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po kliknięciu lewego-górnego przycisku 'mode' w termostacie nr 3
     * @param callback
     */
    addOnTherm3ModeButtonClick: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po kliknięciu lewego-górnego przycisku 'mode' w termostacie nr 4
     * @param callback
     */
    addOnTherm4ModeButtonClick: (callback: () => void) => void
    /** Typ strony wyświetlanej na Smart Panelu: 0 - Inactive, 1 - Buttons, 2 - Thermostats, 3 - FreeDraw */
    readonly pageType: PageType
    /**
     * Ustawia typ strony wyświetlanej na Smart Panelu
     * @param {PageType} value
     */
    setPageType: (value: PageType) => void
    /** Nazwa Strony/Nazwa ikony wyświetlana na Smart Panelu. Aktywne w przypadku ustawienia cechy PageDisplayMode na wartość ShowIconOrName w obiekcie PANEL */
    readonly pageName: string
    /**
     * Ustawia nazwę strony/nazwę ikony wyświetlanej na Smart Panelu. Aktywne w przypadku ustawienia cechy PageDisplayMode na wartość ShowIconOrName
     * @param {string} value
     */
    setPageName: (value: string) => void
    /** ID obiektu termostatu lub numer przycisku w zależności od typu strony */
    readonly object1Id: string
    /**
     * Ustawia ID obiektu termostatu lub numer przycisku w zależności od typu strony
     * @param {string} value
     */
    setObject1Id: (value: string) => void
    /** Nazwa termostatu wyświetlana na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw cecha Object_1_Name pozostaje pusta */
    readonly object1Name: string
    /**
     * Ustawia nazwę termostatu wyświetlaną na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw parametr funkcji pozostaje pusty
     * @param {string} value
     */
    setObject1Name: (value: string) => void
    /** Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu */
    readonly object1CustomIcon: CustomIconType
    /**
     * Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu
     * @param {CustomIconType} value
     */
    setObject1CustomIcon: (value: CustomIconType) => void
    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
    distributedLogicGroup1: number
    /** ID obiektu termostatu lub numer przycisku w zależności od typu strony */
    readonly object2Id: string
    /**
     * Ustawia ID obiektu termostatu lub numer przycisku w zależności od typu strony
     * @param {string} value
     */
    setObject2Id: (value: string) => void
    /** Nazwa termostatu wyświetlana na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw cecha Object_2_Name pozostaje pusta */
    readonly object2Name: string
    /**
     * Ustawia nazwę termostatu wyświetlaną na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw parametr funkcji pozostaje pusty
     * @param {string} value
     */
    setObject2Name: (value: string) => void
    /** Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu */
    readonly object2CustomIcon: CustomIconType
    /**
     * Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu
     * @param {CustomIconType} value
     */
    setObject2CustomIcon: (value: CustomIconType) => void
    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
    distributedLogicGroup2: number
    /** ID obiektu termostatu lub numer przycisku w zależności od typu strony */
    readonly object3Id: string
    /**
     * Ustawia ID obiektu termostatu lub numer przycisku w zależności od typu strony
     * @param {string} value
     */
    setObject3Id: (value: string) => void
    /** Nazwa termostatu wyświetlana na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw cecha Object_3_Name pozostaje pusta */
    readonly object3Name: string
    /**
     * Ustawia nazwę termostatu wyświetlaną na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw parametr funkcji pozostaje pusty
     * @param {string} value
     */
    setObject3Name: (value: string) => void
    /** Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu */
    readonly object3CustomIcon: CustomIconType
    /**
     * Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu
     * @param {CustomIconType} value
     */
    setObject3CustomIcon: (value: CustomIconType) => void
    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
    distributedLogicGroup3: number
    /** ID obiektu termostatu lub numer przycisku w zależności od typu strony */
    readonly object4Id: string
    /**
     * Ustawia ID obiektu termostatu lub numer przycisku w zależności od typu strony
     * @param {string} value
     */
    setObject4Id: (value: string) => void
    /** Nazwa termostatu wyświetlana na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw cecha Object_4_Name pozostaje pusta */
    readonly object4Name: string
    /**
     * Ustawia nazwę termostatu wyświetlaną na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw parametr funkcji pozostaje pusty
     * @param {string} value
     */
    setObject4Name: (value: string) => void
    /** Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu */
    readonly object4CustomIcon: CustomIconType
    /**
     * Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu
     * @param {CustomIconType} value
     */
    setObject4CustomIcon: (value: CustomIconType) => void
    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
    distributedLogicGroup4: number
}

class PanelPageRemote implements IPanelPage {
    constructor(private objectName: string, private gate: RemoteGate) {
    }

    addOnPageOpen(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnPageClose(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnDraw(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnTherm1ModeButtonClick(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnTherm2ModeButtonClick(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnTherm3ModeButtonClick(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnTherm4ModeButtonClick(_callback: () => void): void {
        // Remote events are not supported
    }

    /** Typ strony wyświetlanej na Smart Panelu: 0 - Inactive, 1 - Buttons, 2 - Thermostats, 3 - FreeDraw */
    get pageType(): PageType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.PageType)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia typ strony wyświetlanej na Smart Panelu
     * @param {PageType} value
     */
    setPageType(value: PageType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.PageType)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Nazwa Strony/Nazwa ikony wyświetlana na Smart Panelu. Aktywne w przypadku ustawienia cechy PageDisplayMode na wartość ShowIconOrName w obiekcie PANEL */
    get pageName(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.PageName)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia nazwę strony/nazwę ikony wyświetlanej na Smart Panelu. Aktywne w przypadku ustawienia cechy PageDisplayMode na wartość ShowIconOrName
     * @param {string} value
     */
    setPageName(value: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.PageName)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** ID obiektu termostatu lub numer przycisku w zależności od typu strony */
    get object1Id(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Object_1_Id)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia ID obiektu termostatu lub numer przycisku w zależności od typu strony
     * @param {string} value
     */
    setObject1Id(value: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Object_1_Id)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Nazwa termostatu wyświetlana na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw cecha Object_1_Name pozostaje pusta */
    get object1Name(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Object_1_Name)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia nazwę termostatu wyświetlaną na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw parametr funkcji pozostaje pusty
     * @param {string} value
     */
    setObject1Name(value: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Object_1_Name)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu */
    get object1CustomIcon(): CustomIconType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Object_1_CustomIcon)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu
     * @param {string} value
     */
    setObject1CustomIcon(value: CustomIconType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Object_1_CustomIcon)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
    get distributedLogicGroup1(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.DistributedLogicGroup_1)
            .build();
        return this.gate.runScript(cmd!);
    }
    set distributedLogicGroup1(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.DistributedLogicGroup_1)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** ID obiektu termostatu lub numer przycisku w zależności od typu strony */
    get object2Id(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Object_2_Id)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia ID obiektu termostatu lub numer przycisku w zależności od typu strony
     * @param {string} value
     */
    setObject2Id(value: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Object_2_Id)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Nazwa termostatu wyświetlana na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw cecha Object_2_Name pozostaje pusta */
    get object2Name(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Object_2_Name)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia nazwę termostatu wyświetlaną na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw parametr funkcji pozostaje pusty
     * @param {string} value
     */
    setObject2Name(value: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Object_2_Name)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu */
    get object2CustomIcon(): CustomIconType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Object_2_CustomIcon)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu
     * @param {string} value
     */
    setObject2CustomIcon(value: CustomIconType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Object_2_CustomIcon)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
    get distributedLogicGroup2(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.DistributedLogicGroup_2)
            .build();
        return this.gate.runScript(cmd!);
    }
    set distributedLogicGroup2(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.DistributedLogicGroup_2)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** ID obiektu termostatu lub numer przycisku w zależności od typu strony */
    get object3Id(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Object_3_Id)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia ID obiektu termostatu lub numer przycisku w zależności od typu strony
     * @param {string} value
     */
    setObject3Id(value: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Object_3_Id)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Nazwa termostatu wyświetlana na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw cecha Object_3_Name pozostaje pusta */
    get object3Name(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Object_3_Name)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia nazwę termostatu wyświetlaną na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw parametr funkcji pozostaje pusty
     * @param {string} value
     */
    setObject3Name(value: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Object_3_Name)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu */
    get object3CustomIcon(): CustomIconType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Object_3_CustomIcon)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu
     * @param {string} value
     */
    setObject3CustomIcon(value: CustomIconType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Object_3_CustomIcon)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
    get distributedLogicGroup3(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.DistributedLogicGroup_3)
            .build();
        return this.gate.runScript(cmd!);
    }
    set distributedLogicGroup3(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.DistributedLogicGroup_3)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** ID obiektu termostatu lub numer przycisku w zależności od typu strony */
    get object4Id(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Object_4_Id)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia ID obiektu termostatu lub numer przycisku w zależności od typu strony
     * @param {string} value
     */
    setObject4Id(value: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Object_4_Id)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Nazwa termostatu wyświetlana na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw cecha Object_4_Name pozostaje pusta */
    get object4Name(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Object_4_Name)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia nazwę termostatu wyświetlaną na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw parametr funkcji pozostaje pusty
     * @param {string} value
     */
    setObject4Name(value: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Object_4_Name)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu */
    get object4CustomIcon(): CustomIconType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Object_4_CustomIcon)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu
     * @param {CustomIconType} value
     */
    setObject4CustomIcon(value: CustomIconType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Object_4_CustomIcon)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
    get distributedLogicGroup4(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.DistributedLogicGroup_4)
            .build();
        return this.gate.runScript(cmd!);
    }
    set distributedLogicGroup4(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.DistributedLogicGroup_4)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

class PanelPage implements IPanelPage {
    private onPageOpenCallbacks: Array<() => void> = [];
    private onPageCloseCallbacks: Array<() => void> = [];
    private onDrawCallbacks: Array<() => void> = [];
    private onTherm1ModeButtonClickCallbacks: Array<() => void> = [];
    private onTherm2ModeButtonClickCallbacks: Array<() => void> = [];
    private onTherm3ModeButtonClickCallbacks: Array<() => void> = [];
    private onTherm4ModeButtonClickCallbacks: Array<() => void> = [];

    constructor(private raw: PanelPageRaw) {
        this.raw.add_event(EventType.OnPageOpen, () => {
            this.onPageOpenCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnPageClose, () => {
            this.onPageCloseCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnDraw, () => {
            this.onDrawCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnTherm1ModeButtonClick, () => {
            this.onTherm1ModeButtonClickCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnTherm2ModeButtonClick, () => {
            this.onTherm2ModeButtonClickCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnTherm3ModeButtonClick, () => {
            this.onTherm3ModeButtonClickCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnTherm4ModeButtonClick, () => {
            this.onTherm4ModeButtonClickCallbacks.forEach(callback => { callback(); });
        });
    }

    /**
     * Zdarzenie wywoływane po otwarciu strony
     * @param callback
     */
    addOnPageOpen(callback: () => void): void {
        this.onPageOpenCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zamknięciu strony
     * @param callback
     */
    addOnPageClose(callback: () => void): void {
        this.onPageCloseCallbacks.push(callback);
    }
    /**
     * Zdarzenie sygnalizujące potrzebę przerysowania strony
     * @param callback
     */
    addOnDraw(callback: () => void): void {
        this.onDrawCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po kliknięciu lewego-górnego przycisku 'mode' w termostacie nr 1
     * @param callback
     */
    addOnTherm1ModeButtonClick(callback: () => void): void {
        this.onTherm1ModeButtonClickCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po kliknięciu lewego-górnego przycisku 'mode' w termostacie nr 2
     * @param callback
     */
    addOnTherm2ModeButtonClick(callback: () => void): void {
        this.onTherm2ModeButtonClickCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po kliknięciu lewego-górnego przycisku 'mode' w termostacie nr 3
     * @param callback
     */
    addOnTherm3ModeButtonClick(callback: () => void): void {
        this.onTherm3ModeButtonClickCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po kliknięciu lewego-górnego przycisku 'mode' w termostacie nr 4
     * @param callback
     */
    addOnTherm4ModeButtonClick(callback: () => void): void {
        this.onTherm4ModeButtonClickCallbacks.push(callback);
    }

    /** Typ strony wyświetlanej na Smart Panelu: 0 - Inactive, 1 - Buttons, 2 - Thermostats, 3 - FreeDraw */
    get pageType(): PageType {
        return this.raw.get(PropertyType.PageType);
    }
    /**
     * Ustawia typ strony wyświetlanej na Smart Panelu
     * @param {PageType} value
     */
    setPageType(value: PageType): void {
        this.raw.set(PropertyType.PageType, value);
    }
    /** Nazwa Strony/Nazwa ikony wyświetlana na Smart Panelu. Aktywne w przypadku ustawienia cechy PageDisplayMode na wartość ShowIconOrName w obiekcie PANEL */
    get pageName(): string {
        return this.raw.get(PropertyType.PageName);
    }
    /**
     * Ustawia nazwę strony/nazwę ikony wyświetlanej na Smart Panelu. Aktywne w przypadku ustawienia cechy PageDisplayMode na wartość ShowIconOrName
     * @param {string} value
     */
    setPageName(value: string): void {
        this.raw.set(PropertyType.PageName, value);
    }
    /** ID obiektu termostatu lub numer przycisku w zależności od typu strony */
    get object1Id(): string {
        return this.raw.get(PropertyType.Object_1_Id);
    }
    /**
     * Ustawia ID obiektu termostatu lub numer przycisku w zależności od typu strony
     * @param {string} value
     */
    setObject1Id(value: string): void {
        this.raw.set(PropertyType.Object_1_Id, value);
    }
    /** Nazwa termostatu wyświetlana na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw cecha Object_1_Name pozostaje pusta */
    get object1Name(): string {
        return this.raw.get(PropertyType.Object_1_Name);
    }
    /**
     * Ustawia nazwę termostatu wyświetlaną na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw parametr funkcji pozostaje pusty
     * @param {string} value
     */
    setObject1Name(value: string): void {
        this.raw.set(PropertyType.Object_1_Name, value);
    }
    /** Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu */
    get object1CustomIcon(): CustomIconType {
        return this.raw.get(PropertyType.Object_1_CustomIcon);
    }
    /**
     * Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu
     * @param {CustomIconType} value
     */
    setObject1CustomIcon(value: CustomIconType): void {
        this.raw.set(PropertyType.Object_1_CustomIcon, value);
    }
    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
    get distributedLogicGroup1(): number {
        return this.raw.get(PropertyType.DistributedLogicGroup_1);
    }
    set distributedLogicGroup1(value: number) {
        this.raw.set(PropertyType.DistributedLogicGroup_1, value);
    }
    /** ID obiektu termostatu lub numer przycisku w zależności od typu strony */
    get object2Id(): string {
        return this.raw.get(PropertyType.Object_2_Id);
    }
    /**
     * Ustawia ID obiektu termostatu lub numer przycisku w zależności od typu strony
     * @param {string} value
     */
    setObject2Id(value: string): void {
        this.raw.set(PropertyType.Object_2_Id, value);
    }
    /** Nazwa termostatu wyświetlana na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw cecha Object_2_Name pozostaje pusta */
    get object2Name(): string {
        return this.raw.get(PropertyType.Object_2_Name);
    }
    /**
     * Ustawia nazwę termostatu wyświetlaną na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw parametr funkcji pozostaje pusty
     * @param {string} value
     */
    setObject2Name(value: string): void {
        this.raw.set(PropertyType.Object_2_Name, value);
    }
    /** Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu */
    get object2CustomIcon(): CustomIconType {
        return this.raw.get(PropertyType.Object_2_CustomIcon);
    }
    /**
     * Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu
     * @param {CustomIconType} value
     */
    setObject2CustomIcon(value: CustomIconType): void {
        this.raw.set(PropertyType.Object_2_CustomIcon, value);
    }
    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
    get distributedLogicGroup2(): number {
        return this.raw.get(PropertyType.DistributedLogicGroup_2);
    }
    set distributedLogicGroup2(value: number) {
        this.raw.set(PropertyType.DistributedLogicGroup_2, value);
    }
    /** ID obiektu termostatu lub numer przycisku w zależności od typu strony */
    get object3Id(): string {
        return this.raw.get(PropertyType.Object_3_Id);
    }
    /**
     * Ustawia ID obiektu termostatu lub numer przycisku w zależności od typu strony
     * @param {string} value
     */
    setObject3Id(value: string): void {
        this.raw.set(PropertyType.Object_3_Id, value);
    }
    /** Nazwa termostatu wyświetlana na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw cecha Object_3_Name pozostaje pusta */
    get object3Name(): string {
        return this.raw.get(PropertyType.Object_3_Name);
    }
    /**
     * Ustawia nazwę termostatu wyświetlaną na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw parametr funkcji pozostaje pusty
     * @param {string} value
     */
    setObject3Name(value: string): void {
        this.raw.set(PropertyType.Object_3_Name, value);
    }
    /** Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu */
    get object3CustomIcon(): CustomIconType {
        return this.raw.get(PropertyType.Object_3_CustomIcon);
    }
    /**
     * Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu
     * @param {CustomIconType} value
     */
    setObject3CustomIcon(value: CustomIconType): void {
        this.raw.set(PropertyType.Object_3_CustomIcon, value);
    }
    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
    get distributedLogicGroup3(): number {
        return this.raw.get(PropertyType.DistributedLogicGroup_3);
    }
    set distributedLogicGroup3(value: number) {
        this.raw.set(PropertyType.DistributedLogicGroup_3, value);
    }
    /** ID obiektu termostatu lub numer przycisku w zależności od typu strony */
    get object4Id(): string {
        return this.raw.get(PropertyType.Object_4_Id);
    }
    /**
     * Ustawia ID obiektu termostatu lub numer przycisku w zależności od typu strony
     * @param {string} value
     */
    setObject4Id(value: string): void {
        this.raw.set(PropertyType.Object_4_Id, value);
    }
    /** Nazwa termostatu wyświetlana na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw cecha Object_4_Name pozostaje pusta */
    get object4Name(): string {
        return this.raw.get(PropertyType.Object_4_Name);
    }
    /**
     * Ustawia nazwę termostatu wyświetlaną na stronie Smart Panelu (brak nazwy - termostat nieaktywny). W przypadku cechy PageType ustawionej na Buttons/FreeDraw parametr funkcji pozostaje pusty
     * @param {string} value
     */
    setObject4Name(value: string): void {
        this.raw.set(PropertyType.Object_4_Name, value);
    }
    /** Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu */
    get object4CustomIcon(): CustomIconType {
        return this.raw.get(PropertyType.Object_4_CustomIcon);
    }
    /**
     * Ustawia nazwę ikony użytkownika dla termostatu obsługiwanego przez strony Smart Panelu
     * @param {CustomIconType} value
     */
    setObject4CustomIcon(value: CustomIconType): void {
        this.raw.set(PropertyType.Object_4_CustomIcon, value);
    }
    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
    get distributedLogicGroup4(): number {
        return this.raw.get(PropertyType.DistributedLogicGroup_4);
    }
    set distributedLogicGroup4(value: number) {
        this.raw.set(PropertyType.DistributedLogicGroup_4, value);
    }
}

export { PanelPage, PanelPageRaw, PanelPageRemote, PageType, CustomIconType }
