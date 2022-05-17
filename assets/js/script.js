// TODO
// Membuat aplikasi kuis

// 1. Membuat tampilan sederhana
// 2. Struktur data
// 3. Sistem pertanyaan dinamis
// 4. Menyimpan jawaban
// 5. Deteksi kuis selesai
// 6. Penilaian dan perlihatkan skor
// 7. Memperbaiki tampilan dan UX

function startQuiz() {
	document.getElementById('opening_window').style.display = "none";
	document.getElementById('quiz_window').style.display = "block";
}

// Data

const DB_QUIZ = [
	{
		question: "Apa itu SK?",
		answer: ['SiKomo', 'Sekolah Koding', 'Sayur Ketupat', 'Santan Kelapa']
	},
	{
		question: "Sop dibalik?",
		answer: ['Pos', 'Ops', 'Spo', 'Tumpah']
	},
	{
		question: "Programmer itu ...",
		answer: ['Tangguh', 'Lemah', 'Cengeng', 'Apa?']
	}
]

const correctAnswer = [1, 3, 0]

// Setup Question

let current_q = 0
let saved_answer = []
let total_score = 0

document.addEventListener("DOMContentLoaded", function(event) {
	setupQuestion()
});

function setupQuestion() {
	document.getElementById('question').innerText = DB_QUIZ[current_q]['question']
	document.getElementById('choiceText-0').innerText = DB_QUIZ[current_q]['answer'][0]
	document.getElementById('choiceText-1').innerText = DB_QUIZ[current_q]['answer'][1]
	document.getElementById('choiceText-2').innerText = DB_QUIZ[current_q]['answer'][2]
	document.getElementById('choiceText-3').innerText = DB_QUIZ[current_q]['answer'][3]
}

function nextQuestion() {
	current_q++

	saveAnswer()

	if(current_q > DB_QUIZ.length - 1) {
		stopQuiz()
	}

	resetState()
	setupQuestion()
}

function saveAnswer() {
	const answer = document.querySelector('input[name="choices"]:checked');
	if (answer != null) {
		saved_answer.push(parseInt(answer.getAttribute('data-id')))
	} else {
		saved_answer.push(null)
	}
}

function stopQuiz() {
	checkScore()

	document.getElementById('quiz_window').style.display = "none";
	document.getElementById('closing_window').style.display = "block";

	document.getElementById('scoreText').innerHTML = "Score kamu " + total_score
	
	return
}

function resetState() {
	const choosedAnswer = document.querySelector('input[name="choices"]:checked')
	if (choosedAnswer != null) {
		choosedAnswer.checked = false
	}
}

function checkScore() {
	for (i = 0; i < saved_answer.length; i++) {
		if (saved_answer[i] == correctAnswer[i]) {
			total_score += Math.round(100 / DB_QUIZ.length)
		}
	}
}