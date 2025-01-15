import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 이메일 중복 체크
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('이미 사용중인 이메일입니다');
    }

    // 닉네임 중복 체크
    const existingNickname = await this.usersRepository.findOne({
      where: { nickname: createUserDto.nickname },
    });

    if (existingNickname) {
      throw new ConflictException('이미 사용중인 닉네임입니다');
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    // 사용자 생성
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }
}
