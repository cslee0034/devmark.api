import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoxDto } from '../dto/create-box.dto';
import { BoxEntity } from '../entities/box.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(BoxEntity)
    private readonly boxRepository: Repository<BoxEntity>,
  ) {}
}
