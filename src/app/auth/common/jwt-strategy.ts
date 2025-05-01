import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt , Strategy } from "passport-jwt";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor( 
        // private readonly configService: ConfigService,
    ) {
        // const jwtConfig = configService.get('jwt');
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:  `${process.env.JWT_SECRET}`
        })
    }

    async validate(payload: { sub: string; email: string; roles: string[]}){
        return { userId: payload.sub, email: payload.email };
    }

}