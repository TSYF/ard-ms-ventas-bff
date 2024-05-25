import { Matcher } from "@/utils";

export interface Service {
    id: number
}

export const serviceMatcher: Matcher = {
    id: "number"
}

export interface Sale {
    id?: number,
    buyUrl: string,
    name: string,
}

export const saleMatcher: Matcher = {
    buyUrl: "string",
    name: "string",
};