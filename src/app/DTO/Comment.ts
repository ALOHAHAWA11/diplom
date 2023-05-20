export class Comment {
  constructor(private launch_id: string, private content: string,
              private author_id: string, private published_date: Date) {
  }


  get get_launch_id(): string {
    return this.launch_id;
  }

  set set_launch_id(value: string) {
    this.launch_id = value;
  }

  get get_content(): string {
    return this.content;
  }

  set set_content(value: string) {
    this.content = value;
  }

  get get_author_id(): string {
    return this.author_id;
  }

  set set_author_id(value: string) {
    this.author_id = value;
  }

  get get_published_date(): Date {
    return this.published_date;
  }

  set set_published_date(value: Date) {
    this.published_date = value;
  }
}
