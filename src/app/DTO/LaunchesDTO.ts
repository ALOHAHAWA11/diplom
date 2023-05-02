import {LaunchDTO} from "./LaunchDTO";

export class LaunchesDTO {

  constructor(private _count?: number, private _next?: string, private _previous?: string,
              private _launches?: LaunchDTO[]) {
  }


  get count(): number {
    return this._count!;
  }

  set count(value: number) {
    this._count = value;
  }

  get next(): string {
    return this._next!;
  }

  set next(value: string) {
    this._next = value;
  }

  get previous(): string {
    return this._previous!;
  }

  set previous(value: string) {
    this._previous = value;
  }

  get launches(): LaunchDTO[] {
    return this._launches!;
  }

  set launches(value: LaunchDTO[]) {
    this._launches = value;
  }
}
