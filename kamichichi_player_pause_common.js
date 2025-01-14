/*:
 * @target MZ
 * @plugindesc プレイヤーの停止・移動に応じてコモンイベントを実行するプラグイン
 * @help kamichichi_player_pause_common.js
 *
 * プレイヤーが指定したフレーム数動かなかった場合にコモンイベントを実行します。
 * さらに、停止状態から移動した場合に別のコモンイベントを実行します。
 * これらの動作はスイッチで有効/無効を切り替え可能です。
 *
 * @param activeSwitchId
 * @text 有効化スイッチID
 * @type switch
 * @desc 動作を有効にするスイッチのIDを指定します。
 * @default 1
 *
 * @param pauseFrames
 * @text 停止フレーム数
 * @type number
 * @desc プレイヤーが停止とみなされるフレーム数を指定します。
 * @default 60
 *
 * @param onPauseCommonEvent
 * @text 停止時コモンイベント
 * @type common_event
 * @desc プレイヤーが指定フレーム停止した場合に実行するコモンイベント。
 * @default 1
 *
 * @param onMoveCommonEvent
 * @text 移動時コモンイベント
 * @type common_event
 * @desc 停止状態から移動した場合に実行するコモンイベント。
 * @default 2
 */

(() => {
    const parameters = PluginManager.parameters('kamichichi_player_pause_common');
    const activeSwitchId = Number(parameters['activeSwitchId'] || 1);
    const pauseFrames = Number(parameters['pauseFrames'] || 60);
    const onPauseCommonEvent = Number(parameters['onPauseCommonEvent'] || 1);
    const onMoveCommonEvent = Number(parameters['onMoveCommonEvent'] || 2);

    let pauseCounter = 0;
    let wasPlayerStopped = false;

    const _Game_Player_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function(sceneActive) {
        _Game_Player_update.call(this, sceneActive);

        if (!$gameSwitches.value(activeSwitchId)) {
            // スイッチがオフの場合はリセットして終了
            pauseCounter = 0;
            wasPlayerStopped = false;
            return;
        }

        if (this.isMoving()) {
            if (wasPlayerStopped) {
                // 停止状態から移動した場合
                wasPlayerStopped = false;
                $gameTemp.reserveCommonEvent(onMoveCommonEvent);
            }
            pauseCounter = 0; // 動いている間はカウンターをリセット
        } else {
            pauseCounter++;
            if (pauseCounter >= pauseFrames && !wasPlayerStopped) {
                // 指定フレーム停止した場合
                wasPlayerStopped = true;
                $gameTemp.reserveCommonEvent(onPauseCommonEvent);
            }
        }
    };
})();
