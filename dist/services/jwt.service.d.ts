import { Request } from "express";
declare const jwtService: {
    init: () => Promise<void>;
    jwtSign: (_payload: Record<string, any>) => string;
    jwtGetToken: (request: Request) => string;
    jwtVerify: (token: string) => Record<string, any>;
    jwtBlacklistToken: (token: string) => void;
};
export default jwtService;
