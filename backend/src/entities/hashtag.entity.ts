import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';

@Entity()
export class Hashtag {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({
    fulltext: true,
  })
  text: string;

  @ManyToMany(type => Comment)
  @JoinTable()
  comments: Comment[];
}
