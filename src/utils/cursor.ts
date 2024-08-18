type Point = {
  x: number;
  y: number;
};

class Cursor {
  private cursor: HTMLDivElement;
  private scr: HTMLStyleElement;
  private pos: { curr: Point | null; prev: Point | null };
  private pt: string[];

  constructor() {
    this.pos = {
      curr: null,
      prev: null,
    };
    this.pt = [];
    this.cursor = this.createCursorElement();
    this.scr = this.createStyleElement();
    this.init();
    this.render();
  }

  private createCursorElement(): HTMLDivElement {
    const cursor = document.createElement("div");
    cursor.id = "cursor";
    cursor.classList.add("xs-hidden");
    cursor.classList.add("hidden");
    document.body.appendChild(cursor);
    return cursor;
  }

  private createStyleElement(): HTMLStyleElement {
    const scr = document.createElement("style");
    document.body.appendChild(scr);
    scr.innerHTML = `
      * {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='10px' height='10px'><circle cx='4' cy='4' r='4' fill='white' /></svg>") 4 4, auto !important}`;
    return scr;
  }

  private move(left: number, top: number): void {
    this.cursor.style.left = `${left}px`;
    this.cursor.style.top = `${top}px`;
  }

  private getStyle(el: Element, attr: string): string | false {
    try {
      const style = window.getComputedStyle ? window.getComputedStyle(el) : (el as any).currentStyle;
      return style[attr];
    } catch (e) {
      console.error(e);
    }
    return false;
  }

  private init(): void {
    document.onmousemove = (e: MouseEvent) => {
      if (this.pos.curr === null) {
        this.move(e.clientX - 8, e.clientY - 8);
      }
      this.pos.curr = {
        x: e.clientX - 8,
        y: e.clientY - 8,
      };
      this.cursor.classList.remove("hidden");
    };

    document.onmouseenter = () => this.cursor.classList.remove("hidden");
    document.onmouseleave = () => this.cursor.classList.add("hidden");
    document.onmousedown = () => this.cursor.classList.add("active");
    document.onmouseup = () => this.cursor.classList.remove("active");

    const elements = document.getElementsByTagName("*");
    for (let i = 0; i < elements.length; i++) {
      if (this.getStyle(elements[i], "cursor") === "pointer") {
        this.pt.push(elements[i].outerHTML);
      }
    }
  }

  private render(): void {
    if (this.pos.prev) {
      this.pos.prev.x = this.lerp(this.pos.prev.x, this.pos.curr!.x, 0.35);
      this.pos.prev.y = this.lerp(this.pos.prev.y, this.pos.curr!.y, 0.35);
      this.move(this.pos.prev.x, this.pos.prev.y);
    } else {
      this.pos.prev = this.pos.curr;
    }
    requestAnimationFrame(() => this.render());
  }

  private lerp(a: number, b: number, n: number): number {
    return (1 - n) * a + n * b;
  }

  refresh(): void {
    this.scr.remove();
    this.cursor.classList.remove("active");
    this.pos = {
      curr: null,
      prev: null,
    };
    this.pt = [];

    this.cursor = this.createCursorElement();
    this.scr = this.createStyleElement();
    this.init();
    this.render();
  }
}

export const cursorInit = (): Cursor => {
  return new Cursor();
};
