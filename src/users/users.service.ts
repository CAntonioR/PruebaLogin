import { Injectable } from '@nestjs/common';
import { User } from './users.entity';


@Injectable()
export class UsersService {
    private users = [
        {
            id: 0,
            username: 'Antonio',
            password: 'pelicano',
        },
        {
            id: 1,
            username: 'Alvaro',
            password: 'Koala',
        },
    ];

    async findOne(username: string): Promise<User>{
        //Busca en el array de users un username igual al que haya puesto para ver si lo encuentra. 
        return this.users.find(user => user.username === username);
    }
}
