import {PadDTO} from "./PadDTO";
import {RocketDTO} from "./RocketDTO";

export class LaunchDTO {

  constructor(private _id?: string, private _name?: string, private _window_start?: Date,
              private _window_end?: Date, private _image?: string, private _pad?: PadDTO, private _rocket?: RocketDTO,
              private _webcast_live?: boolean, private _country_code?: string, private _type?: string, private _reusable?: boolean, private _family?: string,
              private _rocket_wiki_url?: string, private _video_urls?: string, private _info_urls?: string[]) {
  }

  get id(): string {
    return this._id!;
  }

  set id(value: string) {
    this._id = value;
  }

  get webcast_live(): boolean {
    return this._webcast_live!;
  }

  set webcast_live(value: boolean) {
    this._webcast_live = value;
  }

  get name(): string {
    return this._name!;
  }

  set name(value: string) {
    this._name = value;
  }

  get window_start(): Date {
    return this._window_start!;
  }

  set window_start(value: Date) {
    this._window_start = value;
  }

  get window_end(): Date {
    return this._window_end!;
  }

  set window_end(value: Date) {
    this._window_end = value;
  }

  get image(): string {
    return this._image!;
  }

  set image(value: string) {
    this._image = value;
  }

  get pad(): PadDTO {
    return this._pad!;
  }

  set pad(value: PadDTO) {
    this._pad = value;
  }

  get rocket(): RocketDTO {
    return this._rocket!;
  }

  set rocket(value: RocketDTO) {
    this._rocket = value;
  }

  get country_code(): string {
    return this._country_code!;
  }

  set country_code(value: string) {
    this._country_code = value;
  }

  get type(): string {
    return this._type!;
  }

  set type(value: string) {
    this._type = value;
  }

  get reusable(): boolean {
    return this._reusable!;
  }

  set reusable(value: boolean) {
    this._reusable = value;
  }

  get family(): string {
    return this._family!;
  }

  set family(value: string) {
    this._family = value;
  }

  get rocket_wiki_url(): string {
    return this._rocket_wiki_url!;
  }

  set rocket_wiki_url(value: string) {
    this._rocket_wiki_url = value;
  }

  get video_urls(): string {
    return this._video_urls!;
  }

  set video_urls(value: string) {
    this._video_urls = value;
  }

  get info_urls(): string[] {
    return this._info_urls!;
  }

  set info_urls(value: string[]) {
    this._info_urls = value;
  }
}
