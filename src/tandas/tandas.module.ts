import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TandasController } from './tandas.controller';
import { TandasService } from './tandas.service';
import { tandaSchema } from './tanda.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [ MongooseModule.forFeature([ { name: 'Tanda', schema: tandaSchema } ]), AuthModule ],
	controllers: [ TandasController ],
	providers: [ TandasService ]
})
export class TandasModule {}
