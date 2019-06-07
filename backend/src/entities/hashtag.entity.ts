import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';

@Entity()
export class Hashtag {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToMany(type => Post)
  @JoinTable()
  posts: Post[];

  @ManyToMany(type => Comment)
  @JoinTable()
  comments: Comment[];
}
