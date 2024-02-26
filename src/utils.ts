export interface glassesDataType { id: string, urls: string[], name: string, description?: string, price: number, ordered: boolean, in_wishlist: number }


export type OmitMultiple<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;