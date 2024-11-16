document.addEventListener("DOMContentLoaded", function() {
    const sentences = {
        english: [
          "People in my town have different jobs.",
          "There are cooks, teachers, doctors, bus drivers, and so on.",
          "Thanks to them, I know a lot of things about jobs.",
          "Mr. Austin lives next door.",
          "He is a script writer for TV dramas.",
          "His mystery series are always very popular.",
          "He travels a lot and meets many people to get ideas for his work.",
          "When he has free time, he usually reads books for more ideas.",
          "Last Saturday, I asked him about the last episode of his drama, but he said, You’ll see it on TV, Emma.",
          "Oh, I can’t wait!",
          "When I start writing a new series, I usually stay up late for days.",
          "When I walk around the corner, a sweet smell comes from Ms. Gray’s bakery.",
          "She gets up really early to bake bread and cakes.",
          "Sometimes she makes a new kind of bread.",
          "Then we can taste it for free.",
          "Her bread is always wonderful.",
          "She is like a magician.",
          "She works wonders with flour, milk, and eggs.",
          "What a great job!",
          "I have to get up at four to bake fresh bread.",
          "Mr. Williams lives near the park.",
          "When my dog gets sick, I always take her to him.",
          "He does his best to treat her.",
          "Sometimes he goes to different farms to take care of animals.",
          "Last Sunday he got a call from Ms. Bailey.",
          "He hurried to her farm.",
          "With his help, her cow gave birth to a cute baby.",
          "Ms. Bailey was happy and thanked the doctor.",
          "Animals can’t talk about their problems.",
          "I always try to understand them.",
          "Moo Follow your dreams!"
        ],
        korean: [
          "내 마을 사람들은 각기 다른 직업을 가지고 있다.",
          "요리사, 선생님, 의사, 버스 운전기사 등이 있다.",
          "그들 덕분에 나는 직업에 대해 많이 알게 되었다.",
          "옆집에는 오스틴 씨가 산다.",
          "그는 TV 드라마의 각본가이다.",
          "그의 미스터리 시리즈는 항상 인기가 많다.",
          "그는 작업 아이디어를 얻기 위해 많이 여행하며 많은 사람들을 만난다.",
          "여가 시간이 있을 때면, 그는 보통 더 많은 아이디어를 얻기 위해 책을 읽는다.",
          "지난 토요일, 나는 그에게 드라마의 마지막 에피소드에 대해 물었지만, 그는 'TV에서 확인할 수 있을 거야, 엠마.'라고 말했다.",
          "정말 기다릴 수 없다!",
          "새 시리즈를 쓰기 시작할 때면, 보통 며칠 동안 늦게까지 깨어 있다.",
          "구석을 돌면, 그레이 씨의 빵집에서 달콤한 냄새가 난다.",
          "그녀는 매우 일찍 일어나 빵과 케이크를 굽는다.",
          "가끔은 새로운 종류의 빵을 만든다.",
          "그러면 우리는 그것을 무료로 맛볼 수 있다.",
          "그녀의 빵은 항상 훌륭하다.",
          "그녀는 마법사 같다.",
          "그녀는 밀가루, 우유, 달걀로 놀라운 일을 한다.",
          "정말 멋진 직업이다!",
          "신선한 빵을 굽기 위해 나는 새벽 네 시에 일어난다.",
          "윌리엄스 씨는 공원 근처에 산다.",
          "내 개가 아플 때면 나는 항상 그에게 데려간다.",
          "그는 그녀를 치료하기 위해 최선을 다한다.",
          "가끔은 다른 농장에 가서 동물을 돌본다.",
          "지난 일요일에는 베일리 씨로부터 전화를 받았다.",
          "그는 그녀의 농장으로 서둘러 갔다.",
          "그의 도움으로 그녀의 소는 귀여운 아기를 낳았다.",
          "베일리 씨는 기뻐하며 의사에게 감사를 표했다.",
          "동물들은 자신의 문제를 말할 수 없다.",
          "나는 항상 그들을 이해하려고 노력한다.",
          "음메~ 꿈을 따라가!"
        ]
      };
      

      let currentSentenceIndex = 0;
    const sentenceContainer = document.getElementById("sentence-container");
    const translationContainer = document.getElementById("translation-container");
    const sentenceIndexSpan = document.getElementById("sentence-index");
    const totalSentencesSpan = document.getElementById("total-sentences");
    const resultMessage = document.getElementById("result-message");

    totalSentencesSpan.textContent = sentences.english.length;

    function loadSentence() {
        sentenceContainer.innerHTML = "";
        const englishSentence = sentences.english[currentSentenceIndex];
        const inputs = englishSentence.split(" ").map(word => {
            const input = document.createElement("input");
            input.type = "text";
            input.dataset.word = word.replace(/[.,'"]/g, "");  // Remove punctuation
            return input;
        });

        inputs.forEach((input, index) => {
            sentenceContainer.appendChild(input);
            input.addEventListener("keydown", event => handleInputKeyDown(event, inputs, index));
            if (index < inputs.length - 1) sentenceContainer.appendChild(document.createTextNode(" "));
        });

        const koreanTranslation = document.createElement("p");
        koreanTranslation.textContent = sentences.korean[currentSentenceIndex];
        translationContainer.innerHTML = ""; // Clear previous translation
        translationContainer.appendChild(koreanTranslation);

        // Focus on the first input field
        inputs[0].focus();
    }

    function handleInputKeyDown(event, inputs, index) {
        switch (event.key) {
            case "ArrowLeft":
                if (index > 0) {
                    event.preventDefault();
                    inputs[index - 1].focus();
                }
                break;
            case "ArrowRight":
                if (index < inputs.length - 1) {
                    event.preventDefault();
                    inputs[index + 1].focus();
                }
                break;
            case " ":
                event.preventDefault(); // Prevent adding a space in the input field
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
                break;
            case "Enter":
                event.preventDefault();
                checkAnswers(inputs);
                break;
        }
    }

    function checkAnswers(inputs) {
        const allCorrect = inputs.every(input => input.value.trim().toLowerCase() === input.dataset.word.toLowerCase());
        if (allCorrect) {
            resultMessage.textContent = "Correct!";
            if (currentSentenceIndex < sentences.english.length - 1) {
                nextSentence();
            } else {
                resultMessage.textContent = "You have completed all sentences.";
                nextSentenceButton.disabled = true;
            }
        } else {
            resultMessage.textContent = "Some answers are incorrect. Please try again.";
            inputs.forEach(input => {
                input.style.borderColor = input.value.trim().toLowerCase() === input.dataset.word.toLowerCase() ? "green" : "red";
            });
        }
    }

    function nextSentence() {
        currentSentenceIndex++;
        sentenceIndexSpan.textContent = currentSentenceIndex + 1;
        loadSentence();
    }

    document.getElementById("check-answer").addEventListener("click", () => checkAnswers(Array.from(sentenceContainer.querySelectorAll("input"))));
    document.getElementById("next-sentence").addEventListener("click", nextSentence);

    loadSentence();
});