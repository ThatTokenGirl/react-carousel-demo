import { createContext } from "react";
import { CarouselItem } from "./carousel-item/carousel-item.component";

export interface CarouselControllerContextConstructor {
  new (): CarouselControllerContext;
}

export interface CarouselControllerContext {
  readonly previousIndex: number | null;
  readonly currentIndex: number;
  readonly nextIndex: number | null;
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;

  previous: () => void;
  next: () => void;
  setItems: (items: any[]) => void;
}

export class DefaultCarouselControllerContext
  implements CarouselControllerContext {
  private _count: number = 0;
  private _current: number = 0;

  get previousIndex(): number | null {
    return this.currentIndex === 0 ? null : this.currentIndex - 1;
  }

  get currentIndex() {
    return this._current;
  }

  get nextIndex(): number | null {
    const next = this.currentIndex + 1;

    return next < this._count ? next : null;
  }

  get hasNext() {
    return this.nextIndex !== null;
  }

  get hasPrevious() {
    return this.previousIndex !== null;
  }

  previous() {
    if (this.hasPrevious) {
      this._current--;
    }
  }

  next() {
    if (this.hasNext) {
      this._current++;
    }
  }

  setItems(items: typeof CarouselItem[]) {
    this._count = items.length;
  }
}

export class InfiniteCarouselControllerContext
  implements CarouselControllerContext {
  private _count: number = 0;
  private _current: number = 0;

  get previousIndex(): number | null {
    return this.currentIndex === 0 ? null : this.currentIndex - 1;
  }

  get currentIndex() {
    return this._current;
  }

  get nextIndex(): number | null {
    const next = this.currentIndex + 1;

    return next < this._count ? next : null;
  }

  get hasNext() {
    return true;
  }

  get hasPrevious() {
    return true;
  }

  previous() {
    this._current--;

    if (this._current < 0) {
      this._current = this._count - 1;
    }
  }

  next() {
    this._current++;

    if (this._current >= this._count) {
      this._current = 0;
    }
  }

  setItems(items: typeof CarouselItem[]) {
    this._count = items.length;
  }
}

export const CarouselController = createContext<CarouselControllerContext>(
  new DefaultCarouselControllerContext()
);

export type CarouselController = CarouselControllerContext & {
  action: "previous" | "next" | null;
  lastCurrentIndex: number | null;
};
