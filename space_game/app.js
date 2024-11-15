function loadTexture(path) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
            resolve(img);
        };
    });
}

window.onload = async () => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    const heroImg = await loadTexture('assets/player.png');
    const enemyImg = await loadTexture('assets/enemyShip.png');
    const backgroundImg = await loadTexture('assets/starBackground.png'); // 별 배경 이미지 로드

    // 별이 있는 우주 배경 패턴 생성
    const pattern = ctx.createPattern(backgroundImg, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height); // 캔버스 전체를 패턴으로 채우기

    // 플레이어 우주선
    const mainShipX = canvas.width / 2 - heroImg.width / 2;
    const mainShipY = canvas.height - (canvas.height / 4);
    ctx.drawImage(heroImg, mainShipX, mainShipY);

    // 보조 우주선
    const smallWidth = heroImg.width * 0.5;
    const smallHeight = heroImg.height * 0.5;
    const offset = 70;
    const leftShipX = mainShipX - smallWidth - offset;
    const rightShipX = mainShipX + heroImg.width + offset;
    const subShipY = mainShipY + heroImg.height / 4;

    ctx.drawImage(heroImg, leftShipX, subShipY, smallWidth, smallHeight);
    ctx.drawImage(heroImg, rightShipX, subShipY, smallWidth, smallHeight);

    // createEnemies(ctx, canvas, enemyImg);
    createEnemies2(ctx, canvas, enemyImg);
};

function createEnemies(ctx, canvas, enemyImg) {
    const MONSTER_TOTAL = 5; // 한 줄에 몇 개의 적 우주선을 배치할지
    const MONSTER_ROWS = 5;  // 몇 줄의 적 우주선을 배치할지
    const gap = 10; // 우주선 간의 간격

    const enemyWidth = enemyImg.width;
    const enemyHeight = enemyImg.height;
    const startX = (canvas.width - (MONSTER_TOTAL * (enemyWidth + gap))) / 2;

    for (let row = 0; row < MONSTER_ROWS; row++) {
        for (let col = 0; col < MONSTER_TOTAL; col++) {
            const x = startX + col * (enemyWidth + gap);
            const y = row * (enemyHeight + gap);
            ctx.drawImage(enemyImg, x, y);
        }
    }
}

function createEnemies2(ctx, canvas, enemyImg) {
    const ROWS = 5; // 피라미드의 행 개수
    const gap = 20; // 우주선 간의 간격

    const enemyWidth = enemyImg.width;
    const enemyHeight = enemyImg.height;

    for (let row = 0; row < ROWS; row++) {
        const numEnemies = ROWS - row; // 각 행에서의 적 우주선 수
        const startX = (canvas.width - (numEnemies * (enemyWidth + gap))) / 2;

        for (let col = 0; col < numEnemies; col++) {
            const x = startX + col * (enemyWidth + gap);
            const y = row * (enemyHeight + gap);
            ctx.drawImage(enemyImg, x, y);
        }
    }
}
