import { Client } from "discord.js";

import { BotEvent } from "../models/entities/event";

export default new BotEvent({
    name: "ready",
    callback: async (bot: Client): Promise<void> => {
        console.log(`${bot.user.username} is ready!`);
    },
});
