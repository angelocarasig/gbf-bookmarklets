export class Bookmark {
  // Layout
  position: string;
  topoffset: number;
  positionoffset: number;
  spacing: number;
  units: string;

  // Size
  height: number;
  width: number;

  // Styling
  background: string;
  opacity: number;
  color: string;

  // Data
  name: string;
  id: number;
  index: number;
  parent: number;
  url: string;
  isEmpty: boolean;

  constructor(bookmark: Partial<Bookmark> = {}) {
    this.position = bookmark.position ?? 'left';
    this.positionoffset = bookmark.positionoffset ?? -1;
    this.topoffset = bookmark.topoffset ?? -1;
    this.spacing = bookmark.spacing ?? -1;
    this.units = bookmark.units ?? 'rem';

    this.height = bookmark.height ?? 0;
    this.width = bookmark.width ?? 0;

    this.background = bookmark.background ?? 'rgba(0,0,0,0.25)';
    this.opacity = bookmark.opacity ?? 1;
    this.color = bookmark.color ?? '#f0f8ff';

    this.name = bookmark.name ?? 'Untitled Bookmark';
    this.id = bookmark.id ?? -1;
    this.index = bookmark.index ?? -1;
    this.parent = bookmark.parent ?? -1;
    this.url = bookmark.url ?? '';
    this.isEmpty = bookmark.isEmpty ?? true;
  }
}
