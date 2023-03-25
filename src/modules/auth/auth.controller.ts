import { Controller, Post, Body, BadRequestException, Get } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { SignUpDto } from './dto/index'
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'api for user to sign up' })
    @ApiBody({
      type: SignUpDto,
      examples: {
        a: {
            summary: "body example",
            value: {email: 'gary@4idps.com', password: 'replaced with wallet address'}
        },
    }
    })
    //@ApiResponse({ status: 400, description: 'An account with the given email already exists.'})
    @Post('signup')
    async register(@Body() registerRequest: SignUpDto,) {
      try {
        return await this.authService.registerUser(registerRequest);
      } catch (err) {
        throw new BadRequestException(err.message);
      }
    }

    @Post('login')
    async login(@Body() authenticateRequest: { name: string, password: string }) {
      try {
        return await this.authService.authenticateUser(authenticateRequest);
      } catch (err) {
        throw new BadRequestException(err.message);
      }
    }

    @Post('resend')
    async resend(@Body() body: {name: string}) {
      try {
        return await this.authService.resendConfirmationCode(body.name);
      } catch (e) {
        console.log(`---> ${e.message}`);
        throw new BadRequestException(e.message);
      }
    }

    @Post('signup/phone')
    async signUpByPhone(@Body() body: {country_code: string, phone_number: string, wallet_address: string}) {
      console.log(body);
      const { country_code, phone_number, wallet_address } = body;
      try{
        return await this.authService.signUpPhone(`${country_code}${phone_number}`, wallet_address);
      } catch (e) {
        console.log(`---> ${e.message}`);
        throw new BadRequestException(e.message);
      } 
    }
      
}
