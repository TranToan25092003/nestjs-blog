import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
/**
 * clas tag service
 */
export class TagsService {
  /**
   * constructor
   */
  constructor(
    /**
     * inject tag repository
     */
    @InjectRepository(Tag) private readonly tagRepo: Repository<Tag>,
  ) {}

  /**
   * create a new tag
   */
  public async createTag(newTagDto: CreateTagDto): Promise<Tag> {
    const newTagRecord: Tag = this.tagRepo.create(newTagDto);

    return await this.tagRepo.save(newTagRecord);
  }

  /**
   * get tag by id
   */
  public async getTag(id: number) {
    return await this.tagRepo.findOneBy({ id: id });
  }

  /**
   * get multiple tag
   */
  public async getMultipTag(ids: number[]): Promise<Tag[]> {
    let tags = await this.tagRepo.find({
      where: {
        id: In(ids),
      },
    });

    return tags;
  }

  /**
   *delete a tag
   */
  public async deleteTag(id: number) {
    await this.tagRepo.delete(id);

    return {
      deleted: true,
      id: id,
    };
  }

  /**
   * soft delete
   */
  public async softDeleteTag(id: number) {
    await this.tagRepo.softDelete(id);
    return {
      deleted: true,
      id: id,
    };
  }
}
