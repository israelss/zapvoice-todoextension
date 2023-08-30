import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword(
    {},
    {
      message:
        'A senha precisa ter no mínimo 8 dígitos com pelo menos 1 letra minúscula, 1 letra maiúscula, 1 número e 1 símbolo',
    },
  )
  password: string;
}
