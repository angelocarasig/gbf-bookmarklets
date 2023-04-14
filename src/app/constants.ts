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
