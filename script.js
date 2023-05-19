// Dados iniciais
let currentQuestion = 0;
let correctAnswer = 0;
let valorNome = "";

// Verifica se o quiz já foi respondido anteriormente
const quizAttempted = localStorage.getItem("quizAttempted");

if (quizAttempted) {
  // Se o quiz já foi respondido, exibe uma mensagem adequada
  document.querySelector('.inicio').style.display = 'none';
  document.querySelector('.scoreArea').style.display = 'block';
  document.querySelector('.scoreText1').innerHTML = 'Você já tentou fazer o quiz antes.';
  document.querySelector('.scorePct').style.color = '#000';
  document.querySelector('.scorePct').innerHTML = '';
  document.querySelector('.scoreText2').innerHTML = '';
} else {
  // Eventos
  document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

  // Função para exibir a pergunta atual
  function showQuestion() {
    valorNome = document.querySelector('#nome').value;

    if (questions[currentQuestion]) {
      // Exibe a pergunta e as opções de resposta
      document.querySelector('.inicio').style.display = 'none';
      document.querySelector('.scoreArea').style.display = 'none';
      let q = questions[currentQuestion];

      let pct = (currentQuestion / questions.length) * 100;
      document.querySelector('.progress--bar').style.width = pct + '%';

      document.querySelector('.questionArea').style.display = 'flex';
      document.querySelector('.question').innerHTML = q.question;
      document.querySelector('.options').innerHTML = '';

      let optionsHtml = '';
      for (let i in q.options) {
        optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span> ${q.options[i]}</div>`;
      }
      document.querySelector('.options').innerHTML = optionsHtml;

      document.querySelectorAll('.options .option').forEach(item => {
        item.addEventListener('click', optionClickEvent);
      });
    } else {
      finishQuiz();
    }
  }

  // Função para tratar o clique em uma opção de resposta
  function optionClickEvent(e) {
    let clickOption = parseInt(e.target.getAttribute('data-op'));

    if (questions[currentQuestion].answer === clickOption) {
      correctAnswer++;
    }

    currentQuestion += 1;
    showQuestion();
  }

  // Função para finalizar o quiz
  function finishQuiz() {
    let points = (correctAnswer / questions.length) * 100;

    if (points <= 30) {
      document.querySelector('.scoreText1').innerHTML = `Tá ruim em ${valorNome} 😕`;
      document.querySelector('.scorePct').style.color = "#ff0000";
    } else if (points > 30 && points <= 70) {
      document.querySelector('.scoreText1').innerHTML = `Bom ${valorNome} 🙂`;
      document.querySelector('.scorePct').style.color = "yellow";
    } else {
      document.querySelector('.scoreText1').innerHTML = `Muito bom! Parabéns ${valorNome} 🙂🏆`;
      document.querySelector('.scorePct').style.color = "green";
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${Math.floor(points)}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswer}`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';

    // Marca o quiz como respondido
    localStorage.setItem('quizAttempted', 'true');
  }

  // Função para reiniciar o quiz
  function resetEvent() {
    currentQuestion = 0;
    correctAnswer = 0;
    document.querySelector('.scoreArea').style.display = 'none';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.inicio').style.display = 'flex';

    // Remove a marcação de tentativa do quiz
    localStorage.removeItem('quizAttempted');
  }

  // Inicia o quiz
  showQuestion();
}
