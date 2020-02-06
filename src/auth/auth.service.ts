import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import config from '../config/keys';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from 'src/users/user.interface';
import { AuthCredentialsDto } from './authCredentialsDto.dto';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

	async validateUser(email: String, pass: String): Promise<any> {
		const user = await this.usersService.findOne(email);

		const resultComparisonPasswords = await bcrypt.compare(config.salt + pass, user.password);

		if (user && resultComparisonPasswords) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async signIn(authCredentialsDto: AuthCredentialsDto) {
		const isValid = await this.validateUser(authCredentialsDto.username, authCredentialsDto.password);
		if (!isValid) throw new UnauthorizedException('Invalid credentials');
		const user = await this.usersService.findOne(authCredentialsDto.username);
		const payload: JwtPayload = { username: user.username, role: user.role, id: user.id, nickname: user.nickname };
		const accessToken = await this.jwtService.sign(payload);
		return { accessToken };
	}
}
