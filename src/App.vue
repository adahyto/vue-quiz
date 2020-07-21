<template>
  <div id="app">
    <Header v-if="questions.length" :points="points" />
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="6" offset="3">
          <AskBox
            v-if="questions.length"
            :currentQuestion="questions[index]"
            :nextQuestion="nextQuestion"
            :pointControl="pointControl"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import AskBox from "./components/AskBox";

import { getQuestions } from "./services/getQuestions";

export default {
  name: "App",
  components: {
    Header,
    AskBox,
  },
  data() {
    return {
      questions: [],
      index: 0,
      points: {
        gathered: 0,
        missed: 0,
        total: 0,
      },
    };
  },
  methods: {
    nextQuestion() {
      this.index++;
    },
    pointControl(correct) {
      correct ? this.points.gathered++ : this.points.missed++;
    },
  },
  beforeCreate: function() {
    getQuestions().then((res) => {
      this.questions = res.results;
      this.points.total = this.questions.length;
    });
  },
};
</script>