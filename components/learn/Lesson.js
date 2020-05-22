import React from 'react';
import { useRecord, useGetRecord } from '../../lib/learn/records';
import courses from '../../lib/learn/courses';
import StepBar from './StepBar';
import AnswerBox from './AnswerBox';
import StepNav from './StepNav';

const Lesson = ({ meta, children }) => {
  const [record, dispatchRecord] = useRecord(meta);
  const getRecord = useGetRecord();

  const course = courses.find(c => c.id === meta.courseId);

  const indexLesson = course.lessons.findIndex(lesson => lesson.id === meta.lessonId);
  const lesson = course.lessons[indexLesson];
  const nextLessonId = (course.lessons[indexLesson + 1] || {}).id;
  const { steps } = lesson;

  const indexStep = steps.findIndex(step => step.id === meta.stepId);
  const prevSteps = steps.slice(0, indexStep);
  const prevStepsVisited = prevSteps.length
    ? prevSteps.every(step => getRecord({ ...meta, stepId: step.id }).visited)
    : true;

  const effectDeps = [
    !meta.question,
    record.ready,
    record.visited,
    !record.checked,
    prevStepsVisited
  ];

  React.useEffect(() => {
    if (effectDeps.every(dep => dep)) {
      dispatchRecord({ type: 'check' });
    }
  }, effectDeps);

  return (
    <div className="lesson-area">
      <h2 className="f1">{meta.title}</h2>
      {steps && <StepBar meta={meta} steps={steps} />}
      <div className="content">{children}</div>
      {meta.question && (
        <AnswerBox
          record={record}
          dispatchRecord={dispatchRecord}
          answers={meta.question.answers}
          correctAnswer={meta.question.correctAnswer}
        />
      )}
      {steps && (
        <div className="lesson-step-nav">
          <StepNav meta={meta} steps={steps} nextLessonId={nextLessonId} />
        </div>
      )}
      <style jsx>{`
        h2 {
          margin: 0.8rem 0 2rem 0;
        }
        .content {
          margin: 3rem 0 0 0;
        }
        .lesson-step-nav {
          margin-top: 3rem;
        }
      `}</style>
    </div>
  );
};

export default Lesson;
