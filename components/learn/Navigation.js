import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { ellipsis } from 'polished';

import { useRecord, useGetRecord } from '../../lib/learn/records';
import courses from '../../lib/learn/courses';

import Profile from './Profile';
import CheckIcon from '../icons/check';
import ArrowIcon from '../icons/arrow-right';

const Lesson = ({ course, lesson, selected }) => {
  const getRecord = useGetRecord();

  const steps = lesson.steps || [];
  const finishedSteps = (
    steps.filter(
      step =>
        getRecord({
          courseId: course.id,
          lessonId: lesson.id,
          stepId: step.id
        }).visited
    ) || []
  ).length;
  const totalSteps = steps.length;
  const finished = totalSteps && finishedSteps === totalSteps;

  return (
    <li>
      <Link href={`/learn/${course.id}/${lesson.id}`}>
        <a className={classNames('f5', { fw7: selected, selected, finished })}>
          <span className="step" title={`${finishedSteps} / ${totalSteps} finished`}>
            {finished && <CheckIcon color="#0070F3" />}
          </span>
          <span className="label">{lesson.name}</span>
        </a>
      </Link>
      <style jsx>{`
        li {
          list-style: none;
          margin: 12px 0;
        }
        a {
          display: flex;
          align-items: center;
          color: unset;
          text-decoration: none;
        }
        a:hover {
          color: gray;
        }
        .step {
          display: inline-block;
          margin-left: -1.25rem;
          margin-right: -7px;
          width: 7px;
          height: 7px;
          min-width: 7px;
          border-radius: 50%;
          background: #efefef;
          transform: translateX(-4px);
          transition: background 0.5s ease;
        }
        .selected .step {
          margin-right: -9px;
          width: 9px;
          height: 9px;
          min-width: 9px;
          background: #111;
          transform: translateX(-5px);
        }
        .finished .step {
          width: 16px;
          height: 16px;
          line-height: 16px;
          margin-right: -16px;
          background: white;
          transform: translateX(-8px);
        }
        .label {
          margin-left: 1.25rem;
        }
      `}</style>
    </li>
  );
};

const Course = ({ course, meta }) => (
  <div className="course" key={course.id}>
    <h3 className="f6 fw6">{course.name}</h3>
    <ul>
      {course.lessons.map(lesson => (
        <Lesson
          key={lesson.id}
          course={course}
          lesson={lesson}
          selected={meta.lessonId === lesson.id && meta.courseId === course.id}
        />
      ))}
    </ul>
    <style jsx>{`
      h3 {
        text-transform: uppercase;
        margin-bottom: 12px;
      }

      .course {
        padding-top: 3rem;
        padding-left: 1.25rem;
        margin-left: 1rem;
        border-left: 1px solid #efefef;
      }

      @media (max-width: 640px) {
        .course {
          padding-top: 1rem;
        }
      }

      :global(.course):last-of-type {
        padding-bottom: 3rem;
      }

      ul {
        padding: 0;
        margin: 0;
      }
    `}</style>
  </div>
);

const Navigation = ({ meta, isMobile }) => {
  const [dropdown, setDropdown] = React.useState(false);
  const [record, dispatchRecord] = useRecord(meta);
  const effectDeps = [record.ready, !record.visited];

  React.useEffect(() => {
    if (effectDeps.every(dep => dep)) {
      dispatchRecord({ type: 'visit' });
    }
  }, effectDeps);

  if (isMobile) {
    return (
      <div className="fixed-navigation-container">
        <div className={`navigation-area dropdown${dropdown ? '' : ' courses-closed'}`}>
          {courses.map(course => (
            <Course key={course.id} course={course} meta={meta} />
          ))}
        </div>
        <div
          role="button"
          className="no-tap-highlight current f5 fw6"
          onClick={() => setDropdown(!dropdown)}
        >
          <span
            style={{
              verticalAlign: 'middle',
              marginRight: 7,
              display: 'inline-block',
              lineHeight: 0
            }}
          >
            <ArrowIcon />
          </span>
          <span style={ellipsis()}>{meta.title}</span>
        </div>
        <Profile isMobile />
        <style jsx>{`
          .fixed-navigation-container {
            position: relative;
            display: flex;
            height: 56px;
            width: 100%;
            padding: 0 1rem;
            align-items: center;
            justify-content: space-between;
          }
          .current {
            flex: 1;
            display: flex;
            height: 100%;
            align-items: center;
            padding-right: 0.5rem;
            overflow: hidden;
            cursor: pointer;
          }
          .navigation-area.dropdown {
            position: absolute;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            left: 0;
            top: 100%;
            bottom: -50vh;
            width: 100%;
            padding: 0 0.65rem;
            background: white;
            border-top: 1px solid #efefef;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            transition: bottom 0.5s ease;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            z-index: 1;
          }
          .navigation-area.dropdown.courses-closed {
            bottom: 100%;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Profile />
      <div className="navigation-area">
        {courses.map(course => (
          <Course key={course.id} course={course} meta={meta} />
        ))}
        <style jsx>{`
          .navigation-area {
            display: flex;
            flex-direction: column;
          }
        `}</style>
      </div>
    </>
  );
};

export default Navigation;
