import { EVENT } from 'src/ts/constants';
import { Player } from 'src/ts/player';
import {
  $, addClass, addDisposable, addDisposableListener, clamp, Component, Drag, Rect, throttle,
} from 'src/ts/utils';
import { ControlItem } from '..';
import { Thumbnail } from './thumbnail';

export class Progress extends Component implements ControlItem {
  readonly id = 'progress'

  private playedBar!: HTMLElement;

  private bufBar!: HTMLElement;

  private bars!: HTMLElement;

  private rect!: Rect;

  private thumbnail!: Thumbnail;

  private player!: Player;

  private dragging = false;

  init(player: Player) {
    this.player = player;

    addClass(this.element, 'progress');

    this.bars = this.element.appendChild($('.progress_bars'));
    this.bufBar = this.bars.appendChild($('.progress_buf'));
    this.playedBar = this.bars.appendChild($('.progress_played'));

    this.rect = addDisposable(this, new Rect(this.bars, player));
    this.thumbnail = addDisposable(this, new Thumbnail(this.element, player.opts.thumbnail));

    addDisposable(this, new Drag(this.bars, this.onDragStart, this.onDragging, this.onDragEnd));
    addDisposable(this, player.on(EVENT.TIME_UPDATE, this.updatePlayedBar));
    addDisposable(this, player.on(EVENT.PROGRESS, this.updateBufBar));
    addDisposable(this, player.on(EVENT.UPDATE_OPTIONS, () => this.thumbnail.updateOptions(player.opts.thumbnail)));
    addDisposableListener(this, this.bars, 'mousemove', throttle((ev: MouseEvent) => this.updateThumbnail(ev.pageX)), true);
  }

  private setPlayedBarLength(percentage: number): void {
    this.playedBar.style.transform = `scaleX(${clamp(percentage)})`;
  }

  private setBufBarLength(percentage: number): void {
    this.bufBar.style.transform = `scaleX(${clamp(percentage)})`;
  }

  private onDragStart = (ev: PointerEvent) => {
    this.dragging = true;
    this.onDragging(ev);
  }

  private onDragging = (ev: PointerEvent) => {
    const x = ev.pageX - this.rect.x;
    this.setPlayedBarLength(x / this.rect.width);
    this.updateThumbnail(ev.pageX);
  }

  private onDragEnd = (ev: PointerEvent) => {
    this.dragging = false;
    this.player.seek(this.getCurrentTime(ev.pageX));
  }

  private updateThumbnail(x: number): void {
    this.thumbnail.update(this.getCurrentTime(x), x - this.rect.x, this.rect.width);
  }

  private updateBufBar = (): void => {
    const bufLen = this.player.buffered.length;

    if (!bufLen) return this.setBufBarLength(0);

    const curTime = this.player.currentTime;
    let percentage = 0;

    this.player.eachBuffer((start, end) => {
      if (start <= curTime && end >= curTime) {
        percentage = end / this.player.duration;
        return true;
      }
    });

    this.setBufBarLength(percentage);
  }

  private updatePlayedBar = (): void => {
    if (this.dragging) return;
    this.setPlayedBarLength(this.player.currentTime / this.player.duration);
  }

  private getCurrentTime(x: number): number {
    return clamp(((x - this.rect.x) / this.rect.width)) * this.player.duration;
  }
}

export const progressControlItem = () => new Progress();
