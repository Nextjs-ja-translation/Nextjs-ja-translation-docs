import React from 'react';
import classNames from 'classnames';
import { useGetRecord } from '../../lib/learn/records';
import Button from './button';

const Step = ({ selected, href, disabled, children }) => (
  <div>
    <Button
      className={classNames('step-btn', { 'step-selected': selected })}
      href={href}
      disabled={disabled}
      invert={selected}
      light
      wide
    >
      {children}
    </Button>
    <style jsx global>{`
      .step-btn.step-selected {
        font-weight: 600;
      }
    `}</style>
    <style jsx>{`
      div {
        margin-right: 1rem;
        display: inline-block;
      }
    `}</style>
  </div>
);

const StepBar = ({ steps, meta: { courseId, lessonId, stepId } }) => {
  const getRecord = useGetRecord();

  return (
    <div>
      {
        // hide when not start
        steps.length ? (
          <Step selected={!stepId} href={`/learn/${courseId}/${lessonId}`}>
            1
          </Step>
        ) : null
      }
      {steps.map((step, index) => (
        <Step
          key={step.id}
          selected={step.id === stepId}
          href={`/learn/${courseId}/${lessonId}/${step.id}`}
          disabled={!getRecord({ courseId, lessonId, stepId: step.id }).visited}
        >
          {index + 2}
        </Step>
      ))}
    </div>
  );
};

export default StepBar;
