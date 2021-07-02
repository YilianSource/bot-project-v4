import { Command } from "../models/entities/command";
import { ArgumentType } from "../models/enums/argumentType";
import { Scope } from "../models/enums/scopes";

export default new Command({
    name: "prefix",
    description: "Changes the bot's prefix",
    usage: "{p}prefix [new-prefix]",
    example: `{p}prefix ?
              {p}prefix "a b c"`,
    scopes: [Scope.Moderator],
    cd: 1000,
    aliases: ["p"],
    args: [ArgumentType.String],
    async execute({ guildState, guildStateRepo }, msg, args) {
        guildState.prefix = args[0];
        guildStateRepo.save(guildState);

        msg.channel.send(
            `Prefix for ${msg.guild.name} is now set to **${args[0]}**.`
        );
    },
});
