import {Product} from './Product';

export interface AuthUser {
	_id: string;
	username: string;
	password: string;
	mail: string;
	creationDate: string;
	profileImage: string;
	createdProducts: Product[];
	favorites: Product[];
	verificationCode: string;
	isEnabled: boolean;
  }
  