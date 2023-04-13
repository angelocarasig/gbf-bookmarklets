WIP

<details>
<summary></summary>

# DISCLAIMER

Use with caution.

# What is this?

A webapp that lets you to create customizable bookmarklets for whatever websites you want this to run on.

# How do I use this?

[Click here](https://gbf-bookmarklets.vercel.app/). Customize to your preferences and click the save button. You then should receive a .js file that contains that giving configuration. You can then import it into tampermonkey and be on your way.

# Running Locally
This application is built in Angular. Make sure things like node, npm and the angular cli is installed beforehand.
1. Clone the Repo
2. Run `npm install` in the `ClientApp` directory
3. Run the application with `ng serve`

# Credits

* My crew members for sharing this with me
* [Original author of the script](https://github.com/biuuu/gbf-bookmark)


Below is just additional stuff that isn't important

## Developer Stuff

* Written in Angular as a SPA.
* Uses the [primeNG UI Library](https://primeng.org/)

## TODO:

- ~~Find and document why creating a bookmark sometimes adds multiple~~ Any selected bookmark instantly drops the isEmpty boolean, need to update
- ~~Find a way to get URL scripts to ignore special characters like $, `, ', ", etc.~~ Unsure how valid this works. Even actually invalid functions find a way of working cause javascript lol
- ~~Add main container background support~~
- ~~Reset option~~
- ~~All color formats valid~~
- ~~Fix top offset~~
- Refresh doesn't reset state
- Opening new bookmarks close opened ones
- Button options:
  - Middle click => Open in new tab
  - Right click => toggle bookmarklet

<details>
<summary>Old TODO</summary>

- ~~Positioning in bookmark modal option~~
- ~~bookmarks should be available on right side too and indicative and now requires both position and index. unique Id may be used for future parent bookmark usage~~
- draggable bookmarks ==> Only non-empty bookmarks should be draggable, and they should swap places with whichever bookmark location they move to
- ~~start building the actual bookmarklet .js output file~~
- ~~clicking bookmark should open bookmark in current page~~
- ~~refactor code~~
- add features for back and reload with default function calls
- Potential parent bookmark stuff ==> Hovering should expand to display more bookmarks nested to right position
- Animation options
- ~~Opacity options (can bind opacity to a given bookmarklet object)~~
- ~~Use empty bookmarks as 'skeletons' i.e. do not let them overflow the pages below~~
- ~~Modify eye symbol in toolbar to hide all "Empty" bookmarks~~
	- ~~Add some cross symbol to close the toolbar and add a gear to open the options again~~
- ~~custom bookmark width/height~~ ~~left|right offset~~
- ~~change modal to sidebar for less overflow issues~~
- Add revert all action
- Add custom fonts and ~~text color~~
- ~~Add dropzones to add images~~

</details>

## Bugs (Will fix soon maybe)
- Editing another bookmark while the edit sidebar of another bookmark is open will lay the newer bookmark sidebar on top

## Much later TODOs:
- Once finished, start working on loading config values from other js files/scripts
- Add 'freestyle' option where user can drag around a bookmark and its top/position offsets are updated based on position

### Bookmark Notes:

All bookmarks are contained inside a bookmark-container div.
The bookmark-container div manages the global top-offset, as well as the position to render a bookmark.
The bookmark-container loops to generate each bookmark based on a provided 'bookmarks' variable.
The bookmark-container contains properties of absolute positioning, 100% w/h and hidden overflow to hide bookmarks that go past the current page vw/vh.

The following styling properties of each bookmark is UNIQUE TO THE BOOKMARK:
- name
- position (left or right, rendered based on bookmark-container)
- background-color
- URL
- index (position on page, used in calculating where in page to display it)

Each bookmark contains the following properties are GLOBAL:
- absolute positioning
- block display
- z-index 3
- 5px padding
- 5px border-radius
- centered text-align
- cursor: pointer
- user-select: none (can't be highlighted)
- spacing (between each bookmark)
- opacity (currently visual only, but can be adjusted)
- width/height
- border (unused, only for visual options for empty bookmarks)


Some functions:

Reload: `location.reload()`

Back: `history.back()`

Back and Forward: `history.back();setTimeout(() => history.forward(), 100)`


</details>
