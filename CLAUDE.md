# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm run build    # Compile TypeScript to JavaScript (outputs to dist/)
npm run watch    # Watch mode for development
```

## Architecture

This is a TypeScript API library for Grenton smart home hardware modules. The code provides TypeScript wrappers around raw hardware interfaces, enabling type-safe interaction with Grenton devices.

here ended generate objects for clus

### Directory Structure
- Build output is in dist and dist-js folders.
- Files module_*.xml
   - Each hardware module has its own directory taken from <module /> node and @name attribute.
   - Inside each module directory, subfolders use the naming convention `fwType_XX_fwApiVersion_YY`, where XX is the firmware type ID (`<firmware typeId="XX">`) and YY is the firmware API version (`<firmware version="YY">`), both taken from the XML source file.
   - The `typeId`/`version` attribute text in the XML is hexadecimal. XX and YY in the folder name must be the **decimal** equivalent, not a literal copy of the hex text (e.g. `<firmware typeId="00" version="0a">` → `fwType_00_fwApiVersion_10`; `<firmware typeId="00" version="ff">` → `fwType_00_fwApiVersion_255`). Zero-pad the decimal value to match the digit count of the original hex attribute string when the decimal value would otherwise be shorter (e.g. hex `06` → decimal `06`, not `6`); if the decimal value needs more digits than the original hex string had, leave it unpadded (e.g. hex `ff` → decimal `255`, not `0255`).
- Files clu_GATE_ALARM_*.xml
   - wrappers go to src/gate-alarm/<version> directories
   - each version folder contains TS wrapper
   - file with TS wrappers is named gate-alarm.ts   
   - apply same rules for all <clu className="GATE"/> nodes
- Files clu_ZWAVE_2_*.xml
   - wrappers go to src/clu-zwave-2/<version> directories
   - each version folder contains TS wrapper
   - file with TS wrappers is named clu-zwave-2.ts
   - additionally create TS classes in src/clu-zwave-2/<version> folders for /clu/objects nodes. Find proper object_*.xml file, match by /clu/objects/object/@name and /clu/objects/object/@version
   - apply same rules for all clu_ZWAVE_ft*.xml (TS classes for these go to src/clu-zwave/<version>, including the /clu/objects co-location rule above)
- Don't generate TS wrappers for clu_ft*.xml files.

### "latest" Re-export Folder

Each module directory (e.g. `src/analog-module/`) must contain a `latest/` folder with one re-export file per wrapper from its newest version folder, so consumers can `import { Xxx } from '.../analog-module/latest/file-name'` without depending on a specific firmware version. See `src/analog-module/latest/` as the reference example.

- The "newest" version folder is determined by comparing the numeric parts as decimal numbers (folder names already store XX/YY in decimal, per the rule above): first compare fwApiVersion (YY) — higher value is newer; break ties by comparing fwType (XX) — higher value is newer (e.g. `fwType_01_fwApiVersion_10` > `fwType_02_fwApiVersion_09`, `fwType_0_fwApiVersion_255` > `fwType_0_fwApiVersion_01`, `fwType_02_fwApiVersion_1400` > `fwType_02_fwApiVersion_1110`). For non-numeric suffixes (e.g. `_hv1` vs `_hv2`), compare the suffix as a string.
- For each `.ts` file in that version folder, create a file `latest/<file-name>.ts` (same name as the source file) containing a single line `export * from '../<version>/<file-name>';` (e.g. `latest/analog-in.ts` containing `export * from '../fwType_01_fwApiVersion_11/analog-in';`).
- Whenever a wrapper is created or updated (new version folder added, or files added/removed/renamed), regenerate/update the corresponding files in `latest/` to reflect the new latest version and files (add/remove/rename files as needed).



### Core Pattern

All device wrappers follow the same architectural pattern:

1. **Raw Interface** (`*Raw` classes): Declared interfaces representing the low-level hardware API with methods:
   - `add_event(event: EventType, callback)` - Register event handlers
   - `get(property: PropertyType)` - Read property value method
   - `set(property: PropertyType, value)` - Write property value method
   - `execute(method: MethodType, ...args)` - Execute device methods
   

2. **Wrapper Class**: High-level TypeScript class that:
   - Takes the raw interface in constructor
   - Maintains arrays of callbacks for each event type
   - Registers single handlers on raw interface that dispatch to all registered callbacks
   - Exposes typed methods and properties using enums
   - Contains comments in Polish. Comments are taken from text-resources folder.
   - For every //features/feature node generate wrapper property
      - when attribute set="true" generate property setter.
      - when attributes get="true" generate property getter.
      - when attributes set="true" and get="false" generate property getter and setter.
      - when unit="bool", type="num", range="0-1" check if raw object returns 0 or 1 and convert it to bool.
   - For every //methods/method node generate a wrapper method, regardless of its "call" attribute:
      - call="execute": method calls `raw.execute(MethodType.X, ...args)` (Remote: `.execute().addParameter(MethodType.X)...`)
      - call="set": method calls `raw.set(PropertyType.X, value)` (Remote: `.set().addParameter(PropertyType.X).addParameter(value)...`). This is generated IN ADDITION TO the corresponding feature property setter (//features/feature with set="true") - the two are not mutually exclusive, even though they wrap the same underlying call.
      - call="get": method calls `raw.get(PropertyType.X)` (Remote: `.get().addParameter(PropertyType.X)...`), in addition to the corresponding feature property getter.
      - Method name is the camelCase form of the method's "name" attribute (e.g. SetValue -> setValue).
      - Each `<param>` becomes a required parameter (no `?`, no default value) UNLESS the XML marks it optional:
         - module_*.xml schema: the `<param>` element itself has `optional="true"`.
      - A `<parametrized>` child with a `value` attribute (e.g. `<parametrized name="Default" value="500"/>`, `<parametrized name="Broadcast" value="255"/>`) only supplies the default value to use when the param IS optional per the rule above - it does NOT by itself make the param optional. Many params carry such a "suggested value" child while remaining required.
      - When XML param order would put a required param after an optional one, reorder the TS parameter list (required params first, optional/defaulted ones last) for valid TypeScript syntax, but keep the original XML argument order in the `raw.execute(...)`/`.addParameter(...)` calls.
   - For every <event/> in <events /> node generate event. Event name is in name attribute.

3. **Remote Variant** (`*Remote` classes): For cross-gate communication via `RemoteGate`, uses `rawExecutionBuilderFactory` to build command strings. Remote events are not supported.
   - Contains comments in Polish. Comments are taken from text-resources folder.

### Enums

Each module defines three enum types:
- `EventType`: Hardware events (OnValueChange, OnSwitchOn, etc.)
- `PropertyType`: Readable/writable properties (Value, State, Position, etc.)
- `MethodType`: Executable methods (Switch, MoveUp, Stop, etc.)

Enum values are numeric IDs that map to the firmware API.

### Core Utilities

- `core/remote-gate.ts`: `RemoteGate` class for executing scripts on remote CLUs
- `core/execution-builder.ts`: Builder pattern for constructing remote execution command strings
