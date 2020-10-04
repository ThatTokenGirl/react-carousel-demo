import { createContext, Dispatch, SetStateAction } from "react";

export interface CarouselControllerContextConstructor {
  new (): CarouselControllerContext;
}

export interface CarouselControllerContext {
  previous: () => void;
  next: () => void;
  setItems: (items: React.ReactElement[]) => void;
  itemAtOffset(offset: number): React.ReactElement;
}

export class DefaultCarouselControllerContext
  implements CarouselControllerContext {
  private _items: React.ReactElement[] = [];
  private _index: number = 0;

  previous() {
    this._index--;

    if (this._index < 0) {
      this._index = 0;
    }
  }

  next() {
    this._index++;

    if (this._index >= this._items.length) {
      this._index = this._items.length - 1;
    }
  }

  setItems(items: React.ReactElement<{}>[]) {
    this._items = items;

    if (this._index >= items.length) {
      this._index = items.length - 1;
    }
  }

  itemAtOffset(offset: number): React.ReactElement {
    return this._items[offset + this._index];
  }
}

export class InfiniteCarouselControllerContext
  implements CarouselControllerContext {
  private _index: number = 0;
  private _items: React.ReactElement[] = [];

  previous() {
    this._index--;

    if (this._index < 0) {
      this._index = this._items.length - 1;
    }
  }

  next() {
    this._index++;

    if (this._index >= this._items.length) {
      this._index = 0;
    }
  }

  setItems(items: React.ReactElement<{}>[]) {
    this._items = items;
  }

  itemAtOffset(offset: number): React.ReactElement {
    const position = this._index + offset;
    const index =
      position < 0
        ? this._items.length + (position % this._items.length)
        : position % this._items.length;

    return this._items[index];
  }
}

export interface CarouselController extends CarouselControllerContext {
  readonly action: CarouselAction;
  readonly hasPrevious: boolean;
  readonly hasNext: boolean;
}

export type CarouselAction = "none" | "next" | "previous";
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

    get hasPrevious() {
      return !!this.itemAtOffset(-1);
    },
    get hasNext() {
      return !!this.itemAtOffset(1);
    },

    previous() {
      _context.previous();
      dispatch({ action: "previous" });
    },

    next() {
      _context.next();
      dispatch({ action: "next" });
    },

    setItems(items: React.ReactElement<{}>[]) {
      _context.setItems(items);
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
