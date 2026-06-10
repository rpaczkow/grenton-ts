declare function getVar(this: void, name: string): any;
declare function setVar(this: void, name: string, value: any): void;

function setVariable(name: string, value: any): void {
	setVar(name, value)
}

function getVariable(name: string): any{
	return getVar(name)
}

export { setVariable, getVariable };