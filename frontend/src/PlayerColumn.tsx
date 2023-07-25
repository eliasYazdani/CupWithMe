import PlayerCard from "./PlayerCard.tsx";

type PropsPlayerColumn ={

}

export default function PlayerColumn(propsPlayerColumn : PropsPlayerColumn) {
    return (
        <div>
            <h2>Players:</h2>
            {
                propsPlayerColumn.players.map(player=><PlayerCard player={player} key={player.id} />)
            }
        </div>
    );
}

