import React from 'react';
import ArrowIcon from '../arrow-icon';
import RightArrow from '../icons/arrow-right';
import LeftArrow from '../icons/arrow-left';
import Button from './button';

const StepNav = ({ steps, nextLessonId, meta: { stepId, courseId, lessonId } }) => {
  if (!steps.length) {
    return null;
  }

  // intro step
  if (!stepId) {
    return (
      <Button invert href={`/learn/${courseId}/${lessonId}/${steps[0].id}`}>
        Start Now →
      </Button>
    );
  }

  const i = steps.findIndex(step => step.id === stepId);

  return (
    <div>
      <Button full href={`/learn/${courseId}/${lessonId}${i === 0 ? '' : `/${steps[i - 1].id}`}`}>
        <ArrowIcon left>
          <LeftArrow color="#0070f3" />
        </ArrowIcon>
        Prev
      </Button>
      <span className="spacer" />
      {i !== steps.length - 1 && (
        <Button invert href={`/learn/${courseId}/${lessonId}/${steps[i + 1].id}`}>
          Next
          <ArrowIcon right>
            <RightArrow color="white" />
          </ArrowIcon>
        </Button>
      )}
      {i === steps.length - 1 && nextLessonId && (
        <Button invert href={`/learn/${courseId}/${nextLessonId}`}>
          Next Lesson
        </Button>
      )}
      <style jsx>{`
        div {
          text-align: right;
        }
        .spacer {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );
};

export default StepNav;
