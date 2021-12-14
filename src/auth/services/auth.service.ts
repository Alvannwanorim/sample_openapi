import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
} from '../inputs/user.input';
import { User, UserDocument } from '../models/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async createUser(createUserDTO: CreateUserInput) {
    try {
      const user = await this.userModel.findOne({ email: createUserDTO.email });

      if (user) {
        return {
          message: 'User Already exists',
        };
      }
      const newUser = new this.userModel({ ...createUserDTO });

      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(createUserDTO.password, salt);
      await newUser.save();

      return {
        firstName: newUser.firstName,
        lastName: newUser.firstName,
        email: newUser.email,
        role: newUser.role,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async login(input: LoginUserInput) {
    try {
      const { email, password } = input;

      const user = await this.userModel.findOne({ email });

      if (!user) {
        return {
          message: `this user with email:${email} does not exist`,
        };
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new NotAcceptableException(`Password does not match `);
      }

      const userPayload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      const payload = await this.jwtService.signAsync({ user: userPayload });

      return { token: payload };
    } catch (err) {
      return {
        message: 'server error',
      };
    }
  }

  async getUser(user: any) {
    try {
      const loginInUser = await this.userModel
        .findById(user.id)
        .select('-password');
      if (!loginInUser) {
        return {
          message: `this user does not exist`,
        };
      }

      return loginInUser;
    } catch (err) {
      console.log(err);
    }
  }

  async getUsers() {
    try {
      const users = await this.userModel.find().select('-password');

      return users;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteUser(user: any) {
    const { id } = user;
    try {
      const user = await this.userModel.findById(id);

      if (!user) {
        return {
          message: 'Iser not found',
        };
      }

      await this.userModel.deleteOne(id);
      return {
        message: 'User deleted succesfully',
      };
    } catch (err) {
      console.log(err);
    }
  }
  async updateUser(input: UpdateUserInput, user: any) {
    const { id } = user;
    try {
      const user = await this.userModel.findById(id);

      if (!user) {
        return {
          message: 'Iser not found',
        };
      }

      const updatedUsed = await this.userModel.findByIdAndUpdate(
        id,
        { input },
        { new: true },
      );
      return updatedUsed;
    } catch (err) {
      console.log(err);
    }
  }
}
