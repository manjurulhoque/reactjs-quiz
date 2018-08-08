import React, { Component } from 'react';
import data from './Data';
import Question from './components/Question';
import Results from './components/Results';
import Progress from './components/Progress';
import Arrow from './components/Arrow';
import defaultImage from './images/truck.svg';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            allQuestions: data.allQuestions,
            currentQuestion: data.allQuestions[0],
            progress: 0,
            allAnswers: [],
            loadNewQuestion: false,
            showResults: false,
            loadingResults: false,
            resultsLoaded: false,
            correctAnswers: null
        }
    }

    // for arrow function, we don't need to bind
    onSelectAnswer = (answer) => {
        const {allAnswers, progress} = this.state;

        const currentAnswer = allAnswers[progress];

        if(currentAnswer){
            allAnswers[progress] = answer;

            this.setState({
                allAnswers
            }, this.goToNextQuestion())
        }else{
            this.setState({
                allAnswers: [...allAnswers, answer]
            }, this.goToNextQuestion())
        }

    }

    goToNextQuestion = () => {
        const {progress, allQuestions} = this.state;

        this.setState({
            loadNewQuestion: true
        });

        setTimeout(() => {
            if(progress < allQuestions.length-1){
                this.setState({
                    progress: progress+1,
                    currentQuestion: allQuestions[progress+1],
                    loadNewQuestion: false
                });
            }else{
                this.setState({
                    loadNewQuestion: false,
                    showResults: true
                });
            }
        }, 300);
    }

    goToPreviousQuestion = () => {
        const {progress, allQuestions, showResults} = this.state;

        this.setState({
            loadNewQuestion: true
        });

        setTimeout(() => {
            (progress > 0 && !showResults) && this.setState({
                progress: progress - 1,
                loadNewQuestion: false,
                currentQuestion: allQuestions[progress-1]
            });

            showResults && this.setState({
                showResults: false,
                loadNewQuestion: false
            })
        }, 300);
    }

    onLoadResults = () => {
        console.log('Loading results');
        this.setState({
            loadingResults: true
        });

        fetch('http://api.myjson.com/bins/zgpjb')
            .then(res => res.json())
            .then(json => {
                console.log(json.correctAnswers);
                const correctAnswers = json.correctAnswers;

                this.setState({
                    correctAnswers,
                    loadingResults: false,
                    resultsLoaded: true
                });
            })
            .catch(err => {
                this.setState({
                    loadingResults: false,
                    resultsLoaded: true
                });
            })
    }

    onRestart = () => {
        this.setState({
            currentQuestion: this.state.allQuestions[0],
            progress: 0,
            allAnswers: [],
            loadNewQuestion: false,
            showResults: false,
            loadingResults: false,
            resultsLoaded: false,
            correctAnswers: null
        });
    }

    render(){
        const {currentQuestion, loadNewQuestion, loadingResults, 
            showResults, allAnswers, allQuestions, correctAnswers, resultsLoaded, progress} = this.state;
        const navIsActive = allAnswers.length > 0;
        const {image} = currentQuestion;
        const headerImage = !showResults ? image : defaultImage;
        return (
            <div className={`${loadingResults ? 'is-loading-results' : ''} ${resultsLoaded ? 'is-showing-results' : 'no-results-loaded'}`}>
                  
                <header>
                    <img className={`fade-out ${loadNewQuestion ? 'fade-out-active': 'fade-out'}`} src={headerImage} />
                </header>

              {/* Content - start */}
                <div className={`content`}>
                    <Progress total={allQuestions.length} progress={allAnswers.length}/>

                {
                    !showResults ?
                    <Question 
                        currentQuestion={currentQuestion} 
                        onSelectAnswer={this.onSelectAnswer}
                        loadNewQuestion={loadNewQuestion}
                        allAnswers={allAnswers}
                    /> : <Results 
                            loadNewQuestion={loadNewQuestion} 
                            allAnswers={allAnswers}
                            allQuestions={allQuestions}
                            onLoadResults={this.onLoadResults}
                            correctAnswers={correctAnswers}
                            resultsLoaded={resultsLoaded}
                            onRestart={this.onRestart}
                            />
                }               

                </div>

                <div className={`navigation text-center ${navIsActive ? 'is-active' : ''} `}>
                    <Arrow 
                        direction='left' 
                        progress={progress} 
                        allAnswers={allAnswers}
                        goToPreviousQuestion={this.goToPreviousQuestion}
                        showResults={showResults}
                        />
                    <Arrow 
                        direction='right' 
                        progress={progress} 
                        allAnswers={allAnswers}
                        goToNextQuestion={this.goToNextQuestion}
                        showResults={showResults}
                        />
                </div>
            </div>
        )
    }
}

export default App;
