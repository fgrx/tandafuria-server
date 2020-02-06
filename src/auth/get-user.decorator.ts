import { createParamDecorator } from '@nestjs/common';
import { User } from 'src/users/user.interface';

export const GetUser = createParamDecorator((data, req): User => {
	const user = req.user;
	user.id = user._id;
	return user;
});
