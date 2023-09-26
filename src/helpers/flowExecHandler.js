import { getStateFromLocalStorage } from "./localStorageHandler";

export function flowExecHandler() {
    const flowSteps = getStateFromLocalStorage();

    flowSteps.forEach(element => {
        console.log(element.consoleValue)
    });
}