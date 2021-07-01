import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private usersRepository: IUsersRepository) { }

  execute({ user_id }: IRequest): User[] {
    const userExists = this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new Error("User doesnt exists");
    }

    if (!userExists.admin) {
      throw new Error("User doesnt a admin. Restricted access for admin");
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
