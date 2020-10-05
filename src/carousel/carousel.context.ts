import { createContext, Dispatch, SetStateAction } from "react";

export interface CarouselControllerContextConstructor {
  new (): CarouselControllerContext;
}

export interface CarouselControllerContext {
  readonly length: number;
  readonly currentIndex: number;

  setItems(items: React.ReactElement[]): void;
  gotoOffset(offset: number): void;
  itemAtOffset(index: number): React.ReactElement;
}

export class DefaultCarouselControllerContext
  implements CarouselControllerContext {
  private _items: React.ReactElement[] = [];
  private _index: number = 0;

  get length() {
    return this._items.length;
  }

  get currentIndex() {
    return this._index;
  }

  setItems(items: React.ReactElement<{}>[]) {
    this._items = items;

    if (this._index >= items.length) {
      this._index = items.length - 1;
    }
  }

  gotoOffset(offset: number) {
    const position = this.currentIndex + offset;

    this._index =
      position <= 0 ? 0 : position >= this.length ? this.length - 1 : position;
  }

  itemAtOffset(offset: number): React.ReactElement {
    return this._items[offset + this._index];
  }
}

export class InfiniteCarouselControllerContext
  implements CarouselControllerContext {
  private _index: number = 0;
  private _items: React.ReactElement[] = [];

  get length() {
    return this._items.length;
  }
  get currentIndex() {
    return this._index;
  }

  setItems(items: React.ReactElement<{}>[]) {
    this._items = items;
  }

  gotoOffset(offset: number) {
    this._index = this._getOffsetPosition(offset);
  }

  itemAtOffset(offset: number): React.ReactElement {
    return this._items[this._getOffsetPosition(offset)];
  }

  private _getOffsetPosition(offset: number) {
    const position = this._index + offset;
    const index =
      position < 0
        ? this._items.length + (position % this._items.length)
        : position % this._items.length;

    return index;
  }
}

export interface CarouselController extends CarouselControllerContext {
  readonly action: CarouselAction;
}

export type CarouselAction = "none" | "forward" | "back";
export type CarouselState = {
  action: CarouselAction;
};

export function createController(
  _context: CarouselControllerContext,
  { action }: CarouselState,
  dispatch: Dispatch<SetStateAction<CarouselState>>
): CarouselController {
  return {
    action,

    get length() {
      return _context.length;
    },

    get currentIndex() {
      return _context.currentIndex;
    },

    setItems(items: React.ReactElement<{}>[]) {
      _context.setItems(items);
    },

    gotoOffset(offset: number) {
      _context.gotoOffset(offset);
      dispatch({
        action: offset === 0 ? "none" : offset > 0 ? "forward" : "back",
      });
    },

    itemAtOffset(offset: number): React.ReactElement<{}> {
      return _context.itemAtOffset(offset);
    },
  };
}

export const CarouselContext = createContext<CarouselController>(
  createController(
    new DefaultCarouselControllerContext(),
    { action: "none" },
    () => {}
  )
);
