interface IRawExecutionBuilder {
    get: () => IRawExecutionBuilder
    set: () => IRawExecutionBuilder
    execute: () => IRawExecutionBuilder
    addParameter: (value: string | number | boolean | null) => IRawExecutionBuilder
    build: () => string | null
}

const stringify = function(value: string | number | boolean | null): string | null{
        if(value === null){
            return "null";
        }
        if(typeof value === "number" || typeof value === "boolean"){
            return value.toString()
        } else if(typeof value === "string"){
            return `"${value}"`
        }

        return null;
}

const rawExecutionBuilderFactory = function(objectId: string): IRawExecutionBuilder {
    let method: string | null = null
    let parameters: (string | number | boolean | null)[] = []
    

    return {
        get(): IRawExecutionBuilder {
            method = "get"
            return this
        },
        set(): IRawExecutionBuilder {
            method = "set"
            return this
        },
        execute(): IRawExecutionBuilder {
            method = "execute"
            return this
        },
        addParameter(value: string | number | boolean | null): IRawExecutionBuilder {
            parameters.push(stringify(value))
            return this
        },
        build(): string | null {
            if (!method) {
                return null
            }
            let result = `${objectId}:${method}(${parameters.join(", ")})`

            return result
        }
    }
}

export { rawExecutionBuilderFactory }