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

    let initialX = 28.5;
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


// 타이머 만들기!



// let enterCount = 0; // Enter 키 누른 횟수
// let timerRunning = false; // 타이머 동작 여부

// document.addEventListener("DOMContentLoaded", function () {
//     document.querySelector(".startbtn2").addEventListener("click", start);

//     // Enter 키 이벤트
//     document.addEventListener("keydown", function (event) {
//         if (event.key === "Enter" && timerRunning) {
//             enterCount++;
//             updateEnterCountDisplay();
//             const heartImage = document.querySelector(".heart");

//             if (!heartImage) {
//                 console.error("Error: .heart element not found.");
//                 return;
//             }

//             // 이미지 확대
//             heartImage.style.transform = "scale(1.2)";
//             setTimeout(() => {
//                 heartImage.style.transform = "scale(1)"; // 복귀
//             }, 300);
//         }
//     });
// });

// function start() {
//     let i = 60; // 60초 타이머
//     enterCount = 0; // 카운트 초기화
//     timerRunning = true; // 타이머 시작
//     updateEnterCountDisplay();

//     const elem = document.querySelector(".timerBar");
//     if (!elem) {
//         console.error("Error: .timerBar element not found.");
//         return;
//     }

//     let width = 50; // 초기 폭 50vw
//     elem.style.width = width + "vw"; // 초기 폭 설정

//     const id = setInterval(frame, 1000);
//     function frame() {
//         if (i <= 0) {
//             clearInterval(id); // 타이머 종료
//             timerRunning = false; // 타이머 종료 상태
//             alert(`시간 종료! Enter 키를 누른 횟수: ${enterCount}번`);
//         } else {
//             i--; // 초 감소
//             width -= 50 / 60; // 매 초 폭 감소
//             elem.style.width = width + "vw"; // 줄어드는 폭 설정
//         }
//     }
// }

// function updateEnterCountDisplay() {
//     const display = document.getElementById("digit");
//     if (display) {
//         display.textContent = `Enter 키 횟수: ${enterCount}`;
//     }let enterCount = 0; // Enter 키 누른 횟수
let timerRunning = false; // 타이머 동작 여부
let timerDuration = 60000; // 타이머 60초 (밀리초 단위)
let timerId; // 타이머 ID

document.addEventListener("DOMContentLoaded", function () {
    // Start 버튼 클릭 이벤트
    document.querySelector(".startbtn2").addEventListener("click", start);

    // Enter 키 이벤트
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && timerRunning) {
            enterCount++;
            updateEnterCountDisplay();
            updateEdInfo(); // ed_info 업데이트
            const heartImage = document.querySelector(".heart");

            if (heartImage) {
                // 이미지 확대
                heartImage.style.transform = "scale(1.2)";
                setTimeout(() => {
                    heartImage.style.transform = "scale(1)"; // 복귀
                }, 300);
            }
        }
    });
});

function start() {
    enterCount = 0; // 카운트 초기화
    updateEnterCountDisplay();
    updateEdInfo(); // 초기화 시 ed_info 업데이트
    timerRunning = true; // 타이머 시작

    const elem = document.querySelector(".timerBar");
    if (!elem) {
        console.error("Error: .timerBar element not found.");
        return;
    }

    let startTime = Date.now(); // 시작 시간 기록

    // 타이머 바 초기화
    elem.style.width = "50vw";

    // 타이머 업데이트 함수
    function updateTimer() {
        const elapsed = Date.now() - startTime; // 경과 시간 계산
        const remainingTime = Math.max(timerDuration - elapsed, 0); // 남은 시간

        if (remainingTime <= 0) {
            clearInterval(timerId); // 타이머 종료
            timerRunning = false; // 타이머 비활성화
            endGame(); // 게임 종료 처리
            return;
        }

        // 타이머 바 업데이트
        const width = (remainingTime / timerDuration) * 50; // 비율에 따른 폭 계산
        elem.style.width = `${width}vw`;
    }

    // 100ms마다 타이머 업데이트
    timerId = setInterval(updateTimer, 100);
}

function updateEnterCountDisplay() {
    const display = document.getElementById("digit");
    if (display) {
        display.textContent = `${enterCount}`;
    }
}

function updateEdInfo() {
    const edInfo = document.querySelector('.ed_info .font_bold');
    if (edInfo) {
        edInfo.textContent = `${enterCount}회`; // enterCount 값을 업데이트
    }
}

function endGame() {
    const gameSection = document.querySelector('.game2-ing');
    const edSection = document.querySelector('.ed1_1');
    const endingSection = document.querySelector('.ending2');

    if (gameSection) {
        gameSection.style.display = 'none'; // 게임 섹션 숨기기
    }

    if (edSection) {
        edSection.style.display = 'block'; // 결과 섹션 보이기
    }

    // ending2 섹션의 카운트 업데이트
    const countDisplay = document.querySelector('.ending2 .count');
    if (countDisplay) {
        countDisplay.textContent = `${enterCount}회`; // ending2에 카운트 업데이트
    }

    // 3초 후에 ed1_1을 숨기고 ending2를 보이게 함
    setTimeout(() => {
        if (edSection) {
            edSection.style.display = 'none'; // ed1_1 숨기기
        }
        if (endingSection) {
            endingSection.style.display = 'block'; // ending2 보이기
        }
    }, 3000); // 3000ms = 3초
}

// START 버튼 클릭 시 화면 전환
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.startbtn2'); // 클래스 이름 수정
    if (startButton) { // startButton이 null이 아닐 때만 이벤트 리스너 추가
        startButton.addEventListener('click', function() {
            const startSection2 = document.querySelector('.start2');
            if (startSection2) { // startSection2가 null이 아닐 때만 클래스 추가 및 스타일 변경
                startSection2.style.display = 'none';
            }
            const gameSection = document.querySelector('.game2-ing');
            if (gameSection) { // gameSection이 null이 아닐 때만 스타일 변경
                gameSection.style.display = 'block';
            }
        });
    } else {
        console.error('Error: .startbtn2 element not found.'); // 클래스 이름에 맞게 수정
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const restart2 = document.querySelector('.restart2');
    restart2.addEventListener('click', function() {
        // ending2 섹션 숨기기
        const endingSection = document.querySelector('.ending2');
        if (endingSection) {
            endingSection.style.display = 'none';
        }

        // start2 섹션 보이기
        const startSection2 = document.querySelector('.start2');
        if (startSection2) {
            startSection2.style.display = 'block';
        }

        // 게임 상태 초기화
        resetGame();
    });
});

function resetGame() {
    enterCount = 0; // Enter 키 누른 횟수 초기화
    timerRunning = false; // 타이머 비활성화
    clearInterval(timerId); // 타이머 종료
    const timerBar = document.querySelector('.timerBar');
    if (timerBar) {
        timerBar.style.width = '50vw'; // 타이머 바 초기화
    }
    updateEnterCountDisplay(); // 카운트 디스플레이 업데이트
    updateEdInfo(); // ed_info 업데이트
}





// function endGame() {
//     const gameSection = document.querySelector('.game2-ing');
//     const edSection = document.querySelector('.ed1_1');
//     const endingSection = document.querySelector('.ending2');

//     if (gameSection) {
//         gameSection.style.display = 'none'; // 게임 섹션 숨기기
//     }

//     if (edSection) {
//         edSection.classList.add('fade-in'); // 결과 섹션 보이기
//         edSection.style.display = 'block'; // 먼저 보이게 설정
//         setTimeout(() => {
//             edSection.classList.remove('fade-in'); // fade-in 클래스 제거
//         }, 10); // 클래스가 적용되도록 약간의 지연 후 제거
//     }

//     // 3초 후에 ed1_1을 숨기고 ending2를 보이게 함
//     setTimeout(() => {
//         if (edSection) {
//             edSection.classList.add('fade-out'); // ed1_1을 부드럽게 사라지게 함
//             setTimeout(() => {
//                 edSection.style.display = 'none'; // 완전히 사라진 후 display none
//             }, 500); // fade-out 애니메이션 시간과 일치
//         }
//         if (endingSection) {
//             endingSection.classList.add('fade-in'); // ending2를 부드럽게 나타나게 함
//             endingSection.style.display = 'block'; // 먼저 보이게 설정
//             setTimeout(() => {
//                 endingSection.classList.remove('fade-in'); // fade-in 클래스 제거
//             }, 10); // 클래스가 적용되도록 약간의 지연 후 제거
//         }
//     }, 3000); // 3000ms = 3초
// }




var slidenow = 1;
const nextbtn = document.querySelector('.next')

//   $('.next').on('click', function(){
//     if (slidenow == 1) {
//       $('.slide-container').css('transform', 'translateX(-72vw)');
//       slidenow += 1;
//     } 
//     else if (slidenow == 2){
//       $('.slide-container').css('transform', 'translateX(72vw)');
//       slidenow += 1;
//     }
//   })



//슬라이더 만드려고 했는데 실패!
//   document.addEventListener('DOMContentLoaded', () => {
//     nextbtn.addEventListener('click', function(){
//         if (slidenow == 1) {
//             document.querySelector('.slide-container').style.transform='translateX(-72vw)';
//             slidenow += 1;
//           } 
//           else if (slidenow == 2){
//             document.querySelector('.slide-container').style.transform= 'translateX(0vw)';
//             slidenow += 1;
//           }
//     })

//   })


//   restart.addEventListener('click', function() {

document.addEventListener('DOMContentLoaded',()=>{
    const game1 = document.querySelector('.game1_area')
    const game2 = document.querySelector('.game2')
    const game1btn = document.querySelector('.game1btn')
    const game2btn = document.querySelector('.game2btn')

    game1btn.addEventListener('click', function() {
        game1.style.display = 'block';
        game2.style.display = 'none';
        game1btn.style.background='#ff5f1f'
        game1btn.style.color = '#ffffff'
        game2btn.style.background='transparent'
        game2btn.style.color = '#ff5f1fbe'
    });
    game2btn.addEventListener('click', function(){
        game1.style.display = 'none';
        game2.style.display = 'block';
        game1btn.style.background='transparent'
        game1btn.style.color = '#ff5f1fbe'
        game2btn.style.background='#ff5f1f'
        game2btn.style.color = '#ffffff'
    })
})
