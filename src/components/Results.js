import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Answers from './Answers';

const Results = ({onRestart, loadNewQuestion, allAnswers, allQuestions, onLoadResults, correctAnswers, resultsLoaded}) => {

    let numberOfCorrect = 0;
    correctAnswers && allQuestions.map((question, index) => {
        correctAnswers[index] === allAnswers[index] && numberOfCorrect++;
    })

    return(
        <div className={`results fade-out ${loadNewQuestion ? 'fade-out-active': 'fade-out'}`}>
            <div className="loader"><div className="icon"></div></div>
            <div className="results-overlay"></div>
            <h1>{`${resultsLoaded ? `${numberOfCorrect} out of ${allQuestions.length} correct!` : 'Here are your answers'}`}</h1>
            <div className="answers">
            <Answers
                allAnswers={allAnswers}
                allQuestions={allQuestions}
                correctAnswers={correctAnswers}
            />
            </div>
            <div className="text-center" style={{margin: 'auto', width: '10%'}}>
                {
                    resultsLoaded ? 
                    (<button className="btn btn-dark" onClick={() => {
                        onRestart();
                    }}>Start again</button>) 
                    :
                    (<button className="btn btn-dark" onClick={() => {
                        onLoadResults();
                    }}>Submit</button>)
                }
            </div>
        </div>
    )
};

Results.propTypes = {
    loadNewQuestion: PropTypes.bool.isRequired,
    allAnswers: PropTypes.array.isRequired,
    allQuestions: PropTypes.array.isRequired,
    onLoadResults: PropTypes.func.isRequired,
    correctAnswers: PropTypes.array,
    resultsLoaded: PropTypes.bool.isRequired,
    onRestart: PropTypes.func.isRequired,
}


export default Results;