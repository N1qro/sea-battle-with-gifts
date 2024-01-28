import { Form, useOutletContext } from "react-router-dom"
import { OutletContextType } from "./Game"
import { ChangeEvent } from "react"

import StyledForm, { FieldWrapper, FormError } from "../../styles/StyledForm"
import Input from "../../styles/InputElement"
import Button from "../../components/Button"
import { useState } from "react"
import { Header4, RegularText, SubText } from "../../styles/TextStyles"
import { PlayerCard, PlayerContainer, PlayerInfoContainer } from "../../styles/GamePage"
import remove_player from "../../api/removePlayer"
import add_player from "../../api/addPlayer"
import update_player_shots from "../../api/updateplayershots"


function PlayerInfo() {
    const [ error, setError ] = useState({})
	const { gameData, refetchData } = useOutletContext<OutletContextType>()
    const [ formData, setFormData ] = useState({
        "user": 0,
        "count": 0
    })

    function updatePlayer(e) {
        (async () => {
            const data = await update_player_shots(formData.user, gameData.link, formData.count)
            if (data.status === "error") {
                setError(data.content)
            } else {
                refetchData()
            }
        })()
        e.preventDefault()
    }

    function deletePlayer(e, user_id: number) {
        (async () => {
            const data = await remove_player(user_id, gameData.link)
            if (data.status === "error") {
                setError(data.content)
            } else {
                refetchData()
            }
        })()
    }

    function addPlayer(e) {
        (async () => {
            const data = await add_player({...formData, game: gameData.link})
            if (data.status === "error") {
                setError(data.content)
            } else {
                refetchData()
            }
        })()
        e.preventDefault()
    }

    const players = gameData?.players?.map(user => {
        return (
            <PlayerCard key={user.id}>
                <div>
                    <RegularText>{user.username}</RegularText>
                    <p>UID: {user.id}</p>
                </div>
                <p>
                    Патронов: {user.count}
                    <Button
                        $color="red"
                        type="button"
                        onClick={e => deletePlayer(e, user.id)}
                    >X</Button>
                </p>
            </PlayerCard>
        )
    })

    function validate(hadPreviously: number) {
        const maxCount = gameData.size * gameData.size

        if (formData.count === 0) {
            setError({count: "Количество выстрелов не может быть равно нулю"})
            return false
        } else if (formData.count > maxCount) {
            setError({count: `Максимальное кол-во выстрелов: ${maxCount}`})
            return false
        } else if (formData.user === 0) {
            setError({user: "Пользователя с id=0 не существует"})
            return false
        }

        const totalCount = gameData.players?.map(player => player.count).reduce((a, b) => a + b)
        
        if (totalCount && totalCount - hadPreviously + formData.count > maxCount) {
            setError({count: "Суммарное кол-во выстрелов не может превышать размеры поля"})
            return false
        }

        setError({})
        return true
    }

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        setFormData(prev => ({...prev, [e.target.id]: parseInt(e.target.value) || 0}))
    }

    function handleSubmit(e) {
        e.preventDefault()

        const matchingPlayer = gameData?.players?.filter(el => el.id === formData.user)[0]
        if (!validate(matchingPlayer?.count || 0)) { return }

        if (!!matchingPlayer) {
            updatePlayer(e)
        } else {
            addPlayer(e)
        }
    }

    return (
        <PlayerInfoContainer>
            <Header4>Добавленные игроки</Header4>
            <PlayerContainer>
                {players ? players : <RegularText>Пользователи ещё не были добавлены</RegularText>}
            </PlayerContainer>
            <Header4>Добавить игрока</Header4>
            <SubText>(Здесь также можно изменять кол-во уже выданных выстрелов)</SubText>
            <StyledForm onSubmit={handleSubmit}>
                <FieldWrapper>
                    <div>
                        <label htmlFor="">ID пользователя</label>
                        <br />
                        <Input
                            id="user"
                            onChange={handleInput}
                            value={formData.user}
                        ></Input>
                    </div>
                    {error.user && <FormError>{error.user}</FormError>}
                    <div>
                        <label htmlFor="">Количество выстрелов</label>
                        <br />
                        <Input
                            id="count"
                            onChange={handleInput}
                            value={formData.count}
                        ></Input>
                    </div>
                    {error.count && <FormError>{error.count}</FormError>}
                    {error.details && <FormError>{error.details}</FormError>}
                    <Button $color="black">Добавить</Button>
                </FieldWrapper>
            </StyledForm>
        </PlayerInfoContainer>
    )
}

export default PlayerInfo