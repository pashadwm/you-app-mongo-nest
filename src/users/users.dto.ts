export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface ProfileDTO {
  email: string;
  displayName: string;
  gender: string;
  birthday: string;
  age: string;
  horoscope: string;
  zodiac: string;
  height: string;
  heightUnit: string;
  weight: string;
}
