import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'A senha precisa ter no mínimo 8 dígitos com pelo menos 1 número e 1 símbolo',
    },
  )
  password: string;
}
