import { Address } from "./address";

export interface Step {
    departTime: Date,
    positionDepart: Address,
    positionArrival: Address,
    duration: number,
    seats: number
}