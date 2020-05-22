import React from 'react';
import courses from './courses';
import { useLocalStorage } from './localStorage';

const getRecordId = ({ courseId, lessonId, stepId }) =>
  `${courseId}/${lessonId}${stepId ? `/${stepId}` : ''}`;

const updateRecords = (records, meta, update) => {
  const id = getRecordId(meta);

  return {
    ...records,
    [id]: {
      ...(records[id] || {}),
      ...update
    }
  };
};

const reducer = (records, action) => {
  switch (action.type) {
    case 'init':
      return { ...action.clientState, ready: true };
    case 'visit':
      return updateRecords(records, action.ids, { visited: true });
    case 'check':
      return updateRecords(records, action.ids, { checked: true });
    case 'submit':
      return updateRecords(records, action.ids, { submitted: true });
    case 'answer':
      return updateRecords(records, action.ids, { answer: action.answer });
    default:
      throw new Error();
  }
};

const Record = React.createContext();
const Records = React.createContext();

const RecordsProvider = ({ children }) => {
  const [records, record] = useLocalStorage('points', reducer, { ready: false });

  return (
    <Record.Provider value={record}>
      <Records.Provider value={records}>{children}</Records.Provider>
    </Record.Provider>
  );
};

const useGetRecord = () => {
  const records = React.useContext(Records);

  const getRecord = ({ courseId, lessonId, stepId }) => {
    const id = `${courseId}/${lessonId}${stepId ? `/${stepId}` : ''}`;
    return { ...records[id], ready: records.ready };
  };

  return getRecord;
};

const useGetPoints = () => {
  const getRecord = useGetRecord();

  return courses.reduce(
    (coursePoints, course) =>
      coursePoints +
      course.lessons.reduce(
        (lessonPoints, lesson) =>
          lessonPoints +
          lesson.steps.reduce((points, step) => {
            const record = getRecord({
              courseId: course.id,
              lessonId: lesson.id,
              stepId: step.id
            });
            if (record.visited) {
              return points + (step.points || 0);
            }
            return points;
          }, 0),
        0
      ),
    0
  );
};

const useRecord = ({ courseId, lessonId, stepId }) => {
  const getRecord = useGetRecord();
  const dispatch = React.useContext(Record);

  const record = getRecord({ courseId, lessonId, stepId });
  const dispatchRecord = action => dispatch({ ids: { courseId, lessonId, stepId }, ...action });

  return [record, dispatchRecord];
};

export { useRecord, useGetRecord, useGetPoints, RecordsProvider };
