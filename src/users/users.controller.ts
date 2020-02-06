import { Controller, Post, Body, Put, UseGuards, Delete, Param } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.interface';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.usersService.create(createUserDto);
	}

	@Put()
	@UseGuards(AuthGuard('jwt'))
	updateUser(@GetUser() user, @Body() createUserDto: CreateUserDto): Promise<User> {
		return this.usersService.update(user, createUserDto);
	}

	@Delete(':id')
	@UseGuards(AuthGuard('jwt'))
	deleteUser(@GetUser() user, @Param() id: string): Promise<User> {
		return this.usersService.delete(user, id);
	}
}
