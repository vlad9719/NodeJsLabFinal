import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
import { Comment } from './comment.entity';

@Entity()
export class Photo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @OneToOne(type => Post)
  @JoinColumn()
  post: Post;

  @ManyToOne(type => Comment, comment => comment.photos)
  comment: Comment;

}
