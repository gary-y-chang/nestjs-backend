
export class CreateMemberDto {
    id: string;

    email: string;

    wallet_address: string;

    constructor(id: string, email: string, walletAddress: string){
        this.id = id;
        this.email = email;
        this.wallet_address = walletAddress;
    }

}
