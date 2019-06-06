import { Column, Entity, IsNull, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { NullableTypeAnnotation } from '@babel/types';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar',
  charset: 'cp1251',
  nullable: true,
  })
  login: string;

  @Column({
    unique: true,
    nullable: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  password: string;

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

  @Column({
    nullable: true,
  })
  thirdPartyId: string;

  @Column({
    nullable: true,
  })
  thirdPartyProvider: string;

}
