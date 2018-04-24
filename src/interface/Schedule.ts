export interface Schedule {
    date: string,
    items: Item
}

export interface Item {
    title: string,
    body: string,
    date: string,
    time: string,
    color: string,
    id: string | Int32Array,
    isArchive: boolean,
    isDone: boolean
}