import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../meta-option.entity';
import { Repository } from 'typeorm';
import { MetaOptionDto } from '../dtos/post-metaOption.dto';

@Injectable()
export class MetaOptionService {
  /**
   * contructor
   */
  constructor(
    /**
     * inject meta option repo
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionRepo: Repository<MetaOption>,
  ) {}

  /**
   * create meta option method
   */
  public async createMetaOption(
    newMeataOption: MetaOptionDto,
  ): Promise<MetaOption> {
    let newRecord: MetaOption = this.metaOptionRepo.create(newMeataOption);
    newRecord = await this.metaOptionRepo.save(newRecord);
    return newRecord;
  }
}
