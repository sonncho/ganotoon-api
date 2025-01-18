import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { BusinessException } from '@/common/exceptions';
import { ErrorCode } from '@/common/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 이메일 중복 체크
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new BusinessException(ErrorCode.USER.EMAIL_DUPLICATE);
    }

    // 닉네임 중복 체크
    const existingNickname = await this.findByNickname(createUserDto.nickname);
    if (existingNickname) {
      throw new BusinessException(ErrorCode.USER.NICKNAME_DUPLICATE);
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

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByNickname(nickname: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { nickname } });
  }

  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateData: Partial<User>,
  ): Promise<User | undefined> {
    await this.usersRepository.update(id, updateData);
    return this.findById(id);
  }
}
