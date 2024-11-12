import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { db } from '@/db/index';
import { sql } from 'drizzle-orm';

// imports actual table from the db declaration
import { users } from '@/db/tables/user';
import { eq } from 'drizzle-orm'; // Import the comparison function

import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  async signin(signinDto: SigninDto) {
    const { password, name } = signinDto;
    console.log(signinDto, '<');
    const existingUser = await db.select().from(users).where('nam');

    console.log(existingUser);
  }

  async signup(signupDto: SignupDto) {
    const { email, password, name } = signupDto;
    console.log(signupDto);
    let newPassword = password.toString();

    // Check if all fields are provided
    if (!email || !password || !name) {
      throw new BadRequestException('All fields are required');
    }

    // Check if user with the given email already exists

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email)) // Use eq for equality comparison
      .limit(1) // Limit the result to one row (this replaces `.first()`)
      .execute(); // Execute the query

    // If a user is found, return the first result (or handle the result as needed)
    const user = existingUser[0];

    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // // Insert the new user into the database
    const [newUser] = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        name,
      })
      .returning();

    return newUser;
  }
}
