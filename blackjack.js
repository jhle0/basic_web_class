// 원본코드
// let cardOne = 7;
// let cardTwo = 5;
// let sum = cardOne + cardTwo;
// let cardOneBank = 7;
// let cardTwoBank = 5;
// let cardThreeBank = 6;
// let cardFourBank = 4;
// let cardThree = 7;
// sum += cardThree;
// if (sum > 21) {
//     console.log('You lost');
// }
// console.log(`You have ${sum} points`);
// let bankSum = cardOneBank + cardTwoBank + cardThreeBank + cardFourBank;
// if (bankSum > 21 || (sum <= 21 && sum > bankSum)) {
//     console.log('You win');
// } else {
//     console.log('Bank wins');
// }



// 실습
// 1. 플레이어와 딜러의 카드 합계가 21을 넘으면 Bust (패배).
// 2. 플레이어가 21점을 달성하면 블랙잭(즉시 승리).
// 3. 딜러는 17점 이상일 때 멈춰야 하고, 그 이하일 때는 추가 카드를 뽑아야 함.
// 4. 카드 합계가 같은 경우 무승부(Draw).
// 5. 21점을 초과한 쪽이 무조건 패배.


let cardOne = 9;
let cardTwo = 5;
let sum = cardOne + cardTwo;
let cardOneBank = 7;
let cardTwoBank = 5;
let cardThreeBank = 6;
let cardFourBank = 4;
let cardThree = 7;

sum += cardThree;
console.log(`You have ${sum} points`);

if (sum === 21) {
    console.log('Blackjack! You win!');
} else if (sum > 21) {
    console.log('You lost');
} else {
    let bankSum = cardOneBank + cardTwoBank + cardThreeBank + cardFourBank;

    if (bankSum < 17) {
        let cardFiveBank = 5;
        bankSum += cardFiveBank;
    }

    console.log(`Bank has ${bankSum} points`);

    if (bankSum > 21) {
        console.log('Bank is Bust! You win');
    } else if (sum > bankSum) {
        console.log('You win');
    } else if (sum < bankSum) {
        console.log('Bank wins');
    } else {
        console.log('It\'s a Draw');
    }
}
