import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './authCredentialsDto.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/signin')
	signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
		return this.authService.signIn(authCredentialsDto);
	}
}
