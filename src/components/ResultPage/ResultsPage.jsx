import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Stack, Typography, Grid, Box, Container } from '@mui/material';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { questions, selectedOptions, notes } = useSelector((state) => state.test);
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(selectedOptions || {}).length;
  const correctAnswers = questions.filter((question) => selectedOptions?.[question.id] === question.correctOption);
  const skippedQuestions = totalQuestions - answeredQuestions;
  const [timeTaken, setTimeTaken] = useState('');
  // const startTime = Date.now(); 
  const { startTime } = useLocation().state;
  const calculateScore = () => {
    const score = correctAnswers.length;
    return `${score}/${totalQuestions}`;
  };

  const calculatePercentage = () => {
    const percentage = (correctAnswers.length / totalQuestions) * 100;
    return percentage.toFixed(0);
  };

  useEffect(() => {
    const handlePopstate = () => {
      navigate('/results');
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [navigate]);

  useEffect(() => {
    const currentTime = Date.now();
    const difference = currentTime - startTime;
    const minutes = Math.floor(difference / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);
    setTimeTaken(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
  }, [startTime]);

  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <Stack justifyContent="center" alignItems="center" spacing={{xs:6, md:7}} p={5} m={{xs:2, md:5}} sx={{ bgcolor: '#efefef' }}>
          <Grid container spacing={{ xs: 5, md: 3 }}>
            <Grid item xs={12} md={4}>
              <Stack direction="column" alignItems="flex-start">
                <Typography variant="body1">Score : {calculateScore()}</Typography>
                <Typography variant="body1">Time Taken: {timeTaken}</Typography>
                <Stack mt={2}>
                  <Typography variant="body1" sx={{ color: '#2B7DF7', fontSize: '35px', fontWeight: '600' }}>
                    {calculatePercentage()}%
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#2B7DF7', fontSize: '16px', fontWeight: '500' }}>
                    Total Score
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Box sx={{ width: '100px', height: '100px' }}>
                <CircularProgressbar value={parseInt(calculatePercentage(), 10)} text={`${calculatePercentage()}%`} />
                <Typography variant="body1" mt={1} sx={{ textAlign: 'center' }}>
                  Final Score
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Box sx={{ width: '100px', height: '100px' }}>
                <CircularProgressbar value={correctAnswers.length} text={`${correctAnswers.length}`} />
                <Typography variant="body1" mt={1} sx={{ textAlign: 'center' }}>
                  Correct
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Box sx={{ width: '100px', height: '100px' }}>
                <CircularProgressbar
                  value={answeredQuestions - correctAnswers.length <= 0 ? 0 : answeredQuestions - correctAnswers.length}
                  text={`${answeredQuestions - correctAnswers.length <= 0 ? '0' : answeredQuestions - correctAnswers.length}`}
                />
                <Typography variant="body1" mt={1} sx={{ textAlign: 'center' }}>
                  Wrong
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Box sx={{ width: '100px', height: '100px' }}>
                <CircularProgressbar value={skippedQuestions} text={`${skippedQuestions}`} />
                <Typography variant="body1" mt={1} sx={{ textAlign: 'center' }}>
                  Skipped
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Stack justifyContent="center" mt={5} mb={5} alignItems="flex-start" sx={{ border: 'solid 1px #c4c4c4' }} p={4}>
            <Typography variant="body1" sx={{ color: '#333', fontSize: '20px', fontWeight: '500' }}>
              Your scribble notes:
            </Typography>
            <Typography variant="body1" sx={{ color: '#333', fontSize: '16px', fontWeight: '400' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nisl vitae purus facilisi id. Blandit sagittis commodo, urna ut mattis vestibulum non. Vel sed scelerisque leo quis in mattis ultrices aliquam. Justo, Lorem ivp
            </Typography>
          </Stack>
          <Box sx={{ width: '150px' }}>
            <Button variant="outlined" sx={{ textTransform: 'capitalize' }} fullWidth onClick={() => navigate('/')}>
              Exit
            </Button>
          </Box>
        </Stack>
      </Container>
      <Footer />
    </>
  );
};

export default ResultsPage;
