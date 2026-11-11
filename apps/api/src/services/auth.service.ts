type RegisterInput = {
  name: string;
  username: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

type SafeUser = {
  id: string;
  name: string;
  username: string;
  email: string;
};

function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}

function normaliseUsername(username: string): string {
  return username.trim().toLowerCase();
}

export async function registerUser(
  input: RegisterInput,
): Promise<SafeUser> {
  const normalisedEmail = normaliseEmail(input.email);
  const normalisedUsername = normaliseUsername(input.username)
  // normalise email and username
  // check for existing user
  // hash password
  // create user
  // return safe user
}