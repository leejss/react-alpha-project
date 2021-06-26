// Component for showing errors
const Errors = ({ errors }) => {
  return (
    <>
      {errors.map((err, idx) => (
        <p key={idx}>{err.message}</p>
      ))}
    </>
  );
};

export default Errors;
