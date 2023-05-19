// ;Initial Data
let currentQuestion = 0; // Variável para controlar a pergunta atual
let correctAnswer = 0; // Variável para controlar o número de respostas corretas
let valorNome = ""; // Variável para armazenar o nome do participante
let quizConcluido = false; // Variável para indicar se o quiz foi concluído ou não


// Verifica se o quiz já foi concluído anteriormente ou se o parâmetro "restart" está presente na URL
// Se o quiz foi concluído e não há o parâmetro "restart" na URL, define a variável "quizConcluido" como true
if (localStorage.getItem('quizConcluido') && !getParameterByName('restart')) {
    quizConcluido = true;
}

// Events
// Evento para recarregar a página ao clicar no botão de reinício
document.querySelector('.scoreArea button').addEventListener('click', function() {
    location.reload();
});

// Function
// Função para exibir a pergunta atual
function showQuestion() {
    valorNome = document.querySelector('#nome').value;

    // Se o quiz já foi concluído e não há o parâmetro "restart" na URL, exibe a área de pontuação
    if (quizConcluido && !getParameterByName('restart')) {
        document.querySelector('.scoreArea').style.display = 'block';
        document.querySelector('.questionArea').style.display = 'none';
        document.querySelector('.progress--bar').style.width = '100%';
        return;
    }
    
    if (questions[currentQuestion]) {
        // Oculta a área inicial
        document.querySelector('.inicio').style.display = 'none';
        document.querySelector('.inicio').style.display = 'none';
        let q = questions[currentQuestion];

        // Calcula a porcentagem de progresso
        let pct = (currentQuestion / questions.length) * 100;
        document.querySelector('.progress--bar').style.width = pct + '%';

        // Oculta a área de pontuação e exibe a área de pergunta
        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'flex';

        // Exibe a pergunta atual
        document.querySelector('.question').innerHTML = q.question;
        document.querySelector('.options').innerHTML = '';

        // Gera as opções de resposta
        let optionsHtml = '';
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        // Adiciona os eventos de clique nas opções de resposta
        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });

    } else {
        finishQuiz();
    }
}

// Função para tratar o evento de clique nas opções de resposta
function optionClickEvent(e) {
    let clickOption = parseInt(e.target.getAttribute('data-op'));

    // Verifica se a opção selecionada está correta e atualiza a variável de respostas corretas
    if (questions[currentQuestion].answer === clickOption) {
        correctAnswer++;
    }

    // Avança para a próxima pergunta
    currentQuestion += 1;
    showQuestion();
}

// Função para exibir a pontuação final do quiz
function finishQuiz() {
        // Calcula a pontuação em porcentagem
        let points = (correctAnswer / questions.length) * 100;

        // Exibe a mensagem e a cor da pontuação com base na porcentagem alcançada
        if (points <= 30) {
            document.querySelector('.scoreText1').innerHTML = `Tá ruim em ${valorNome}😕`;
            document.querySelector('.scorePct').style.color = "#ff0000";
        } else if (points > 30 && points <= 70) {
            document.querySelector('.scoreText1').innerHTML = `Bom ${valorNome}🙂`;
            document.querySelector('.scorePct').style.color = "yellow";
        } else {
            document.querySelector('.scoreText1').innerHTML = `Muito Bom, Parabéns ${valorNome}🙂🏆`;
            document.querySelector('.scorePct').style.color = "green";
        }
    
        // Exibe a porcentagem de acertos e o número de questões respondidas corretamente
        document.querySelector('.scorePct').innerHTML = `Acertou ${Math.floor(points)}%`;
        document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswer}`;
    
        // Define a variável "quizConcluido" como true e armazena essa informação no localStorage
        quizConcluido = true;
        localStorage.setItem('quizConcluido', true);
    
        // Exibe a área de pontuação e oculta a área de pergunta
        document.querySelector('.scoreArea').style.display = 'block';
        document.querySelector('.questionArea').style.display = 'none';
        document.querySelector('.progress--bar').style.width = '100%';
    }
    
