import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Photo } from './photo.entity';
import { Post } from './post.entity';
import { Comment } from './comment.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  email: string;

  @Column( { type: 'varchar', width: 64} )
  password;

  @Column()
  avatarUrl: string;

  @ManyToMany(type => User)
  @JoinTable()
  following: User[];

  @ManyToMany(type => User)
  @JoinTable()
  followers: User[];

  @OneToMany(type => Post, post => post.user)
  posts: Post[];

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];

}
