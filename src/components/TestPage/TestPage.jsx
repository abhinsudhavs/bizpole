import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getQuestions } from '../Redux/testSlice';
import {
    Button,
    Typography,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Container,
    Stack,
    Box,
    List,
    ListItem,
    ListItemIcon,
    Radio,
    ListItemText
} from '@mui/material';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const TestPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { category } = location.state;
    const questions = useSelector((state) => state.test.questions);
    const [showFinishConfirmation, setShowFinishConfirmation] = useState(false);
    const [startTime, setStartTime] = useState(0);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [notes, setNotes] = useState('');
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [showExitConfirmation, setShowExitConfirmation] = useState(false);
    const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);

    useEffect(() => {
        dispatch(getQuestions(category));
    }, [dispatch, category]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime === 0) {
                    handleNextQuestion();
                    return 300; 
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [currentQuestionIndex]);

    const handleOptionChange = (questionId, option) => {
        setSelectedOptions((prevOptions) => ({
            ...prevOptions,
            [questionId]: option,
        }));
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => {
            if (prevIndex < questions.length - 1) {
                return prevIndex + 1;
            }
            return prevIndex;
        });
        setTimeLeft(300); 
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => {
            if (prevIndex > 0) {
                return prevIndex - 1;
            }
            return prevIndex;
        });
        setTimeLeft(300); 
    };

    const handleFinishTest = () => {
        setShowSubmitConfirmation(true);
        setShowFinishConfirmation(true);
        setStartTime(Date.now());
    };

    const handleConfirmFinishTest = () => {
        setShowSubmitConfirmation(false);
        navigate('/testresult', { state: { questions, selectedOptions, notes, category, startTime } });

    };

    const handleCancelFinishTest = () => {
        setShowExitConfirmation(false);
        setShowFinishConfirmation(false);
    };

    const handleExitTest = () => {
        if (currentQuestionIndex === 0) {
            setShowExitConfirmation(true);
        } else {
            handleConfirmExitTest();
        }
    };
    const handleConfirmExitTest = () => {
        setShowExitConfirmation(false);
        navigate('/');
    };

    const renderTimer = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        return (
            <Typography variant="h6">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </Typography>
        );
    };

    const renderQuestion = (question) => {
        const { id, question: questionText, options } = question;
        const selectedOption = selectedOptions[id] || '';

        return (
            <Box key={id}>
                <Typography variant="body1" mb={3} sx={{ color: "#333", fontSize: "20px" }}>
                    {questionText}
                </Typography>
                <List>
                    {options.map((option) => (
                        <ListItem key={option}>
                            <ListItemIcon>
                                <Radio
                                    checked={selectedOption === option}
                                    onChange={() => handleOptionChange(id, option)}
                                    value={option}
                                    name={`question_${id}`}
                                />
                            </ListItemIcon>
                            <ListItemText primary={option} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        );
    };

    const renderQuestionNumber = () => {
        return (
            <Typography variant="subtitle1" sx={{ color: "#555" }}>
                Question {currentQuestionIndex + 1} of {questions.length}
            </Typography>
        );
    };

    return (
        <>
            <NavBar />
            <Container maxWidth="xl">
                <Stack justifyContent="center" mt={3} alignItems="center">
                    {renderTimer()}
                </Stack>

                {renderQuestionNumber()}
                <Stack flexDirection={{ xs: "column", md: 'row' }} mt={3} spacing={{xs:2, md:2}}>
                    <Stack flex={1} flexDirection={'column'}>
                        {questions.length > 0 && currentQuestionIndex < questions.length ? (
                            renderQuestion(questions[currentQuestionIndex])
                        ) : (
                            <Typography variant="subtitle1">Loading questions...</Typography>
                        )}
                        <Stack flexDirection="row" sx={{ gap: "5px" }} mt={3}>
                            {currentQuestionIndex === 0 && (
                                <Box>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            textTransform: 'capitalize',
                                            color: "#2B7DF7",
                                            fontSize: '16px',
                                            width: '150px'
                                        }}
                                        disableElevation
                                        onClick={handleExitTest}
                                    >
                                        Exit
                                    </Button>
                                </Box>
                            )}
                            {currentQuestionIndex !== 0 && (
                                <Box>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            textTransform: 'capitalize',
                                            color: "#2B7DF7",
                                            fontSize: '16px',
                                            width: '150px'
                                        }}
                                        disableElevation
                                        onClick={handlePreviousQuestion}
                                    >
                                        Back
                                    </Button>
                                </Box>
                            )}
                            {currentQuestionIndex !== questions.length - 1 && (
                                <Box>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            textTransform: 'capitalize',
                                            color: "#fff",
                                            fontSize: '16px',
                                            width: '150px'
                                        }}
                                        disableElevation
                                        onClick={handleNextQuestion}
                                    >
                                        Next
                                    </Button>
                                </Box>
                            )}
                            {currentQuestionIndex === questions.length - 1 && (
                                <Box>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            textTransform: 'capitalize',
                                            color: "#fff",
                                            fontSize: '16px',
                                            width: '150px'
                                        }}
                                        disableElevation
                                        onClick={handleFinishTest}
                                    >
                                        Finish Test
                                    </Button>
                                </Box>
                            )}
                        </Stack>
                    </Stack>
                    <Stack flex={1}>
                        <TextField
                            label="Notes"
                            multiline
                            rows={6}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            fullWidth
                        />
                    </Stack>
                </Stack>
                <Dialog open={showExitConfirmation} onClose={handleCancelFinishTest}>
                    <Stack alignItems={'center'} justifyContent={'center'} m={2}>
                        <Box component={'img'} src="./images/triangle.png" />
                        <DialogTitle>Warning</DialogTitle>
                        <DialogContent>
                            <Typography variant="body1">Are you sure you want to exit the exam?</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button disableElevation variant='outlined' onClick={handleCancelFinishTest}>Cancel</Button>
                            <Button disableElevation variant='contained' onClick={handleExitTest} autoFocus>
                                Continue
                            </Button>
                        </DialogActions>
                    </Stack>


                </Dialog>
                <Dialog open={showFinishConfirmation} onClose={handleCancelFinishTest}>
                <Stack alignItems={'center'} justifyContent={'center'} m={2}>
                        <Box component={'img'} src="./images/triangle.png" />
                    <DialogTitle>Finish Test</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">Are you sure you want to submit the exam?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button disableElevation variant='outlined' onClick={handleCancelFinishTest}>Cancel</Button>
                        <Button disableElevation variant='contained' onClick={handleConfirmFinishTest} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                    </Stack>
                </Dialog>
            </Container>
            <Footer />
        </>
    );
};

export default TestPage;
