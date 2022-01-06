export default function Spinner(props) {
  return (
    <div className="container text-gray-200" id="app">
      <div className={`modal ${props.loading ? "is-active" : null}`}>
        <div className="modal-background"></div>
        <div className="modal-content h-full w-full flex items-center justify-center flex-col">
          <span className="mr-3 animate-spin rounded-full h-5 w-5 border-b-2 border-gray-300 mb-2"></span>
          <span>Carregando...</span>
        </div>
      </div>
    </div>
  );
}
