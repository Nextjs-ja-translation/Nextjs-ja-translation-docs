export default function Notification({ children }) {
  return (
    <div className="notification">
      {children}
      <style jsx>{`
        .notification {
          min-height: 2.5rem;
          padding: 0.375rem 1rem;
          margin: 1rem 1rem 2rem;
          border: 1px solid #d8d8d8;
          border-radius: 5px;
        }
        @media screen and (max-width: 640px) {
          .notification {
            margin-top: 0;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
