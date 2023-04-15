import { Driver } from "./driver";
import { Step } from "./step";

export interface Route {
    id: number;
    driver: Driver,
    isSingleStep: boolean,
    steps: Step[]
}