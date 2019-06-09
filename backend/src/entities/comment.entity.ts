import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';
import { Photo } from './photo.entity';

@Entity()
export class Comment {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({
    fulltext: true,
  })
  text: string;

  @ManyToOne(type => Post, post => post.comments)
  post: Post;

  @ManyToOne(type => User, user => user.comments)
  user: User;

  @Column()
  createdAt: Date;

  @Column({
    nullable: true,
  })
  updatedAt: Date;

  @ManyToMany(type => User)
  @JoinTable()
  mentioned: User[];

  @OneToOne(type => Photo)
  @JoinTable()
  photo: Photo;

}
