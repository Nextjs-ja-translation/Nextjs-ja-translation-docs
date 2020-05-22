import Button from './button';
import ArrowIcon from '../arrow-icon';
import RightArrow from '../icons/arrow-right';
import courses from '../../lib/learn/courses';

const SkipPageButton = ({ meta }) => {
  const course = courses.find(c => c.id === meta.courseId);
  const indexLesson = course.lessons.findIndex(lesson => lesson.id === meta.lessonId);
  const lesson = course.lessons[indexLesson];
  const { steps } = lesson;
  const i = steps.findIndex(step => step.id === meta.stepId);
  return (
    <div>
      <Button invert href={`/learn/${meta.courseId}/${meta.lessonId}/${steps[i + 1].id}`}>
        Next
        <ArrowIcon right>
          <RightArrow color="white" />
        </ArrowIcon>
      </Button>
      <style jsx>{`
        div {
          margin: 2rem 0 4rem;
        }
      `}</style>
    </div>
  );
};

export default SkipPageButton;
