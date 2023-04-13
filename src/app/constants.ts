import { Bookmark } from './models/bookmark.model';

export const INIT_BOOKMARK_GLOBAL_PROPERTIES: Bookmark = new Bookmark({
  position: 'left',
  positionoffset: 0,
  topoffset: 0,
  spacing: 3,
  units: 'rem',

  height: 3,
  width: 12,

  opacity: 100,
});

export const MAX_BOOKMARKS = 25;

export const REQUIRED_KEYS = [
  'position',
  'positionoffset',
  'topoffset',
  'spacing',
  'units',
  'height',
  'width',
  'background',
  'opacity',
  'color',
  'name',
  'id',
  'index',
  'parent',
  'url',
  'isEmpty',
];

export function VALIDATE_BOOKMARKS(bookmarks: any[]): boolean {
  if (!Array.isArray(bookmarks)) {
    return false;
  }

  return bookmarks.every((bookmark) => {
    if (typeof bookmark !== 'object' || bookmark === null) {
      return false;
    }

    for (const key of REQUIRED_KEYS) {
      if (!(key in bookmark)) {
        return false;
      }
    }

    return true;
  });
}