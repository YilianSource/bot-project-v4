import { Client, Collection } from "discord.js";
import "reflect-metadata";
import * as typeorm from "typeorm";

import { Command } from "./models/entities/command";
import { BotEvent } from "./models/entities/event";
import config from "./util/global";
import { walkRequire } from "./util/walkRequire";

export { config };
export const bot: Client = new Client({
    restTimeOffset: 0,
});
export const commands: Collection<string, Command> = new Collection<
    string,
    Command
>();

(async function bootstrap() {
    walkRequire<Command>(__dirname + "/commands").forEach((command) => {
        commands.set(command.name, command);
    });
    walkRequire<BotEvent>(__dirname + "/events").forEach((event) => {
        bot.on(event.name, event.callback.bind(null, bot));
    });

    const connection = await typeorm.createConnection();
    console.log(`Connected to ${connection.driver.database} database!`);

    await bot.login(config.BOT_TOKEN);
})();
