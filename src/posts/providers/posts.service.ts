import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/users/providers/users.service';
import { Post } from '../post.entity';
import { User } from 'src/users/user.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { Tag } from 'src/tags/tag.entity';
import { PatchPostDto } from '../dtos/patch-post.dto';

import { GetPostDto } from '../dtos/get-post.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination-provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreatePostProvider } from './create-post.provider';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserInterface } from 'src/auth/interfaces/Active-User-data.interface';

/**
 * post service contain method relate to service
 */
@Injectable()
export class PostsService {
  /**
   * constructor
   */
  constructor(
    /**
     * inject user service
     */
    private readonly userService: UserService,

    /**
     * inject repositoyr of post
     */
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,

    /**
     * inject repository of metaOption
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionRepo: Repository<MetaOption>,

    /**
     * inject tag service
     */
    private readonly tagService: TagsService,

    /**
     * inject pagination provider
     */
    private readonly paginationProvider: PaginationProvider,

    /**
     * inject create post provider
     */
    private readonly createPostProvider: CreatePostProvider,
  ) {}

  /**
   * create a new post
   */
  public async createPost(
    createPostDto: CreatePostDto,
    user: ActiveUserInterface,
  ): Promise<Post> {
    return await this.createPostProvider.createPost(createPostDto, user);
  }

  /**
   * get all post by id
   */
  public async getAllPostByUserId(
    id: number,
    postQuery: GetPostDto,
  ): Promise<Paginated<Post>> {
    // let posts = await this.postRepo.find(
    //   {
    //     where: {
    //       author: {
    //         id: id,
    //       },
    //     },
    //     take: postQuery.limit,
    //     skip: (postQuery.page - 1) * postQuery.limit,
    //   },

    // relations: {
    //   metaOptions: true,
    //   author: true,
    //   tags: true,
    // },
    // );

    const posts = await this.paginationProvider.paginatedQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.postRepo,
    );

    return posts;
  }

  /**
   * get all post
   */
  public async getAllPost(): Promise<Post[]> {
    let posts = await this.postRepo.find();

    return posts;
  }

  /**
   * delete a post
   */
  public async deletePost(id: number) {
    // find the post
    let thePost = undefined;
    try {
      thePost = await this.postRepo.delete(id);
    } catch (error) {
      throw new RequestTimeoutException('Something wrong try another time', {
        description: 'Can not connect to db',
      });
    }

    if (thePost.affected === 0) {
      throw new BadRequestException('Can not delete id is incorrect', {
        description: 'id is in correct',
      });
    }
    return {
      deleted: true,
      id: id,
    };
  }

  /**
   * update post
   */
  public async updatePost(newPost: PatchPostDto) {
    let tags: Tag[] = undefined;
    try {
      // find the tags
      tags = await this.tagService.getMultipTag(newPost.tags);
    } catch (error) {
      throw new RequestTimeoutException('Something wrong try another time', {
        description: 'Can not connect to db',
      });
    }

    // tag id is not exist
    if (!tags || tags.length != newPost.tags.length) {
      throw new BadRequestException('tag does not exist', {
        description: 'tag id was not corect',
      });
    }

    // find the post
    let thePost: Post = undefined;

    try {
      thePost = await this.postRepo.findOneBy({ id: newPost.id });
    } catch (error) {
      throw new RequestTimeoutException('Something wrong try another time', {
        description: 'Can not connect to db',
      });
    }

    // post does not exist
    if (!thePost) {
      throw new BadRequestException('post does not exist', {
        description: 'post id was not corect',
      });
    }

    //update the post
    thePost.title = newPost.title ?? thePost.title;
    thePost.status = newPost.status ?? thePost.status;
    thePost.content = newPost.content ?? thePost.content;
    thePost.slug = newPost.slug ?? thePost.slug;
    thePost.postType = newPost.postType ?? thePost.postType;
    thePost.featureImgUrl = newPost.featureImgUrl ?? thePost.featureImgUrl;
    thePost.publishOn = newPost.publishOn ?? thePost.publishOn;
    // assign a new tag to the post
    thePost.tags = tags;
    // save and return the post

    try {
      return await this.postRepo.save(thePost);
    } catch (error) {
      throw new RequestTimeoutException('Something wrong try another time', {
        description: 'Can not connect to db',
      });
    }
  }
}
