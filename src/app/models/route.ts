import { Driver } from "./driver";
import { Step } from "./step";

export interface Route {
    driver: Driver,
    isSingleStep: boolean,
    steps: Step[]
}