/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

import { Scope } from "../../models/enums/scopes";
import { GuildState } from "./guildState";
import { Infraction } from "./infraction";

@Entity({ name: "memberstates" })
export class MemberState {
    @PrimaryGeneratedColumn()
    _id: string;

    @Column()
    memberId: string;

    @ManyToOne(() => GuildState, (guildState) => guildState.memberStates)
    guildState: Promise<GuildState>;

    @OneToMany(() => Infraction, (infraction) => infraction.memberState)
    infractions: Promise<Infraction[]>;

    @Column()
    private _scopes: string = "";

    scopes(): Scope[] {
        return (
            this._scopes
                .split("-")
                /* Filters away empty strings when there are no scopes granted at first */
                .filter(Boolean)
                // fixme
                .map((str) => (Scope as any)[str])
        );
    }

    setScopes(scopes: Scope[]): Scope[] {
        this._scopes = scopes.join("-");
        return this.scopes();
    }

    addScope(scope: Scope): Scope[] {
        const scopes = this.scopes();
        if (!scopes.includes(scope)) scopes.push(scope);
        return this.setScopes(scopes);
    }

    removeScope(scope: Scope): Scope[] {
        const scopes = this.scopes();
        if (scopes.includes(scope)) scopes.splice(scopes.indexOf(scope), 1);
        return this.setScopes(scopes);
    }
}
