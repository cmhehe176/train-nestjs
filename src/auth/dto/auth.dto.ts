import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDTO{
	@IsString()
	name: string

	@IsString()
	@IsNotEmpty()
	email: string 
	@IsString()
	address: string

	@IsString()
	password: string
	@IsString()
	role: string
}
export class LoginDTO{
	@IsString()
	@IsNotEmpty()
	email:string

	@IsString()
	password: string
}