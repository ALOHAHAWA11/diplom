export class RocketDTO {
  constructor(private id: number, private full_name: string) {
  }

  public get get_id() {
    return this.id;
  }

  public set set_id(new_id: number) {
    this.id = new_id;
  }

  public get get_full_name() {
    return this.full_name;
  }

  public set set_full_name(new_full_name: string) {
    this.full_name = new_full_name;
  }
}
