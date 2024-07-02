export interface UserSystem {
	id: number;
	username: string;
	password: string;
	full_name: string;
	address: string;
	phone_number: string;
	role: string;
	photo: string;
	created_at: Date;
	updated_at: Date;
}