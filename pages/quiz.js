import React from 'react';
import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import Button from '../src/components/Button';

function LoadingWigget() {
    return (
        <Widget>
            <Widget.Header>
                Carregando...
            </Widget.Header>

            <Widget.Content>
                [Desafio do Loading]
            </Widget.Content>
        </Widget>
    );
}

function QuestionWiget({ 
    question, 
    totalQuestions,
    questionIndex,
    onSubmit,
 }) {
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
    const questionId = `question__${questionIndex}`;
    return (
            <Widget>
                <Widget.Header>
                    <h3>
                        {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}                        
                    </h3>
                </Widget.Header>

                <img
                    alt="Descrição"
                    style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                    }}
                    src={question.image}
                />
                <Widget.Content>
                    <h2>
                        {question.title}
                    </h2>
                    <p>
                        {question.description}
                    </p>
                
                <form 
                    onSubmit={(infosDoEvento) => {
                    infosDoEvento.preventDefault();
                    onSubmit();
                    }}
                >
                    {question.alternatives.map((alternative, alternativeIndex) => {
                    const alternativeId = `alternative__${alternativeIndex}`;
                    
                    return (
                        <Widget.Topic
                                as="label"
                                key={alternativeId}
                                htmlFor={alternativeId}
                            >                            
                            <input 
                                // style={{ display: 'none' }}
                                id={alternativeId}
                                name={questionId}
                                onChange={() => setSelectedAlternative(alternativeIndex)}
                                type="radio"
                            />
                            {alternative}
                        </Widget.Topic>
                    );
                    
                    })}                

                    <Button type="submit">
                        Confirmar
                    </Button>

                    <p>Você acertou!</p>
                    <p>Você errou!</p>
                </form>
            </Widget.Content>
        </Widget>
    );
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
};

export default function QuizPage() {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const totalQuestions = db.questions.length;
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];

    React.useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.QUIZ);
        },1 * 1000);
    }, []);   

    function handleSubmit() {
        const nextQuestion = questionIndex + 1;
        if (nextQuestion < totalQuestions) {
            setCurrentQuestion(questionIndex);
        } else {
            setScreenState(screenStates.RESULT);
        }       
    }

    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuizLogo />

                {screenState === screenStates.QUIZ && (
                    <QuestionWiget 
                        question={question}
                        questionIndex={questionIndex}
                        totalQuestions={totalQuestions}
                        onSubmit={handleSubmit}
                    />
                )}
                {screenState === screenStates.LOADING && <LoadingWigget />}
                
                {screenState === screenStates.RESULT && <div>Você acertou X questões</div>}
            </QuizContainer>
        </QuizBackground>
    );
}