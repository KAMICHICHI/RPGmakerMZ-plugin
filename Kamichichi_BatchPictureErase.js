//=============================================================================
// Kamichichi_BatchPictureErase.js
// ----------------------------------------------------------------------------
// (C) 2015 神乳-KAMICHICHI-
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2024/11/19 初版
// ----------------------------------------------------------------------------
// [公式サイト]   : http://kamichichi.com/
// [X]           : https://x.com/kamichichikami
// [Ci-en]       : https://ci-en.dlsite.com/creator/133
// [Patreon]     : https://www.patreon.com/kamichichi
// ※　全てR18なので職場閲覧注意、18歳未満は閲覧禁止
// ----------------------------------------------------------------------------
// 【利用条件】
// ・著作権表示は必要ありませんが、してくれると嬉しいです。神乳でもKAMICHICHIでも。R18なのでURLの有無は問いません。
// ・使用にあたっての報告の必要は特にありません。
// ・商用・非商用問いません。
// ・R18作品にも使用制限はありません。
// ・プラグイン素材としての再配布（改変後含む）は禁止。
//=============================================================================

/*:
 * @plugindesc プラグインコマンドを用いて複数のピクチャの消去を一括で行う。
 * @target MZ
 * @author 神乳-KAMICHICHI
 *
 * @help
 * このプラグインでは、プラグインコマンドを使用して
 * 複数のピクチャを削除することができます。
 * ピクチャIDはカンマで区切って指定します。
 *
 * === プラグインコマンド ===
 * ErasePictures: 削除するピクチャIDを指定してください。
 *
 * 例:
 * - プラグインコマンド: ErasePictures 1,2,3
 * このコマンドはピクチャID 1, 2, 3 を削除します。
 *
 * === 注意事項 ===
 * - 無効なIDや存在しないIDは無視されます。
 * - 一度削除したピクチャは復元されません。
 *
 * @command ErasePictures
 * @text ピクチャ削除
 * @desc 複数のピクチャを削除します。削除するピクチャのIDを指定してください。
 *
 * @arg ids
 * @type string
 * @text ピクチャID
 * @desc 削除するピクチャのIDをカンマ区切りで指定します（例: "1,2,3"）。
 * @default
 */

(() => {
    const pluginName = 'Kamichichi_BatchPictureErase';

    // プラグインコマンド登録
    PluginManager.registerCommand(pluginName, 'ErasePictures', args => {
        const pictureIds = args.ids.split(',').map(id => Number(id.trim()));
        pictureIds.forEach(id => {
            if (!isNaN(id) && id > 0) {
                $gameScreen.erasePicture(id); // ピクチャ削除
            }
        });
    });
})();
