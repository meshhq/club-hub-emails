import * as core from 'club-hub-core';
export declare const CompileEventEmail: (event: core.Event.Model, club: core.Club.Model) => Promise<string>;
export declare const CompileConfirmationEmail: (event: core.Event.Model, club: core.Club.Model) => Promise<string>;
