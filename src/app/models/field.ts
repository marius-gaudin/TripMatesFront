import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Adresse } from "./adresse";

export interface Field {
    label?: string,
    icon: IconDefinition,
    type: string,
    value: any,
    action?: any,
    adresse?: Adresse
}