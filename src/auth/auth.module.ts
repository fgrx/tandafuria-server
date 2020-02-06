import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import config from '../config/keys';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({ secret: config.secretJwt, signOptions: { expiresIn: '36000s' } }),
		UsersModule,
		PassportModule
	],
	providers: [ AuthService, JwtStrategy ],
	exports: [ AuthService, PassportModule, JwtStrategy ],
	controllers: [ AuthController ]
})
export class AuthModule {}
