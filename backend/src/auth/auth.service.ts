import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

import { OAuth2Client } from 'google-auth-library';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async getOAuthPayload(id_token) {
    const CLIENT_ID =
      '916373523653-i8f4llc8qb74ktav55p5fc7vmvhgp8n7.apps.googleusercontent.com';
    const client = new OAuth2Client(CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: CLIENT_ID,
      // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    return payload;
  }

  async findUser(id: number) {
    return this.userModel
      .findOne({
        google_id: id,
      })
      .exec();
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async checkRegister(id_token) {
    const OAuthPayload = await this.getOAuthPayload(id_token).catch((e) => {
      console.error;
      return {};
    });

    const user = await this.findUser(OAuthPayload['sub']);

    let createUser = null;
    if (!user) {
      createUser = await this.signIn(OAuthPayload);
    }

    return user
      ? {
          google_id: user.google_id,
          email: user.email,
          name: user.name,
          picture: user.picture,
        }
      : false;
  }

  async signIn(TokenPayload) {
    const user = new this.userModel({
      google_id: TokenPayload.sub,
      email: TokenPayload.email,
      name: TokenPayload.name,
      picture: TokenPayload.picture,
    });

    return user.save();
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
