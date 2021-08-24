/// the system implemented for tile-based game.
namespace p {
    export enum color {
        BACKGROUND = 0xf,
        BLACK = 0xf,
        WHITE = 0x1,
        PURPLE = 0xb,
        GREEN = 0x7
    }

    export let scancode :ControllerButton;

    let pencil_color :color = color.WHITE,
        tile_sketch_color :color = color.BLACK;

    export function kbhit() {

    }

    interface TileMap {
        [index: string]: Image;
    }

    let tiles: TileMap = {
        "_": assets.image`tile-background`,
        "*": assets.image`tile-asterisk`,
        "!": assets.image`tile-exclamation-mark`,
        "@": assets.image`tile-commercial-at`,
        "硬": img`
            f f f f f f f .
            . f . . f f f .
            f . . . f f f .
            f f f . . f . .
            f . f . f f . .
            f . f . . f . .
            f f f f f . f .
            . . . . . . . .
        `,
        "禾": img`
            f f f f f f . .
            . . . f . . . .
            f f f f f f f .
            . . . f . . . .
            . . f f f . . .
            f f . f . f f .
            . . . f . . . .
            . . . . . . . .
        `,
        "学": img`
            . f . f . f . .
            f f f f f f f .
            f . f f f . f .
            . . . . f . . .
            f f f f f f f .
            . . . f . . . .
            . . f f . . . .
            . . . . . . . .
        `,
        "堂": img`
            . f . f . f . .
            f f f f f f f .
            f . f . f . f .
            . . f f f . . .
            . f f f f f . .
            . . . f . . . .
            f f f f f f f .
            . . . . . . . .
        `
    }

    export function setcolor(c: color) {
        pencil_color = c;
    }

    export function outtextxy(x: number, y: number, s: string) {
        let img :Image = scene.backgroundImage();
        let tile :Image;
        for (let i = 0; i < s.length; ++i) {
            tile = tiles[s.charAt(i)];
            tile.replace(tile_sketch_color, pencil_color);
            img.drawImage(tile, (x + i)* 8, y * 8);
            tile.replace(pencil_color, tile_sketch_color);
        }
    }

    export function listenToEvent() {
        controller.player1.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
            scancode = ControllerButton.Up;
        })
        controller.player1.onButtonEvent(ControllerButton.Down, ControllerButtonEvent.Pressed, function () {
            scancode = ControllerButton.Down;
        })
        controller.player1.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
            scancode = ControllerButton.Left;
        })
        controller.player1.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
            scancode = ControllerButton.Right;
        })
    }
}
