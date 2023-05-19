// ;Initial Data
let currentQuestion = 0;
let correctAnswer = 0;
let valorNome = '';

// showQuestion();

// Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

// Function
function showQuestion() {
  valorNome = document.querySelector('#nome').value;

  if (currentQuestion < questions.length) {
    document.querySelector('.inicio').style.display = 'none';
    document.querySelector('.inicio').style.display = 'none';
    let q = questions[currentQuestion];

    let pct = (currentQuestion / questions.length) * 100;
    document.querySelector('.progress--bar').style.width = pct + '%';

    document.querySelector('.scoreArea').style.display = 'none';
    document.querySelector('.questionArea').style.display = 'flex';

    document.querySelector('.question').innerHTML = q.question;
    document.querySelector('.options').innerHTML = '';

    let optionsHtml = '';
    for (let i in q.options) {
      optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span> ${q.options[i]}</div>`;
    }
    document.querySelector('.options').innerHTML = optionsHtml;

    document.querySelectorAll('.options .option').forEach((item) => {
      item.addEventListener('click', optionClickEvent);
    });

  } else {
    finishQuiz();
  }
}

function optionClickEvent(e) {
  let clickOption = parseInt(e.target.getAttribute('data-op'));

  if (questions[currentQuestion].answer === clickOption) {
    correctAnswer++;
  }

  currentQuestion += 1;
  showQuestion();
}

function finishQuiz() {
  let points = (correctAnswer / questions.length) * 100;

  if (points <= 30) {
    document.querySelector('.scoreText1').innerHTML = `Tá ruim em ${valorNome}😕`;
    document.querySelector('.scorePct').style.color = '#ff0000';
  } else if (points > 30 && points <= 70) {
    document.querySelector('.scoreText1').innerHTML = `Bom ${valorNome}🙂`;
    document.querySelector('.scorePct').style.color = 'yellow';
  } else {
    document.querySelector('.scoreText1').innerHTML = `Muito Bom, Parabéns ${valorNome}🙂🏆`;
    document.querySelector('.scorePct').style.color = 'green';
  }

  document.querySelector('.scorePct').innerHTML = `Acertou ${Math.floor(points)}%`;
  document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswer}`;

  document.querySelector('.scoreArea').style.display = 'block';
  document.querySelector('.questionArea').style.display = 'none';
  document.querySelector('.progress--bar').style.width = '100%';
  // Armazena os valores de nome e resultado no Firestore
  armazenarDadosUsuario(valorNome, Math.floor(points));
}

function resetEvent() {
  currentQuestion = 0;
  correctAnswer = 0;
  document.querySelector('.scoreArea').style.display = 'none';
  document.querySelector('.questionArea').style.display = 'none';
  document.querySelector('.inicio').style.display = 'flex';
}

// Referência para a coleção "usuarios" no Firestore
const usuariosRef = firebase.firestore().collection('usuarios');

function armazenarDadosUsuario(nome, resultado) {
  usuariosRef
    .add({
      nome: nome,
      resultado: resultado,
    })
    .then(function (docRef) {
      console.log('Dados armazenados com sucesso!');
      // Exemplo de alerta para indicar que os dados foram armazenados
      alert('Dados armazenados com sucesso!');
      // Verifica se o documento foi adicionado ao Firestore
      verificarResultado(docRef.id);
    })
    .catch(function (error) {
      console.error('Erro ao armazenar os dados: ', error);
    });
}

function verificarResultado(docId) {
  usuariosRef
    .doc(docId)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        console.log('Resultado armazenado: ', doc.data());
      } else {
        console.log('Documento não encontrado.');
      }
    })
    .catch(function (error) {
      console.error('Erro ao obter o resultado: ', error);
    });
}



// Função para recuperar os dados dos usuários
function obterDadosUsuarios() {
  usuariosRef
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch(function (error) {
      console.error('Erro ao obter os dados dos usuários: ', error);
    });
}

// Chamada da função para obter os dados dos usuários
obterDadosUsuarios();


