import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

import { OAuth2Client } from 'google-auth-library';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';

import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private httpService: HttpService,
  ) {}
  async getAccessToeknInfo(access_token) {
    const CLIENT_ID =
      '916373523653-i8f4llc8qb74ktav55p5fc7vmvhgp8n7.apps.googleusercontent.com';
    const client = new OAuth2Client(CLIENT_ID);

    // let tokenInfo = null;
    const tokenInfo = client.getTokenInfo(access_token);
    // try {
    // } catch(e) {
    //   console.log("invalid_token Error :", e)
    //   return e
    // }

    return tokenInfo;
  }

  getUserProfile(access_token: string): Observable<AxiosResponse<any>> {
    return this.httpService
      .get('https://www.googleapis.com/oauth2/v3/userinfo', {
        params: {
          access_token: access_token,
        },
      })
      .pipe(
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      );
  }

  async findUser(id: User['google_id']) {
    return this.userModel
      .findOne({
        google_id: id,
      })
      .exec();
  }

  async getUserForAPIRequest(access_token: string) {
    const userProfile = await this.getUserProfile(access_token)
      .pipe(
        map((res) => {
          console.log('res: ', res);
          return res;
        }),
      )
      .toPromise();

    const user = await this.findUser(userProfile.data['sub']);
    return user;
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async register(access_token) {
    const accessToeknInfo = await this.getAccessToeknInfo(access_token).catch(
      (e) => {
        console.error;
        return e;
      },
    );

    const userProfile = await this.getUserProfile(access_token).toPromise();
    const user = await this.findUser(userProfile.data['sub']);

    let createUser = null;
    if (!user) {
      createUser = await this.signIn(userProfile);
    }

    return user
      ? {
          google_id: user.google_id,
          email: user.email,
          name: user.name,
          picture: user.picture,
          access_token: access_token,
        }
      : false;
  }

  async signIn(userProfile) {
    const user = new this.userModel({
      google_id: userProfile.sub,
      email: userProfile.email,
      name: userProfile.name,
      picture: userProfile.picture,
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
