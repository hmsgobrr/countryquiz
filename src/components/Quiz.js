import React from "react";
import "./Quiz.css"

class Quiz extends React.Component {
    state = {
        countryDatas: [],
        isLoadingDatas: true,
        questions: [],
        currentQuestionIdx: 0
    };

    getAnswerChoices(rightAnswer, answerIsFlag) {
        let answers = new Array(4);
        const answerIdx = Math.floor(Math.random() * 4);
        for (let i = 0; i < 4; i++) {
            if (i === answerIdx) {
                answers[i] = rightAnswer;
            } else if (i === 0) {
                answers[i] = answerIsFlag ?
                    (this.state.countryDatas[Math.floor(Math.random() * this.state.countryDatas.length)].flag || "*no flag*")
                    :
                    this.state.countryDatas[Math.floor(Math.random() * this.state.countryDatas.length)].name.common;
            } else {
                do {
                    answers[i] = answerIsFlag ?
                        (this.state.countryDatas[Math.floor(Math.random() * this.state.countryDatas.length)].flag || "*no flag*")
                        :
                        this.state.countryDatas[Math.floor(Math.random() * this.state.countryDatas.length)].name.common;
                } while (answers[i] === rightAnswer || answers.filter((_, idx) => idx !== i).includes(answers[i]));
            }
        }
        return answers;
    }

    async componentDidMount() {
        try {
            let res = await fetch("https://restcountries.com/v3.1/all?fields=name,flag");
            this.setState({ countryDatas: await res.json() }, () => {
                this.setState({
                    questions: new Array(7).fill({
                        answerIsFlag: Math.random() < 0.5,
                        country: this.state.countryDatas[Math.floor(Math.random() * this.state.countryDatas.length)],
                        getAnswer() { return this.answerIsFlag ? (this.country.flag || "*no flag*") : this.country.name.common; }
                    })
                }, () => this.setState({ isLoadingDatas: false }));
            });
        } catch (err) {
            alert("Sorry there is a problem loading data, try again later...\nERROR:\n" + err)
            this.props.backToMenu();
        }
    }

    render() {
        const { isLoadingDatas, questions, currentQuestionIdx } = this.state;
        return (isLoadingDatas ?
            <div className="flex-center">
                <div className="spinner"></div>
                <h3>Loading Data</h3>
            </div>
            :
            <div className="flex-center space-even">
                <h2 className="question">
                    ({currentQuestionIdx + 1}/{questions.length})&nbsp;
                    {questions[currentQuestionIdx].answerIsFlag ?
                        ("Which flag belongs to " + questions[currentQuestionIdx].country.name.common)
                        :
                        ("Which country's flag is " + (questions[currentQuestionIdx].country.flag || "*no flag*"))
                    }
                </h2>
                <div className="answers">
                    {this.getAnswerChoices(questions[currentQuestionIdx].getAnswer(), questions[currentQuestionIdx].answerIsFlag)
                        .map(answer => <button key={answer} className={questions[currentQuestionIdx].answerIsFlag ? "fs100" : ""}>{answer}</button>)}
                </div>
            </div>
        )
    }
}

export default Quiz;
