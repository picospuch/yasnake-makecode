/// the system implemented for tile-based game.
namespace p {
    export enum color {
        BACKGROUND = 0xf,
        TAN = 0xd,
        BLACK = 0xf,
        WHITE = 0x1,
        PURPLE = 0xa,
        GREEN = 0x7, // green
        BLUE = 0x8,
        PINK = 0x3
    }

    export let pallete: Buffer = hex`0000006e3232bb5735df9245ecd27483a816277224173b4704689417a1a981dbcdfdf9f1c7b29587715b463f3c201708`;

    export let scancode :ControllerButton;

    let pencil_color :color = color.WHITE,
        tile_sketch_color :color = color.BLACK;

    export function kbhit() {

    }

    interface TileMap {
        [index: string]: Image;
    }

    export let tiles: TileMap = {
        "sprite-default": assets.image`tile-sprite-default`,
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
