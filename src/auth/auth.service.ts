import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDTO } from '../users/user.register.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { EmailService } from '../email/email.service';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async signIn(email, password) {
    const user = await this.usersService.findByMail(email);

    if (!user) throw new UnauthorizedException('No user with such credentials');

    if (!user.emailVerified)
      throw new UnauthorizedException('Unauthorized account');

    const match = await this.bcryptHashCompare(password, user.password);

    if (!match) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, email: user.email };

    return {
      token: await this.jwtService.signAsync(payload), // this creates new token, basically calls this refreshes token
    };
  }

  async verifyEmail(token: string): Promise<boolean> {
    return await this.usersService.verifyToken(token);
  }

  /* register should generate linkus */

  async register(user: RegisterUserDTO): Promise<User> {
    const hashedPassword = await this.bcryptHash(user.password);
    // @ts-ignore
    const newUser: User = await this.usersService.create({
      password: hashedPassword,
      email: user.email,
      emailVerified: false,
      emailToken: hashedPassword,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    await this.emailService.sendEmailVerifyLink(newUser.email, hashedPassword);

    return newUser;
  }

  async resetProfile(email: string): Promise<string> {
    const user = await this.usersService.findByMail(email);

    if (!user) throw new UnauthorizedException();

    const token = await this.bcryptHash(new Date().toUTCString());

    user.emailVerified = false;
    user.emailToken = token;

    await this.usersService.save(user);

    return await this.emailService.sendResetEmailVerificationLink(
      user.email,
      token,
    );
  }

  async updatePassword(token, password): Promise<UpdateResult> {
    return await this.usersService.updatePasswordByToken(
      decodeURIComponent(token),
      await this.bcryptHash(password),
    );
  }

  async bcryptHashCompare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async bcryptHash(password: string): Promise<string> {
    return bcrypt.hash(password, await bcrypt.genSalt());
  }
}
