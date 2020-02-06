import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';
import { TandasModule } from './tandas/tandas.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SpotifyModule } from './spotify/spotify.module';

@Module({
	imports: [ TandasModule, MongooseModule.forRoot(config.mongoURI), UsersModule, AuthModule, SpotifyModule ],
	controllers: [ AppController ],
	providers: []
})
export class AppModule {}
