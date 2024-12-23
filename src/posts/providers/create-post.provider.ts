import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { TagsService } from 'src/tags/providers/tags.service';
import { Tag } from 'src/tags/tag.entity';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserInterface } from 'src/auth/interfaces/Active-User-data.interface';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/providers/users.service';

@Injectable()
export class CreatePostProvider {
  /**
   * constructor
   */
  constructor(
    /**
     * inject tagService
     */
    private readonly tagService: TagsService,

    /**
     * inject user service
     *  */
    private readonly userService: UserService,

    /**
     * inject post repository
     */
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  /**
   * create a new post
   */
  public async createPost(
    createPostDto: CreatePostDto,
    user: ActiveUserInterface,
  ): Promise<Post> {
    const errorExecption = new RequestTimeoutException(
      'Something wrong please try later',
    );

    let author: User = undefined;
    let tags: Tag[] = undefined;

    try {
      // find author
      author = await this.userService.findOne(user.sub);

      // get all tag
      tags = await this.tagService.getMultipTag(createPostDto.tags);
    } catch (error) {
      throw errorExecption;
    }

    // create post
    let newPostRecord: Post = this.postRepo.create({
      ...createPostDto,
      tags: tags,
      author: author,
    });

    let newPost: Post = undefined;

    if (tags.length != createPostDto.tags.length) {
      throw new BadRequestException('please check your tag');
    }

    try {
      newPost = await this.postRepo.save(newPostRecord);
    } catch (error) {
      throw errorExecption;
    }

    return newPost;
  }
}
