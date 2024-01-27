import { useOutletContext } from "react-router-dom"
import { OutletContextType } from "./Game"
import { ChangeEvent } from "react"

import StyledForm, { FieldWrapper, FormError } from "../../styles/StyledForm"
import Input from "../../styles/InputElement"
import Button from "../../components/Button"
import { useState } from "react"
import { Header4, RegularText } from "../../styles/TextStyles"
import { PlayerInfoContainer } from "../../styles/GamePage"
import remove_player from "../../api/removePlayer"
import add_player from "../../api/addPlayer"


function PlayerInfo() {
	const { gameData } = useOutletContext<OutletContextType>()
    const [ formData, setFormData ] = useState({
        "id": 0,
        "count": 0
    })

    function deletePlayer(e, user_id: number) {
        (async () => {
            const data = await remove_player(user_id, gameData.link)
            console.log("Removed?")
            console.log(data)
        })()
        e.preventDefault()
    }

    function addPlayer(e) {
        (async () => {
            const data = await add_player()
            console.log("Added?")
            console.log(data)
        })()
        e.preventDefault()
    }

    const players = gameData?.players?.map(el => {
        return <>
            <p key={el.id}>
                {el.id} - ({el.username}) - {el.shot_count}
                <Button
                    $color="red"
                    onClick={e => deletePlayer(e, el.id)}
                >Удалить</Button>
            </p>
        </>
    }) 

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        setFormData(prev => ({...prev, [e.target.id]: parseInt(e.target.value) || 0}))
    }

    function handleSubmit(e) {
        addPlayer(e)
    }

    return (
        <PlayerInfoContainer>
            <Header4>Добавленные игроки</Header4>
            <div>
                {players ? players : <RegularText>Пользователи ещё не были добавлены</RegularText>}
            </div>
            <Header4>Добавить игрока</Header4>
            <StyledForm onSubmit={handleSubmit}>
                <FieldWrapper>
                    <div>
                        <label htmlFor="">ID пользователя</label>
                        <br />
                        <Input
                            id="id"
                            onChange={handleInput}
                            value={formData.id}
                        ></Input>
                    </div>
                    <div>
                        <label htmlFor="">Количество выстрелов</label>
                        <br />
                        <Input
                            id="count"
                            onChange={handleInput}
                            value={formData.count}
                        ></Input>
                    </div>
                    <Button $color="black">Добавить</Button>
                </FieldWrapper>
            </StyledForm>
        </PlayerInfoContainer>
    )
}

export default PlayerInfo