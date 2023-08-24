import "./StartPage.css";

// eslint-disable-next-line react/prop-types
export default function StartPage({ startGame }) {
  return (
    <div className="startContainer">
      <h1>Secret Word</h1>
      <p>Clique no botão e começe a jogar</p>
      <button onClick={startGame}>Jogar</button>
    </div>
  );
}
