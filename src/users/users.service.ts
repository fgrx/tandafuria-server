import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import config from '../config/keys';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
	private readonly users: User[];

	constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

	async create(user: User): Promise<User> {
		if (!this.findOne(user.username)) {
			user.role = 'user';
			user.date = new Date();
			user.password = await bcrypt.hash(config.salt + user.password, 10);
			const newUser = new this.userModel(user);
			return await newUser.save();
		} else {
			throw new Error('User already exist');
		}
	}

	async update(userFromToken: User, userToUpdate: User): Promise<User> {
		const userIndDb = await this.getUserFromId(userFromToken.id);
		const userRole = userIndDb.role;

		if (userFromToken.id === userToUpdate.id || userRole === 'admin')
			return await this.userModel.findByIdAndUpade(userFromToken.id, userToUpdate, { new: true });

		throw new Error('You are not authoried to update this user');
	}

	async delete(userFromToken: User, id: String): Promise<User> {
		const userIndDb = await this.getUserFromId(userFromToken.id);
		const userRole = userIndDb.role;
		console.log('the id', id);
		if (userFromToken.id === id || userRole === 'admin') return await this.userModel.findByIdAndRemove(id);

		throw new Error('You are not authorized to delete this user');
	}

	async findOne(username: String): Promise<User> {
		return await this.userModel.findOne({ username });
	}

	async getUserFromId(id: string): Promise<User> {
		return await this.userModel.findOne({ _id: id });
	}
}
