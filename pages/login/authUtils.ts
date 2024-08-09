export type SignupInputId =
  | "email"
  | "name"
  | "password"
  | "passwordConfirmation";

export type LoginInputId =
  | "email"
  | "name"
  | "password"
  | "passwordConfirmation";

export const isValidEmail = (email: string) => {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email);
};

export const getErrorMessage = (
  type: "email" | "name" | "password" | "passwordConfirmation",
  value: string,
  password?: string
): string => {
  const trimmedValue = value.trim();
  switch (type) {
    case "email":
      if (!trimmedValue) return "이메일을 입력해 주세요";
      if (!isValidEmail(trimmedValue)) return "잘못된 이메일 형식입니다";
      return "";
    case "name":
      return trimmedValue ? "" : "이름을 입력해 주세요";
    case "password":
      if (!trimmedValue) return "비밀번호를 입력해 주세요";
      if (trimmedValue.length < 8) return "비밀번호를 8자 이상 입력해 주세요";
      return "";
    case "passwordConfirmation":
      if (trimmedValue !== password) return "비밀번호가 일치하지 않습니다";
      return "";
    default:
      return "";
  }
};
