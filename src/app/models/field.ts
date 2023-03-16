import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Address } from "./address";

export interface Field {
    label?: string,
    icon: IconDefinition,
    type: string,
    value: any,
    action?: any,
    adresse?: Address
}