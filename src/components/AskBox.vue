<template>
  <div class="ask-box-container">
    <b-jumbotron>
      <template v-slot:lead>
        <p>
          {{ currentQuestion.question }}
        </p>
      </template>

      <hr class="my-4" />

      <b-list-group>
        <b-list-group-item
          v-for="(answer, index) in answers"
          :key="index"
          @click.prevent="selectAnswer(index)"
          :class="answerClass(index)"
        >
          {{ answer }}</b-list-group-item
        >
      </b-list-group>

      <b-button
        variant="primary"
        @click="submitAnswer"
        :disabled="selectedIndex === null || answered"
        >Submit
      </b-button>
      <b-button variant="success" @click="nextQuestion">{{
        answered ? "Next" : "Skip"
      }}</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  props: {
    currentQuestion: Object,
    nextQuestion: Function,
    pointControl: Function,
  },
  data() {
    return {
      selectedIndex: null,
      answered: false,
    };
  },
  computed: {
    answers() {
      return [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer,
      ].sort(() => 0.5 - Math.random());
    },
    correctIndex() {
      return this.answers.indexOf(this.currentQuestion.correct_answer);
    },
  },
  watch: {
    currentQuestion: {
      immediate: true,
      handler() {
        this.answered = false;
      },
    },
  },
  methods: {
    selectAnswer(index) {
      this.selectedIndex = index;
    },
    submitAnswer() {
      const correct = this.selectedIndex === this.correctIndex ? true : false;
      this.answered = true;
      this.pointControl(correct);
    },
    answerClass(index) {
      if (!this.answered && this.selectedIndex === index) {
        return "selected";
      } else if (this.answered && this.correctIndex === index) {
        return "correct";
      } else if (
        this.answered &&
        this.selectedIndex === index &&
        this.correctIndex !== index
      ) {
        return "incorrect";
      }
    },
  },
};
</script>

<style scoped>
.ask-box-container {
  margin-top: 25px;
}
.list-group {
  margin-bottom: 25px;
}

.list-group-item:hover {
  cursor: pointer;
}

.btn {
  margin: 0 7.5px;
}

.selected {
  background-color: #5bc0de;
}

.correct {
  background-color: #5cb85c;
}

.incorrect {
  background-color: #d9534f;
}
</style>
