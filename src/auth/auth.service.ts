import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService, 
        private jwtService: JwtService,     //Servicio para tokens 
      ) {}
    
      async signIn(
        username: string,
        pass: string,
      ): Promise<{ access_token: string }> {
        // Buscar el usuario en la base de datos
        const user = await this.usersService.findOne(username);
        // Verifico si encuentro un usuario y si la contraseña coincide
        if (user?.password !== pass) {
        // Si la contraseña no coincide se lanza esta excepcion
          throw new UnauthorizedException();
        }
        // Si la autenticación sale bien, genero un token 
        const payload = { sub: user.id, username: user.username };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
}
