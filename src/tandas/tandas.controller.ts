import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CreateTandaDto } from './create-tanda.dto';
import { Tanda } from './tanda.interface';
import { TandasService } from './tandas.service';

import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tandas')
export class TandasController {
	private limit: number = 20;
	constructor(private readonly tandaService: TandasService) {}

	@Get(':offset')
	findAllTandas(@Param('offset') offset): Promise<Tanda[]> {
		const offsetToInt = parseInt(offset);
		return this.tandaService.findAll(offsetToInt, this.limit);
	}

	@Get('/user/:id/:offset')
	findAllTandasFromUser(@Param('id') idUser, @Param('offset') offset): Promise<Tanda[]> {
		const offsetToInt = parseInt(offset);
		return this.tandaService.findAllFromUser(idUser, offsetToInt, this.limit);
	}

	@Get(':id')
	findOne(@Param('id') id): Promise<Tanda> {
		return this.tandaService.findOne(id);
	}

	@UseGuards(AuthGuard('jwt'))
	@Post()
	addTanda(@GetUser() user, @Body() createTandaDto: CreateTandaDto): Promise<Tanda> {
		return this.tandaService.create(createTandaDto, user);
	}

	@UseGuards(AuthGuard('jwt'))
	@Delete(':id')
	deleteTanda(@GetUser() user, @Param('id') id): Promise<Tanda> {
		return this.tandaService.delete(id, user);
	}

	@UseGuards(AuthGuard('jwt'))
	@Put(':id')
	updateTanda(@GetUser() user, @Param('id') id, @Body() updateTandaDto: CreateTandaDto): Promise<Tanda> {
		return this.tandaService.update(id, updateTandaDto, user);
	}
}
