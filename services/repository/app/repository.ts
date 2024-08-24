import { ForMonitoring } from "../ports/drivens";
import { ForManagingUser } from "../ports/drivers";
import { User } from "./schemas/user";

export class Repository implements ForManagingUser {
    private userList: User[] = [];
    constructor(private readonly logger: ForMonitoring) {};

    async getUser(email: string): Promise<User> {
        const user = this.userList.find((user) => user.email === email);
    
        if(!user){
            this.logger.log('GetUser', 'User not found');
            throw new Error('User not found');
        }

        console.log('USER', user)
        return user;
    }

    async createUser(user: User, password: string): Promise<User> {
        const userExists = this.userList.find((user) => user.email === user.email);

        if(userExists){
            this.logger.log('CreateUser', "This user already exists");
            throw new Error('User already exists')
        }

        const newUser = {
            ...user,
            password,
            id: String(this.userList.length + 1),
        }

        this.userList.push(newUser);
        console.log('CREATE USER', newUser)

        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }; 
    }
    
}