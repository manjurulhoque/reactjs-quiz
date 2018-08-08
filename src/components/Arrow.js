import React from 'react';
import PropTypes from 'prop-types';
import arrowLeftImage from '../images/navigation-left-arrow.svg';
import arrowRightImage from '../images/navigation-right-arrow.svg';

const Arrow = ({direction, progress, allAnswers, goToNextQuestion, goToPreviousQuestion, showResults}) => {
    const image = direction === 'left' ? arrowLeftImage : arrowRightImage;
    const isDisabled = 
        (direction === 'left' && progress === 0) ||
        (direction === 'right' && !allAnswers[progress]) || 
        (direction === 'right' && showResults)
    return (
        <button disabled={isDisabled} className={`arrow ${isDisabled ? 'is-disabled': ''}`}
        onClick={() => direction === 'left' ? goToPreviousQuestion(): goToNextQuestion()}
        >
            <img src={image} />
        </button>
    );
};

Arrow.propTypes = {
    direction: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    allAnswers: PropTypes.array.isRequired,
    goToNextQuestion: PropTypes.func,
    goToPreviousQuestion: PropTypes.func,
    showResults: PropTypes.bool.isRequired
}

export default Arrow;