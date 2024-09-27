let iceCreamFlavors = [
    { name: "Chocolate", type: "Chocolate", price: 2 },
    { name: "Strawberry", type: "Fruit", price: 1 },
    { name: "Vanilla", type: "Vanilla", price: 2 },
    { name: "Pistachio", type: "Nuts", price: 1.5 },
    { name: "Neapolitan", type: "Chocolate", price: 2 },
    { name: "Mint Chip", type: "Chocolate", price: 1.5 },
    { name: "Raspberry", type: "Fruit", price: 1 },
];

// { scoops: [], total: }
let transactions = []
// { scoops: [], total: }
transactions.push({ scoops: ["Chocolate", "Vanilla", "Mint Chip"], total: 5.5 })
transactions.push({ scoops: ["Raspberry", "StrawBerry"], total: 2 })
transactions.push({ scoops: ["Vanilla", "Vanilla"], total: 4 })

// 수익 계산
const total = transactions.reduce((acc, curr) => acc + curr.total, 0); console.log(`You've made ${total} $ today`); // You've made 11.5 $ toda
// 각 맛의 판매량
let flavorDistribution = transactions.reduce((acc, curr) => {
    curr.scoops.forEach(scoop => {
        if (!acc[scoop]) {
            acc[scoop] = 0;
        }
        acc[scoop]++;
    })
    return acc;
}, {}) // { Chocolate: 1, Vanilla: 3, Mint Chip: 1, Raspberry: 1, StrawBerry: 1 }
console.log(flavorDistribution);






// 실습 
// - 가장 많이 팔린 아이스크림 맛 찾아서 출력하기 - Objeck.keys() 메서드를 사용

let flavorCount = {};

iceCreamFlavors.forEach(flavor => {
    if (flavorCount[flavor.name]) {
        flavorCount[flavor.name]++;
    } else {
        flavorCount[flavor.name] = 1;
    }
});

let maxFlavor = "";
let maxCount = 0;

Object.keys(flavorCount).forEach(flavor => {
    if (flavorCount[flavor] > maxCount) {
        maxCount = flavorCount[flavor];
        maxFlavor = flavor;
    }
});

console.log(`가장 많이 팔린 아이스크림 맛은 ${maxFlavor}`);