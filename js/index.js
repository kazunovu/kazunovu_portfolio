/* common
------------------------------ */
// ローディング画面
// logoの表示
$(window).on('load', function() {
  // ローディング画面を1.5s待機してからフェイドアウト
  $('#splash').delay(1500).fadeOut('slow');
  // ロゴを1.2s待機してからフェイドアウト
  $('#splashLogo').delay(1300).fadeOut('slow');
});

//各ページ共通のハンバーガーメニュー
$(".openBtn").click(function (){ //ボタンがクリックされたら
  $(this).toggleClass('active'); //ボタン自身にactiveクラスを付与
  $("#globalNav").toggleClass('panelActive'); //ナビゲーションにpanelActiveクラスを付与
  $(".circleBackground").toggleClass('circleActive'); //丸背景にcircleActiveクラスを付与
});

$("#globalNav a").click(function (){ //ナビゲーションのリンクがクリックされたら
  $(".openBtn").removeClass('active'); //ボタン自身にactiveクラスを削除
  $("#globalNav").removeClass('panelActive'); //ナビゲーションにpanelActiveクラスを削除
  $(".circleBackground").removeClass('circleActive'); //丸背景にcircleActiveクラスを削除
});


// ページトップボタン
// スクロールした際の動きを関数でまとめる
function pageTopAnime() {
  var scroll = $(window).scrollTop();

  if (scroll >= 200) { // 上から200pxスクロールしたら
    $('#pageTop').removeClass('rightMove');
    // #pageTopについているrightMoveというクラスを除く
    $('#pageTop').addClass('leftMove');
    // #pageTopについているleftMoveというクラスを付与
  } else {
    if ( // すでに#pageTopにleftMoveというクラスが付いていたら
      $('#pageTop').hasClass('leftMove')) {
        $('#pageTop').removeClass('leftMove');
        // #pageTopについているleftMoveというクラスを除く
        $('#pageTop').addClass('rightMove');
        // #pageTopについているrightMoveというクラスを付与
      }
  }
}

$(window).scroll(function () {
  pageTopAnime(); // スクロールした際の動きの関数を呼ぶ
});

// #pageTopをクリックした際の設定
$('#pageTop').click(function () {
  $('body,html').animate({
    scrollTop: 0 // ページトップまでスクロール
  }, 500); // ページトップスクロールの速さ。
  return false; // リンク自体の無効化
});


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

  // リンクホバーの処理
  $(".stalkTarget").on({
    'mouseenter': function() {
      // activeクラス付与
      $cursor.addClass('active');
    },
    'mouseleave': function() {
      $cursor.removeClass('active');
    }
  });
});




/* top
------------------------------ */
//スライドアニメーション
$('.slider').slick({
  fade: true,//切り替えをフェードで行う。初期値はfalse
  autoplaySpeed: 3500,//次のスライドに切り替わる待ち時間
  speed: 1000,//スライドの動きのスピード。初期値は300
  autoplay: true,//自動に動き出すか。false
  infinite: true,//スライドをループさせるかどうか。初期値はtrue
  slidesToShow: 1,//スライドを画面に3枚見せる
  slidesToScroll: 1,//1回のスクロールで3枚の写真を移動して見せる
  arrows: true,//左右の矢印あり
  prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
  nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
  dots: true,//下部dotsナビゲーションの表示
  pauseOnFocus: false,//フォーカスで一時停止を無効
  pauseOnHover: false,//マウスホバーで一時停止を無効
  pauseOnDotsHover: false,//dotsナビゲーションをマウスホバーで一時停止を無効
});

//スマホ用：スライダーをタッチしても止めずにスライドさせたい場合
$('.slider').on('touchmove', function(event, slick, currentSlide, nextSlide){
  $('.slider').slick('slickPlay');
});


// ロゴのフェードアップアニメーション
// 動きのきっかけとなるアニメーションの名前を定義
function fadeAnime () {
  // ふわっと動くきっかけのクラス名と動きのクラス名を定義
  $('.fadeUpTrigger').each(function () { // fadeUpTriggerというクラス名が
    var elemPos = $(this).offset().top-50; // 要素より50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();

    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('fadeUp'); // 画面内に入ったらfadeUpクラスを付与
    } else {
      $(this).removeClass('fadeUp'); // 画面外にでたらfadeUpクラスを削除
    }
  });
} // ここまでふわっと動くきっかけのクラス名と動きのクラス名の設定

// 画面を動かしたら動かしたい場合の記述
$(window).scroll(function () {
  fadeAnime(); // アニメーション用の関数を呼ぶ
});  // ここまで画面を動かしたら動かしたい場合の記述


// 左右のイメージ画像アニメーション
// 動きのきっかけとなるアニメーションの名前を定義
function fadeAnimeImage () {
  // ふわっと動くきっかけのクラス名と動きのクラス名を定義
  $('.fadeAnimeTrigger').each(function () { // fadeAnimeTriggerというクラス名が
    var elemPos = $(this).offset().top-50; // 要素より50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();

    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('fade'); // 画面内に入ったらfadeクラスを付与
    } else {
      $(this).removeClass('fade'); // 画面外にでたらfadeクラスを削除
    }
  });
} // ここまでふわっと動くきっかけのクラス名と動きのクラス名の設定

// 画面を動かしたら動かしたい場合の記述
$(window).scroll(function () {
  fadeAnimeImage(); // アニメーション用の関数を呼ぶ
});  // ここまで画面を動かしたら動かしたい場合の記述


/* faq
------------------------------ */
// アコーディオンパネル
$('.accordionPanelHeadline').on('click',function() {
  // タイトル要素をクリックしたら
  //隣接するクラス名.accordionAnswerがついた全てのアコーディオンを閉じる
  $('.accordionAnswer').slideUp(500); 

  //タイトル要素に隣接するアコーディオンを行うエリアを取得
  var findElm = $(this).next(".accordionAnswer"); 
  
  if($(this).hasClass('close')) { //タイトル要素にクラス名closeがあれば
    //クラス名を除去
    $(this).removeClass('close');
  } else { //それ以外は
     //クラス名closeを全て除去したあと
    $('.close').removeClass('close');
    //クリックしたタイトルにクラス名closeを付与し
    $(this).addClass('close');
    //アコーディオンを開く
    $(findElm).slideDown(500);
  }
});

/* trainer
------------------------------ */
// 続きを読むボタンをクリックして隠しているテキストを表示する
$(function() {
  $(".readMoreBtn").click(function() {
    var show_text = $(this)
      .parent(".js-readMoreArea")
      .find(".readMoreArea");
    var small_height = 400; //This is initial height.
    var original_height = show_text.css({ height: "auto" }).height();

    if (show_text.hasClass("open")) {
      /*CLOSE*/
      show_text.height(original_height).animate({ height: small_height }, 300);
      show_text.removeClass("open");
      $(this)
        .removeClass("active");
    } else {
      /*OPEN*/
      show_text
        .height(small_height)
        .animate({ height: original_height }, 300, function() {
          show_text.height("auto");
        });
      show_text.addClass("open");
      $(this)
        .addClass("active");
    }
  });
});

/* main
------------------------------ */

// flowSlideShow
// swiper.js
let mySwiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,
  loopAdditionalSlides: 1,
  watchSlidesProgress: true, //スライドの進行状況を監視する

  speed: 800, //スライドアニメーションのスピード

  autoplay: {
  delay: 4000, //次のスライドに切り替わるまでの時間
  disableOnInteraction: false, //ユーザーが操作しても自動再生を止めない
  waitForTransition: false, //アニメーションの間も自動再生を止めない（最初のスライドの表示時間を揃えたいときに）
  },

  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: '1',
  
  coverflowEffect: {
    rotate: 50, //次のスライドになるまでに各スライドが回転する角度
    stretch: 0, 
    depth: 120, //オフセットの深さ
    modifier: 1, //角度
    slideShadows: false, //スライドの影
  },

  breakpoints: { // ブレークポイント
    834: { // 画面幅834px以上で適用
      slidesPerView: 1.5,
    }
  },

  // ページネーション
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'bullets'
  },

  // ナビボタンの矢印
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
});

// voiceSlider
// slick
$('.voiceSlider').slick({
  centerMode: true,
  centerPadding: '5%',
  focusOnSelect: true,
  infinite: true,
  touchMove: true,
  autoplay: true,
  autoplaySpeed: 2500,
  prevArrow: '<div class="slick-prev"></div>',
  nextArrow: '<div class="slick-next"></div>',
  dots: true,
});

