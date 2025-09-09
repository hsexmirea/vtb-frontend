export enum Direction {
    INCOMMING = "incoming",
    OUTGOING = "outgoing",
}

export interface Message {
    id?: string
    createdAt: string
    text: string
    direction: Direction
    chatId: string
    isMain?: boolean
}

export interface Chat {
    id?: string
    userId: string
    messages: Message[]
    title: string
    createdAt: string
    messageCount?: number
}
