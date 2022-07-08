const CustomForm = (props) => {
  const { className, children, onSubmit } = props;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
      className={className}
    >
      {children}
    </form>
  );
};

export default CustomForm;
