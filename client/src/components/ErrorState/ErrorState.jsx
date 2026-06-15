export const ErrorState = ({ message }) => {
  return (
    <div className="py-6 text-center">
      <p className="var[--color-text-error]">Error: {message}</p>
    </div>
  );
};
