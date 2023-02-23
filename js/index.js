/* common
------------------------------ */
// マウスストーカー
// divタグをマウスカーソルに追従させる
$(function () {
  // カーソル要素の指定
  let $cursor = $('#cursor');
  // ちょっと遅れて付いてくるストーカー要素の指定
  let $mouseStalker = $('#mouseStalker');

  // mousemoveイベントでカーソルを移動させる
  $(document).on('mousemove', function (e) { // マウスが動くたびにイベント発火
    let x = e.clientX; // マウスのX軸座標を取得
    let y = e.clientY; // マウスのY軸座標を取得
    // カーソル要素のCSSを書き換える用
    $cursor.css({
      'top': y + 'px', // 取得した座標でY軸を動的に変更
      'left' : x + 'px', // 取得した座標でX軸を動的に変更
      'transform': 'translate(-50%, -50%)', // カーソルを中央に配置
    });
    // ストーカー要素のCSSを書き換える用
    setTimeout(function () { // ストーカーが無い場合は不要
      $mouseStalker.css({
        'top': y + 'px', // Y軸を動的に変更
        'left' : x + 'px', // X軸を動的に変更
        'transform': 'translate(20px, -16px)',
      });
    }, 100); // .1秒後にストーカーを追従
  });
});