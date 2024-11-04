document.addEventListener('DOMContentLoaded', () => {
    const character = document.querySelector('.char');
    const movechar = document.querySelector('.cap_area')
    const container = document.querySelector('.moniter');
    const topIconA = document.querySelector('.infoIcon_a');
    const topIconB = document.querySelector('.infoIcon_b');
    const topIconC = document.querySelector('.infoIcon_c');
    const buildingA = document.querySelector('.building_a');
    const buildingB = document.querySelector('.building_b');
    const hole = document.querySelector('.hole');
    const poleA = document.querySelector('.pole_a');
    const poleB = document.querySelector('.pole_b');
    const capBox = document.querySelector('.caption');
    const topIcon = document.querySelector('.top_icon')
    const Ending = document.querySelector('.ending')
    const restart = document.querySelector('.restart')

    let initialX = 33.5;
    let initialY = 0;
    let currentX = initialX;
    let currentY = initialY;

    let overlappingElement = null;
    let itemsRemoved = 0;


    function updateInfoIcons() {
        if (itemsRemoved === 1) {
            topIconA.src = './img/infoIcon.png'; 
        } else if (itemsRemoved === 2) {
            topIconB.src = './img/infoIcon.png';
        } else if (itemsRemoved === 3) {
            topIconC.src = './img/infoIcon.png';
            setTimeout(function() {
                topIcon.style.display = 'none';
                Ending.classList.add('fade-in')
    
                setTimeout(function() {
                    document.querySelector('.bg_wrap').style.display = 'none'; 
                    document.querySelector('.bg_wrap').classList.add('fade-out');
                    Ending.style.display = 'block'; 
                }, 1000);
            }, 800);
        }
    }
    

    document.querySelector('.startBtn').addEventListener('click', function() {
        const startSection = document.querySelector('.start');
        startSection.classList.add('fade-out');

        setTimeout(function() {
            startSection.style.display = 'none';
            document.querySelector('.bg_wrap').style.display = 'block';
            topIcon.style.display = 'block';
        }, 1000);
    });

    function moveCharacter(x, y) {
        const containerWidth = 100;
        const containerHeight = (container.clientHeight / window.innerHeight) * 100;
        const charWidth = (movechar.clientWidth / window.innerWidth) * 100;
        const charHeight = (movechar.clientHeight / window.innerHeight) * 100;

        x = Math.max(0, Math.min(x, containerWidth - charWidth));
        y = Math.max(0, Math.min(y, containerHeight - charHeight));

        movechar.style.left = x + 'vw';
        movechar.style.top = y + 'vh';

        currentX = x;
        currentY = y;

        checkOverlap();
    }

    function checkOverlap() {
        const charRect = character.getBoundingClientRect();
        const buildingRect = buildingA.getBoundingClientRect();
        const holeRect = hole.getBoundingClientRect();
        const poleRect = poleA.getBoundingClientRect();

        character.style.opacity = 1;

        function calculateOverlap(rect1, rect2) {
            const overlapX = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
            const overlapY = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));
            return overlapX * overlapY;
        }

        const buildingOverlap = calculateOverlap(charRect, buildingRect);
        const holeOverlap = calculateOverlap(charRect, holeRect);
        const poleOverlap = calculateOverlap(charRect, poleRect);

        const charArea = charRect.width * charRect.height;

        const buildingOverlapRatio = buildingOverlap / charArea;
        const holeOverlapRatio = holeOverlap / charArea;
        const poleOverlapRatio = poleOverlap / charArea;

        if (buildingOverlapRatio > 0.7) {
            overlappingElement = 'building';
            character.style.opacity = 0.5;
            showCapBox();
        } else if (holeOverlapRatio > 0.7) {
            overlappingElement = 'hole';
            character.style.opacity = 0.5;
            showCapBox();
        } else if (poleOverlapRatio > 0.7) {
            overlappingElement = 'pole';
            character.style.opacity = 0.5;
            showCapBox();
        } else {
            character.style.opacity = 1;
            capBox.style.display = 'none';
            overlappingElement = null;
        }
    }
    

    // function showCapBox() {
    //     const charRect = character.getBoundingClientRect();
    //     const charLeftVW = (charRect.left / window.innerWidth) * 100;
    //     const charTopVW = (charRect.top / window.innerHeight) * 100;
    //     const capBoxHeightVW = (capBox.offsetHeight / window.innerHeight) * 100;

    //     capBox.style.left = `${charLeftVW - 12}vw`;
    //     capBox.style.top = `${charTopVW - capBoxHeightVW - 18}vw`;
    //     capBox.style.display = 'block';
    // }

    ////////////////////////////수정 필요
    function showCapBox() {
        const charRect = character.getBoundingClientRect();
    //     const capBoxOffsetX = (capBox.offsetWidth / window.innerWidth) * 100 / 2; // capBox 너비의 절반
    // const capBoxOffsetY = (capBox.offsetHeight / window.innerHeight) * 100 + 2;

    // capBox.style.left = `${(charRect.left / window.innerWidth * 100) - capBoxOffsetX}vw`;
    // capBox.style.top = `${(charRect.top / window.innerHeight * 100) - capBoxOffsetY}vh`;
    
        // capBox.style.left = `${(charRect.left/ window.innerWidth * 100 - (205 / window.innerWidth * 100))}vw`;
        // capBox.style.top = `${(charRect.top / window.innerHeight * 100 - (140 / window.innerHeight * 100))}vh`;
    
        capBox.style.display = 'block'; // 캡션 박스 표시
    }
    
    
    
    

    document.addEventListener('keydown', (event) => {
        let newX = currentX;
        let newY = currentY;

        let currentDirection = character.dataset.direction;

        if (event.key === 'ArrowLeft') {
            newX -= 1.5;
            currentDirection = 'left';
        } else if (event.key === 'ArrowRight') {
            newX += 1.5;
            currentDirection = 'right';
        } else if (event.key === 'ArrowUp') {
            newY -= 1.5;
            currentDirection = 'up';
        } else if (event.key === 'ArrowDown') {
            newY += 1.5;
            currentDirection = 'down';
        }

        character.dataset.direction = currentDirection;
        character.dataset.walking = 'true';

        moveCharacter(newX, newY);
    });

    document.addEventListener('keyup', () => {
        character.dataset.walking = 'false';
    });

    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 32 && capBox.style.display === 'block') {
            capBox.style.display = 'none';

            if (overlappingElement === 'hole') {
                hole.style.display = 'none'; 
            } else if (overlappingElement === 'pole') {
                poleA.style.display = 'none';
                poleB.style.display = 'block'; 
            } else if (overlappingElement === 'building') {
                buildingA.style.display = 'none'; 
                buildingB.style.display = 'block';
            }

            overlappingElement = null;
            itemsRemoved++; 
            updateInfoIcons(); 
        }
    });

    window.addEventListener('resize', () => {
        moveCharacter(currentX, currentY);
    });

    moveCharacter(initialX, initialY);




    restart.addEventListener('click', function() {
        Ending.style.display = 'none';
        
        const startSection = document.querySelector('.start');
        startSection.style.display = 'block';
        
        topIconA.src = './img/infoIcon_b.png';
        topIconB.src = './img/infoIcon_b.png';
        topIconC.src = './img/infoIcon_b.png';
        
        itemsRemoved = 0;

        startSection.classList.remove('fade-out');
        document.querySelector('.bg_wrap').classList.remove('fade-out');

        // const elements = document.querySelectorAll('.building, .pole, .hole');
        // elements.forEach(element => {
        //     element.style.opacity = '0';
        //     element.style.pointerEvents = 'auto';
        // });

        // buildingA.src = "./img/building_b.jpg"
        // poleA.src =

        buildingA.style.display = 'block'; 
        buildingB.style.display = 'none'; 
        poleA.style.display = 'block';
        poleB.style.display = 'none'; 
        hole.style.display = 'block';


        moveCharacter(initialX, initialY);
    });


});



