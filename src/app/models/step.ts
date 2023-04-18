import { Address } from "./address";

export interface Step {
    id: number | undefined,
    departTime: Date,
    positionDepart: Address,
    positionArrival: Address,
    duration: number,
    seats: number
}