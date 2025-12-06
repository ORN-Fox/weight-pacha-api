import jwt from "jsonwebtoken";
import moment from "moment";
let jwtidCounter = 0;
let blacklist = [];
const jwtService = {
    init: async () => {
        try {
            if (process.env.SERVER_JWT_ENABLED !== "true")
                throw new Error("[JWT] JWT is not enabled");
            console.log("[JWT] JWT service initialized");
        }
        catch (error) {
            console.log("[JWT] Error during JWT service initialization");
            throw error;
        }
    },
    jwtSign: (_payload) => {
        try {
            if (process.env.SERVER_JWT_ENABLED !== "true")
                throw new Error("[JWT] Fastify JWT flag is not setted");
            console.log("[JWT] Generating fastify JWT sign");
            const payload = JSON.parse(JSON.stringify(_payload));
            jwtidCounter = jwtidCounter + 1;
            return jwt.sign({ payload }, process.env.SERVER_JWT_SECRET, {
                expiresIn: Number(process.env.SERVER_JWT_TIMEOUT),
                jwtid: jwtidCounter.toString(),
            });
        }
        catch (error) {
            console.log("[JWT] Error during fastify JWT sign");
            throw error;
        }
    },
    jwtGetToken: (request) => {
        try {
            if (process.env.SERVER_JWT !== "true")
                throw new Error("[JWT] JWT flag is not setted");
            if (!request.headers.authorization ||
                request.headers.authorization.split(" ")[0] !== "Bearer")
                throw new Error("[JWT] JWT token not provided");
            return request.headers.authorization.split(" ")[1];
        }
        catch (error) {
            console.log("[JWT] Error getting JWT token");
            throw error;
        }
    },
    jwtVerify: (token) => {
        try {
            if (process.env.SERVER_JWT !== "true")
                throw new Error("[JWT] JWT flag is not setted");
            return new Promise((resolve, reject) => {
                jwt.verify(token, process.env.SERVER_JWT_SECRET, (err, decoded) => {
                    if (err)
                        reject(err);
                    const decodedPayload = decoded;
                    blacklist.forEach((element) => {
                        if (element.jti === decodedPayload.jti &&
                            element.iat === decodedPayload.iat &&
                            element.exp === decodedPayload.exp)
                            reject(err);
                    });
                    console.log(decodedPayload);
                    resolve(decodedPayload.payload);
                });
            });
        }
        catch (error) {
            console.log("[JWT] Error getting JWT token");
            throw error;
        }
    },
    jwtBlacklistToken: (token) => {
        try {
            while (blacklist.length &&
                moment().diff("1970-01-01 00:00:00Z", "seconds") > blacklist[0].exp) {
                console.log(`[JWT] Removing from blacklist timed out JWT with id ${blacklist[0].jti}`);
                blacklist.shift();
            }
            const decoded = jwt.decode(token);
            if (!decoded)
                throw new Error("Invalid token");
            const { jti, exp, iat } = decoded;
            console.log(`[JWT] Adding JWT ${token} with id ${jti} to blacklist`);
            blacklist.push({ jti: jti, exp: exp, iat: iat });
        }
        catch (error) {
            console.log("[JWT] Error blacklisting fastify JWT token");
            throw error;
        }
    },
};
export default jwtService;
