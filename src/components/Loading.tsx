import '../globalStyles.css';

export const Loading = () => {
  return (
    <div className="loading-map d-flex justify-content-center align-items-center m-5">
      <div className="text-center">
        <h3 style={{ color: '#FF5733 ' }}> Wait a moment, please! </h3>
        <span style={{ color: '#fff ' }}> Searching your location...</span>
      </div>
    </div>
  );
};
