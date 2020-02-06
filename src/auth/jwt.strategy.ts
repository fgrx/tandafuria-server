import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import config from '../config/keys';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../users/user.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly usersService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: config.secretJwt
		});
	}

	async validate(payload: JwtPayload): Promise<User> {
		const { username } = payload;
		const user: User = await this.usersService.findOne(username);

		if (!user) throw new UnauthorizedException();

		return user;
	}
}
