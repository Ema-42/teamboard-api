import * as bcrypt from 'bcrypt';

export async function hashPassword(
  password: string,
  saltRounds: number = 10,
): Promise<string> {
  return await bcrypt.hash(password, saltRounds);
}
