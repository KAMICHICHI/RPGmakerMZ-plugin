/*:
 * @target MZ
 * @plugindesc 指定したイベントやプレイヤーの向きを変更するプラグイン
 * @help kamichichi_MD.js
 *
 * このプラグインを使用すると、メッセージ中に以下の制御文字を使用して
 * 指定したイベントの向きを変更できます。
 *
 * 書式: \MD[X,Y]
 * - X: イベントID (-1 はプレイヤー)
 * - Y: 向き (2:下, 4:左, 6:右, 8:上)
 *
 * 【例】
 * \MD[1,6]   # イベントID 1 を右向き (6) に変更
 * \MD[-1,8]  # プレイヤーを上向き (8) に変更
 *
 * 【注意事項】
 * - 制御文字はイベントのメッセージ内で使用してください。
 * - 存在しないイベントIDや無効な向きが指定された場合、処理は無視されます。
 */

(() => {
    const _Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
    Window_Message.prototype.processEscapeCharacter = function(code, textState) {
        if (code === 'MD') {
            const params = this.obtainEscapeParams(textState);
            if (params && params.length === 2) {
                const eventId = Number(params[0]);
                const direction = Number(params[1]);
                if ([2, 4, 6, 8].includes(direction)) {
                    if (eventId === -1) {
                        // プレイヤーの向きを変更
                        $gamePlayer.setDirection(direction);
                    } else {
                        const event = $gameMap.event(eventId);
                        if (event) {
                            // 指定イベントの向きを変更
                            event.setDirection(direction);
                        }
                    }
                }
            }
        } else {
            _Window_Message_processEscapeCharacter.call(this, code, textState);
        }
    };

    Window_Message.prototype.obtainEscapeParams = function(textState) {
        const arr = /^\[(-?\d+),\s*(-?\d+)\]/.exec(textState.text.slice(textState.index));
        if (arr) {
            textState.index += arr[0].length;
            return [arr[1], arr[2]];
        }
        return null;
    };
})();
