import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { GuildState } from "./guildState";
import { MemberState } from "./memberState";

@Entity({ name: "infractions" })
export class Infraction {
    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    infractionId: number;

    @Column()
    description: number;

    @Column()
    createdAt: Date;

    @ManyToOne(() => MemberState, (member) => member.infractions)
    memberState: MemberState;

    @ManyToOne(() => GuildState, (guild) => guild.infractions)
    guildState: GuildState;
}
