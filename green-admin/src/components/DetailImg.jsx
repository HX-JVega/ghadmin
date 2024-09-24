const DetailImg = ({ src, alt }) => {
  return (
    <>
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{ width: "15em", height: "auto", border: "2px solid black" }}
        />
      ) : (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png"
          alt="placeholder"
          style={{ width: "50%", height: "auto" }}
        />
      )}
    </>
  );
};

export default DetailImg;
