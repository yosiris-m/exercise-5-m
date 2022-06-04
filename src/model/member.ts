import { Gender } from '../enums/gender';

export class Member {
  constructor(
    public name: string,
    public lastName: string,
    public memberNumber: number,
    public legalId: string,
    public telephone: string,
    public gender: Gender
  ) {}

  static newEmptyMember() {
    return new Member('', '', 0, '', '', Gender.FEMALE);
  }
}
