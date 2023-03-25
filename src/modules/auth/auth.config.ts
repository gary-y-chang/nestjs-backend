import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthConfig {
    constructor(private readonly config: ConfigService){}
  
    userPoolId = this.config.get<string>('COGNITO_USER_POOL_ID');
    clientId = this.config.get<string>('COGNITO_CLIENT_ID');
    region = this.config.get<string>('COGNITO_REGION');
    authority = `https://cognito-idp.${this.region}.amazonaws.com/${this.userPoolId}`;
    env = this.config.get<string>('CURRENT_ENV');
    twilioAccountSid = this.config.get<string>('TWILIO_ACCOUNT_SID');
    twilioAuthToken = this.config.get<string>('TWILIO_AUTH_TOKEN');
    twilioNumber = this.config.get<string>('TWILIO_PHONE_NUMBER');
}