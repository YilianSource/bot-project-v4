import { Client } from "discord.js";

export class BotEvent {
    name: string;
    callback: (bot: Client, ...args: unknown[]) => Promise<void | unknown>;

    constructor(opt: BotEvent) {
        Object.assign(this, opt);
    }
}
