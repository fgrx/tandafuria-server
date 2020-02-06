import { Injectable } from '@nestjs/common';
import { Tanda } from './tanda.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/user.interface';

@Injectable()
export class TandasService {
	constructor(@InjectModel('Tanda') private readonly tandaModel: Model<Tanda>) {}

	async findAll(offset: number, limit: number): Promise<Tanda[]> {
		return await this.tandaModel.find({ isPublic: true }).skip(offset).limit(limit);
	}

	async findAllFromUser(idUser: string, offset: number, limit: number): Promise<Tanda[]> {
		return await this.tandaModel.find({ 'author.id': idUser }).skip(offset).limit(limit);
	}

	async findPublicFromUser(idUser, offset: number, limit: number): Promise<Tanda[]> {
		return await this.tandaModel.find({ 'author.id': idUser, isPublic: true }).skip(offset).limit(limit);
	}

	async findOne(id: string): Promise<Tanda> {
		return await this.tandaModel.findOne({ _id: id });
	}

	async create(tanda: Tanda, user: User): Promise<Tanda> {
		const currentDate = new Date();
		tanda.date = currentDate;

		tanda.author = { id: user.id, name: user.nickname };
		const newTanda = new this.tandaModel(tanda);
		return await newTanda.save();
	}

	async delete(id: string, user: User): Promise<Tanda> {
		const tanda = await this.findOne(id);
		if (tanda.author.id === user.id) return await this.tandaModel.findByIdAndRemove(id);
	}

	async update(id: string, tanda: Tanda, user: User): Promise<Tanda> {
		return await this.tandaModel.findByIdAndUpdate(id, tanda, { new: true });
	}
}
