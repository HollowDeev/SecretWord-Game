import './OverPage.css'

// eslint-disable-next-line react/prop-types
export const OverPage = ({retry,score}) => {
  return (
    <div>
        <h1>Fim de Jogo</h1>
        <h2>A sua pontuação foi: <span>{score}</span></h2>
        <button onClick={retry}>Reinicicar Jogo</button>
    </div>
  )
}
