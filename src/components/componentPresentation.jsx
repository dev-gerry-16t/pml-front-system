import CustomPrincipalTitle from "./customTitleLogin";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      duration: 1,
    },
  },
};

const ComponentPresentation = ({ children, greet, subGreet }) => {
  return (
    <div className="present-container">
      <div className="background-city">
        <img
          className="logo-pml"
          src="https://prendamovil-assets.s3.us-east-2.amazonaws.com/logo-prenda-dark.png"
          alt="Imagen-ciudad"
        />
        <img
          className="background-img"
          src="https://prendamovil-assets.s3.us-east-2.amazonaws.com/pml-city.png"
          alt="Imagen-ciudad"
        />
        <img
          className="background-img-1"
          srcSet="https://prendamovil-assets.s3.us-east-2.amazonaws.com/pml-city-mobile.png"
          alt="Imagen-ciudad"
        />
      </div>
      <div className="info-form">
        <div className="container-form">
          <CustomPrincipalTitle greet={greet} subGreet={subGreet} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default ComponentPresentation;
