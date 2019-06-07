import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Photo } from './photo.entity';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class Comment {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @OneToMany(type => Photo, photo => photo.comment)
  photos: Photo[];

  @ManyToOne(type => Post, post => post.comments)
  post: Post;

  @ManyToOne(type => User, user => user.comments)
  user: User;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToMany(type => User)
  @JoinTable()
  mentioned: User[];

}
