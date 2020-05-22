export default function PageContent({ children }) {
  return (
    <div>
      {children}
      <style jsx>{`
        div {
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
}
