import { Module } from '@nestjs/common';
import { SpotifyController } from './spotify.controller';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';

@Module({
	controllers: [ SpotifyController ]
})
export class SpotifyModule {}
