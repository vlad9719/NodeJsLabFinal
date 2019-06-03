import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Photo } from './photo.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(type => Photo, photo => photo.post)
  photos: Photo[];

  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];

  @ManyToOne(type => User, user => user.posts)
  user: User;

  @ManyToMany(type => User)
  @JoinTable()
  mentioned: User[];

}
