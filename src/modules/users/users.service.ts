import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { BusinessException } from '@/common/exceptions';
import { ErrorCode } from '@/common/constants';
import { VerificationService } from '../auth/services/verification.service';
import { MailService } from '../common/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly verificationService: VerificationService,
    private readonly mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 이메일 인증 여부 체크
    const isVerified = await this.verificationService.isEmailVerified(
      createUserDto.email,
    );
    if (!isVerified)
      throw new BusinessException(ErrorCode.USER.EMAIL_NOT_VERIFIED);

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

    await this.mailService.sendWelcomeEmail(
      createUserDto.email,
      createUserDto.nickname,
    );

    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByNickname(nickname: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { nickname } });
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new BusinessException(ErrorCode.USER.NOT_FOUND);
    }

    return user;
  }

  async update(
    condition: Partial<Pick<User, 'id' | 'email'>>,
    updateData: Partial<User>,
  ): Promise<User> {
    if ('id' in condition) {
      await this.usersRepository.update(condition.id, updateData);
      return this.findById(condition.id);
    } else if ('email' in condition) {
      await this.usersRepository.update({ email: condition.email }, updateData);
      return this.findByEmail(condition.email);
    }

    throw new Error('Invalid update condition');
  }
}
