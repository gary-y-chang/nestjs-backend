import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthConfig } from './auth.config';
import { CognitoUserPool,
         CognitoUser, 
         CognitoUserAttribute, 
         AuthenticationDetails 
        } from 'amazon-cognito-identity-js';
import { MembersService } from '../members/members.service';
import { CreateMemberDto } from '../members/dto/create-member.dto';
import { Twilio } from "twilio";

@Injectable()
export class AuthService {
    private userPool: CognitoUserPool;
    //private sessionUserAttributes: {};

    constructor(private readonly authConfig: AuthConfig, 
                private readonly membersService: MembersService){
      this.userPool = new CognitoUserPool({
          UserPoolId: this.authConfig.userPoolId,
          ClientId: this.authConfig.clientId,
        });
    }

    registerUser(registerRequest: {
        email: string;
        password: string; // wallet_address
        //email: string;
      }) {
        //const { name, email, password } = registerRequest;
        const { email, password} = registerRequest;
        return new Promise((resolve, reject) => {
          return this.userPool.signUp(
            email,
            password,
            [new CognitoUserAttribute({ Name: 'email', Value: email }), new CognitoUserAttribute({ Name: 'custom:is_admin', Value: '0'})],
            null,
            (err, result) => {
              if (!result) {
                reject(err);
              } else {
                let userId = result.userSub;
                let email = result.user.getUsername();
                //let is_email_confirmed = result.userConfirmed;
                //console.log(result);
                console.log(`email(username): ${result.user.getUsername()}`);
                console.log(`sub (id): ${result.userSub}`);
                console.log(`is_email_confirmed: ${result.userConfirmed}`);
                
                const member = this.membersService.create(new CreateMemberDto(userId, email, password));
                //resolve(result);
                resolve(member);
              }
            },
          );
        });
      }

      async authenticateUser(user: { name: string; password: string }) {
        const { name, password } = user;

        const member = await this.membersService.findByEmail(name);  
        if(member){
          if(!member.is_phone_confirmed){
              throw new Error("phone number is not confirmed yet.");  
          }
        }else{
          throw new Error("no such email existing.");
        }
        console.log('>>> ' + member.id);

        const authenticationDetails = new AuthenticationDetails({
          Username: name,
          Password: password,
        });
        const userData = {
          Username: name,
          Pool: this.userPool,
        };
    
        const newUser = new CognitoUser(userData);
    
        return new Promise((resolve, reject) => {
          return newUser.authenticateUser(authenticationDetails, {
            onSuccess: result => {
              resolve(result);
            },
            onFailure: err => {
              reject(err);
            },
          });
        });
      }

      confirmSignup(name: string, code: string) {
        const userData = {
          Username: name,
          Pool: this.userPool,
        };
        const newUser = new CognitoUser(userData);

        return new Promise((resolve, reject) => {
          newUser.confirmRegistration(code, 
                                    true,   
                                    (err, result) => {
                                      if (!result) {
                                        reject(err);
                                      } else {
                                        console.log(result);
                                        resolve(result);
                                      }
                                    },
          );

        });
      }

      resendConfirmationCode(name: string): Promise<any> {

        return new Promise((resolve, reject) => {
          const userData = {
            Username: name,
            Pool: this.userPool,
          };
          const cogtioUser = new CognitoUser(userData);
    
          cogtioUser.resendConfirmationCode((error, result) => {
                if (error) {
                    console.log('error');
                    console.log(error);
                    reject(error);
                } else {
                    console.log('result');
                    console.log(result);
                    resolve(result);
                }
            });
    
        });
       }

      async signUpPhone(phoneNumber: string, walletAddress: string){
         /**
         * 1. generate a random 6-digit code
         * 2. update member.phone_number = country_code + phone_number, member.phone_confirm_code = code
         * 3. send out SMS by twilio api   
         */
        let code = this.randomConfirmCode().toString();

        let member = await this.membersService.findByWallet(walletAddress);
        if(!member){
          throw new Error("no such wallet address existing.");
        }

        this.membersService.update(member.id, {
            phone_number: phoneNumber,
            phone_confirm_code: code
         });

        const twilio = new Twilio(this.authConfig.twilioAccountSid, this.authConfig.twilioAuthToken);
        twilio.messages.create({
          from: this.authConfig.twilioNumber,
          to: phoneNumber,
          body: `[AffinityCoin] Your confirm code: ${code}`,
        })
        .then((message) => console.log(message.sid));

      }

      confirmPhone(){

      }

      private randomConfirmCode(): number{
        let minm = 100000;
        let maxm = 999999;
        return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
      }  
}
