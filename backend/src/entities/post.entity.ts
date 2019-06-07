import { Column, Entity, IsNull, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Photo } from './photo.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Hashtag } from './hashtag.entity';

@Entity()
export class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  createdAt: Date;

  @Column({
    nullable: true,
  })
  updatedAt: Date;

  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];

  @ManyToOne(type => User, user => user.posts)
  user: User;

  @ManyToMany(type => User)
  @JoinTable()
  mentioned: User[];

  @ManyToMany(type => Hashtag)
  @JoinTable()
  hashtags: Hashtag[];
}
