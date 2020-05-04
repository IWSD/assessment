'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area')
const tweetDivided = document.getElementById('tweet-area')

/**
 * 指定した要素の子要素をすべて削除
 * @param {HTMLElemwnt} HTMLの要素
 * 
 */
function removeAllchild(element) {
  while (element.firstChild) { //子要素がある限り削除
   element.removeChild(element.firstChild);
  }
}

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length ===0) { //名前が空の時は処理終了
    return;
  }
  
  console.log(userName);

  //診断結果表示エリアの作成
  removeAllchild(resultDivided);
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);
  
  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  //tweet機能
  removeAllchild(tweetDivided);
  
  const anchor = document.createElement('a');
  const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ')+  '&ref_src=twsrc%5Etfw';
  
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', '診断結果の文章');
  anchor.innerText = 'Tweet #あなたのいいところ';
  
  tweetDivided.appendChild(anchor);

  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);

};

const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょ,う。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができま,す。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力,的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が,皆から評価されています。',
'{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を出す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

function assessment(userName) {
  let sumOfCharCode = 0;
 for (let i= 0; i <userName.length; i++) { 
    sumOfCharCode = sumOfCharCode +userName.charCodeAt(i)
 }

 //文字のコード番号の合計を回答の数で割って添え字の数値を求める
 let index = sumOfCharCode % answers.length;
 let result = answers[index];

 //TODO {UserName}を名前に置き換える
 result =result.replace(/\{userName\}/g, userName);

  return result;

}

console.log(assessment('ダイスケ'));
console.log(assessment('次郎'));
console.log(assessment('太郎'));

//テストコード
console.assert(
  assessment('ダイスケ') === 'ダイスケのいいところはその全てです。ありのままの大輔自身がいいところなのです。',
  '失敗'
);
console.assert(
  assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
