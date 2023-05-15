export class PadDTO {
  constructor(private id: number, private wiki_url: string, private latitude: string,
              private longitude: string, private total_launch_count: number) {
  }

  public get get_id() {
    return this.id;
  }

  public set set_id(new_id: number) {
    this.id = new_id;
  }

  public get get_wiki_url() {
    return this.wiki_url;
  }

  public set set_wiki_url(url: string) {
    this.wiki_url = url;
  }

  public get get_latitude() {
    return this.latitude;
  }

  public set set_latitude(new_latitude: string) {
    this.latitude = new_latitude;
  }

  public get get_longitude() {
    return this.longitude;
  }

  public set set_longitude(new_longitude: string) {
    this.longitude = new_longitude;
  }


  get get_total_launch_count(): number {
    return this.total_launch_count;
  }

  set set_total_launch_count(value: number) {
    this.total_launch_count = value;
  }
}
