import { Injectable } from '@angular/core';
import { Bookmark } from 'src/app/models/bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class ExportJavascriptService {

  /**
   * Generates the js file used for the script.
   * @param data - Array of Bookmarks
   */
  generateJsFile(data: Array<Bookmark>): void {
    const filteredBookmarks: Array<Bookmark> = [];
    
    data.forEach((currentItem: any) => {
      if (!currentItem.isEmpty) {
        filteredBookmarks.push(currentItem);
      }
    })

    if (filteredBookmarks == null || filteredBookmarks.length === 0) {
      console.error("There were no bookmarks added.");
      return;
    }

    const resultScript = 
    `
    
    // ==UserScript==
    // @name         Bookmarklets
    // @match        *://game.granbluefantasy.jp/*
    // @match        *://gbf.game.mbga.jp/*
    // @run-at       document-start
    // ==/UserScript==
    (function () {
      "use strict"

      const bookmarks = ${JSON.stringify(filteredBookmarks)}

      function main() {
        // Create the element
        const bookmarksContainer = document.createElement('div');

        // Add the class and styles to the element
        bookmarksContainer.classList.add('bookmarks-container');
        bookmarksContainer.style.position = 'relative';
        bookmarksContainer.style.width = '100%';
        bookmarksContainer.style.height = '100%';
        bookmarksContainer.style.position = 'absolute';
        bookmarksContainer.style.overflow = 'hidden';
        bookmarksContainer.style.top = 'bookmarks[0].topoffset';
        bookmarksContainer.style.boxSizing = 'border-box';

        // Add the element to the page
        document.body.appendChild(bookmarksContainer);
        
        for (let i = 0; i < bookmarks.length; i++) {
          const bookmark = document.createElement('div');
          bookmark.classList.add('bookmark');
        
          bookmark.style.position = 'absolute';
          bookmark.style.display = 'block';
          bookmark.style.zIndex = '9999';
          bookmark.style.padding = '5px';
          bookmark.style.borderRadius = '5px';
          bookmark.style.textAlign = 'center';
          bookmark.style.cursor = 'pointer';
          bookmark.style.userSelect = 'none';
          bookmark.style.fontSize = '16px';
          bookmark.style.boxSizing = 'border-box';
          bookmark.style.fontFamily = '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol';

          bookmark.style.background = bookmarks[i].background;
          bookmark.style.opacity = \`\${bookmarks[i].opacity}%\`;
          bookmark.style.height = \`\${bookmarks[i].height}\${bookmarks[i].units}\`;
          bookmark.style.width = \`\${bookmarks[i].width}\${bookmarks[i].units}\`;
          bookmark.style.top = \`\${bookmarks[i].index * bookmarks[i].spacing}\${bookmarks[i].units}\`;
          bookmark.style.color = bookmarks[i].color;

          // the 16px comes from the scrollbar default value
          if (bookmarks[i].position === 'right') {
            bookmark.style.right = \`calc(\${bookmarks[i].positionoffset}\${bookmarks[i].units} + 17px)\`;
          }
          // If left, no scroll so no built in offset
          else {
            bookmark.style.left = \`calc(\${bookmarks[i].positionoffset}\${bookmarks[i].units})\`;
          }

          bookmark.innerHTML = bookmarks[i].name;

          // Mouse Button Options
          bookmark.addEventListener("mousedown", function (event) {
            if (bookmark.rightClicked) {
              if (event.button === 2) {
                // Right-click when already right-clicked
                bookmark.style.background = bookmarks[i].background;
                bookmark.style.border = "";
                bookmark.rightClicked = false;
              }
              return;
            }
    
            if (event.button === 0) {
              // Left-click
              window.location.href = bookmarks[i].url;
            } else if (event.button === 1) {
              // Middle-click
              event.preventDefault();
              window.open(bookmarks[i].url, "_blank");
            } else if (event.button === 2) {
              // Right-click
              bookmark.style.background = "";
              bookmark.style.border = "1px dashed black";
              bookmark.rightClicked = true;
            }
          });

          bookmarksContainer.appendChild(bookmark);
        }
      }

      var win = window.unsafeWindow || window;

      if (win.document.readyState != 'loading') {
        main();
      } else {
        win.addEventListener('DOMContentLoaded', main);
      }
    })();
    
    `;

    const file = new Blob([resultScript], { type: 'application/javascript' });
    const fileUrl = URL.createObjectURL(file);

    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = 'script.js';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
