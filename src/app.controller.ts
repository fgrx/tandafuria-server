import { Controller, Get } from '@nestjs/common';

@Controller('pouets')
export class AppController {
	constructor() {}

	@Get('/')
	testing() {
		console.log('coucou');
	}
}
