import { createSlice } from '@reduxjs/toolkit';


const sampleQuestions = {
  sports: [
    {
      id: 1,
      question: 'Which country won the FIFA World Cup in 2018?',
      options: ['France', 'Brazil', 'Germany', 'Spain'],
      answer: 'France',
    },
    {
      id: 2,
      question: 'Who is the all-time leading scorer in NBA history?',
      options: ['Kareem Abdul-Jabbar', 'LeBron James', 'Kobe Bryant', 'Michael Jordan'],
      answer: 'Kareem Abdul-Jabbar',
    },
   
  ],
  arts: [
    {
      id: 1,
      question: 'Who painted the Mona Lisa?',
      options: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
      answer: 'Leonardo da Vinci',
    },
    {
      id: 2,
      question: 'Which composer wrote the Symphony No. 9 in D minor, also known as the "Choral" Symphony?',
      options: ['Ludwig van Beethoven', 'Wolfgang Amadeus Mozart', 'Johann Sebastian Bach', 'Franz Schubert'],
      answer: 'Ludwig van Beethoven',
    },
   
  ],
  history: [
    {
      id: 1,
      question: 'In which year did World War II end?',
      options: ['1945', '1939', '1918', '1941'],
      answer: '1945',
    },
    {
      id: 2,
      question: 'Who was the first President of the United States?',
      options: ['George Washington', 'Thomas Jefferson', 'Abraham Lincoln', 'John Adams'],
      answer: 'George Washington',
    },
 
  ],
  physics: [
    {
      id: 1,
      question: 'What is the SI unit of force?',
      options: ['Newton', 'Watt', 'Joule', 'Ampere'],
      answer: 'Newton',
    },
    {
      id: 2,
      question: 'What is the speed of light in a vacuum?',
      options: ['299,792,458 meters per second', '300,000,000 meters per second', '299,792,458 kilometers per hour', '300,000,000 kilometers per hour'],
      answer: '299,792,458 meters per second',
    },
    
  ],
};

const testSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
  },
  reducers: {
    getQuestions: (state, action) => {
      const category = action.payload;
      state.questions = sampleQuestions[category];
    },
  },
});

export const { getQuestions } = testSlice.actions;

export default testSlice.reducer;