import Loader from 'components/Loader/Loader';

export default function ButtonModal() {
  return (
    <div className="Overlay">
      <div className="Modal">
        <Loader />
      </div>
    </div>
  );
}
