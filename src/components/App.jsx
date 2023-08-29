import { useEffect, useState } from 'react';
import css from './App.module.css';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const [total, setTotal] = useState(0);
  const [positivePercent, setPositivePercent] = useState(0);

  const addFeedback = ({ target: { name } }) => {
    setState(prevstate => ({ ...prevstate, [name]: prevstate[name] + 1 }));
  };

  useEffect(() => {
    setTotal(Object.values(state).reduce((acc, value) => acc + value, 0));
    setPositivePercent(Math.round((state.good / total) * 100));
  }, [state, total]);

  return (
    <div className={css.container}>
      <Section titel="Please leave feedback">
        <FeedbackOptions
          onLeaveFeedback={addFeedback}
          options={Object.keys(state)}
        />
      </Section>
      <Section titel="Statistics">
        {total ? (
          <Statistics
            good={state.good}
            neutral={state.neutral}
            bad={state.bad}
            total={total}
            positivePercentage={positivePercent}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
